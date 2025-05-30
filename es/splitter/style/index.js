import { resetComponent } from '../../style';
import { genStyleHooks } from '../../theme/internal';
const genRtlStyle = token => {
  const {
    componentCls
  } = token;
  return {
    [`&-rtl${componentCls}-horizontal`]: {
      [`> ${componentCls}-bar`]: {
        [`${componentCls}-bar-collapse-previous`]: {
          insetInlineEnd: 0,
          insetInlineStart: 'unset'
        },
        [`${componentCls}-bar-collapse-next`]: {
          insetInlineEnd: 'unset',
          insetInlineStart: 0
        }
      }
    },
    [`&-rtl${componentCls}-vertical`]: {
      [`> ${componentCls}-bar`]: {
        [`${componentCls}-bar-collapse-previous`]: {
          insetInlineEnd: '50%',
          insetInlineStart: 'unset'
        },
        [`${componentCls}-bar-collapse-next`]: {
          insetInlineEnd: '50%',
          insetInlineStart: 'unset'
        }
      }
    }
  };
};
const centerStyle = {
  position: 'absolute',
  top: '50%',
  left: {
    _skip_check_: true,
    value: '50%'
  },
  transform: 'translate(-50%, -50%)'
};
const genSplitterStyle = token => {
  const {
    componentCls,
    colorFill,
    splitBarDraggableSize,
    splitBarSize,
    splitTriggerSize,
    controlItemBgHover,
    controlItemBgActive,
    controlItemBgActiveHover,
    prefixCls
  } = token;
  const splitBarCls = `${componentCls}-bar`;
  const splitMaskCls = `${componentCls}-mask`;
  const splitPanelCls = `${componentCls}-panel`;
  const halfTriggerSize = token.calc(splitTriggerSize).div(2).equal();
  const splitterBarPreviewOffsetVar = `${prefixCls}-bar-preview-offset`;
  const splitterBarPreviewStyle = {
    position: 'absolute',
    background: token.colorPrimary,
    opacity: 0.2,
    pointerEvents: 'none',
    transition: 'none',
    zIndex: 1,
    display: 'none'
  };
  return {
    [componentCls]: Object.assign(Object.assign(Object.assign({}, resetComponent(token)), {
      display: 'flex',
      width: '100%',
      height: '100%',
      alignItems: 'stretch',
      // ======================== SplitBar ========================
      // Use `>` to avoid conflict with mix layout
      [`> ${splitBarCls}`]: {
        flex: 'none',
        position: 'relative',
        userSelect: 'none',
        // ======================= Dragger =======================
        [`${splitBarCls}-dragger`]: Object.assign(Object.assign({}, centerStyle), {
          zIndex: 1,
          // Hover background
          '&::before': Object.assign({
            content: '""',
            background: controlItemBgHover
          }, centerStyle),
          // Spinner
          '&::after': Object.assign({
            content: '""',
            background: colorFill
          }, centerStyle),
          // Hover
          [`&:hover:not(${splitBarCls}-dragger-active)`]: {
            '&::before': {
              background: controlItemBgActive
            }
          },
          // Active
          '&-active': {
            zIndex: 2,
            '&::before': {
              background: controlItemBgActiveHover
            }
          },
          // Disabled, not use `pointer-events: none` since still need trigger collapse
          [`&-disabled${splitBarCls}-dragger`]: {
            zIndex: 0,
            '&, &:hover, &-active': {
              cursor: 'default',
              '&::before': {
                background: controlItemBgHover
              }
            },
            '&::after': {
              display: 'none'
            }
          }
        }),
        // ======================= Collapse =======================
        [`${splitBarCls}-collapse-bar`]: Object.assign(Object.assign({}, centerStyle), {
          zIndex: token.zIndexPopupBase,
          background: controlItemBgHover,
          fontSize: token.fontSizeSM,
          borderRadius: token.borderRadiusXS,
          color: token.colorText,
          cursor: 'pointer',
          opacity: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          '@media(hover:none)': {
            opacity: 1
          },
          // Hover
          '&:hover': {
            background: controlItemBgActive
          },
          // Active
          '&:active': {
            background: controlItemBgActiveHover
          }
        }),
        // ======================== Status ========================
        // Hover
        '&:hover, &:active': {
          [`${splitBarCls}-collapse-bar`]: {
            opacity: 1
          }
        }
      },
      // =========================== Mask =========================
      // Util dom for handle cursor
      [splitMaskCls]: {
        position: 'fixed',
        zIndex: token.zIndexPopupBase,
        inset: 0,
        '&-horizontal': {
          cursor: 'col-resize'
        },
        '&-vertical': {
          cursor: 'row-resize'
        }
      },
      // ==========================================================
      // ==                        Layout                        ==
      // ==========================================================
      '&-horizontal': {
        flexDirection: 'row',
        [`> ${splitBarCls}`]: {
          width: 0,
          // ======================= Preview =======================
          [`${splitBarCls}-preview`]: Object.assign(Object.assign({
            height: '100%',
            width: splitBarSize
          }, splitterBarPreviewStyle), {
            [`&${splitBarCls}-preview-active`]: {
              display: 'block',
              transform: `translateX(var(--${splitterBarPreviewOffsetVar}))`
            }
          }),
          // ======================= Dragger =======================
          [`${splitBarCls}-dragger`]: {
            cursor: 'col-resize',
            height: '100%',
            width: splitTriggerSize,
            '&::before': {
              height: '100%',
              width: splitBarSize
            },
            '&::after': {
              height: splitBarDraggableSize,
              width: splitBarSize
            }
          },
          // ======================= Collapse =======================
          [`${splitBarCls}-collapse-bar`]: {
            width: token.fontSizeSM,
            height: token.controlHeightSM,
            '&-start': {
              left: {
                _skip_check_: true,
                value: 'auto'
              },
              right: {
                _skip_check_: true,
                value: halfTriggerSize
              },
              transform: 'translateY(-50%)'
            },
            '&-end': {
              left: {
                _skip_check_: true,
                value: halfTriggerSize
              },
              right: {
                _skip_check_: true,
                value: 'auto'
              },
              transform: 'translateY(-50%)'
            }
          }
        }
      },
      '&-vertical': {
        flexDirection: 'column',
        [`> ${splitBarCls}`]: {
          height: 0,
          // ======================= Preview =======================
          [`${splitBarCls}-preview`]: Object.assign(Object.assign({
            height: splitBarSize,
            width: '100%'
          }, splitterBarPreviewStyle), {
            [`&${splitBarCls}-preview-active`]: {
              display: 'block',
              transform: `translateY(var(--${splitterBarPreviewOffsetVar}))`
            }
          }),
          // ======================= Dragger =======================
          [`${splitBarCls}-dragger`]: {
            cursor: 'row-resize',
            width: '100%',
            height: splitTriggerSize,
            '&::before': {
              width: '100%',
              height: splitBarSize
            },
            '&::after': {
              width: splitBarDraggableSize,
              height: splitBarSize
            }
          },
          // ======================= Collapse =======================
          [`${splitBarCls}-collapse-bar`]: {
            height: token.fontSizeSM,
            width: token.controlHeightSM,
            '&-start': {
              top: 'auto',
              bottom: halfTriggerSize,
              transform: 'translateX(-50%)'
            },
            '&-end': {
              top: halfTriggerSize,
              bottom: 'auto',
              transform: 'translateX(-50%)'
            }
          }
        }
      },
      // ========================= Panels =========================
      [splitPanelCls]: {
        overflow: 'auto',
        padding: '0 1px',
        scrollbarWidth: 'thin',
        boxSizing: 'border-box',
        '&-hidden': {
          padding: 0,
          overflow: 'hidden'
        },
        [`&:has(${componentCls}:only-child)`]: {
          overflow: 'hidden'
        }
      }
    }), genRtlStyle(token))
  };
};
export const prepareComponentToken = token => {
  var _a;
  const splitBarSize = token.splitBarSize || 2;
  const splitTriggerSize = token.splitTriggerSize || 6;
  // https://github.com/ant-design/ant-design/pull/51223
  const resizeSpinnerSize = token.resizeSpinnerSize || 20;
  const splitBarDraggableSize = (_a = token.splitBarDraggableSize) !== null && _a !== void 0 ? _a : resizeSpinnerSize;
  return {
    splitBarSize,
    splitTriggerSize,
    splitBarDraggableSize,
    resizeSpinnerSize
  };
};
// ============================== Export ==============================
export default genStyleHooks('Splitter', token => [genSplitterStyle(token)], prepareComponentToken);