"use strict";
"use client";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var React = _react;
var _EyeInvisibleOutlined = _interopRequireDefault(require("@ant-design/icons/EyeInvisibleOutlined"));
var _EyeOutlined = _interopRequireDefault(require("@ant-design/icons/EyeOutlined"));
var _classnames = _interopRequireDefault(require("classnames"));
var _omit = _interopRequireDefault(require("rc-util/lib/omit"));
var _ref = require("rc-util/lib/ref");
var _configProvider = require("../config-provider");
var _DisabledContext = _interopRequireDefault(require("../config-provider/DisabledContext"));
var _useRemovePasswordTimeout = _interopRequireDefault(require("./hooks/useRemovePasswordTimeout"));
var _Input = _interopRequireDefault(require("./Input"));
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const defaultIconRender = visible => visible ? /*#__PURE__*/React.createElement(_EyeOutlined.default, null) : /*#__PURE__*/React.createElement(_EyeInvisibleOutlined.default, null);
const actionMap = {
  click: 'onClick',
  hover: 'onMouseOver'
};
const Password = /*#__PURE__*/React.forwardRef((props, ref) => {
  const {
    disabled: customDisabled,
    action = 'click',
    visibilityToggle = true,
    iconRender = defaultIconRender
  } = props;
  // ===================== Disabled =====================
  const disabled = React.useContext(_DisabledContext.default);
  const mergedDisabled = customDisabled !== null && customDisabled !== void 0 ? customDisabled : disabled;
  const visibilityControlled = typeof visibilityToggle === 'object' && visibilityToggle.visible !== undefined;
  const [visible, setVisible] = (0, _react.useState)(() => visibilityControlled ? visibilityToggle.visible : false);
  const inputRef = (0, _react.useRef)(null);
  React.useEffect(() => {
    if (visibilityControlled) {
      setVisible(visibilityToggle.visible);
    }
  }, [visibilityControlled, visibilityToggle]);
  // Remove Password value
  const removePasswordTimeout = (0, _useRemovePasswordTimeout.default)(inputRef);
  const onVisibleChange = () => {
    var _a;
    if (mergedDisabled) {
      return;
    }
    if (visible) {
      removePasswordTimeout();
    }
    const nextVisible = !visible;
    setVisible(nextVisible);
    if (typeof visibilityToggle === 'object') {
      (_a = visibilityToggle.onVisibleChange) === null || _a === void 0 ? void 0 : _a.call(visibilityToggle, nextVisible);
    }
  };
  const getIcon = prefixCls => {
    const iconTrigger = actionMap[action] || '';
    const icon = iconRender(visible);
    const iconProps = {
      [iconTrigger]: onVisibleChange,
      className: `${prefixCls}-icon`,
      key: 'passwordIcon',
      onMouseDown: e => {
        // Prevent focused state lost
        // https://github.com/ant-design/ant-design/issues/15173
        e.preventDefault();
      },
      onMouseUp: e => {
        // Prevent caret position change
        // https://github.com/ant-design/ant-design/issues/23524
        e.preventDefault();
      }
    };
    return /*#__PURE__*/React.cloneElement(/*#__PURE__*/React.isValidElement(icon) ? icon : /*#__PURE__*/React.createElement("span", null, icon), iconProps);
  };
  const {
      className,
      prefixCls: customizePrefixCls,
      inputPrefixCls: customizeInputPrefixCls,
      size
    } = props,
    restProps = __rest(props, ["className", "prefixCls", "inputPrefixCls", "size"]);
  const {
    getPrefixCls
  } = React.useContext(_configProvider.ConfigContext);
  const inputPrefixCls = getPrefixCls('input', customizeInputPrefixCls);
  const prefixCls = getPrefixCls('input-password', customizePrefixCls);
  const suffixIcon = visibilityToggle && getIcon(prefixCls);
  const inputClassName = (0, _classnames.default)(prefixCls, className, {
    [`${prefixCls}-${size}`]: !!size
  });
  const omittedProps = Object.assign(Object.assign({}, (0, _omit.default)(restProps, ['suffix', 'iconRender', 'visibilityToggle'])), {
    type: visible ? 'text' : 'password',
    className: inputClassName,
    prefixCls: inputPrefixCls,
    suffix: suffixIcon
  });
  if (size) {
    omittedProps.size = size;
  }
  return /*#__PURE__*/React.createElement(_Input.default, Object.assign({
    ref: (0, _ref.composeRef)(ref, inputRef)
  }, omittedProps));
});
if (process.env.NODE_ENV !== 'production') {
  Password.displayName = 'Input.Password';
}
var _default = exports.default = Password;