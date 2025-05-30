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
var _raf = _interopRequireDefault(require("rc-util/lib/raf"));
var _ref = require("rc-util/lib/ref");
var _tooltip = _interopRequireDefault(require("../tooltip"));
const SliderTooltip = /*#__PURE__*/React.forwardRef((props, ref) => {
  const {
    open,
    draggingDelete,
    value
  } = props;
  const innerRef = (0, _react.useRef)(null);
  const mergedOpen = open && !draggingDelete;
  const rafRef = (0, _react.useRef)(null);
  function cancelKeepAlign() {
    _raf.default.cancel(rafRef.current);
    rafRef.current = null;
  }
  function keepAlign() {
    rafRef.current = (0, _raf.default)(() => {
      var _a;
      (_a = innerRef.current) === null || _a === void 0 ? void 0 : _a.forceAlign();
      rafRef.current = null;
    });
  }
  React.useEffect(() => {
    if (mergedOpen) {
      keepAlign();
    } else {
      cancelKeepAlign();
    }
    return cancelKeepAlign;
  }, [mergedOpen, props.title, value]);
  return /*#__PURE__*/React.createElement(_tooltip.default, Object.assign({
    ref: (0, _ref.composeRef)(innerRef, ref)
  }, props, {
    open: mergedOpen
  }));
});
if (process.env.NODE_ENV !== 'production') {
  SliderTooltip.displayName = 'SliderTooltip';
}
var _default = exports.default = SliderTooltip;