"use client";

import React, { useMemo, useRef, useState } from 'react';
import DownOutlined from "@ant-design/icons/es/icons/DownOutlined";
import classNames from 'classnames';
import omit from "rc-util/es/omit";
import { groupKeysMap } from '../_util/transKeys';
import Checkbox from '../checkbox';
import Dropdown from '../dropdown';
import DefaultListBody, { OmitProps } from './ListBody';
import Search from './search';
const defaultRender = () => null;
function isRenderResultPlainObject(result) {
  return !!(result && ! /*#__PURE__*/React.isValidElement(result) && Object.prototype.toString.call(result) === '[object Object]');
}
function getEnabledItemKeys(items) {
  return items.filter(data => !data.disabled).map(data => data.key);
}
const isValidIcon = icon => icon !== undefined;
const getShowSearchOption = showSearch => {
  if (showSearch && typeof showSearch === 'object') {
    return Object.assign(Object.assign({}, showSearch), {
      defaultValue: showSearch.defaultValue || ''
    });
  }
  return {
    defaultValue: '',
    placeholder: ''
  };
};
const TransferList = props => {
  const {
    prefixCls,
    dataSource = [],
    titleText = '',
    checkedKeys,
    disabled,
    showSearch = false,
    style,
    searchPlaceholder,
    notFoundContent,
    selectAll,
    deselectAll,
    selectCurrent,
    selectInvert,
    removeAll,
    removeCurrent,
    showSelectAll = true,
    showRemove,
    pagination,
    direction,
    itemsUnit,
    itemUnit,
    selectAllLabel,
    selectionsIcon,
    footer,
    renderList,
    onItemSelectAll,
    onItemRemove,
    handleFilter,
    handleClear,
    filterOption,
    render = defaultRender
  } = props;
  const searchOptions = getShowSearchOption(showSearch);
  const [filterValue, setFilterValue] = useState(searchOptions.defaultValue);
  const listBodyRef = useRef({});
  const internalHandleFilter = e => {
    setFilterValue(e.target.value);
    handleFilter(e);
  };
  const internalHandleClear = () => {
    setFilterValue('');
    handleClear();
  };
  const matchFilter = (text, item) => {
    if (filterOption) {
      return filterOption(filterValue, item, direction);
    }
    return text.includes(filterValue);
  };
  const renderListBody = listProps => {
    let bodyContent = renderList ? renderList(Object.assign(Object.assign({}, listProps), {
      onItemSelect: (key, check) => listProps.onItemSelect(key, check)
    })) : null;
    const customize = !!bodyContent;
    if (!customize) {
      // @ts-ignore
      bodyContent = /*#__PURE__*/React.createElement(DefaultListBody, Object.assign({
        ref: listBodyRef
      }, listProps));
    }
    return {
      customize,
      bodyContent
    };
  };
  const renderItem = item => {
    const renderResult = render(item);
    const isRenderResultPlain = isRenderResultPlainObject(renderResult);
    return {
      item,
      renderedEl: isRenderResultPlain ? renderResult.label : renderResult,
      renderedText: isRenderResultPlain ? renderResult.value : renderResult
    };
  };
  const notFoundContentEle = useMemo(() => Array.isArray(notFoundContent) ? notFoundContent[direction === 'left' ? 0 : 1] : notFoundContent, [notFoundContent, direction]);
  const [filteredItems, filteredRenderItems] = useMemo(() => {
    const filterItems = [];
    const filterRenderItems = [];
    dataSource.forEach(item => {
      const renderedItem = renderItem(item);
      if (filterValue && !matchFilter(renderedItem.renderedText, item)) {
        return;
      }
      filterItems.push(item);
      filterRenderItems.push(renderedItem);
    });
    return [filterItems, filterRenderItems];
  }, [dataSource, filterValue]);
  const checkedActiveItems = useMemo(() => {
    return filteredItems.filter(item => checkedKeys.includes(item.key) && !item.disabled);
  }, [checkedKeys, filteredItems]);
  const checkStatus = useMemo(() => {
    if (checkedActiveItems.length === 0) {
      return 'none';
    }
    const checkedKeysMap = groupKeysMap(checkedKeys);
    if (filteredItems.every(item => checkedKeysMap.has(item.key) || !!item.disabled)) {
      return 'all';
    }
    return 'part';
  }, [checkedKeys, checkedActiveItems]);
  const listBody = useMemo(() => {
    const search = showSearch ? (/*#__PURE__*/React.createElement("div", {
      className: `${prefixCls}-body-search-wrapper`
    }, /*#__PURE__*/React.createElement(Search, {
      prefixCls: `${prefixCls}-search`,
      onChange: internalHandleFilter,
      handleClear: internalHandleClear,
      placeholder: searchOptions.placeholder || searchPlaceholder,
      value: filterValue,
      disabled: disabled
    }))) : null;
    const {
      customize,
      bodyContent
    } = renderListBody(Object.assign(Object.assign({}, omit(props, OmitProps)), {
      filteredItems,
      filteredRenderItems,
      selectedKeys: checkedKeys
    }));
    let bodyNode;
    // We should wrap customize list body in a classNamed div to use flex layout.
    if (customize) {
      bodyNode = /*#__PURE__*/React.createElement("div", {
        className: `${prefixCls}-body-customize-wrapper`
      }, bodyContent);
    } else {
      bodyNode = filteredItems.length ? bodyContent : (/*#__PURE__*/React.createElement("div", {
        className: `${prefixCls}-body-not-found`
      }, notFoundContentEle));
    }
    return /*#__PURE__*/React.createElement("div", {
      className: classNames(`${prefixCls}-body`, {
        [`${prefixCls}-body-with-search`]: showSearch
      })
    }, search, bodyNode);
  }, [showSearch, prefixCls, searchPlaceholder, filterValue, disabled, checkedKeys, filteredItems, filteredRenderItems, notFoundContentEle]);
  const checkBox = /*#__PURE__*/React.createElement(Checkbox, {
    disabled: dataSource.filter(d => !d.disabled).length === 0 || disabled,
    checked: checkStatus === 'all',
    indeterminate: checkStatus === 'part',
    className: `${prefixCls}-checkbox`,
    onChange: () => {
      // Only select enabled items
      onItemSelectAll === null || onItemSelectAll === void 0 ? void 0 : onItemSelectAll(filteredItems.filter(item => !item.disabled).map(_ref => {
        let {
          key
        } = _ref;
        return key;
      }), checkStatus !== 'all');
    }
  });
  const getSelectAllLabel = (selectedCount, totalCount) => {
    if (selectAllLabel) {
      return typeof selectAllLabel === 'function' ? selectAllLabel({
        selectedCount,
        totalCount
      }) : selectAllLabel;
    }
    const unit = totalCount > 1 ? itemsUnit : itemUnit;
    return /*#__PURE__*/React.createElement(React.Fragment, null, (selectedCount > 0 ? `${selectedCount}/` : '') + totalCount, " ", unit);
  };
  // Custom Layout
  const footerDom = footer && (footer.length < 2 ? footer(props) : footer(props, {
    direction
  }));
  const listCls = classNames(prefixCls, {
    [`${prefixCls}-with-pagination`]: !!pagination,
    [`${prefixCls}-with-footer`]: !!footerDom
  });
  // ====================== Get filtered, checked item list ======================
  const listFooter = footerDom ? /*#__PURE__*/React.createElement("div", {
    className: `${prefixCls}-footer`
  }, footerDom) : null;
  const checkAllCheckbox = !showRemove && !pagination && checkBox;
  let items;
  if (showRemove) {
    items = [/* Remove Current Page */
    pagination ? {
      key: 'removeCurrent',
      label: removeCurrent,
      onClick() {
        var _a;
        const pageKeys = getEnabledItemKeys((((_a = listBodyRef.current) === null || _a === void 0 ? void 0 : _a.items) || []).map(entity => entity.item));
        onItemRemove === null || onItemRemove === void 0 ? void 0 : onItemRemove(pageKeys);
      }
    } : null, /* Remove All */
    {
      key: 'removeAll',
      label: removeAll,
      onClick() {
        onItemRemove === null || onItemRemove === void 0 ? void 0 : onItemRemove(getEnabledItemKeys(filteredItems));
      }
    }].filter(Boolean);
  } else {
    items = [{
      key: 'selectAll',
      label: checkStatus === 'all' ? deselectAll : selectAll,
      onClick() {
        const keys = getEnabledItemKeys(filteredItems);
        onItemSelectAll === null || onItemSelectAll === void 0 ? void 0 : onItemSelectAll(keys, keys.length !== checkedKeys.length);
      }
    }, pagination ? {
      key: 'selectCurrent',
      label: selectCurrent,
      onClick() {
        var _a;
        const pageItems = ((_a = listBodyRef.current) === null || _a === void 0 ? void 0 : _a.items) || [];
        onItemSelectAll === null || onItemSelectAll === void 0 ? void 0 : onItemSelectAll(getEnabledItemKeys(pageItems.map(entity => entity.item)), true);
      }
    } : null, {
      key: 'selectInvert',
      label: selectInvert,
      onClick() {
        var _a;
        const availablePageItemKeys = getEnabledItemKeys((((_a = listBodyRef.current) === null || _a === void 0 ? void 0 : _a.items) || []).map(entity => entity.item));
        const checkedKeySet = new Set(checkedKeys);
        const newCheckedKeysSet = new Set(checkedKeySet);
        availablePageItemKeys.forEach(key => {
          if (checkedKeySet.has(key)) {
            newCheckedKeysSet.delete(key);
          } else {
            newCheckedKeysSet.add(key);
          }
        });
        onItemSelectAll === null || onItemSelectAll === void 0 ? void 0 : onItemSelectAll(Array.from(newCheckedKeysSet), 'replace');
      }
    }];
  }
  const dropdown = /*#__PURE__*/React.createElement(Dropdown, {
    className: `${prefixCls}-header-dropdown`,
    menu: {
      items
    },
    disabled: disabled
  }, isValidIcon(selectionsIcon) ? selectionsIcon : /*#__PURE__*/React.createElement(DownOutlined, null));
  return /*#__PURE__*/React.createElement("div", {
    className: listCls,
    style: style
  }, /*#__PURE__*/React.createElement("div", {
    className: `${prefixCls}-header`
  }, showSelectAll ? (/*#__PURE__*/React.createElement(React.Fragment, null, checkAllCheckbox, dropdown)) : null, /*#__PURE__*/React.createElement("span", {
    className: `${prefixCls}-header-selected`
  }, getSelectAllLabel(checkedActiveItems.length, filteredItems.length)), /*#__PURE__*/React.createElement("span", {
    className: `${prefixCls}-header-title`
  }, titleText)), listBody, listFooter);
};
if (process.env.NODE_ENV !== 'production') {
  TransferList.displayName = 'TransferList';
}
export default TransferList;