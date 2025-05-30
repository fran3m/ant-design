import React from 'react';
import toList from '../_util/toList';
export const FontGap = 3;
const prepareCanvas = function (width, height) {
  let ratio = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const realWidth = width * ratio;
  const realHeight = height * ratio;
  canvas.setAttribute('width', `${realWidth}px`);
  canvas.setAttribute('height', `${realHeight}px`);
  ctx.save();
  return [ctx, canvas, realWidth, realHeight];
};
// Get boundary of rotated text
const getRotatePos = (x, y, angle) => {
  const targetX = x * Math.cos(angle) - y * Math.sin(angle);
  const targetY = x * Math.sin(angle) + y * Math.cos(angle);
  return [targetX, targetY];
};
/**
 * Get the clips of text content.
 * This is a lazy hook function since SSR no need this
 */
const useClips = () => {
  // Get single clips
  const getClips = (content, rotate, ratio, width, height, font, gapX, gapY) => {
    // ================= Text / Image =================
    const [ctx, canvas, contentWidth, contentHeight] = prepareCanvas(width, height, ratio);
    if (content instanceof HTMLImageElement) {
      // Image
      ctx.drawImage(content, 0, 0, contentWidth, contentHeight);
    } else {
      // Text
      const {
        color,
        fontSize,
        fontStyle,
        fontWeight,
        fontFamily,
        textAlign
      } = font;
      const mergedFontSize = Number(fontSize) * ratio;
      ctx.font = `${fontStyle} normal ${fontWeight} ${mergedFontSize}px/${height}px ${fontFamily}`;
      ctx.fillStyle = color;
      ctx.textAlign = textAlign;
      ctx.textBaseline = 'top';
      const contents = toList(content);
      contents === null || contents === void 0 ? void 0 : contents.forEach((item, index) => {
        ctx.fillText(item !== null && item !== void 0 ? item : '', contentWidth / 2, index * (mergedFontSize + FontGap * ratio));
      });
    }
    // ==================== Rotate ====================
    const angle = Math.PI / 180 * Number(rotate);
    const maxSize = Math.max(width, height);
    const [rCtx, rCanvas, realMaxSize] = prepareCanvas(maxSize, maxSize, ratio);
    // Copy from `ctx` and rotate
    rCtx.translate(realMaxSize / 2, realMaxSize / 2);
    rCtx.rotate(angle);
    if (contentWidth > 0 && contentHeight > 0) {
      rCtx.drawImage(canvas, -contentWidth / 2, -contentHeight / 2);
    }
    let left = 0;
    let right = 0;
    let top = 0;
    let bottom = 0;
    const halfWidth = contentWidth / 2;
    const halfHeight = contentHeight / 2;
    const points = [[0 - halfWidth, 0 - halfHeight], [0 + halfWidth, 0 - halfHeight], [0 + halfWidth, 0 + halfHeight], [0 - halfWidth, 0 + halfHeight]];
    points.forEach(_ref => {
      let [x, y] = _ref;
      const [targetX, targetY] = getRotatePos(x, y, angle);
      left = Math.min(left, targetX);
      right = Math.max(right, targetX);
      top = Math.min(top, targetY);
      bottom = Math.max(bottom, targetY);
    });
    const cutLeft = left + realMaxSize / 2;
    const cutTop = top + realMaxSize / 2;
    const cutWidth = right - left;
    const cutHeight = bottom - top;
    // ================ Fill Alternate ================
    const realGapX = gapX * ratio;
    const realGapY = gapY * ratio;
    const filledWidth = (cutWidth + realGapX) * 2;
    const filledHeight = cutHeight + realGapY;
    const [fCtx, fCanvas] = prepareCanvas(filledWidth, filledHeight);
    const drawImg = function () {
      let targetX = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      let targetY = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      fCtx.drawImage(rCanvas, cutLeft, cutTop, cutWidth, cutHeight, targetX, targetY, cutWidth, cutHeight);
    };
    drawImg();
    drawImg(cutWidth + realGapX, -cutHeight / 2 - realGapY / 2);
    drawImg(cutWidth + realGapX, +cutHeight / 2 + realGapY / 2);
    return [fCanvas.toDataURL(), filledWidth / ratio, filledHeight / ratio];
  };
  return React.useCallback(getClips, []);
};
export default useClips;