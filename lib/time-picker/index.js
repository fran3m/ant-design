"use strict";
"use client";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _PurePanel = _interopRequireDefault(require("../_util/PurePanel"));
var _warning = require("../_util/warning");
var _datePicker = _interopRequireDefault(require("../date-picker"));
var _useVariants = _interopRequireDefault(require("../form/hooks/useVariants"));
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const {
  TimePicker: InternalTimePicker,
  RangePicker: InternalRangePicker
} = _datePicker.default;
const RangePicker = /*#__PURE__*/React.forwardRef((props, ref) => (/*#__PURE__*/React.createElement(InternalRangePicker, Object.assign({}, props, {
  picker: "time",
  mode: undefined,
  ref: ref
}))));
const TimePicker = /*#__PURE__*/React.forwardRef((_a, ref) => {
  var {
      addon,
      renderExtraFooter,
      variant,
      bordered
    } = _a,
    restProps = __rest(_a, ["addon", "renderExtraFooter", "variant", "bordered"]);
  if (process.env.NODE_ENV !== 'production') {
    const warning = (0, _warning.devUseWarning)('TimePicker');
    warning.deprecated(!addon, 'addon', 'renderExtraFooter');
  }
  const [mergedVariant] = (0, _useVariants.default)('timePicker', variant, bordered);
  const internalRenderExtraFooter = React.useMemo(() => {
    if (renderExtraFooter) {
      return renderExtraFooter;
    }
    if (addon) {
      return addon;
    }
    return undefined;
  }, [addon, renderExtraFooter]);
  return /*#__PURE__*/React.createElement(InternalTimePicker, Object.assign({}, restProps, {
    mode: undefined,
    ref: ref,
    renderExtraFooter: internalRenderExtraFooter,
    variant: mergedVariant
  }));
});
if (process.env.NODE_ENV !== 'production') {
  TimePicker.displayName = 'TimePicker';
}
// We don't care debug panel
/* istanbul ignore next */
const PurePanel = (0, _PurePanel.default)(TimePicker, 'popupAlign', undefined, 'picker');
TimePicker._InternalPanelDoNotUseOrYouWillBeFired = PurePanel;
TimePicker.RangePicker = RangePicker;
TimePicker._InternalPanelDoNotUseOrYouWillBeFired = PurePanel;
var _default = exports.default = TimePicker;