"use strict";
"use client";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.actWrapper = exports.actDestroy = void 0;
var _react = _interopRequireWildcard(require("react"));
var _context = require("../app/context");
var _configProvider = _interopRequireWildcard(require("../config-provider"));
var _UnstableContext = require("../config-provider/UnstableContext");
var _PurePanel = _interopRequireDefault(require("./PurePanel"));
var _useNotification = _interopRequireWildcard(require("./useNotification"));
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
const GlobalHolder = /*#__PURE__*/_react.default.forwardRef((props, ref) => {
  const {
    notificationConfig,
    sync
  } = props;
  const {
    getPrefixCls
  } = (0, _react.useContext)(_configProvider.ConfigContext);
  const prefixCls = defaultGlobalConfig.prefixCls || getPrefixCls('notification');
  const appConfig = (0, _react.useContext)(_context.AppConfigContext);
  const [api, holder] = (0, _useNotification.useInternalNotification)(Object.assign(Object.assign(Object.assign({}, notificationConfig), {
    prefixCls
  }), appConfig.notification));
  _react.default.useEffect(sync, []);
  _react.default.useImperativeHandle(ref, () => {
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
const GlobalHolderWrapper = /*#__PURE__*/_react.default.forwardRef((_, ref) => {
  const [notificationConfig, setNotificationConfig] = _react.default.useState(getGlobalContext);
  const sync = () => {
    setNotificationConfig(getGlobalContext);
  };
  _react.default.useEffect(sync, []);
  const global = (0, _configProvider.globalConfig)();
  const rootPrefixCls = global.getRootPrefixCls();
  const rootIconPrefixCls = global.getIconPrefixCls();
  const theme = global.getTheme();
  const dom = /*#__PURE__*/_react.default.createElement(GlobalHolder, {
    ref: ref,
    sync: sync,
    notificationConfig: notificationConfig
  });
  return /*#__PURE__*/_react.default.createElement(_configProvider.default, {
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
      const reactRender = (0, _UnstableContext.unstableSetRender)();
      reactRender(/*#__PURE__*/_react.default.createElement(GlobalHolderWrapper, {
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
  const global = (0, _configProvider.globalConfig)();
  if (process.env.NODE_ENV !== 'production' && !global.holderRender) {
    (0, _configProvider.warnContext)('notification');
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
  useNotification: _useNotification.default,
  _InternalPanelDoNotUseOrYouWillBeFired: _PurePanel.default
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
let actWrapper = exports.actWrapper = noop;
if (process.env.NODE_ENV === 'test') {
  exports.actWrapper = actWrapper = wrapper => {
    act = wrapper;
  };
}
/** @internal Only Work in test env */
// eslint-disable-next-line import/no-mutable-exports
let actDestroy = exports.actDestroy = noop;
if (process.env.NODE_ENV === 'test') {
  exports.actDestroy = actDestroy = () => {
    notification = null;
  };
}
var _default = exports.default = staticMethods;