"use strict";
"use client";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _DownOutlined = _interopRequireDefault(require("@ant-design/icons/DownOutlined"));
var _classnames = _interopRequireDefault(require("classnames"));
var _omit = _interopRequireDefault(require("rc-util/lib/omit"));
var _transKeys = require("../_util/transKeys");
var _checkbox = _interopRequireDefault(require("../checkbox"));
var _dropdown = _interopRequireDefault(require("../dropdown"));
var _ListBody = _interopRequireWildcard(require("./ListBody"));
var _search = _interopRequireDefault(require("./search"));
const defaultRender = () => null;
function isRenderResultPlainObject(result) {
  return !!(result && ! /*#__PURE__*/_react.default.isValidElement(result) && Object.prototype.toString.call(result) === '[object Object]');
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
  const [filterValue, setFilterValue] = (0, _react.useState)(searchOptions.defaultValue);
  const listBodyRef = (0, _react.useRef)({});
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
      bodyContent = /*#__PURE__*/_react.default.createElement(_ListBody.default, Object.assign({
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
  const notFoundContentEle = (0, _react.useMemo)(() => Array.isArray(notFoundContent) ? notFoundContent[direction === 'left' ? 0 : 1] : notFoundContent, [notFoundContent, direction]);
  const [filteredItems, filteredRenderItems] = (0, _react.useMemo)(() => {
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
  const checkedActiveItems = (0, _react.useMemo)(() => {
    return filteredItems.filter(item => checkedKeys.includes(item.key) && !item.disabled);
  }, [checkedKeys, filteredItems]);
  const checkStatus = (0, _react.useMemo)(() => {
    if (checkedActiveItems.length === 0) {
      return 'none';
    }
    const checkedKeysMap = (0, _transKeys.groupKeysMap)(checkedKeys);
    if (filteredItems.every(item => checkedKeysMap.has(item.key) || !!item.disabled)) {
      return 'all';
    }
    return 'part';
  }, [checkedKeys, checkedActiveItems]);
  const listBody = (0, _react.useMemo)(() => {
    const search = showSearch ? (/*#__PURE__*/_react.default.createElement("div", {
      className: `${prefixCls}-body-search-wrapper`
    }, /*#__PURE__*/_react.default.createElement(_search.default, {
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
    } = renderListBody(Object.assign(Object.assign({}, (0, _omit.default)(props, _ListBody.OmitProps)), {
      filteredItems,
      filteredRenderItems,
      selectedKeys: checkedKeys
    }));
    let bodyNode;
    // We should wrap customize list body in a classNamed div to use flex layout.
    if (customize) {
      bodyNode = /*#__PURE__*/_react.default.createElement("div", {
        className: `${prefixCls}-body-customize-wrapper`
      }, bodyContent);
    } else {
      bodyNode = filteredItems.length ? bodyContent : (/*#__PURE__*/_react.default.createElement("div", {
        className: `${prefixCls}-body-not-found`
      }, notFoundContentEle));
    }
    return /*#__PURE__*/_react.default.createElement("div", {
      className: (0, _classnames.default)(`${prefixCls}-body`, {
        [`${prefixCls}-body-with-search`]: showSearch
      })
    }, search, bodyNode);
  }, [showSearch, prefixCls, searchPlaceholder, filterValue, disabled, checkedKeys, filteredItems, filteredRenderItems, notFoundContentEle]);
  const checkBox = /*#__PURE__*/_react.default.createElement(_checkbox.default, {
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
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, (selectedCount > 0 ? `${selectedCount}/` : '') + totalCount, " ", unit);
  };
  // Custom Layout
  const footerDom = footer && (footer.length < 2 ? footer(props) : footer(props, {
    direction
  }));
  const listCls = (0, _classnames.default)(prefixCls, {
    [`${prefixCls}-with-pagination`]: !!pagination,
    [`${prefixCls}-with-footer`]: !!footerDom
  });
  // ====================== Get filtered, checked item list ======================
  const listFooter = footerDom ? /*#__PURE__*/_react.default.createElement("div", {
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
  const dropdown = /*#__PURE__*/_react.default.createElement(_dropdown.default, {
    className: `${prefixCls}-header-dropdown`,
    menu: {
      items
    },
    disabled: disabled
  }, isValidIcon(selectionsIcon) ? selectionsIcon : /*#__PURE__*/_react.default.createElement(_DownOutlined.default, null));
  return /*#__PURE__*/_react.default.createElement("div", {
    className: listCls,
    style: style
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: `${prefixCls}-header`
  }, showSelectAll ? (/*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, checkAllCheckbox, dropdown)) : null, /*#__PURE__*/_react.default.createElement("span", {
    className: `${prefixCls}-header-selected`
  }, getSelectAllLabel(checkedActiveItems.length, filteredItems.length)), /*#__PURE__*/_react.default.createElement("span", {
    className: `${prefixCls}-header-title`
  }, titleText)), listBody, listFooter);
};
if (process.env.NODE_ENV !== 'production') {
  TransferList.displayName = 'TransferList';
}
var _default = exports.default = TransferList;