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
import { Popup } from 'rc-tooltip';
import { getRenderPropValue } from '../_util/getRenderPropValue';
import { ConfigContext } from '../config-provider';
import useStyle from './style';
export const Overlay = _ref => {
  let {
    title,
    content,
    prefixCls
  } = _ref;
  if (!title && !content) {
    return null;
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, title && /*#__PURE__*/React.createElement("div", {
    className: `${prefixCls}-title`
  }, title), content && /*#__PURE__*/React.createElement("div", {
    className: `${prefixCls}-inner-content`
  }, content));
};
export const RawPurePanel = props => {
  const {
    hashId,
    prefixCls,
    className,
    style,
    placement = 'top',
    title,
    content,
    children
  } = props;
  const titleNode = getRenderPropValue(title);
  const contentNode = getRenderPropValue(content);
  const cls = classNames(hashId, prefixCls, `${prefixCls}-pure`, `${prefixCls}-placement-${placement}`, className);
  return /*#__PURE__*/React.createElement("div", {
    className: cls,
    style: style
  }, /*#__PURE__*/React.createElement("div", {
    className: `${prefixCls}-arrow`
  }), /*#__PURE__*/React.createElement(Popup, Object.assign({}, props, {
    className: hashId,
    prefixCls: prefixCls
  }), children || /*#__PURE__*/React.createElement(Overlay, {
    prefixCls: prefixCls,
    title: titleNode,
    content: contentNode
  })));
};
const PurePanel = props => {
  const {
      prefixCls: customizePrefixCls,
      className
    } = props,
    restProps = __rest(props, ["prefixCls", "className"]);
  const {
    getPrefixCls
  } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('popover', customizePrefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls);
  return wrapCSSVar(/*#__PURE__*/React.createElement(RawPurePanel, Object.assign({}, restProps, {
    prefixCls: prefixCls,
    hashId: hashId,
    className: classNames(className, cssVarCls)
  })));
};
export default PurePanel;