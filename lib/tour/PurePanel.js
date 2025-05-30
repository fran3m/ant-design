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
var _useClosable = _interopRequireDefault(require("../_util/hooks/useClosable"));
var _PurePanel = require("../_util/PurePanel");
var _reactNode = require("../_util/reactNode");
var _configProvider = require("../config-provider");
var _PurePanel2 = require("../popover/PurePanel");
var _panelRender = _interopRequireDefault(require("./panelRender"));
var _style = _interopRequireDefault(require("./style"));
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const PurePanel = props => {
  const {
      prefixCls: customizePrefixCls,
      current = 0,
      total = 6,
      className,
      style,
      type,
      closable,
      closeIcon
    } = props,
    restProps = __rest(props, ["prefixCls", "current", "total", "className", "style", "type", "closable", "closeIcon"]);
  const {
    getPrefixCls
  } = React.useContext(_configProvider.ConfigContext);
  const prefixCls = getPrefixCls('tour', customizePrefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = (0, _style.default)(prefixCls);
  const [mergedClosable, mergedCloseIcon] = (0, _useClosable.default)({
    closable,
    closeIcon
  }, null, {
    closable: true,
    closeIconRender: icon => /*#__PURE__*/React.isValidElement(icon) ? (0, _reactNode.cloneElement)(icon, {
      className: (0, _classnames.default)(icon.props.className, `${prefixCls}-close-icon`)
    }) : icon
  });
  return wrapCSSVar(/*#__PURE__*/React.createElement(_PurePanel2.RawPurePanel, {
    prefixCls: prefixCls,
    hashId: hashId,
    className: (0, _classnames.default)(className, `${prefixCls}-pure`, type && `${prefixCls}-${type}`, cssVarCls),
    style: style
  }, /*#__PURE__*/React.createElement(_panelRender.default, {
    stepProps: Object.assign(Object.assign({}, restProps), {
      prefixCls,
      total,
      closable: mergedClosable ? {
        closeIcon: mergedCloseIcon
      } : undefined
    }),
    current: current,
    type: type
  })));
};
var _default = exports.default = (0, _PurePanel.withPureRenderTheme)(PurePanel);