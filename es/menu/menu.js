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
import { forwardRef } from 'react';
import EllipsisOutlined from "@ant-design/icons/es/icons/EllipsisOutlined";
import classNames from 'classnames';
import RcMenu from 'rc-menu';
import useEvent from "rc-util/es/hooks/useEvent";
import omit from "rc-util/es/omit";
import initCollapseMotion from '../_util/motion';
import { cloneElement } from '../_util/reactNode';
import { devUseWarning } from '../_util/warning';
import { ConfigContext } from '../config-provider';
import useCSSVarCls from '../config-provider/hooks/useCSSVarCls';
import MenuContext from './MenuContext';
import Divider from './MenuDivider';
import MenuItem from './MenuItem';
import OverrideContext from './OverrideContext';
import useStyle from './style';
import SubMenu from './SubMenu';
function isEmptyIcon(icon) {
  return icon === null || icon === false;
}
const MENU_COMPONENTS = {
  item: MenuItem,
  submenu: SubMenu,
  divider: Divider
};
const InternalMenu = /*#__PURE__*/forwardRef((props, ref) => {
  var _a;
  const override = React.useContext(OverrideContext);
  const overrideObj = override || {};
  const {
    getPrefixCls,
    getPopupContainer,
    direction,
    menu
  } = React.useContext(ConfigContext);
  const rootPrefixCls = getPrefixCls();
  const {
      prefixCls: customizePrefixCls,
      className,
      style,
      theme = 'light',
      expandIcon,
      _internalDisableMenuItemTitleTooltip,
      inlineCollapsed,
      siderCollapsed,
      rootClassName,
      mode,
      selectable,
      onClick,
      overflowedIndicatorPopupClassName
    } = props,
    restProps = __rest(props, ["prefixCls", "className", "style", "theme", "expandIcon", "_internalDisableMenuItemTitleTooltip", "inlineCollapsed", "siderCollapsed", "rootClassName", "mode", "selectable", "onClick", "overflowedIndicatorPopupClassName"]);
  const passedProps = omit(restProps, ['collapsedWidth']);
  // ======================== Warning ==========================
  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning('Menu');
    process.env.NODE_ENV !== "production" ? warning(!('inlineCollapsed' in props && mode !== 'inline'), 'usage', '`inlineCollapsed` should only be used when `mode` is inline.') : void 0;
    warning.deprecated('items' in props && !props.children, 'children', 'items');
  }
  (_a = overrideObj.validator) === null || _a === void 0 ? void 0 : _a.call(overrideObj, {
    mode
  });
  // ========================== Click ==========================
  // Tell dropdown that item clicked
  const onItemClick = useEvent(function () {
    var _a;
    onClick === null || onClick === void 0 ? void 0 : onClick.apply(void 0, arguments);
    (_a = overrideObj.onClick) === null || _a === void 0 ? void 0 : _a.call(overrideObj);
  });
  // ========================== Mode ===========================
  const mergedMode = overrideObj.mode || mode;
  // ======================= Selectable ========================
  const mergedSelectable = selectable !== null && selectable !== void 0 ? selectable : overrideObj.selectable;
  // ======================== Collapsed ========================
  // Inline Collapsed
  const mergedInlineCollapsed = inlineCollapsed !== null && inlineCollapsed !== void 0 ? inlineCollapsed : siderCollapsed;
  const defaultMotions = {
    horizontal: {
      motionName: `${rootPrefixCls}-slide-up`
    },
    inline: initCollapseMotion(rootPrefixCls),
    other: {
      motionName: `${rootPrefixCls}-zoom-big`
    }
  };
  const prefixCls = getPrefixCls('menu', customizePrefixCls || overrideObj.prefixCls);
  const rootCls = useCSSVarCls(prefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls, rootCls, !override);
  const menuClassName = classNames(`${prefixCls}-${theme}`, menu === null || menu === void 0 ? void 0 : menu.className, className);
  // ====================== ExpandIcon ========================
  const mergedExpandIcon = React.useMemo(() => {
    var _a, _b;
    if (typeof expandIcon === 'function' || isEmptyIcon(expandIcon)) {
      return expandIcon || null;
    }
    if (typeof overrideObj.expandIcon === 'function' || isEmptyIcon(overrideObj.expandIcon)) {
      return overrideObj.expandIcon || null;
    }
    if (typeof (menu === null || menu === void 0 ? void 0 : menu.expandIcon) === 'function' || isEmptyIcon(menu === null || menu === void 0 ? void 0 : menu.expandIcon)) {
      return (menu === null || menu === void 0 ? void 0 : menu.expandIcon) || null;
    }
    const mergedIcon = (_a = expandIcon !== null && expandIcon !== void 0 ? expandIcon : overrideObj === null || overrideObj === void 0 ? void 0 : overrideObj.expandIcon) !== null && _a !== void 0 ? _a : menu === null || menu === void 0 ? void 0 : menu.expandIcon;
    return cloneElement(mergedIcon, {
      className: classNames(`${prefixCls}-submenu-expand-icon`, /*#__PURE__*/React.isValidElement(mergedIcon) ? (_b = mergedIcon.props) === null || _b === void 0 ? void 0 : _b.className : undefined)
    });
  }, [expandIcon, overrideObj === null || overrideObj === void 0 ? void 0 : overrideObj.expandIcon, menu === null || menu === void 0 ? void 0 : menu.expandIcon, prefixCls]);
  // ======================== Context ==========================
  const contextValue = React.useMemo(() => ({
    prefixCls,
    inlineCollapsed: mergedInlineCollapsed || false,
    direction,
    firstLevel: true,
    theme,
    mode: mergedMode,
    disableMenuItemTitleTooltip: _internalDisableMenuItemTitleTooltip
  }), [prefixCls, mergedInlineCollapsed, direction, _internalDisableMenuItemTitleTooltip, theme]);
  // ========================= Render ==========================
  return wrapCSSVar(/*#__PURE__*/React.createElement(OverrideContext.Provider, {
    value: null
  }, /*#__PURE__*/React.createElement(MenuContext.Provider, {
    value: contextValue
  }, /*#__PURE__*/React.createElement(RcMenu, Object.assign({
    getPopupContainer: getPopupContainer,
    overflowedIndicator: /*#__PURE__*/React.createElement(EllipsisOutlined, null),
    overflowedIndicatorPopupClassName: classNames(prefixCls, `${prefixCls}-${theme}`, overflowedIndicatorPopupClassName),
    mode: mergedMode,
    selectable: mergedSelectable,
    onClick: onItemClick
  }, passedProps, {
    inlineCollapsed: mergedInlineCollapsed,
    style: Object.assign(Object.assign({}, menu === null || menu === void 0 ? void 0 : menu.style), style),
    className: menuClassName,
    prefixCls: prefixCls,
    direction: direction,
    defaultMotions: defaultMotions,
    expandIcon: mergedExpandIcon,
    ref: ref,
    rootClassName: classNames(rootClassName, hashId, overrideObj.rootClassName, cssVarCls, rootCls),
    _internalComponents: MENU_COMPONENTS
  })))));
});
export default InternalMenu;