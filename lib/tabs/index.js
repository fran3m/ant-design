"use strict";
"use client";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _CloseOutlined = _interopRequireDefault(require("@ant-design/icons/CloseOutlined"));
var _EllipsisOutlined = _interopRequireDefault(require("@ant-design/icons/EllipsisOutlined"));
var _PlusOutlined = _interopRequireDefault(require("@ant-design/icons/PlusOutlined"));
var _classnames = _interopRequireDefault(require("classnames"));
var _rcTabs = _interopRequireDefault(require("rc-tabs"));
var _warning = require("../_util/warning");
var _configProvider = require("../config-provider");
var _useCSSVarCls = _interopRequireDefault(require("../config-provider/hooks/useCSSVarCls"));
var _useSize = _interopRequireDefault(require("../config-provider/hooks/useSize"));
var _useAnimateConfig = _interopRequireDefault(require("./hooks/useAnimateConfig"));
var _useLegacyItems = _interopRequireDefault(require("./hooks/useLegacyItems"));
var _style = _interopRequireDefault(require("./style"));
var _TabPane = _interopRequireDefault(require("./TabPane"));
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const Tabs = props => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
  const {
      type,
      className,
      rootClassName,
      size: customSize,
      onEdit,
      hideAdd,
      centered,
      addIcon,
      removeIcon,
      moreIcon,
      more,
      popupClassName,
      children,
      items,
      animated,
      style,
      indicatorSize,
      indicator,
      destroyInactiveTabPane,
      destroyOnHidden
    } = props,
    otherProps = __rest(props, ["type", "className", "rootClassName", "size", "onEdit", "hideAdd", "centered", "addIcon", "removeIcon", "moreIcon", "more", "popupClassName", "children", "items", "animated", "style", "indicatorSize", "indicator", "destroyInactiveTabPane", "destroyOnHidden"]);
  const {
    prefixCls: customizePrefixCls
  } = otherProps;
  const {
    direction,
    tabs,
    getPrefixCls,
    getPopupContainer
  } = React.useContext(_configProvider.ConfigContext);
  const prefixCls = getPrefixCls('tabs', customizePrefixCls);
  const rootCls = (0, _useCSSVarCls.default)(prefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = (0, _style.default)(prefixCls, rootCls);
  let editable;
  if (type === 'editable-card') {
    editable = {
      onEdit: (editType, _ref) => {
        let {
          key,
          event
        } = _ref;
        onEdit === null || onEdit === void 0 ? void 0 : onEdit(editType === 'add' ? event : key, editType);
      },
      removeIcon: (_a = removeIcon !== null && removeIcon !== void 0 ? removeIcon : tabs === null || tabs === void 0 ? void 0 : tabs.removeIcon) !== null && _a !== void 0 ? _a : /*#__PURE__*/React.createElement(_CloseOutlined.default, null),
      addIcon: (addIcon !== null && addIcon !== void 0 ? addIcon : tabs === null || tabs === void 0 ? void 0 : tabs.addIcon) || /*#__PURE__*/React.createElement(_PlusOutlined.default, null),
      showAdd: hideAdd !== true
    };
  }
  const rootPrefixCls = getPrefixCls();
  if (process.env.NODE_ENV !== 'production') {
    const warning = (0, _warning.devUseWarning)('Tabs');
    process.env.NODE_ENV !== "production" ? warning(!('onPrevClick' in props) && !('onNextClick' in props), 'breaking', '`onPrevClick` and `onNextClick` has been removed. Please use `onTabScroll` instead.') : void 0;
    process.env.NODE_ENV !== "production" ? warning(!(indicatorSize || (tabs === null || tabs === void 0 ? void 0 : tabs.indicatorSize)), 'deprecated', '`indicatorSize` has been deprecated. Please use `indicator={{ size: ... }}` instead.') : void 0;
    warning.deprecated(!('destroyInactiveTabPane' in props || (items === null || items === void 0 ? void 0 : items.some(item => 'destroyInactiveTabPane' in item))), 'destroyInactiveTabPane', 'destroyOnHidden');
  }
  const size = (0, _useSize.default)(customSize);
  const mergedItems = (0, _useLegacyItems.default)(items, children);
  const mergedAnimated = (0, _useAnimateConfig.default)(prefixCls, animated);
  const mergedStyle = Object.assign(Object.assign({}, tabs === null || tabs === void 0 ? void 0 : tabs.style), style);
  const mergedIndicator = {
    align: (_b = indicator === null || indicator === void 0 ? void 0 : indicator.align) !== null && _b !== void 0 ? _b : (_c = tabs === null || tabs === void 0 ? void 0 : tabs.indicator) === null || _c === void 0 ? void 0 : _c.align,
    size: (_g = (_e = (_d = indicator === null || indicator === void 0 ? void 0 : indicator.size) !== null && _d !== void 0 ? _d : indicatorSize) !== null && _e !== void 0 ? _e : (_f = tabs === null || tabs === void 0 ? void 0 : tabs.indicator) === null || _f === void 0 ? void 0 : _f.size) !== null && _g !== void 0 ? _g : tabs === null || tabs === void 0 ? void 0 : tabs.indicatorSize
  };
  return wrapCSSVar(/*#__PURE__*/React.createElement(_rcTabs.default, Object.assign({
    direction: direction,
    getPopupContainer: getPopupContainer
  }, otherProps, {
    items: mergedItems,
    className: (0, _classnames.default)({
      [`${prefixCls}-${size}`]: size,
      [`${prefixCls}-card`]: ['card', 'editable-card'].includes(type),
      [`${prefixCls}-editable-card`]: type === 'editable-card',
      [`${prefixCls}-centered`]: centered
    }, tabs === null || tabs === void 0 ? void 0 : tabs.className, className, rootClassName, hashId, cssVarCls, rootCls),
    popupClassName: (0, _classnames.default)(popupClassName, hashId, cssVarCls, rootCls),
    style: mergedStyle,
    editable: editable,
    more: Object.assign({
      icon: (_l = (_k = (_j = (_h = tabs === null || tabs === void 0 ? void 0 : tabs.more) === null || _h === void 0 ? void 0 : _h.icon) !== null && _j !== void 0 ? _j : tabs === null || tabs === void 0 ? void 0 : tabs.moreIcon) !== null && _k !== void 0 ? _k : moreIcon) !== null && _l !== void 0 ? _l : /*#__PURE__*/React.createElement(_EllipsisOutlined.default, null),
      transitionName: `${rootPrefixCls}-slide-up`
    }, more),
    prefixCls: prefixCls,
    animated: mergedAnimated,
    indicator: mergedIndicator,
    // TODO: In the future, destroyInactiveTabPane in rc-tabs needs to be upgrade to destroyOnHidden
    destroyInactiveTabPane: destroyOnHidden !== null && destroyOnHidden !== void 0 ? destroyOnHidden : destroyInactiveTabPane
  })));
};
Tabs.TabPane = _TabPane.default;
if (process.env.NODE_ENV !== 'production') {
  Tabs.displayName = 'Tabs';
}
var _default = exports.default = Tabs;