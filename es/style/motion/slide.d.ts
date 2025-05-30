import type { CSSInterpolation } from '@ant-design/cssinjs';
import { Keyframes } from '@ant-design/cssinjs';
import type { AliasToken, TokenWithCommonCls } from '../../theme/internal';
export declare const slideUpIn: Keyframes;
export declare const slideUpOut: Keyframes;
export declare const slideDownIn: Keyframes;
export declare const slideDownOut: Keyframes;
export declare const slideLeftIn: Keyframes;
export declare const slideLeftOut: Keyframes;
export declare const slideRightIn: Keyframes;
export declare const slideRightOut: Keyframes;
type SlideMotionTypes = 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right';
export declare const initSlideMotion: (token: TokenWithCommonCls<AliasToken>, motionName: SlideMotionTypes) => CSSInterpolation;
export {};
