"use client";

var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import * as React from 'react';
import classNames from 'classnames';
import { composeRef } from "rc-util/es/ref";
import { devUseWarning } from '../_util/warning';
import { useComponentConfig } from '../config-provider/context';
import useStyle from './style';
const Typography = /*#__PURE__*/React.forwardRef((props, ref) => {
  const {
      prefixCls: customizePrefixCls,
      component: Component = 'article',
      className,
      rootClassName,
      setContentRef,
      children,
      direction: typographyDirection,
      style
    } = props,
    restProps = __rest(props, ["prefixCls", "component", "className", "rootClassName", "setContentRef", "children", "direction", "style"]);
  const {
    getPrefixCls,
    direction: contextDirection,
    className: contextClassName,
    style: contextStyle
  } = useComponentConfig('typography');
  const direction = typographyDirection !== null && typographyDirection !== void 0 ? typographyDirection : contextDirection;
  const mergedRef = setContentRef ? composeRef(ref, setContentRef) : ref;
  const prefixCls = getPrefixCls('typography', customizePrefixCls);
  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning('Typography');
    warning.deprecated(!setContentRef, 'setContentRef', 'ref');
  }
  // Style
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls);
  const componentClassName = classNames(prefixCls, contextClassName, {
    [`${prefixCls}-rtl`]: direction === 'rtl'
  }, className, rootClassName, hashId, cssVarCls);
  const mergedStyle = Object.assign(Object.assign({}, contextStyle), style);
  return wrapCSSVar(
  /*#__PURE__*/
  // @ts-expect-error: Expression produces a union type that is too complex to represent.
  React.createElement(Component, Object.assign({
    className: componentClassName,
    style: mergedStyle,
    ref: mergedRef
  }, restProps), children));
});
if (process.env.NODE_ENV !== 'production') {
  Typography.displayName = 'Typography';
}
export default Typography;