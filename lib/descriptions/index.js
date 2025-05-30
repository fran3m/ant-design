"use strict";
"use client";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "DescriptionsContext", {
  enumerable: true,
  get: function () {
    return _DescriptionsContext.default;
  }
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _responsiveObserver = require("../_util/responsiveObserver");
var _warning = require("../_util/warning");
var _context = require("../config-provider/context");
var _useSize = _interopRequireDefault(require("../config-provider/hooks/useSize"));
var _useBreakpoint = _interopRequireDefault(require("../grid/hooks/useBreakpoint"));
var _constant = _interopRequireDefault(require("./constant"));
var _DescriptionsContext = _interopRequireDefault(require("./DescriptionsContext"));
var _useItems = _interopRequireDefault(require("./hooks/useItems"));
var _useRow = _interopRequireDefault(require("./hooks/useRow"));
var _Item = _interopRequireDefault(require("./Item"));
var _Row = _interopRequireDefault(require("./Row"));
var _style = _interopRequireDefault(require("./style"));
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
/* eslint-disable react/no-array-index-key */

const Descriptions = props => {
  const {
      prefixCls: customizePrefixCls,
      title,
      extra,
      column,
      colon = true,
      bordered,
      layout,
      children,
      className,
      rootClassName,
      style,
      size: customizeSize,
      labelStyle,
      contentStyle,
      styles,
      items,
      classNames: descriptionsClassNames
    } = props,
    restProps = __rest(props, ["prefixCls", "title", "extra", "column", "colon", "bordered", "layout", "children", "className", "rootClassName", "style", "size", "labelStyle", "contentStyle", "styles", "items", "classNames"]);
  const {
    getPrefixCls,
    direction,
    className: contextClassName,
    style: contextStyle,
    classNames: contextClassNames,
    styles: contextStyles
  } = (0, _context.useComponentConfig)('descriptions');
  const prefixCls = getPrefixCls('descriptions', customizePrefixCls);
  const screens = (0, _useBreakpoint.default)();
  // ============================== Warn ==============================
  if (process.env.NODE_ENV !== 'production') {
    const warning = (0, _warning.devUseWarning)('Descriptions');
    [['labelStyle', 'styles={{ label: {} }}'], ['contentStyle', 'styles={{ content: {} }}']].forEach(_ref => {
      let [deprecatedName, newName] = _ref;
      warning.deprecated(!(deprecatedName in props), deprecatedName, newName);
    });
  }
  // Column count
  const mergedColumn = React.useMemo(() => {
    var _a;
    if (typeof column === 'number') {
      return column;
    }
    return (_a = (0, _responsiveObserver.matchScreen)(screens, Object.assign(Object.assign({}, _constant.default), column))) !== null && _a !== void 0 ? _a : 3;
  }, [screens, column]);
  // Items with responsive
  const mergedItems = (0, _useItems.default)(screens, items, children);
  const mergedSize = (0, _useSize.default)(customizeSize);
  const rows = (0, _useRow.default)(mergedColumn, mergedItems);
  const [wrapCSSVar, hashId, cssVarCls] = (0, _style.default)(prefixCls);
  // ======================== Render ========================
  const contextValue = React.useMemo(() => ({
    labelStyle,
    contentStyle,
    styles: {
      content: Object.assign(Object.assign({}, contextStyles.content), styles === null || styles === void 0 ? void 0 : styles.content),
      label: Object.assign(Object.assign({}, contextStyles.label), styles === null || styles === void 0 ? void 0 : styles.label)
    },
    classNames: {
      label: (0, _classnames.default)(contextClassNames.label, descriptionsClassNames === null || descriptionsClassNames === void 0 ? void 0 : descriptionsClassNames.label),
      content: (0, _classnames.default)(contextClassNames.content, descriptionsClassNames === null || descriptionsClassNames === void 0 ? void 0 : descriptionsClassNames.content)
    }
  }), [labelStyle, contentStyle, styles, descriptionsClassNames, contextClassNames, contextStyles]);
  return wrapCSSVar(/*#__PURE__*/React.createElement(_DescriptionsContext.default.Provider, {
    value: contextValue
  }, /*#__PURE__*/React.createElement("div", Object.assign({
    className: (0, _classnames.default)(prefixCls, contextClassName, contextClassNames.root, descriptionsClassNames === null || descriptionsClassNames === void 0 ? void 0 : descriptionsClassNames.root, {
      [`${prefixCls}-${mergedSize}`]: mergedSize && mergedSize !== 'default',
      [`${prefixCls}-bordered`]: !!bordered,
      [`${prefixCls}-rtl`]: direction === 'rtl'
    }, className, rootClassName, hashId, cssVarCls),
    style: Object.assign(Object.assign(Object.assign(Object.assign({}, contextStyle), contextStyles.root), styles === null || styles === void 0 ? void 0 : styles.root), style)
  }, restProps), (title || extra) && (/*#__PURE__*/React.createElement("div", {
    className: (0, _classnames.default)(`${prefixCls}-header`, contextClassNames.header, descriptionsClassNames === null || descriptionsClassNames === void 0 ? void 0 : descriptionsClassNames.header),
    style: Object.assign(Object.assign({}, contextStyles.header), styles === null || styles === void 0 ? void 0 : styles.header)
  }, title && (/*#__PURE__*/React.createElement("div", {
    className: (0, _classnames.default)(`${prefixCls}-title`, contextClassNames.title, descriptionsClassNames === null || descriptionsClassNames === void 0 ? void 0 : descriptionsClassNames.title),
    style: Object.assign(Object.assign({}, contextStyles.title), styles === null || styles === void 0 ? void 0 : styles.title)
  }, title)), extra && (/*#__PURE__*/React.createElement("div", {
    className: (0, _classnames.default)(`${prefixCls}-extra`, contextClassNames.extra, descriptionsClassNames === null || descriptionsClassNames === void 0 ? void 0 : descriptionsClassNames.extra),
    style: Object.assign(Object.assign({}, contextStyles.extra), styles === null || styles === void 0 ? void 0 : styles.extra)
  }, extra)))), /*#__PURE__*/React.createElement("div", {
    className: `${prefixCls}-view`
  }, /*#__PURE__*/React.createElement("table", null, /*#__PURE__*/React.createElement("tbody", null, rows.map((row, index) => (/*#__PURE__*/React.createElement(_Row.default, {
    key: index,
    index: index,
    colon: colon,
    prefixCls: prefixCls,
    vertical: layout === 'vertical',
    bordered: bordered,
    row: row
  })))))))));
};
if (process.env.NODE_ENV !== 'production') {
  Descriptions.displayName = 'Descriptions';
}
Descriptions.Item = _Item.default;
var _default = exports.default = Descriptions;