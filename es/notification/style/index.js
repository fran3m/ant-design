import { Keyframes, unit } from '@ant-design/cssinjs';
import { CONTAINER_MAX_OFFSET } from '../../_util/hooks/useZIndex';
import { genFocusStyle, resetComponent } from '../../style';
import { genStyleHooks, mergeToken } from '../../theme/internal';
import genNotificationPlacementStyle from './placement';
import genStackStyle from './stack';
export const genNoticeStyle = token => {
  const {
    iconCls,
    componentCls,
    // .ant-notification
    boxShadow,
    fontSizeLG,
    notificationMarginBottom,
    borderRadiusLG,
    colorSuccess,
    colorInfo,
    colorWarning,
    colorError,
    colorTextHeading,
    notificationBg,
    notificationPadding,
    notificationMarginEdge,
    notificationProgressBg,
    notificationProgressHeight,
    fontSize,
    lineHeight,
    width,
    notificationIconSize,
    colorText
  } = token;
  const noticeCls = `${componentCls}-notice`;
  return {
    position: 'relative',
    marginBottom: notificationMarginBottom,
    marginInlineStart: 'auto',
    background: notificationBg,
    borderRadius: borderRadiusLG,
    boxShadow,
    [noticeCls]: {
      padding: notificationPadding,
      width,
      maxWidth: `calc(100vw - ${unit(token.calc(notificationMarginEdge).mul(2).equal())})`,
      overflow: 'hidden',
      lineHeight,
      wordWrap: 'break-word'
    },
    [`${noticeCls}-message`]: {
      marginBottom: token.marginXS,
      color: colorTextHeading,
      fontSize: fontSizeLG,
      lineHeight: token.lineHeightLG
    },
    [`${noticeCls}-description`]: {
      fontSize,
      color: colorText
    },
    [`${noticeCls}-closable ${noticeCls}-message`]: {
      paddingInlineEnd: token.paddingLG
    },
    [`${noticeCls}-with-icon ${noticeCls}-message`]: {
      marginBottom: token.marginXS,
      marginInlineStart: token.calc(token.marginSM).add(notificationIconSize).equal(),
      fontSize: fontSizeLG
    },
    [`${noticeCls}-with-icon ${noticeCls}-description`]: {
      marginInlineStart: token.calc(token.marginSM).add(notificationIconSize).equal(),
      fontSize
    },
    // Icon & color style in different selector level
    // https://github.com/ant-design/ant-design/issues/16503
    // https://github.com/ant-design/ant-design/issues/15512
    [`${noticeCls}-icon`]: {
      position: 'absolute',
      fontSize: notificationIconSize,
      lineHeight: 1,
      // icon-font
      [`&-success${iconCls}`]: {
        color: colorSuccess
      },
      [`&-info${iconCls}`]: {
        color: colorInfo
      },
      [`&-warning${iconCls}`]: {
        color: colorWarning
      },
      [`&-error${iconCls}`]: {
        color: colorError
      }
    },
    [`${noticeCls}-close`]: Object.assign({
      position: 'absolute',
      top: token.notificationPaddingVertical,
      insetInlineEnd: token.notificationPaddingHorizontal,
      color: token.colorIcon,
      outline: 'none',
      width: token.notificationCloseButtonSize,
      height: token.notificationCloseButtonSize,
      borderRadius: token.borderRadiusSM,
      transition: `background-color ${token.motionDurationMid}, color ${token.motionDurationMid}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'none',
      border: 'none',
      '&:hover': {
        color: token.colorIconHover,
        backgroundColor: token.colorBgTextHover
      },
      '&:active': {
        backgroundColor: token.colorBgTextActive
      }
    }, genFocusStyle(token)),
    [`${noticeCls}-progress`]: {
      position: 'absolute',
      display: 'block',
      appearance: 'none',
      inlineSize: `calc(100% - ${unit(borderRadiusLG)} * 2)`,
      left: {
        _skip_check_: true,
        value: borderRadiusLG
      },
      right: {
        _skip_check_: true,
        value: borderRadiusLG
      },
      bottom: 0,
      blockSize: notificationProgressHeight,
      border: 0,
      '&, &::-webkit-progress-bar': {
        borderRadius: borderRadiusLG,
        backgroundColor: `rgba(0, 0, 0, 0.04)`
      },
      '&::-moz-progress-bar': {
        background: notificationProgressBg
      },
      '&::-webkit-progress-value': {
        borderRadius: borderRadiusLG,
        background: notificationProgressBg
      }
    },
    [`${noticeCls}-actions`]: {
      float: 'right',
      marginTop: token.marginSM
    }
  };
};
const genNotificationStyle = token => {
  const {
    componentCls,
    // .ant-notification
    notificationMarginBottom,
    notificationMarginEdge,
    motionDurationMid,
    motionEaseInOut
  } = token;
  const noticeCls = `${componentCls}-notice`;
  const fadeOut = new Keyframes('antNotificationFadeOut', {
    '0%': {
      maxHeight: token.animationMaxHeight,
      marginBottom: notificationMarginBottom
    },
    '100%': {
      maxHeight: 0,
      marginBottom: 0,
      paddingTop: 0,
      paddingBottom: 0,
      opacity: 0
    }
  });
  return [
  // ============================ Holder ============================
  {
    [componentCls]: Object.assign(Object.assign({}, resetComponent(token)), {
      position: 'fixed',
      zIndex: token.zIndexPopup,
      marginRight: {
        value: notificationMarginEdge,
        _skip_check_: true
      },
      [`${componentCls}-hook-holder`]: {
        position: 'relative'
      },
      //  animation
      [`${componentCls}-fade-appear-prepare`]: {
        opacity: '0 !important'
      },
      [`${componentCls}-fade-enter, ${componentCls}-fade-appear`]: {
        animationDuration: token.motionDurationMid,
        animationTimingFunction: motionEaseInOut,
        animationFillMode: 'both',
        opacity: 0,
        animationPlayState: 'paused'
      },
      [`${componentCls}-fade-leave`]: {
        animationTimingFunction: motionEaseInOut,
        animationFillMode: 'both',
        animationDuration: motionDurationMid,
        animationPlayState: 'paused'
      },
      [`${componentCls}-fade-enter${componentCls}-fade-enter-active, ${componentCls}-fade-appear${componentCls}-fade-appear-active`]: {
        animationPlayState: 'running'
      },
      [`${componentCls}-fade-leave${componentCls}-fade-leave-active`]: {
        animationName: fadeOut,
        animationPlayState: 'running'
      },
      // RTL
      '&-rtl': {
        direction: 'rtl',
        [`${noticeCls}-actions`]: {
          float: 'left'
        }
      }
    })
  },
  // ============================ Notice ============================
  {
    [componentCls]: {
      [`${noticeCls}-wrapper`]: Object.assign({}, genNoticeStyle(token))
    }
  }];
};
// ============================== Export ==============================
export const prepareComponentToken = token => ({
  zIndexPopup: token.zIndexPopupBase + CONTAINER_MAX_OFFSET + 50,
  width: 384
});
export const prepareNotificationToken = token => {
  const notificationPaddingVertical = token.paddingMD;
  const notificationPaddingHorizontal = token.paddingLG;
  const notificationToken = mergeToken(token, {
    notificationBg: token.colorBgElevated,
    notificationPaddingVertical,
    notificationPaddingHorizontal,
    notificationIconSize: token.calc(token.fontSizeLG).mul(token.lineHeightLG).equal(),
    notificationCloseButtonSize: token.calc(token.controlHeightLG).mul(0.55).equal(),
    notificationMarginBottom: token.margin,
    notificationPadding: `${unit(token.paddingMD)} ${unit(token.paddingContentHorizontalLG)}`,
    notificationMarginEdge: token.marginLG,
    animationMaxHeight: 150,
    notificationStackLayer: 3,
    notificationProgressHeight: 2,
    notificationProgressBg: `linear-gradient(90deg, ${token.colorPrimaryBorderHover}, ${token.colorPrimary})`
  });
  return notificationToken;
};
export default genStyleHooks('Notification', token => {
  const notificationToken = prepareNotificationToken(token);
  return [genNotificationStyle(notificationToken), genNotificationPlacementStyle(notificationToken), genStackStyle(notificationToken)];
}, prepareComponentToken);