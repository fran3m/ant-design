"use strict";
"use client";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useNotification;
exports.useInternalNotification = useInternalNotification;
var _react = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _rcNotification = require("rc-notification");
var _warning = require("../_util/warning");
var _configProvider = require("../config-provider");
var _useCSSVarCls = _interopRequireDefault(require("../config-provider/hooks/useCSSVarCls"));
var _internal = require("../theme/internal");
var _PurePanel = require("./PurePanel");
var _style = _interopRequireDefault(require("./style"));
var _util = require("./util");
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const DEFAULT_OFFSET = 24;
const DEFAULT_DURATION = 4.5;
const DEFAULT_PLACEMENT = 'topRight';
const Wrapper = _ref => {
  let {
    children,
    prefixCls
  } = _ref;
  const rootCls = (0, _useCSSVarCls.default)(prefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = (0, _style.default)(prefixCls, rootCls);
  return wrapCSSVar(/*#__PURE__*/_react.default.createElement(_rcNotification.NotificationProvider, {
    classNames: {
      list: (0, _classnames.default)(hashId, cssVarCls, rootCls)
    }
  }, children));
};
const renderNotifications = (node, _ref2) => {
  let {
    prefixCls,
    key
  } = _ref2;
  return /*#__PURE__*/_react.default.createElement(Wrapper, {
    prefixCls: prefixCls,
    key: key
  }, node);
};
const Holder = /*#__PURE__*/_react.default.forwardRef((props, ref) => {
  const {
    top,
    bottom,
    prefixCls: staticPrefixCls,
    getContainer: staticGetContainer,
    maxCount,
    rtl,
    onAllRemoved,
    stack,
    duration,
    pauseOnHover = true,
    showProgress
  } = props;
  const {
    getPrefixCls,
    getPopupContainer,
    notification,
    direction
  } = (0, _react.useContext)(_configProvider.ConfigContext);
  const [, token] = (0, _internal.useToken)();
  const prefixCls = staticPrefixCls || getPrefixCls('notification');
  // =============================== Style ===============================
  const getStyle = placement => (0, _util.getPlacementStyle)(placement, top !== null && top !== void 0 ? top : DEFAULT_OFFSET, bottom !== null && bottom !== void 0 ? bottom : DEFAULT_OFFSET);
  const getClassName = () => (0, _classnames.default)({
    [`${prefixCls}-rtl`]: rtl !== null && rtl !== void 0 ? rtl : direction === 'rtl'
  });
  // ============================== Motion ===============================
  const getNotificationMotion = () => (0, _util.getMotion)(prefixCls);
  // ============================== Origin ===============================
  const [api, holder] = (0, _rcNotification.useNotification)({
    prefixCls,
    style: getStyle,
    className: getClassName,
    motion: getNotificationMotion,
    closable: true,
    closeIcon: (0, _PurePanel.getCloseIcon)(prefixCls),
    duration: duration !== null && duration !== void 0 ? duration : DEFAULT_DURATION,
    getContainer: () => (staticGetContainer === null || staticGetContainer === void 0 ? void 0 : staticGetContainer()) || (getPopupContainer === null || getPopupContainer === void 0 ? void 0 : getPopupContainer()) || document.body,
    maxCount,
    pauseOnHover,
    showProgress,
    onAllRemoved,
    renderNotifications,
    stack: stack === false ? false : {
      threshold: typeof stack === 'object' ? stack === null || stack === void 0 ? void 0 : stack.threshold : undefined,
      offset: 8,
      gap: token.margin
    }
  });
  // ================================ Ref ================================
  _react.default.useImperativeHandle(ref, () => Object.assign(Object.assign({}, api), {
    prefixCls,
    notification
  }));
  return holder;
});
// ==============================================================================
// ==                                   Hook                                   ==
// ==============================================================================
function useInternalNotification(notificationConfig) {
  const holderRef = _react.default.useRef(null);
  const warning = (0, _warning.devUseWarning)('Notification');
  // ================================ API ================================
  const wrapAPI = _react.default.useMemo(() => {
    // Wrap with notification content
    // >>> Open
    const open = config => {
      var _a;
      if (!holderRef.current) {
        process.env.NODE_ENV !== "production" ? warning(false, 'usage', 'You are calling notice in render which will break in React 18 concurrent mode. Please trigger in effect instead.') : void 0;
        return;
      }
      const {
        open: originOpen,
        prefixCls,
        notification
      } = holderRef.current;
      const noticePrefixCls = `${prefixCls}-notice`;
      const {
          message,
          description,
          icon,
          type,
          btn,
          actions,
          className,
          style,
          role = 'alert',
          closeIcon,
          closable
        } = config,
        restConfig = __rest(config, ["message", "description", "icon", "type", "btn", "actions", "className", "style", "role", "closeIcon", "closable"]);
      if (process.env.NODE_ENV !== 'production') {
        warning.deprecated(!btn, 'btn', 'actions');
      }
      const mergedActions = actions !== null && actions !== void 0 ? actions : btn;
      const realCloseIcon = (0, _PurePanel.getCloseIcon)(noticePrefixCls, (0, _util.getCloseIconConfig)(closeIcon, notificationConfig, notification));
      return originOpen(Object.assign(Object.assign({
        // use placement from props instead of hard-coding "topRight"
        placement: (_a = notificationConfig === null || notificationConfig === void 0 ? void 0 : notificationConfig.placement) !== null && _a !== void 0 ? _a : DEFAULT_PLACEMENT
      }, restConfig), {
        content: (/*#__PURE__*/_react.default.createElement(_PurePanel.PureContent, {
          prefixCls: noticePrefixCls,
          icon: icon,
          type: type,
          message: message,
          description: description,
          actions: mergedActions,
          role: role
        })),
        className: (0, _classnames.default)(type && `${noticePrefixCls}-${type}`, className, notification === null || notification === void 0 ? void 0 : notification.className),
        style: Object.assign(Object.assign({}, notification === null || notification === void 0 ? void 0 : notification.style), style),
        closeIcon: realCloseIcon,
        closable: closable !== null && closable !== void 0 ? closable : !!realCloseIcon
      }));
    };
    // >>> destroy
    const destroy = key => {
      var _a, _b;
      if (key !== undefined) {
        (_a = holderRef.current) === null || _a === void 0 ? void 0 : _a.close(key);
      } else {
        (_b = holderRef.current) === null || _b === void 0 ? void 0 : _b.destroy();
      }
    };
    const clone = {
      open,
      destroy
    };
    const keys = ['success', 'info', 'warning', 'error'];
    keys.forEach(type => {
      clone[type] = config => open(Object.assign(Object.assign({}, config), {
        type
      }));
    });
    return clone;
  }, []);
  // ============================== Return ===============================
  return [wrapAPI, /*#__PURE__*/_react.default.createElement(Holder, Object.assign({
    key: "notification-holder"
  }, notificationConfig, {
    ref: holderRef
  }))];
}
function useNotification(notificationConfig) {
  return useInternalNotification(notificationConfig);
}