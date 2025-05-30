"use strict";
"use client";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Option = void 0;
var React = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _rcMentions = _interopRequireDefault(require("rc-mentions"));
var _ref = require("rc-util/lib/ref");
var _getAllowClear = _interopRequireDefault(require("../_util/getAllowClear"));
var _PurePanel = _interopRequireDefault(require("../_util/PurePanel"));
var _statusUtils = require("../_util/statusUtils");
var _toList = _interopRequireDefault(require("../_util/toList"));
var _warning = require("../_util/warning");
var _configProvider = require("../config-provider");
var _defaultRenderEmpty = _interopRequireDefault(require("../config-provider/defaultRenderEmpty"));
var _useCSSVarCls = _interopRequireDefault(require("../config-provider/hooks/useCSSVarCls"));
var _context = require("../form/context");
var _useVariants = _interopRequireDefault(require("../form/hooks/useVariants"));
var _spin = _interopRequireDefault(require("../spin"));
var _style = _interopRequireDefault(require("./style"));
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const {
  Option
} = _rcMentions.default;
exports.Option = Option;
function loadingFilterOption() {
  return true;
}
const InternalMentions = /*#__PURE__*/React.forwardRef((props, ref) => {
  const {
      prefixCls: customizePrefixCls,
      className,
      rootClassName,
      disabled,
      loading,
      filterOption,
      children,
      notFoundContent,
      options,
      status: customStatus,
      allowClear = false,
      popupClassName,
      style,
      variant: customVariant
    } = props,
    restProps = __rest(props, ["prefixCls", "className", "rootClassName", "disabled", "loading", "filterOption", "children", "notFoundContent", "options", "status", "allowClear", "popupClassName", "style", "variant"]);
  const [focused, setFocused] = React.useState(false);
  const innerRef = React.useRef(null);
  const mergedRef = (0, _ref.composeRef)(ref, innerRef);
  // =================== Warning =====================
  if (process.env.NODE_ENV !== 'production') {
    const warning = (0, _warning.devUseWarning)('Mentions');
    warning.deprecated(!children, 'Mentions.Option', 'options');
  }
  const {
    getPrefixCls,
    renderEmpty,
    direction,
    mentions: contextMentions
  } = React.useContext(_configProvider.ConfigContext);
  const {
    status: contextStatus,
    hasFeedback,
    feedbackIcon
  } = React.useContext(_context.FormItemInputContext);
  const mergedStatus = (0, _statusUtils.getMergedStatus)(contextStatus, customStatus);
  const onFocus = function () {
    if (restProps.onFocus) {
      restProps.onFocus.apply(restProps, arguments);
    }
    setFocused(true);
  };
  const onBlur = function () {
    if (restProps.onBlur) {
      restProps.onBlur.apply(restProps, arguments);
    }
    setFocused(false);
  };
  const notFoundContentEle = React.useMemo(() => {
    if (notFoundContent !== undefined) {
      return notFoundContent;
    }
    return (renderEmpty === null || renderEmpty === void 0 ? void 0 : renderEmpty('Select')) || /*#__PURE__*/React.createElement(_defaultRenderEmpty.default, {
      componentName: "Select"
    });
  }, [notFoundContent, renderEmpty]);
  const mentionOptions = React.useMemo(() => {
    if (loading) {
      return /*#__PURE__*/React.createElement(Option, {
        value: "ANTD_SEARCHING",
        disabled: true
      }, /*#__PURE__*/React.createElement(_spin.default, {
        size: "small"
      }));
    }
    return children;
  }, [loading, children]);
  const mergedOptions = loading ? [{
    value: 'ANTD_SEARCHING',
    disabled: true,
    label: /*#__PURE__*/React.createElement(_spin.default, {
      size: "small"
    })
  }] : options;
  const mentionsfilterOption = loading ? loadingFilterOption : filterOption;
  const prefixCls = getPrefixCls('mentions', customizePrefixCls);
  const mergedAllowClear = (0, _getAllowClear.default)(allowClear);
  // Style
  const rootCls = (0, _useCSSVarCls.default)(prefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = (0, _style.default)(prefixCls, rootCls);
  const [variant, enableVariantCls] = (0, _useVariants.default)('mentions', customVariant);
  const suffixNode = hasFeedback && /*#__PURE__*/React.createElement(React.Fragment, null, feedbackIcon);
  const mergedClassName = (0, _classnames.default)(contextMentions === null || contextMentions === void 0 ? void 0 : contextMentions.className, className, rootClassName, cssVarCls, rootCls);
  const mentions = /*#__PURE__*/React.createElement(_rcMentions.default, Object.assign({
    silent: loading,
    prefixCls: prefixCls,
    notFoundContent: notFoundContentEle,
    className: mergedClassName,
    disabled: disabled,
    allowClear: mergedAllowClear,
    direction: direction,
    style: Object.assign(Object.assign({}, contextMentions === null || contextMentions === void 0 ? void 0 : contextMentions.style), style)
  }, restProps, {
    filterOption: mentionsfilterOption,
    onFocus: onFocus,
    onBlur: onBlur,
    dropdownClassName: (0, _classnames.default)(popupClassName, rootClassName, hashId, cssVarCls, rootCls),
    ref: mergedRef,
    options: mergedOptions,
    suffix: suffixNode,
    classNames: {
      mentions: (0, _classnames.default)({
        [`${prefixCls}-disabled`]: disabled,
        [`${prefixCls}-focused`]: focused,
        [`${prefixCls}-rtl`]: direction === 'rtl'
      }, hashId),
      variant: (0, _classnames.default)({
        [`${prefixCls}-${variant}`]: enableVariantCls
      }, (0, _statusUtils.getStatusClassNames)(prefixCls, mergedStatus)),
      affixWrapper: hashId
    }
  }), mentionOptions);
  return wrapCSSVar(mentions);
});
const Mentions = InternalMentions;
if (process.env.NODE_ENV !== 'production') {
  Mentions.displayName = 'Mentions';
}
Mentions.Option = Option;
// We don't care debug panel
/* istanbul ignore next */
const PurePanel = (0, _PurePanel.default)(Mentions, undefined, undefined, 'mentions');
Mentions._InternalPanelDoNotUseOrYouWillBeFired = PurePanel;
Mentions.getMentions = function () {
  let value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  let config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const {
    prefix = '@',
    split = ' '
  } = config;
  const prefixList = (0, _toList.default)(prefix);
  return value.split(split).map(function () {
    let str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    let hitPrefix = null;
    prefixList.some(prefixStr => {
      const startStr = str.slice(0, prefixStr.length);
      if (startStr === prefixStr) {
        hitPrefix = prefixStr;
        return true;
      }
      return false;
    });
    if (hitPrefix !== null) {
      return {
        prefix: hitPrefix,
        value: str.slice(hitPrefix.length)
      };
    }
    return null;
  }).filter(entity => !!entity && !!entity.value);
};
var _default = exports.default = Mentions;