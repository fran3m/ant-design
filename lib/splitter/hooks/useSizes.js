"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useSizes;
exports.getPtg = getPtg;
var _react = _interopRequireDefault(require("react"));
function getPtg(str) {
  return Number(str.slice(0, -1)) / 100;
}
function isPtg(itemSize) {
  return typeof itemSize === 'string' && itemSize.endsWith('%');
}
/**
 * Save the size state.
 * Align the size into flex percentage base.
 */
function useSizes(items, containerSize) {
  const propSizes = items.map(item => item.size);
  const itemsCount = items.length;
  const mergedContainerSize = containerSize || 0;
  const ptg2px = ptg => ptg * mergedContainerSize;
  // We do not need care the size state match the `items` length in `useState`.
  // It will calculate later.
  const [innerSizes, setInnerSizes] = _react.default.useState(() => items.map(item => item.defaultSize));
  const sizes = _react.default.useMemo(() => {
    var _a;
    const mergedSizes = [];
    for (let i = 0; i < itemsCount; i += 1) {
      mergedSizes[i] = (_a = propSizes[i]) !== null && _a !== void 0 ? _a : innerSizes[i];
    }
    return mergedSizes;
  }, [itemsCount, innerSizes, propSizes]);
  // Post handle the size. Will do:
  // 1. Convert all the px into percentage if not empty.
  // 2. Get rest percentage for exist percentage.
  // 3. Fill the rest percentage into empty item.
  const postPercentSizes = _react.default.useMemo(() => {
    let ptgList = [];
    let emptyCount = 0;
    // Fill default percentage
    for (let i = 0; i < itemsCount; i += 1) {
      const itemSize = sizes[i];
      if (isPtg(itemSize)) {
        ptgList[i] = getPtg(itemSize);
      } else if (itemSize || itemSize === 0) {
        const num = Number(itemSize);
        if (!Number.isNaN(num)) {
          ptgList[i] = num / mergedContainerSize;
        }
      } else {
        emptyCount += 1;
        ptgList[i] = undefined;
      }
    }
    const totalPtg = ptgList.reduce((acc, ptg) => acc + (ptg || 0), 0);
    if (totalPtg > 1 || !emptyCount) {
      // If total percentage is larger than 1, we will scale it down.
      const scale = 1 / totalPtg;
      ptgList = ptgList.map(ptg => ptg === undefined ? 0 : ptg * scale);
    } else {
      // If total percentage is smaller than 1, we will fill the rest.
      const avgRest = (1 - totalPtg) / emptyCount;
      ptgList = ptgList.map(ptg => ptg === undefined ? avgRest : ptg);
    }
    return ptgList;
  }, [sizes, mergedContainerSize]);
  const postPxSizes = _react.default.useMemo(() => postPercentSizes.map(ptg2px), [postPercentSizes, mergedContainerSize]);
  const postPercentMinSizes = _react.default.useMemo(() => items.map(item => {
    if (isPtg(item.min)) {
      return getPtg(item.min);
    }
    return (item.min || 0) / mergedContainerSize;
  }), [items, mergedContainerSize]);
  const postPercentMaxSizes = _react.default.useMemo(() => items.map(item => {
    if (isPtg(item.max)) {
      return getPtg(item.max);
    }
    return (item.max || mergedContainerSize) / mergedContainerSize;
  }), [items, mergedContainerSize]);
  // If ssr, we will use the size from developer config first.
  const panelSizes = _react.default.useMemo(() => containerSize ? postPxSizes : sizes, [postPxSizes, containerSize]);
  return [panelSizes, postPxSizes, postPercentSizes, postPercentMinSizes, postPercentMaxSizes, setInnerSizes];
}