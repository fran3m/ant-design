"use client";

import { unit } from '@ant-design/cssinjs';
export const textEllipsis = {
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis'
};
export const resetComponent = function (token) {
  let needInheritFontFamily = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return {
    boxSizing: 'border-box',
    margin: 0,
    padding: 0,
    color: token.colorText,
    fontSize: token.fontSize,
    // font-variant: @font-variant-base;
    lineHeight: token.lineHeight,
    listStyle: 'none',
    // font-feature-settings: @font-feature-settings-base;
    fontFamily: needInheritFontFamily ? 'inherit' : token.fontFamily
  };
};
export const resetIcon = () => ({
  display: 'inline-flex',
  alignItems: 'center',
  color: 'inherit',
  fontStyle: 'normal',
  lineHeight: 0,
  textAlign: 'center',
  textTransform: 'none',
  // for SVG icon, see https://blog.prototypr.io/align-svg-icons-to-text-and-say-goodbye-to-font-icons-d44b3d7b26b4
  verticalAlign: '-0.125em',
  textRendering: 'optimizeLegibility',
  '-webkit-font-smoothing': 'antialiased',
  '-moz-osx-font-smoothing': 'grayscale',
  '> *': {
    lineHeight: 1
  },
  svg: {
    display: 'inline-block'
  }
});
export const clearFix = () => ({
  // https://github.com/ant-design/ant-design/issues/21301#issuecomment-583955229
  '&::before': {
    display: 'table',
    content: '""'
  },
  '&::after': {
    // https://github.com/ant-design/ant-design/issues/21864
    display: 'table',
    clear: 'both',
    content: '""'
  }
});
export const genLinkStyle = token => ({
  a: {
    color: token.colorLink,
    textDecoration: token.linkDecoration,
    backgroundColor: 'transparent',
    // remove the gray background on active links in IE 10.
    outline: 'none',
    cursor: 'pointer',
    transition: `color ${token.motionDurationSlow}`,
    '-webkit-text-decoration-skip': 'objects',
    // remove gaps in links underline in iOS 8+ and Safari 8+.
    '&:hover': {
      color: token.colorLinkHover
    },
    '&:active': {
      color: token.colorLinkActive
    },
    '&:active, &:hover': {
      textDecoration: token.linkHoverDecoration,
      outline: 0
    },
    // https://github.com/ant-design/ant-design/issues/22503
    '&:focus': {
      textDecoration: token.linkFocusDecoration,
      outline: 0
    },
    '&[disabled]': {
      color: token.colorTextDisabled,
      cursor: 'not-allowed'
    }
  }
});
export const genCommonStyle = (token, componentPrefixCls, rootCls, resetFont) => {
  const prefixSelector = `[class^="${componentPrefixCls}"], [class*=" ${componentPrefixCls}"]`;
  const rootPrefixSelector = rootCls ? `.${rootCls}` : prefixSelector;
  const resetStyle = {
    boxSizing: 'border-box',
    '&::before, &::after': {
      boxSizing: 'border-box'
    }
  };
  let resetFontStyle = {};
  if (resetFont !== false) {
    resetFontStyle = {
      fontFamily: token.fontFamily,
      fontSize: token.fontSize
    };
  }
  return {
    [rootPrefixSelector]: Object.assign(Object.assign(Object.assign({}, resetFontStyle), resetStyle), {
      [prefixSelector]: resetStyle
    })
  };
};
export const genFocusOutline = (token, offset) => ({
  outline: `${unit(token.lineWidthFocus)} solid ${token.colorPrimaryBorder}`,
  outlineOffset: offset !== null && offset !== void 0 ? offset : 1,
  transition: 'outline-offset 0s, outline 0s'
});
export const genFocusStyle = (token, offset) => ({
  '&:focus-visible': Object.assign({}, genFocusOutline(token, offset))
});
export const genIconStyle = iconPrefixCls => ({
  [`.${iconPrefixCls}`]: Object.assign(Object.assign({}, resetIcon()), {
    [`.${iconPrefixCls} .${iconPrefixCls}-icon`]: {
      display: 'block'
    }
  })
});
export const operationUnit = token => Object.assign(Object.assign({
  // FIXME: This use link but is a operation unit. Seems should be a colorPrimary.
  // And Typography use this to generate link style which should not do this.
  color: token.colorLink,
  textDecoration: token.linkDecoration,
  outline: 'none',
  cursor: 'pointer',
  transition: `all ${token.motionDurationSlow}`,
  border: 0,
  padding: 0,
  background: 'none',
  userSelect: 'none'
}, genFocusStyle(token)), {
  '&:focus, &:hover': {
    color: token.colorLinkHover
  },
  '&:active': {
    color: token.colorLinkActive
  }
});