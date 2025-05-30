"use client";

import React, { useContext } from 'react';
import { AppConfigContext } from '../app/context';
import ConfigProvider, { ConfigContext, globalConfig, warnContext } from '../config-provider';
import { unstableSetRender } from '../config-provider/UnstableContext';
import PurePanel from './PurePanel';
import useNotification, { useInternalNotification } from './useNotification';
let notification = null;
let act = callback => callback();
let taskQueue = [];
let defaultGlobalConfig = {};
function getGlobalContext() {
  const {
    getContainer,
    rtl,
    maxCount,
    top,
    bottom,
    showProgress,
    pauseOnHover
  } = defaultGlobalConfig;
  const mergedContainer = (getContainer === null || getContainer === void 0 ? void 0 : getContainer()) || document.body;
  return {
    getContainer: () => mergedContainer,
    rtl,
    maxCount,
    top,
    bottom,
    showProgress,
    pauseOnHover
  };
}
const GlobalHolder = /*#__PURE__*/React.forwardRef((props, ref) => {
  const {
    notificationConfig,
    sync
  } = props;
  const {
    getPrefixCls
  } = useContext(ConfigContext);
  const prefixCls = defaultGlobalConfig.prefixCls || getPrefixCls('notification');
  const appConfig = useContext(AppConfigContext);
  const [api, holder] = useInternalNotification(Object.assign(Object.assign(Object.assign({}, notificationConfig), {
    prefixCls
  }), appConfig.notification));
  React.useEffect(sync, []);
  React.useImperativeHandle(ref, () => {
    const instance = Object.assign({}, api);
    Object.keys(instance).forEach(method => {
      instance[method] = function () {
        sync();
        return api[method].apply(api, arguments);
      };
    });
    return {
      instance,
      sync
    };
  });
  return holder;
});
const GlobalHolderWrapper = /*#__PURE__*/React.forwardRef((_, ref) => {
  const [notificationConfig, setNotificationConfig] = React.useState(getGlobalContext);
  const sync = () => {
    setNotificationConfig(getGlobalContext);
  };
  React.useEffect(sync, []);
  const global = globalConfig();
  const rootPrefixCls = global.getRootPrefixCls();
  const rootIconPrefixCls = global.getIconPrefixCls();
  const theme = global.getTheme();
  const dom = /*#__PURE__*/React.createElement(GlobalHolder, {
    ref: ref,
    sync: sync,
    notificationConfig: notificationConfig
  });
  return /*#__PURE__*/React.createElement(ConfigProvider, {
    prefixCls: rootPrefixCls,
    iconPrefixCls: rootIconPrefixCls,
    theme: theme
  }, global.holderRender ? global.holderRender(dom) : dom);
});
function flushNotice() {
  if (!notification) {
    const holderFragment = document.createDocumentFragment();
    const newNotification = {
      fragment: holderFragment
    };
    notification = newNotification;
    // Delay render to avoid sync issue
    act(() => {
      const reactRender = unstableSetRender();
      reactRender(/*#__PURE__*/React.createElement(GlobalHolderWrapper, {
        ref: node => {
          const {
            instance,
            sync
          } = node || {};
          Promise.resolve().then(() => {
            if (!newNotification.instance && instance) {
              newNotification.instance = instance;
              newNotification.sync = sync;
              flushNotice();
            }
          });
        }
      }), holderFragment);
    });
    return;
  }
  // Notification not ready
  if (!notification.instance) {
    return;
  }
  // >>> Execute task
  taskQueue.forEach(task => {
    switch (task.type) {
      case 'open':
        {
          act(() => {
            notification.instance.open(Object.assign(Object.assign({}, defaultGlobalConfig), task.config));
          });
          break;
        }
      case 'destroy':
        act(() => {
          notification === null || notification === void 0 ? void 0 : notification.instance.destroy(task.key);
        });
        break;
    }
  });
  // Clean up
  taskQueue = [];
}
// ==============================================================================
// ==                                  Export                                  ==
// ==============================================================================
function setNotificationGlobalConfig(config) {
  defaultGlobalConfig = Object.assign(Object.assign({}, defaultGlobalConfig), config);
  // Trigger sync for it
  act(() => {
    var _a;
    (_a = notification === null || notification === void 0 ? void 0 : notification.sync) === null || _a === void 0 ? void 0 : _a.call(notification);
  });
}
function open(config) {
  const global = globalConfig();
  if (process.env.NODE_ENV !== 'production' && !global.holderRender) {
    warnContext('notification');
  }
  taskQueue.push({
    type: 'open',
    config
  });
  flushNotice();
}
const destroy = key => {
  taskQueue.push({
    type: 'destroy',
    key
  });
  flushNotice();
};
const methods = ['success', 'info', 'warning', 'error'];
const baseStaticMethods = {
  open,
  destroy,
  config: setNotificationGlobalConfig,
  useNotification,
  _InternalPanelDoNotUseOrYouWillBeFired: PurePanel
};
const staticMethods = baseStaticMethods;
methods.forEach(type => {
  staticMethods[type] = config => open(Object.assign(Object.assign({}, config), {
    type
  }));
});
// ==============================================================================
// ==                                   Test                                   ==
// ==============================================================================
const noop = () => {};
/** @internal Only Work in test env */
// eslint-disable-next-line import/no-mutable-exports
export let actWrapper = noop;
if (process.env.NODE_ENV === 'test') {
  actWrapper = wrapper => {
    act = wrapper;
  };
}
/** @internal Only Work in test env */
// eslint-disable-next-line import/no-mutable-exports
export let actDestroy = noop;
if (process.env.NODE_ENV === 'test') {
  actDestroy = () => {
    notification = null;
  };
}
export default staticMethods;