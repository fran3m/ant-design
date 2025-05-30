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
import CloseOutlined from "@ant-design/icons/es/icons/CloseOutlined";
import EllipsisOutlined from "@ant-design/icons/es/icons/EllipsisOutlined";
import PlusOutlined from "@ant-design/icons/es/icons/PlusOutlined";
import classNames from 'classnames';
import RcTabs from 'rc-tabs';
import { devUseWarning } from '../_util/warning';
import { ConfigContext } from '../config-provider';
import useCSSVarCls from '../config-provider/hooks/useCSSVarCls';
import useSize from '../config-provider/hooks/useSize';
import useAnimateConfig from './hooks/useAnimateConfig';
import useLegacyItems from './hooks/useLegacyItems';
import useStyle from './style';
import TabPane from './TabPane';
const Tabs = props => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
  const {
      type,
      className,
      rootClassName,
      size: customSize,
      onEdit,
      hideAdd,
      centered,
      addIcon,
      removeIcon,
      moreIcon,
      more,
      popupClassName,
      children,
      items,
      animated,
      style,
      indicatorSize,
      indicator,
      destroyInactiveTabPane,
      destroyOnHidden
    } = props,
    otherProps = __rest(props, ["type", "className", "rootClassName", "size", "onEdit", "hideAdd", "centered", "addIcon", "removeIcon", "moreIcon", "more", "popupClassName", "children", "items", "animated", "style", "indicatorSize", "indicator", "destroyInactiveTabPane", "destroyOnHidden"]);
  const {
    prefixCls: customizePrefixCls
  } = otherProps;
  const {
    direction,
    tabs,
    getPrefixCls,
    getPopupContainer
  } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('tabs', customizePrefixCls);
  const rootCls = useCSSVarCls(prefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls, rootCls);
  let editable;
  if (type === 'editable-card') {
    editable = {
      onEdit: (editType, _ref) => {
        let {
          key,
          event
        } = _ref;
        onEdit === null || onEdit === void 0 ? void 0 : onEdit(editType === 'add' ? event : key, editType);
      },
      removeIcon: (_a = removeIcon !== null && removeIcon !== void 0 ? removeIcon : tabs === null || tabs === void 0 ? void 0 : tabs.removeIcon) !== null && _a !== void 0 ? _a : /*#__PURE__*/React.createElement(CloseOutlined, null),
      addIcon: (addIcon !== null && addIcon !== void 0 ? addIcon : tabs === null || tabs === void 0 ? void 0 : tabs.addIcon) || /*#__PURE__*/React.createElement(PlusOutlined, null),
      showAdd: hideAdd !== true
    };
  }
  const rootPrefixCls = getPrefixCls();
  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning('Tabs');
    process.env.NODE_ENV !== "production" ? warning(!('onPrevClick' in props) && !('onNextClick' in props), 'breaking', '`onPrevClick` and `onNextClick` has been removed. Please use `onTabScroll` instead.') : void 0;
    process.env.NODE_ENV !== "production" ? warning(!(indicatorSize || (tabs === null || tabs === void 0 ? void 0 : tabs.indicatorSize)), 'deprecated', '`indicatorSize` has been deprecated. Please use `indicator={{ size: ... }}` instead.') : void 0;
    warning.deprecated(!('destroyInactiveTabPane' in props || (items === null || items === void 0 ? void 0 : items.some(item => 'destroyInactiveTabPane' in item))), 'destroyInactiveTabPane', 'destroyOnHidden');
  }
  const size = useSize(customSize);
  const mergedItems = useLegacyItems(items, children);
  const mergedAnimated = useAnimateConfig(prefixCls, animated);
  const mergedStyle = Object.assign(Object.assign({}, tabs === null || tabs === void 0 ? void 0 : tabs.style), style);
  const mergedIndicator = {
    align: (_b = indicator === null || indicator === void 0 ? void 0 : indicator.align) !== null && _b !== void 0 ? _b : (_c = tabs === null || tabs === void 0 ? void 0 : tabs.indicator) === null || _c === void 0 ? void 0 : _c.align,
    size: (_g = (_e = (_d = indicator === null || indicator === void 0 ? void 0 : indicator.size) !== null && _d !== void 0 ? _d : indicatorSize) !== null && _e !== void 0 ? _e : (_f = tabs === null || tabs === void 0 ? void 0 : tabs.indicator) === null || _f === void 0 ? void 0 : _f.size) !== null && _g !== void 0 ? _g : tabs === null || tabs === void 0 ? void 0 : tabs.indicatorSize
  };
  return wrapCSSVar(/*#__PURE__*/React.createElement(RcTabs, Object.assign({
    direction: direction,
    getPopupContainer: getPopupContainer
  }, otherProps, {
    items: mergedItems,
    className: classNames({
      [`${prefixCls}-${size}`]: size,
      [`${prefixCls}-card`]: ['card', 'editable-card'].includes(type),
      [`${prefixCls}-editable-card`]: type === 'editable-card',
      [`${prefixCls}-centered`]: centered
    }, tabs === null || tabs === void 0 ? void 0 : tabs.className, className, rootClassName, hashId, cssVarCls, rootCls),
    popupClassName: classNames(popupClassName, hashId, cssVarCls, rootCls),
    style: mergedStyle,
    editable: editable,
    more: Object.assign({
      icon: (_l = (_k = (_j = (_h = tabs === null || tabs === void 0 ? void 0 : tabs.more) === null || _h === void 0 ? void 0 : _h.icon) !== null && _j !== void 0 ? _j : tabs === null || tabs === void 0 ? void 0 : tabs.moreIcon) !== null && _k !== void 0 ? _k : moreIcon) !== null && _l !== void 0 ? _l : /*#__PURE__*/React.createElement(EllipsisOutlined, null),
      transitionName: `${rootPrefixCls}-slide-up`
    }, more),
    prefixCls: prefixCls,
    animated: mergedAnimated,
    indicator: mergedIndicator,
    // TODO: In the future, destroyInactiveTabPane in rc-tabs needs to be upgrade to destroyOnHidden
    destroyInactiveTabPane: destroyOnHidden !== null && destroyOnHidden !== void 0 ? destroyOnHidden : destroyInactiveTabPane
  })));
};
Tabs.TabPane = TabPane;
if (process.env.NODE_ENV !== 'production') {
  Tabs.displayName = 'Tabs';
}
export default Tabs;