"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prepareComponentToken = exports.default = void 0;
var _cssinjs = require("@ant-design/cssinjs");
var _style = require("../../style");
var _internal = require("../../theme/internal");
const genRateStarStyle = token => {
  const {
    componentCls
  } = token;
  return {
    [`${componentCls}-star`]: {
      position: 'relative',
      display: 'inline-block',
      color: 'inherit',
      cursor: 'pointer',
      '&:not(:last-child)': {
        marginInlineEnd: token.marginXS
      },
      '> div': {
        transition: `all ${token.motionDurationMid}, outline 0s`,
        '&:hover': {
          transform: token.starHoverScale
        },
        '&:focus': {
          outline: 0
        },
        '&:focus-visible': {
          outline: `${(0, _cssinjs.unit)(token.lineWidth)} dashed ${token.starColor}`,
          transform: token.starHoverScale
        }
      },
      '&-first, &-second': {
        color: token.starBg,
        transition: `all ${token.motionDurationMid}`,
        userSelect: 'none'
      },
      '&-first': {
        position: 'absolute',
        top: 0,
        insetInlineStart: 0,
        width: '50%',
        height: '100%',
        overflow: 'hidden',
        opacity: 0
      },
      [`&-half ${componentCls}-star-first, &-half ${componentCls}-star-second`]: {
        opacity: 1
      },
      [`&-half ${componentCls}-star-first, &-full ${componentCls}-star-second`]: {
        color: 'inherit'
      }
    }
  };
};
const genRateRtlStyle = token => ({
  [`&-rtl${token.componentCls}`]: {
    direction: 'rtl'
  }
});
const genRateStyle = token => {
  const {
    componentCls
  } = token;
  return {
    [componentCls]: Object.assign(Object.assign(Object.assign(Object.assign({}, (0, _style.resetComponent)(token)), {
      display: 'inline-block',
      margin: 0,
      padding: 0,
      color: token.starColor,
      fontSize: token.starSize,
      lineHeight: 1,
      listStyle: 'none',
      outline: 'none',
      // disable styles
      [`&-disabled${componentCls} ${componentCls}-star`]: {
        cursor: 'default',
        '> div:hover': {
          transform: 'scale(1)'
        }
      }
    }), genRateStarStyle(token)), genRateRtlStyle(token))
  };
};
// ============================== Export ==============================
const prepareComponentToken = token => ({
  starColor: token.yellow6,
  starSize: token.controlHeightLG * 0.5,
  starHoverScale: 'scale(1.1)',
  starBg: token.colorFillContent
});
exports.prepareComponentToken = prepareComponentToken;
var _default = exports.default = (0, _internal.genStyleHooks)('Rate', token => {
  const rateToken = (0, _internal.mergeToken)(token, {});
  return [genRateStyle(rateToken)];
}, prepareComponentToken);