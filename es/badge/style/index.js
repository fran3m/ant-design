import { Keyframes, unit } from '@ant-design/cssinjs';
import { resetComponent } from '../../style';
import { genPresetColor, genStyleHooks, mergeToken } from '../../theme/internal';
const antStatusProcessing = new Keyframes('antStatusProcessing', {
  '0%': {
    transform: 'scale(0.8)',
    opacity: 0.5
  },
  '100%': {
    transform: 'scale(2.4)',
    opacity: 0
  }
});
const antZoomBadgeIn = new Keyframes('antZoomBadgeIn', {
  '0%': {
    transform: 'scale(0) translate(50%, -50%)',
    opacity: 0
  },
  '100%': {
    transform: 'scale(1) translate(50%, -50%)'
  }
});
const antZoomBadgeOut = new Keyframes('antZoomBadgeOut', {
  '0%': {
    transform: 'scale(1) translate(50%, -50%)'
  },
  '100%': {
    transform: 'scale(0) translate(50%, -50%)',
    opacity: 0
  }
});
const antNoWrapperZoomBadgeIn = new Keyframes('antNoWrapperZoomBadgeIn', {
  '0%': {
    transform: 'scale(0)',
    opacity: 0
  },
  '100%': {
    transform: 'scale(1)'
  }
});
const antNoWrapperZoomBadgeOut = new Keyframes('antNoWrapperZoomBadgeOut', {
  '0%': {
    transform: 'scale(1)'
  },
  '100%': {
    transform: 'scale(0)',
    opacity: 0
  }
});
const antBadgeLoadingCircle = new Keyframes('antBadgeLoadingCircle', {
  '0%': {
    transformOrigin: '50%'
  },
  '100%': {
    transform: 'translate(50%, -50%) rotate(360deg)',
    transformOrigin: '50%'
  }
});
const genSharedBadgeStyle = token => {
  const {
    componentCls,
    iconCls,
    antCls,
    badgeShadowSize,
    textFontSize,
    textFontSizeSM,
    statusSize,
    dotSize,
    textFontWeight,
    indicatorHeight,
    indicatorHeightSM,
    marginXS,
    calc
  } = token;
  const numberPrefixCls = `${antCls}-scroll-number`;
  const colorPreset = genPresetColor(token, (colorKey, _ref) => {
    let {
      darkColor
    } = _ref;
    return {
      [`&${componentCls} ${componentCls}-color-${colorKey}`]: {
        background: darkColor,
        [`&:not(${componentCls}-count)`]: {
          color: darkColor
        },
        'a:hover &': {
          background: darkColor
        }
      }
    };
  });
  return {
    [componentCls]: Object.assign(Object.assign(Object.assign(Object.assign({}, resetComponent(token)), {
      position: 'relative',
      display: 'inline-block',
      width: 'fit-content',
      lineHeight: 1,
      [`${componentCls}-count`]: {
        display: 'inline-flex',
        justifyContent: 'center',
        zIndex: token.indicatorZIndex,
        minWidth: indicatorHeight,
        height: indicatorHeight,
        color: token.badgeTextColor,
        fontWeight: textFontWeight,
        fontSize: textFontSize,
        lineHeight: unit(indicatorHeight),
        whiteSpace: 'nowrap',
        textAlign: 'center',
        background: token.badgeColor,
        borderRadius: calc(indicatorHeight).div(2).equal(),
        boxShadow: `0 0 0 ${unit(badgeShadowSize)} ${token.badgeShadowColor}`,
        transition: `background ${token.motionDurationMid}`,
        a: {
          color: token.badgeTextColor
        },
        'a:hover': {
          color: token.badgeTextColor
        },
        'a:hover &': {
          background: token.badgeColorHover
        }
      },
      [`${componentCls}-count-sm`]: {
        minWidth: indicatorHeightSM,
        height: indicatorHeightSM,
        fontSize: textFontSizeSM,
        lineHeight: unit(indicatorHeightSM),
        borderRadius: calc(indicatorHeightSM).div(2).equal()
      },
      [`${componentCls}-multiple-words`]: {
        padding: `0 ${unit(token.paddingXS)}`,
        bdi: {
          unicodeBidi: 'plaintext'
        }
      },
      [`${componentCls}-dot`]: {
        zIndex: token.indicatorZIndex,
        width: dotSize,
        minWidth: dotSize,
        height: dotSize,
        background: token.badgeColor,
        borderRadius: '100%',
        boxShadow: `0 0 0 ${unit(badgeShadowSize)} ${token.badgeShadowColor}`
      },
      [`${componentCls}-count, ${componentCls}-dot, ${numberPrefixCls}-custom-component`]: {
        position: 'absolute',
        top: 0,
        insetInlineEnd: 0,
        transform: 'translate(50%, -50%)',
        transformOrigin: '100% 0%',
        [`&${iconCls}-spin`]: {
          animationName: antBadgeLoadingCircle,
          animationDuration: '1s',
          animationIterationCount: 'infinite',
          animationTimingFunction: 'linear'
        }
      },
      [`&${componentCls}-status`]: {
        lineHeight: 'inherit',
        verticalAlign: 'baseline',
        [`${componentCls}-status-dot`]: {
          position: 'relative',
          top: -1,
          // Magic number, but seems better experience
          display: 'inline-block',
          width: statusSize,
          height: statusSize,
          verticalAlign: 'middle',
          borderRadius: '50%'
        },
        [`${componentCls}-status-success`]: {
          backgroundColor: token.colorSuccess
        },
        [`${componentCls}-status-processing`]: {
          overflow: 'visible',
          color: token.colorInfo,
          backgroundColor: token.colorInfo,
          borderColor: 'currentcolor',
          '&::after': {
            position: 'absolute',
            top: 0,
            insetInlineStart: 0,
            width: '100%',
            height: '100%',
            borderWidth: badgeShadowSize,
            borderStyle: 'solid',
            borderColor: 'inherit',
            borderRadius: '50%',
            animationName: antStatusProcessing,
            animationDuration: token.badgeProcessingDuration,
            animationIterationCount: 'infinite',
            animationTimingFunction: 'ease-in-out',
            content: '""'
          }
        },
        [`${componentCls}-status-default`]: {
          backgroundColor: token.colorTextPlaceholder
        },
        [`${componentCls}-status-error`]: {
          backgroundColor: token.colorError
        },
        [`${componentCls}-status-warning`]: {
          backgroundColor: token.colorWarning
        },
        [`${componentCls}-status-text`]: {
          marginInlineStart: marginXS,
          color: token.colorText,
          fontSize: token.fontSize
        }
      }
    }), colorPreset), {
      [`${componentCls}-zoom-appear, ${componentCls}-zoom-enter`]: {
        animationName: antZoomBadgeIn,
        animationDuration: token.motionDurationSlow,
        animationTimingFunction: token.motionEaseOutBack,
        animationFillMode: 'both'
      },
      [`${componentCls}-zoom-leave`]: {
        animationName: antZoomBadgeOut,
        animationDuration: token.motionDurationSlow,
        animationTimingFunction: token.motionEaseOutBack,
        animationFillMode: 'both'
      },
      [`&${componentCls}-not-a-wrapper`]: {
        [`${componentCls}-zoom-appear, ${componentCls}-zoom-enter`]: {
          animationName: antNoWrapperZoomBadgeIn,
          animationDuration: token.motionDurationSlow,
          animationTimingFunction: token.motionEaseOutBack
        },
        [`${componentCls}-zoom-leave`]: {
          animationName: antNoWrapperZoomBadgeOut,
          animationDuration: token.motionDurationSlow,
          animationTimingFunction: token.motionEaseOutBack
        },
        [`&:not(${componentCls}-status)`]: {
          verticalAlign: 'middle'
        },
        [`${numberPrefixCls}-custom-component, ${componentCls}-count`]: {
          transform: 'none'
        },
        [`${numberPrefixCls}-custom-component, ${numberPrefixCls}`]: {
          position: 'relative',
          top: 'auto',
          display: 'block',
          transformOrigin: '50% 50%'
        }
      },
      [numberPrefixCls]: {
        overflow: 'hidden',
        transition: `all ${token.motionDurationMid} ${token.motionEaseOutBack}`,
        [`${numberPrefixCls}-only`]: {
          position: 'relative',
          display: 'inline-block',
          height: indicatorHeight,
          transition: `all ${token.motionDurationSlow} ${token.motionEaseOutBack}`,
          WebkitTransformStyle: 'preserve-3d',
          WebkitBackfaceVisibility: 'hidden',
          [`> p${numberPrefixCls}-only-unit`]: {
            height: indicatorHeight,
            margin: 0,
            WebkitTransformStyle: 'preserve-3d',
            WebkitBackfaceVisibility: 'hidden'
          }
        },
        [`${numberPrefixCls}-symbol`]: {
          verticalAlign: 'top'
        }
      },
      // ====================== RTL =======================
      '&-rtl': {
        direction: 'rtl',
        [`${componentCls}-count, ${componentCls}-dot, ${numberPrefixCls}-custom-component`]: {
          transform: 'translate(-50%, -50%)'
        }
      }
    })
  };
};
// ============================== Export ==============================
export const prepareToken = token => {
  const {
    fontHeight,
    lineWidth,
    marginXS,
    colorBorderBg
  } = token;
  const badgeFontHeight = fontHeight;
  const badgeShadowSize = lineWidth;
  const badgeTextColor = token.colorTextLightSolid;
  const badgeColor = token.colorError;
  const badgeColorHover = token.colorErrorHover;
  const badgeToken = mergeToken(token, {
    badgeFontHeight,
    badgeShadowSize,
    badgeTextColor,
    badgeColor,
    badgeColorHover,
    badgeShadowColor: colorBorderBg,
    badgeProcessingDuration: '1.2s',
    badgeRibbonOffset: marginXS,
    // Follow token just by Design. Not related with token
    badgeRibbonCornerTransform: 'scaleY(0.75)',
    badgeRibbonCornerFilter: `brightness(75%)`
  });
  return badgeToken;
};
export const prepareComponentToken = token => {
  const {
    fontSize,
    lineHeight,
    fontSizeSM,
    lineWidth
  } = token;
  return {
    indicatorZIndex: 'auto',
    indicatorHeight: Math.round(fontSize * lineHeight) - 2 * lineWidth,
    indicatorHeightSM: fontSize,
    dotSize: fontSizeSM / 2,
    textFontSize: fontSizeSM,
    textFontSizeSM: fontSizeSM,
    textFontWeight: 'normal',
    statusSize: fontSizeSM / 2
  };
};
export default genStyleHooks('Badge', token => {
  const badgeToken = prepareToken(token);
  return genSharedBadgeStyle(badgeToken);
}, prepareComponentToken);