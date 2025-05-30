"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prepareToken = exports.prepareComponentToken = exports.genModalMaskStyle = exports.default = void 0;
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _cssinjs = require("@ant-design/cssinjs");
var _style = require("../../grid/style");
var _style2 = require("../../style");
var _motion = require("../../style/motion");
var _internal = require("../../theme/internal");
function box(position) {
  return {
    position,
    inset: 0
  };
}
const genModalMaskStyle = token => {
  const {
    componentCls,
    antCls
  } = token;
  return [{
    [`${componentCls}-root`]: {
      [`${componentCls}${antCls}-zoom-enter, ${componentCls}${antCls}-zoom-appear`]: {
        // reset scale avoid mousePosition bug
        transform: 'none',
        opacity: 0,
        animationDuration: token.motionDurationSlow,
        // https://github.com/ant-design/ant-design/issues/11777
        userSelect: 'none'
      },
      // https://github.com/ant-design/ant-design/issues/37329
      // https://github.com/ant-design/ant-design/issues/40272
      [`${componentCls}${antCls}-zoom-leave ${componentCls}-content`]: {
        pointerEvents: 'none'
      },
      [`${componentCls}-mask`]: Object.assign(Object.assign({}, box('fixed')), {
        zIndex: token.zIndexPopupBase,
        height: '100%',
        backgroundColor: token.colorBgMask,
        pointerEvents: 'none',
        [`${componentCls}-hidden`]: {
          display: 'none'
        }
      }),
      [`${componentCls}-wrap`]: Object.assign(Object.assign({}, box('fixed')), {
        zIndex: token.zIndexPopupBase,
        overflow: 'auto',
        outline: 0,
        WebkitOverflowScrolling: 'touch'
      })
    }
  }, {
    [`${componentCls}-root`]: (0, _motion.initFadeMotion)(token)
  }];
};
exports.genModalMaskStyle = genModalMaskStyle;
const genModalStyle = token => {
  const {
    componentCls
  } = token;
  return [
  // ======================== Root =========================
  {
    [`${componentCls}-root`]: {
      [`${componentCls}-wrap-rtl`]: {
        direction: 'rtl'
      },
      [`${componentCls}-centered`]: {
        textAlign: 'center',
        '&::before': {
          display: 'inline-block',
          width: 0,
          height: '100%',
          verticalAlign: 'middle',
          content: '""'
        },
        [componentCls]: {
          top: 0,
          display: 'inline-block',
          paddingBottom: 0,
          textAlign: 'start',
          verticalAlign: 'middle'
        }
      },
      [`@media (max-width: ${token.screenSMMax}px)`]: {
        [componentCls]: {
          maxWidth: 'calc(100vw - 16px)',
          margin: `${(0, _cssinjs.unit)(token.marginXS)} auto`
        },
        [`${componentCls}-centered`]: {
          [componentCls]: {
            flex: 1
          }
        }
      }
    }
  },
  // ======================== Modal ========================
  {
    [componentCls]: Object.assign(Object.assign({}, (0, _style2.resetComponent)(token)), {
      pointerEvents: 'none',
      position: 'relative',
      top: 100,
      width: 'auto',
      maxWidth: `calc(100vw - ${(0, _cssinjs.unit)(token.calc(token.margin).mul(2).equal())})`,
      margin: '0 auto',
      paddingBottom: token.paddingLG,
      [`${componentCls}-title`]: {
        margin: 0,
        color: token.titleColor,
        fontWeight: token.fontWeightStrong,
        fontSize: token.titleFontSize,
        lineHeight: token.titleLineHeight,
        wordWrap: 'break-word'
      },
      [`${componentCls}-content`]: {
        position: 'relative',
        backgroundColor: token.contentBg,
        backgroundClip: 'padding-box',
        border: 0,
        borderRadius: token.borderRadiusLG,
        boxShadow: token.boxShadow,
        pointerEvents: 'auto',
        padding: token.contentPadding
      },
      [`${componentCls}-close`]: Object.assign({
        position: 'absolute',
        top: token.calc(token.modalHeaderHeight).sub(token.modalCloseBtnSize).div(2).equal(),
        insetInlineEnd: token.calc(token.modalHeaderHeight).sub(token.modalCloseBtnSize).div(2).equal(),
        zIndex: token.calc(token.zIndexPopupBase).add(10).equal(),
        padding: 0,
        color: token.modalCloseIconColor,
        fontWeight: token.fontWeightStrong,
        lineHeight: 1,
        textDecoration: 'none',
        background: 'transparent',
        borderRadius: token.borderRadiusSM,
        width: token.modalCloseBtnSize,
        height: token.modalCloseBtnSize,
        border: 0,
        outline: 0,
        cursor: 'pointer',
        transition: `color ${token.motionDurationMid}, background-color ${token.motionDurationMid}`,
        '&-x': {
          display: 'flex',
          fontSize: token.fontSizeLG,
          fontStyle: 'normal',
          lineHeight: (0, _cssinjs.unit)(token.modalCloseBtnSize),
          justifyContent: 'center',
          textTransform: 'none',
          textRendering: 'auto'
        },
        '&:disabled': {
          pointerEvents: 'none'
        },
        '&:hover': {
          color: token.modalCloseIconHoverColor,
          backgroundColor: token.colorBgTextHover,
          textDecoration: 'none'
        },
        '&:active': {
          backgroundColor: token.colorBgTextActive
        }
      }, (0, _style2.genFocusStyle)(token)),
      [`${componentCls}-header`]: {
        color: token.colorText,
        background: token.headerBg,
        borderRadius: `${(0, _cssinjs.unit)(token.borderRadiusLG)} ${(0, _cssinjs.unit)(token.borderRadiusLG)} 0 0`,
        marginBottom: token.headerMarginBottom,
        padding: token.headerPadding,
        borderBottom: token.headerBorderBottom
      },
      [`${componentCls}-body`]: {
        fontSize: token.fontSize,
        lineHeight: token.lineHeight,
        wordWrap: 'break-word',
        padding: token.bodyPadding,
        [`${componentCls}-body-skeleton`]: {
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: `${(0, _cssinjs.unit)(token.margin)} auto`
        }
      },
      [`${componentCls}-footer`]: {
        textAlign: 'end',
        background: token.footerBg,
        marginTop: token.footerMarginTop,
        padding: token.footerPadding,
        borderTop: token.footerBorderTop,
        borderRadius: token.footerBorderRadius,
        [`> ${token.antCls}-btn + ${token.antCls}-btn`]: {
          marginInlineStart: token.marginXS
        }
      },
      [`${componentCls}-open`]: {
        overflow: 'hidden'
      }
    })
  },
  // ======================== Pure =========================
  {
    [`${componentCls}-pure-panel`]: {
      top: 'auto',
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      [`${componentCls}-content,
          ${componentCls}-body,
          ${componentCls}-confirm-body-wrapper`]: {
        display: 'flex',
        flexDirection: 'column',
        flex: 'auto'
      },
      [`${componentCls}-confirm-body`]: {
        marginBottom: 'auto'
      }
    }
  }];
};
const genRTLStyle = token => {
  const {
    componentCls
  } = token;
  return {
    [`${componentCls}-root`]: {
      [`${componentCls}-wrap-rtl`]: {
        direction: 'rtl',
        [`${componentCls}-confirm-body`]: {
          direction: 'rtl'
        }
      }
    }
  };
};
const genResponsiveWidthStyle = token => {
  const {
    componentCls
  } = token;
  const gridMediaSizesMap = (0, _style.getMediaSize)(token);
  delete gridMediaSizesMap.xs;
  const responsiveStyles = Object.keys(gridMediaSizesMap).map(key => ({
    [`@media (min-width: ${(0, _cssinjs.unit)(gridMediaSizesMap[key])})`]: {
      width: `var(--${componentCls.replace('.', '')}-${key}-width)`
    }
  }));
  return {
    [`${componentCls}-root`]: {
      [componentCls]: [{
        width: `var(--${componentCls.replace('.', '')}-xs-width)`
      }].concat((0, _toConsumableArray2.default)(responsiveStyles))
    }
  };
};
// ============================== Export ==============================
const prepareToken = token => {
  const headerPaddingVertical = token.padding;
  const headerFontSize = token.fontSizeHeading5;
  const headerLineHeight = token.lineHeightHeading5;
  const modalToken = (0, _internal.mergeToken)(token, {
    modalHeaderHeight: token.calc(token.calc(headerLineHeight).mul(headerFontSize).equal()).add(token.calc(headerPaddingVertical).mul(2).equal()).equal(),
    modalFooterBorderColorSplit: token.colorSplit,
    modalFooterBorderStyle: token.lineType,
    modalFooterBorderWidth: token.lineWidth,
    modalCloseIconColor: token.colorIcon,
    modalCloseIconHoverColor: token.colorIconHover,
    modalCloseBtnSize: token.controlHeight,
    modalConfirmIconSize: token.fontHeight,
    modalTitleHeight: token.calc(token.titleFontSize).mul(token.titleLineHeight).equal()
  });
  return modalToken;
};
exports.prepareToken = prepareToken;
const prepareComponentToken = token => ({
  footerBg: 'transparent',
  headerBg: token.colorBgElevated,
  titleLineHeight: token.lineHeightHeading5,
  titleFontSize: token.fontSizeHeading5,
  contentBg: token.colorBgElevated,
  titleColor: token.colorTextHeading,
  // internal
  contentPadding: token.wireframe ? 0 : `${(0, _cssinjs.unit)(token.paddingMD)} ${(0, _cssinjs.unit)(token.paddingContentHorizontalLG)}`,
  headerPadding: token.wireframe ? `${(0, _cssinjs.unit)(token.padding)} ${(0, _cssinjs.unit)(token.paddingLG)}` : 0,
  headerBorderBottom: token.wireframe ? `${(0, _cssinjs.unit)(token.lineWidth)} ${token.lineType} ${token.colorSplit}` : 'none',
  headerMarginBottom: token.wireframe ? 0 : token.marginXS,
  bodyPadding: token.wireframe ? token.paddingLG : 0,
  footerPadding: token.wireframe ? `${(0, _cssinjs.unit)(token.paddingXS)} ${(0, _cssinjs.unit)(token.padding)}` : 0,
  footerBorderTop: token.wireframe ? `${(0, _cssinjs.unit)(token.lineWidth)} ${token.lineType} ${token.colorSplit}` : 'none',
  footerBorderRadius: token.wireframe ? `0 0 ${(0, _cssinjs.unit)(token.borderRadiusLG)} ${(0, _cssinjs.unit)(token.borderRadiusLG)}` : 0,
  footerMarginTop: token.wireframe ? 0 : token.marginSM,
  confirmBodyPadding: token.wireframe ? `${(0, _cssinjs.unit)(token.padding * 2)} ${(0, _cssinjs.unit)(token.padding * 2)} ${(0, _cssinjs.unit)(token.paddingLG)}` : 0,
  confirmIconMarginInlineEnd: token.wireframe ? token.margin : token.marginSM,
  confirmBtnsMarginTop: token.wireframe ? token.marginLG : token.marginSM
});
exports.prepareComponentToken = prepareComponentToken;
var _default = exports.default = (0, _internal.genStyleHooks)('Modal', token => {
  const modalToken = prepareToken(token);
  return [genModalStyle(modalToken), genRTLStyle(modalToken), genModalMaskStyle(modalToken), (0, _motion.initZoomMotion)(modalToken, 'zoom'), genResponsiveWidthStyle(modalToken)];
}, prepareComponentToken, {
  unitless: {
    titleLineHeight: true
  }
});