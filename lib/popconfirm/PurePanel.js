"use strict";
"use client";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Overlay = void 0;
var React = _interopRequireWildcard(require("react"));
var _ExclamationCircleFilled = _interopRequireDefault(require("@ant-design/icons/ExclamationCircleFilled"));
var _classnames = _interopRequireDefault(require("classnames"));
var _ActionButton = _interopRequireDefault(require("../_util/ActionButton"));
var _getRenderPropValue = require("../_util/getRenderPropValue");
var _button = _interopRequireDefault(require("../button"));
var _buttonHelpers = require("../button/buttonHelpers");
var _configProvider = require("../config-provider");
var _locale = require("../locale");
var _en_US = _interopRequireDefault(require("../locale/en_US"));
var _PurePanel = _interopRequireDefault(require("../popover/PurePanel"));
var _style = _interopRequireDefault(require("./style"));
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const Overlay = props => {
  const {
    prefixCls,
    okButtonProps,
    cancelButtonProps,
    title,
    description,
    cancelText,
    okText,
    okType = 'primary',
    icon = /*#__PURE__*/React.createElement(_ExclamationCircleFilled.default, null),
    showCancel = true,
    close,
    onConfirm,
    onCancel,
    onPopupClick
  } = props;
  const {
    getPrefixCls
  } = React.useContext(_configProvider.ConfigContext);
  const [contextLocale] = (0, _locale.useLocale)('Popconfirm', _en_US.default.Popconfirm);
  const titleNode = (0, _getRenderPropValue.getRenderPropValue)(title);
  const descriptionNode = (0, _getRenderPropValue.getRenderPropValue)(description);
  return /*#__PURE__*/React.createElement("div", {
    className: `${prefixCls}-inner-content`,
    onClick: onPopupClick
  }, /*#__PURE__*/React.createElement("div", {
    className: `${prefixCls}-message`
  }, icon && /*#__PURE__*/React.createElement("span", {
    className: `${prefixCls}-message-icon`
  }, icon), /*#__PURE__*/React.createElement("div", {
    className: `${prefixCls}-message-text`
  }, titleNode && /*#__PURE__*/React.createElement("div", {
    className: `${prefixCls}-title`
  }, titleNode), descriptionNode && /*#__PURE__*/React.createElement("div", {
    className: `${prefixCls}-description`
  }, descriptionNode))), /*#__PURE__*/React.createElement("div", {
    className: `${prefixCls}-buttons`
  }, showCancel && (/*#__PURE__*/React.createElement(_button.default, Object.assign({
    onClick: onCancel,
    size: "small"
  }, cancelButtonProps), cancelText || (contextLocale === null || contextLocale === void 0 ? void 0 : contextLocale.cancelText))), /*#__PURE__*/React.createElement(_ActionButton.default, {
    buttonProps: Object.assign(Object.assign({
      size: 'small'
    }, (0, _buttonHelpers.convertLegacyProps)(okType)), okButtonProps),
    actionFn: onConfirm,
    close: close,
    prefixCls: getPrefixCls('btn'),
    quitOnNullishReturnValue: true,
    emitEvent: true
  }, okText || (contextLocale === null || contextLocale === void 0 ? void 0 : contextLocale.okText))));
};
exports.Overlay = Overlay;
const PurePanel = props => {
  const {
      prefixCls: customizePrefixCls,
      placement,
      className,
      style
    } = props,
    restProps = __rest(props, ["prefixCls", "placement", "className", "style"]);
  const {
    getPrefixCls
  } = React.useContext(_configProvider.ConfigContext);
  const prefixCls = getPrefixCls('popconfirm', customizePrefixCls);
  const [wrapCSSVar] = (0, _style.default)(prefixCls);
  return wrapCSSVar(/*#__PURE__*/React.createElement(_PurePanel.default, {
    placement: placement,
    className: (0, _classnames.default)(prefixCls, className),
    style: style,
    content: /*#__PURE__*/React.createElement(Overlay, Object.assign({
      prefixCls: prefixCls
    }, restProps))
  }));
};
var _default = exports.default = PurePanel;