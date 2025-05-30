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
var _rcSelect = _interopRequireWildcard(require("rc-select"));
var _omit = _interopRequireDefault(require("rc-util/lib/omit"));
var _useZIndex = require("../_util/hooks/useZIndex");
var _motion = require("../_util/motion");
var _PurePanel = _interopRequireDefault(require("../_util/PurePanel"));
var _statusUtils = require("../_util/statusUtils");
var _warning = require("../_util/warning");
var _configProvider = require("../config-provider");
var _context = require("../config-provider/context");
var _defaultRenderEmpty = _interopRequireDefault(require("../config-provider/defaultRenderEmpty"));
var _DisabledContext = _interopRequireDefault(require("../config-provider/DisabledContext"));
var _useCSSVarCls = _interopRequireDefault(require("../config-provider/hooks/useCSSVarCls"));
var _useSize = _interopRequireDefault(require("../config-provider/hooks/useSize"));
var _context2 = require("../form/context");
var _useVariants = _interopRequireDefault(require("../form/hooks/useVariants"));
var _Compact = require("../space/Compact");
var _internal = require("../theme/internal");
var _mergedBuiltinPlacements = _interopRequireDefault(require("./mergedBuiltinPlacements"));
var _style = _interopRequireDefault(require("./style"));
var _useIcons = _interopRequireDefault(require("./useIcons"));
var _useShowArrow = _interopRequireDefault(require("./useShowArrow"));
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
// TODO: 4.0 - codemod should help to change `filterOption` to support node props.

const SECRET_COMBOBOX_MODE_DO_NOT_USE = 'SECRET_COMBOBOX_MODE_DO_NOT_USE';
const InternalSelect = (props, ref) => {
  var _a, _b, _c, _d, _e;
  const {
      prefixCls: customizePrefixCls,
      bordered,
      className,
      rootClassName,
      getPopupContainer,
      popupClassName,
      dropdownClassName,
      listHeight = 256,
      placement,
      listItemHeight: customListItemHeight,
      size: customizeSize,
      disabled: customDisabled,
      notFoundContent,
      status: customStatus,
      builtinPlacements,
      dropdownMatchSelectWidth,
      popupMatchSelectWidth,
      direction: propDirection,
      style,
      allowClear,
      variant: customizeVariant,
      dropdownStyle,
      transitionName,
      tagRender,
      maxCount,
      prefix,
      dropdownRender,
      popupRender,
      onDropdownVisibleChange,
      onOpenChange,
      styles,
      classNames
    } = props,
    rest = __rest(props, ["prefixCls", "bordered", "className", "rootClassName", "getPopupContainer", "popupClassName", "dropdownClassName", "listHeight", "placement", "listItemHeight", "size", "disabled", "notFoundContent", "status", "builtinPlacements", "dropdownMatchSelectWidth", "popupMatchSelectWidth", "direction", "style", "allowClear", "variant", "dropdownStyle", "transitionName", "tagRender", "maxCount", "prefix", "dropdownRender", "popupRender", "onDropdownVisibleChange", "onOpenChange", "styles", "classNames"]);
  const {
    getPopupContainer: getContextPopupContainer,
    getPrefixCls,
    renderEmpty,
    direction: contextDirection,
    virtual,
    popupMatchSelectWidth: contextPopupMatchSelectWidth,
    popupOverflow
  } = React.useContext(_configProvider.ConfigContext);
  const {
    showSearch,
    style: contextStyle,
    styles: contextStyles,
    className: contextClassName,
    classNames: contextClassNames
  } = (0, _context.useComponentConfig)('select');
  const [, token] = (0, _internal.useToken)();
  const listItemHeight = customListItemHeight !== null && customListItemHeight !== void 0 ? customListItemHeight : token === null || token === void 0 ? void 0 : token.controlHeight;
  const prefixCls = getPrefixCls('select', customizePrefixCls);
  const rootPrefixCls = getPrefixCls();
  const direction = propDirection !== null && propDirection !== void 0 ? propDirection : contextDirection;
  const {
    compactSize,
    compactItemClassnames
  } = (0, _Compact.useCompactItemContext)(prefixCls, direction);
  const [variant, enableVariantCls] = (0, _useVariants.default)('select', customizeVariant, bordered);
  const rootCls = (0, _useCSSVarCls.default)(prefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = (0, _style.default)(prefixCls, rootCls);
  const mode = React.useMemo(() => {
    const {
      mode: m
    } = props;
    if (m === 'combobox') {
      return undefined;
    }
    if (m === SECRET_COMBOBOX_MODE_DO_NOT_USE) {
      return 'combobox';
    }
    return m;
  }, [props.mode]);
  const isMultiple = mode === 'multiple' || mode === 'tags';
  const showSuffixIcon = (0, _useShowArrow.default)(props.suffixIcon, props.showArrow);
  const mergedPopupMatchSelectWidth = (_a = popupMatchSelectWidth !== null && popupMatchSelectWidth !== void 0 ? popupMatchSelectWidth : dropdownMatchSelectWidth) !== null && _a !== void 0 ? _a : contextPopupMatchSelectWidth;
  const mergedPopupStyle = ((_b = styles === null || styles === void 0 ? void 0 : styles.popup) === null || _b === void 0 ? void 0 : _b.root) || ((_c = contextStyles.popup) === null || _c === void 0 ? void 0 : _c.root) || dropdownStyle;
  const mergedPopupRender = popupRender || dropdownRender;
  const mergedOnOpenChange = onOpenChange || onDropdownVisibleChange;
  // ===================== Form Status =====================
  const {
    status: contextStatus,
    hasFeedback,
    isFormItemInput,
    feedbackIcon
  } = React.useContext(_context2.FormItemInputContext);
  const mergedStatus = (0, _statusUtils.getMergedStatus)(contextStatus, customStatus);
  // ===================== Empty =====================
  let mergedNotFound;
  if (notFoundContent !== undefined) {
    mergedNotFound = notFoundContent;
  } else if (mode === 'combobox') {
    mergedNotFound = null;
  } else {
    mergedNotFound = (renderEmpty === null || renderEmpty === void 0 ? void 0 : renderEmpty('Select')) || /*#__PURE__*/React.createElement(_defaultRenderEmpty.default, {
      componentName: "Select"
    });
  }
  // ===================== Icons =====================
  const {
    suffixIcon,
    itemIcon,
    removeIcon,
    clearIcon
  } = (0, _useIcons.default)(Object.assign(Object.assign({}, rest), {
    multiple: isMultiple,
    hasFeedback,
    feedbackIcon,
    showSuffixIcon,
    prefixCls,
    componentName: 'Select'
  }));
  const mergedAllowClear = allowClear === true ? {
    clearIcon
  } : allowClear;
  const selectProps = (0, _omit.default)(rest, ['suffixIcon', 'itemIcon']);
  const mergedPopupClassName = (0, _classnames.default)(((_d = classNames === null || classNames === void 0 ? void 0 : classNames.popup) === null || _d === void 0 ? void 0 : _d.root) || ((_e = contextClassNames === null || contextClassNames === void 0 ? void 0 : contextClassNames.popup) === null || _e === void 0 ? void 0 : _e.root) || popupClassName || dropdownClassName, {
    [`${prefixCls}-dropdown-${direction}`]: direction === 'rtl'
  }, rootClassName, contextClassNames.root, classNames === null || classNames === void 0 ? void 0 : classNames.root, cssVarCls, rootCls, hashId);
  const mergedSize = (0, _useSize.default)(ctx => {
    var _a;
    return (_a = customizeSize !== null && customizeSize !== void 0 ? customizeSize : compactSize) !== null && _a !== void 0 ? _a : ctx;
  });
  // ===================== Disabled =====================
  const disabled = React.useContext(_DisabledContext.default);
  const mergedDisabled = customDisabled !== null && customDisabled !== void 0 ? customDisabled : disabled;
  const mergedClassName = (0, _classnames.default)({
    [`${prefixCls}-lg`]: mergedSize === 'large',
    [`${prefixCls}-sm`]: mergedSize === 'small',
    [`${prefixCls}-rtl`]: direction === 'rtl',
    [`${prefixCls}-${variant}`]: enableVariantCls,
    [`${prefixCls}-in-form-item`]: isFormItemInput
  }, (0, _statusUtils.getStatusClassNames)(prefixCls, mergedStatus, hasFeedback), compactItemClassnames, contextClassName, className, contextClassNames.root, classNames === null || classNames === void 0 ? void 0 : classNames.root, rootClassName, cssVarCls, rootCls, hashId);
  // ===================== Placement =====================
  const memoPlacement = React.useMemo(() => {
    if (placement !== undefined) {
      return placement;
    }
    return direction === 'rtl' ? 'bottomRight' : 'bottomLeft';
  }, [placement, direction]);
  // ====================== Warning ======================
  if (process.env.NODE_ENV !== 'production') {
    const warning = (0, _warning.devUseWarning)('Select');
    const deprecatedProps = {
      dropdownMatchSelectWidth: 'popupMatchSelectWidth',
      dropdownStyle: 'styles.popup.root',
      dropdownClassName: 'classNames.popup.root',
      popupClassName: 'classNames.popup.root',
      dropdownRender: 'popupRender',
      onDropdownVisibleChange: 'onOpenChange',
      bordered: 'variant'
    };
    Object.entries(deprecatedProps).forEach(_ref => {
      let [oldProp, newProp] = _ref;
      warning.deprecated(!(oldProp in props), oldProp, newProp);
    });
    process.env.NODE_ENV !== "production" ? warning(!('showArrow' in props), 'deprecated', '`showArrow` is deprecated which will be removed in next major version. It will be a default behavior, you can hide it by setting `suffixIcon` to null.') : void 0;
    process.env.NODE_ENV !== "production" ? warning(!(typeof maxCount !== 'undefined' && !isMultiple), 'usage', '`maxCount` only works with mode `multiple` or `tags`') : void 0;
  }
  // ====================== zIndex =========================
  const [zIndex] = (0, _useZIndex.useZIndex)('SelectLike', mergedPopupStyle === null || mergedPopupStyle === void 0 ? void 0 : mergedPopupStyle.zIndex);
  // ====================== Render =======================
  return wrapCSSVar(/*#__PURE__*/React.createElement(_rcSelect.default, Object.assign({
    ref: ref,
    virtual: virtual,
    showSearch: showSearch
  }, selectProps, {
    style: Object.assign(Object.assign(Object.assign(Object.assign({}, contextStyles.root), styles === null || styles === void 0 ? void 0 : styles.root), contextStyle), style),
    dropdownMatchSelectWidth: mergedPopupMatchSelectWidth,
    transitionName: (0, _motion.getTransitionName)(rootPrefixCls, 'slide-up', transitionName),
    builtinPlacements: (0, _mergedBuiltinPlacements.default)(builtinPlacements, popupOverflow),
    listHeight: listHeight,
    listItemHeight: listItemHeight,
    mode: mode,
    prefixCls: prefixCls,
    placement: memoPlacement,
    direction: direction,
    prefix: prefix,
    suffixIcon: suffixIcon,
    menuItemSelectedIcon: itemIcon,
    removeIcon: removeIcon,
    allowClear: mergedAllowClear,
    notFoundContent: mergedNotFound,
    className: mergedClassName,
    getPopupContainer: getPopupContainer || getContextPopupContainer,
    dropdownClassName: mergedPopupClassName,
    disabled: mergedDisabled,
    dropdownStyle: Object.assign(Object.assign({}, mergedPopupStyle), {
      zIndex
    }),
    maxCount: isMultiple ? maxCount : undefined,
    tagRender: isMultiple ? tagRender : undefined,
    dropdownRender: mergedPopupRender,
    onDropdownVisibleChange: mergedOnOpenChange
  })));
};
if (process.env.NODE_ENV !== 'production') {
  InternalSelect.displayName = 'Select';
}
const Select = /*#__PURE__*/React.forwardRef(InternalSelect);
// We don't care debug panel
/* istanbul ignore next */
const PurePanel = (0, _PurePanel.default)(Select, 'dropdownAlign');
Select.SECRET_COMBOBOX_MODE_DO_NOT_USE = SECRET_COMBOBOX_MODE_DO_NOT_USE;
Select.Option = _rcSelect.Option;
Select.OptGroup = _rcSelect.OptGroup;
Select._InternalPanelDoNotUseOrYouWillBeFired = PurePanel;
if (process.env.NODE_ENV !== 'production') {
  Select.displayName = 'Select';
}
var _default = exports.default = Select;