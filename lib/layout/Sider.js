"use strict";
"use client";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.SiderContext = void 0;
var _react = _interopRequireWildcard(require("react"));
var React = _react;
var _BarsOutlined = _interopRequireDefault(require("@ant-design/icons/BarsOutlined"));
var _LeftOutlined = _interopRequireDefault(require("@ant-design/icons/LeftOutlined"));
var _RightOutlined = _interopRequireDefault(require("@ant-design/icons/RightOutlined"));
var _classnames = _interopRequireDefault(require("classnames"));
var _omit = _interopRequireDefault(require("rc-util/lib/omit"));
var _mediaQueryUtil = require("../_util/mediaQueryUtil");
var _configProvider = require("../config-provider");
var _context = require("./context");
var _sider = _interopRequireDefault(require("./style/sider"));
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const dimensionMaxMap = {
  xs: '479.98px',
  sm: '575.98px',
  md: '767.98px',
  lg: '991.98px',
  xl: '1199.98px',
  xxl: '1599.98px'
};
const isNumeric = value => !Number.isNaN(Number.parseFloat(value)) && isFinite(value);
const SiderContext = exports.SiderContext = /*#__PURE__*/React.createContext({});
const generateId = (() => {
  let i = 0;
  return function () {
    let prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    i += 1;
    return `${prefix}${i}`;
  };
})();
const Sider = /*#__PURE__*/React.forwardRef((props, ref) => {
  const {
      prefixCls: customizePrefixCls,
      className,
      trigger,
      children,
      defaultCollapsed = false,
      theme = 'dark',
      style = {},
      collapsible = false,
      reverseArrow = false,
      width = 200,
      collapsedWidth = 80,
      zeroWidthTriggerStyle,
      breakpoint,
      onCollapse,
      onBreakpoint
    } = props,
    otherProps = __rest(props, ["prefixCls", "className", "trigger", "children", "defaultCollapsed", "theme", "style", "collapsible", "reverseArrow", "width", "collapsedWidth", "zeroWidthTriggerStyle", "breakpoint", "onCollapse", "onBreakpoint"]);
  const {
    siderHook
  } = (0, _react.useContext)(_context.LayoutContext);
  const [collapsed, setCollapsed] = (0, _react.useState)('collapsed' in props ? props.collapsed : defaultCollapsed);
  const [below, setBelow] = (0, _react.useState)(false);
  (0, _react.useEffect)(() => {
    if ('collapsed' in props) {
      setCollapsed(props.collapsed);
    }
  }, [props.collapsed]);
  const handleSetCollapsed = (value, type) => {
    if (!('collapsed' in props)) {
      setCollapsed(value);
    }
    onCollapse === null || onCollapse === void 0 ? void 0 : onCollapse(value, type);
  };
  // =========================== Prefix ===========================
  const {
    getPrefixCls,
    direction
  } = (0, _react.useContext)(_configProvider.ConfigContext);
  const prefixCls = getPrefixCls('layout-sider', customizePrefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = (0, _sider.default)(prefixCls);
  // ========================= Responsive =========================
  const responsiveHandlerRef = (0, _react.useRef)(null);
  responsiveHandlerRef.current = mql => {
    setBelow(mql.matches);
    onBreakpoint === null || onBreakpoint === void 0 ? void 0 : onBreakpoint(mql.matches);
    if (collapsed !== mql.matches) {
      handleSetCollapsed(mql.matches, 'responsive');
    }
  };
  (0, _react.useEffect)(() => {
    function responsiveHandler(mql) {
      var _a;
      return (_a = responsiveHandlerRef.current) === null || _a === void 0 ? void 0 : _a.call(responsiveHandlerRef, mql);
    }
    let mql;
    if (typeof (window === null || window === void 0 ? void 0 : window.matchMedia) !== 'undefined' && breakpoint && breakpoint in dimensionMaxMap) {
      mql = window.matchMedia(`screen and (max-width: ${dimensionMaxMap[breakpoint]})`);
      (0, _mediaQueryUtil.addMediaQueryListener)(mql, responsiveHandler);
      responsiveHandler(mql);
    }
    return () => {
      (0, _mediaQueryUtil.removeMediaQueryListener)(mql, responsiveHandler);
    };
  }, [breakpoint]); // in order to accept dynamic 'breakpoint' property, we need to add 'breakpoint' into dependency array.
  (0, _react.useEffect)(() => {
    const uniqueId = generateId('ant-sider-');
    siderHook.addSider(uniqueId);
    return () => siderHook.removeSider(uniqueId);
  }, []);
  const toggle = () => {
    handleSetCollapsed(!collapsed, 'clickTrigger');
  };
  const divProps = (0, _omit.default)(otherProps, ['collapsed']);
  const rawWidth = collapsed ? collapsedWidth : width;
  // use "px" as fallback unit for width
  const siderWidth = isNumeric(rawWidth) ? `${rawWidth}px` : String(rawWidth);
  // special trigger when collapsedWidth == 0
  const zeroWidthTrigger = parseFloat(String(collapsedWidth || 0)) === 0 ? (/*#__PURE__*/React.createElement("span", {
    onClick: toggle,
    className: (0, _classnames.default)(`${prefixCls}-zero-width-trigger`, `${prefixCls}-zero-width-trigger-${reverseArrow ? 'right' : 'left'}`),
    style: zeroWidthTriggerStyle
  }, trigger || /*#__PURE__*/React.createElement(_BarsOutlined.default, null))) : null;
  const reverseIcon = direction === 'rtl' === !reverseArrow;
  const iconObj = {
    expanded: reverseIcon ? /*#__PURE__*/React.createElement(_RightOutlined.default, null) : /*#__PURE__*/React.createElement(_LeftOutlined.default, null),
    collapsed: reverseIcon ? /*#__PURE__*/React.createElement(_LeftOutlined.default, null) : /*#__PURE__*/React.createElement(_RightOutlined.default, null)
  };
  const status = collapsed ? 'collapsed' : 'expanded';
  const defaultTrigger = iconObj[status];
  const triggerDom = trigger !== null ? zeroWidthTrigger || (/*#__PURE__*/React.createElement("div", {
    className: `${prefixCls}-trigger`,
    onClick: toggle,
    style: {
      width: siderWidth
    }
  }, trigger || defaultTrigger)) : null;
  const divStyle = Object.assign(Object.assign({}, style), {
    flex: `0 0 ${siderWidth}`,
    maxWidth: siderWidth,
    minWidth: siderWidth,
    width: siderWidth
  });
  const siderCls = (0, _classnames.default)(prefixCls, `${prefixCls}-${theme}`, {
    [`${prefixCls}-collapsed`]: !!collapsed,
    [`${prefixCls}-has-trigger`]: collapsible && trigger !== null && !zeroWidthTrigger,
    [`${prefixCls}-below`]: !!below,
    [`${prefixCls}-zero-width`]: parseFloat(siderWidth) === 0
  }, className, hashId, cssVarCls);
  const contextValue = React.useMemo(() => ({
    siderCollapsed: collapsed
  }), [collapsed]);
  return wrapCSSVar(/*#__PURE__*/React.createElement(SiderContext.Provider, {
    value: contextValue
  }, /*#__PURE__*/React.createElement("aside", Object.assign({
    className: siderCls
  }, divProps, {
    style: divStyle,
    ref: ref
  }), /*#__PURE__*/React.createElement("div", {
    className: `${prefixCls}-children`
  }, children), collapsible || below && zeroWidthTrigger ? triggerDom : null)));
});
if (process.env.NODE_ENV !== 'production') {
  Sider.displayName = 'Sider';
}
var _default = exports.default = Sider;