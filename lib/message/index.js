"use strict";
"use client";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.actWrapper = exports.actDestroy = void 0;
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _react = _interopRequireWildcard(require("react"));
var _context = require("../app/context");
var _configProvider = _interopRequireWildcard(require("../config-provider"));
var _UnstableContext = require("../config-provider/UnstableContext");
var _PurePanel = _interopRequireDefault(require("./PurePanel"));
var _useMessage = _interopRequireWildcard(require("./useMessage"));
var _util = require("./util");
let message = null;
let act = callback => callback();
let taskQueue = [];
let defaultGlobalConfig = {};
function getGlobalContext() {
  const {
    getContainer,
    duration,
    rtl,
    maxCount,
    top
  } = defaultGlobalConfig;
  const mergedContainer = (getContainer === null || getContainer === void 0 ? void 0 : getContainer()) || document.body;
  return {
    getContainer: () => mergedContainer,
    duration,
    rtl,
    maxCount,
    top
  };
}
const GlobalHolder = /*#__PURE__*/_react.default.forwardRef((props, ref) => {
  const {
    messageConfig,
    sync
  } = props;
  const {
    getPrefixCls
  } = (0, _react.useContext)(_configProvider.ConfigContext);
  const prefixCls = defaultGlobalConfig.prefixCls || getPrefixCls('message');
  const appConfig = (0, _react.useContext)(_context.AppConfigContext);
  const [api, holder] = (0, _useMessage.useInternalMessage)(Object.assign(Object.assign(Object.assign({}, messageConfig), {
    prefixCls
  }), appConfig.message));
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
  const [messageConfig, setMessageConfig] = _react.default.useState(getGlobalContext);
  const sync = () => {
    setMessageConfig(getGlobalContext);
  };
  _react.default.useEffect(sync, []);
  const global = (0, _configProvider.globalConfig)();
  const rootPrefixCls = global.getRootPrefixCls();
  const rootIconPrefixCls = global.getIconPrefixCls();
  const theme = global.getTheme();
  const dom = /*#__PURE__*/_react.default.createElement(GlobalHolder, {
    ref: ref,
    sync: sync,
    messageConfig: messageConfig
  });
  return /*#__PURE__*/_react.default.createElement(_configProvider.default, {
    prefixCls: rootPrefixCls,
    iconPrefixCls: rootIconPrefixCls,
    theme: theme
  }, global.holderRender ? global.holderRender(dom) : dom);
});
function flushNotice() {
  if (!message) {
    const holderFragment = document.createDocumentFragment();
    const newMessage = {
      fragment: holderFragment
    };
    message = newMessage;
    // Delay render to avoid sync issue
    act(() => {
      const reactRender = (0, _UnstableContext.unstableSetRender)();
      reactRender(/*#__PURE__*/_react.default.createElement(GlobalHolderWrapper, {
        ref: node => {
          const {
            instance,
            sync
          } = node || {};
          // React 18 test env will throw if call immediately in ref
          Promise.resolve().then(() => {
            if (!newMessage.instance && instance) {
              newMessage.instance = instance;
              newMessage.sync = sync;
              flushNotice();
            }
          });
        }
      }), holderFragment);
    });
    return;
  }
  // Notification not ready
  if (!message.instance) {
    return;
  }
  // >>> Execute task
  taskQueue.forEach(task => {
    const {
      type,
      skipped
    } = task;
    // Only `skipped` when user call notice but cancel it immediately
    // and instance not ready
    if (!skipped) {
      switch (type) {
        case 'open':
          {
            act(() => {
              const closeFn = message.instance.open(Object.assign(Object.assign({}, defaultGlobalConfig), task.config));
              closeFn === null || closeFn === void 0 ? void 0 : closeFn.then(task.resolve);
              task.setCloseFn(closeFn);
            });
            break;
          }
        case 'destroy':
          act(() => {
            message === null || message === void 0 ? void 0 : message.instance.destroy(task.key);
          });
          break;
        // Other type open
        default:
          {
            act(() => {
              var _message$instance;
              const closeFn = (_message$instance = message.instance)[type].apply(_message$instance, (0, _toConsumableArray2.default)(task.args));
              closeFn === null || closeFn === void 0 ? void 0 : closeFn.then(task.resolve);
              task.setCloseFn(closeFn);
            });
          }
      }
    }
  });
  // Clean up
  taskQueue = [];
}
// ==============================================================================
// ==                                  Export                                  ==
// ==============================================================================
function setMessageGlobalConfig(config) {
  defaultGlobalConfig = Object.assign(Object.assign({}, defaultGlobalConfig), config);
  // Trigger sync for it
  act(() => {
    var _a;
    (_a = message === null || message === void 0 ? void 0 : message.sync) === null || _a === void 0 ? void 0 : _a.call(message);
  });
}
function open(config) {
  const result = (0, _util.wrapPromiseFn)(resolve => {
    let closeFn;
    const task = {
      type: 'open',
      config,
      resolve,
      setCloseFn: fn => {
        closeFn = fn;
      }
    };
    taskQueue.push(task);
    return () => {
      if (closeFn) {
        act(() => {
          closeFn();
        });
      } else {
        task.skipped = true;
      }
    };
  });
  flushNotice();
  return result;
}
function typeOpen(type, args) {
  const global = (0, _configProvider.globalConfig)();
  if (process.env.NODE_ENV !== 'production' && !global.holderRender) {
    (0, _configProvider.warnContext)('message');
  }
  const result = (0, _util.wrapPromiseFn)(resolve => {
    let closeFn;
    const task = {
      type,
      args,
      resolve,
      setCloseFn: fn => {
        closeFn = fn;
      }
    };
    taskQueue.push(task);
    return () => {
      if (closeFn) {
        act(() => {
          closeFn();
        });
      } else {
        task.skipped = true;
      }
    };
  });
  flushNotice();
  return result;
}
const destroy = key => {
  taskQueue.push({
    type: 'destroy',
    key
  });
  flushNotice();
};
const methods = ['success', 'info', 'warning', 'error', 'loading'];
const baseStaticMethods = {
  open,
  destroy,
  config: setMessageGlobalConfig,
  useMessage: _useMessage.default,
  _InternalPanelDoNotUseOrYouWillBeFired: _PurePanel.default
};
const staticMethods = baseStaticMethods;
methods.forEach(type => {
  staticMethods[type] = function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return typeOpen(type, args);
  };
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
    message = null;
  };
}
var _default = exports.default = staticMethods;