"use strict";
"use client";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _rcCheckbox = _interopRequireDefault(require("rc-checkbox"));
var _ref = require("rc-util/lib/ref");
var _warning = require("../_util/warning");
var _wave = _interopRequireDefault(require("../_util/wave"));
var _interface = require("../_util/wave/interface");
var _useBubbleLock = _interopRequireDefault(require("../checkbox/useBubbleLock"));
var _configProvider = require("../config-provider");
var _DisabledContext = _interopRequireDefault(require("../config-provider/DisabledContext"));
var _useCSSVarCls = _interopRequireDefault(require("../config-provider/hooks/useCSSVarCls"));
var _context = require("../form/context");
var _context2 = _interopRequireWildcard(require("./context"));
var _style = _interopRequireDefault(require("./style"));
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const InternalRadio = (props, ref) => {
  var _a, _b;
  const groupContext = React.useContext(_context2.default);
  const radioOptionTypeContext = React.useContext(_context2.RadioOptionTypeContext);
  const {
    getPrefixCls,
    direction,
    radio
  } = React.useContext(_configProvider.ConfigContext);
  const innerRef = React.useRef(null);
  const mergedRef = (0, _ref.composeRef)(ref, innerRef);
  const {
    isFormItemInput
  } = React.useContext(_context.FormItemInputContext);
  if (process.env.NODE_ENV !== 'production') {
    const warning = (0, _warning.devUseWarning)('Radio');
    process.env.NODE_ENV !== "production" ? warning(!('optionType' in props), 'usage', '`optionType` is only support in Radio.Group.') : void 0;
  }
  const onChange = e => {
    var _a, _b;
    (_a = props.onChange) === null || _a === void 0 ? void 0 : _a.call(props, e);
    (_b = groupContext === null || groupContext === void 0 ? void 0 : groupContext.onChange) === null || _b === void 0 ? void 0 : _b.call(groupContext, e);
  };
  const {
      prefixCls: customizePrefixCls,
      className,
      rootClassName,
      children,
      style,
      title
    } = props,
    restProps = __rest(props, ["prefixCls", "className", "rootClassName", "children", "style", "title"]);
  const radioPrefixCls = getPrefixCls('radio', customizePrefixCls);
  const isButtonType = ((groupContext === null || groupContext === void 0 ? void 0 : groupContext.optionType) || radioOptionTypeContext) === 'button';
  const prefixCls = isButtonType ? `${radioPrefixCls}-button` : radioPrefixCls;
  // Style
  const rootCls = (0, _useCSSVarCls.default)(radioPrefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = (0, _style.default)(radioPrefixCls, rootCls);
  const radioProps = Object.assign({}, restProps);
  // ===================== Disabled =====================
  const disabled = React.useContext(_DisabledContext.default);
  if (groupContext) {
    radioProps.name = groupContext.name;
    radioProps.onChange = onChange;
    radioProps.checked = props.value === groupContext.value;
    radioProps.disabled = (_a = radioProps.disabled) !== null && _a !== void 0 ? _a : groupContext.disabled;
  }
  radioProps.disabled = (_b = radioProps.disabled) !== null && _b !== void 0 ? _b : disabled;
  const wrapperClassString = (0, _classnames.default)(`${prefixCls}-wrapper`, {
    [`${prefixCls}-wrapper-checked`]: radioProps.checked,
    [`${prefixCls}-wrapper-disabled`]: radioProps.disabled,
    [`${prefixCls}-wrapper-rtl`]: direction === 'rtl',
    [`${prefixCls}-wrapper-in-form-item`]: isFormItemInput,
    [`${prefixCls}-wrapper-block`]: !!(groupContext === null || groupContext === void 0 ? void 0 : groupContext.block)
  }, radio === null || radio === void 0 ? void 0 : radio.className, className, rootClassName, hashId, cssVarCls, rootCls);
  // ============================ Event Lock ============================
  const [onLabelClick, onInputClick] = (0, _useBubbleLock.default)(radioProps.onClick);
  // ============================== Render ==============================
  return wrapCSSVar(/*#__PURE__*/React.createElement(_wave.default, {
    component: "Radio",
    disabled: radioProps.disabled
  }, /*#__PURE__*/React.createElement("label", {
    className: wrapperClassString,
    style: Object.assign(Object.assign({}, radio === null || radio === void 0 ? void 0 : radio.style), style),
    onMouseEnter: props.onMouseEnter,
    onMouseLeave: props.onMouseLeave,
    title: title,
    onClick: onLabelClick
  }, /*#__PURE__*/React.createElement(_rcCheckbox.default, Object.assign({}, radioProps, {
    className: (0, _classnames.default)(radioProps.className, {
      [_interface.TARGET_CLS]: !isButtonType
    }),
    type: "radio",
    prefixCls: prefixCls,
    ref: mergedRef,
    onClick: onInputClick
  })), children !== undefined ? /*#__PURE__*/React.createElement("span", {
    className: `${prefixCls}-label`
  }, children) : null)));
};
const Radio = /*#__PURE__*/React.forwardRef(InternalRadio);
if (process.env.NODE_ENV !== 'production') {
  Radio.displayName = 'Radio';
}
var _default = exports.default = Radio;