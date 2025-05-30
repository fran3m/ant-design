import type { CSSObject } from '@ant-design/cssinjs';
import type { AliasToken } from '../theme/internal';
export declare const textEllipsis: CSSObject;
export declare const resetComponent: (token: AliasToken, needInheritFontFamily?: boolean) => CSSObject;
export declare const resetIcon: () => CSSObject;
export declare const clearFix: () => CSSObject;
export declare const genLinkStyle: (token: AliasToken) => CSSObject;
export declare const genCommonStyle: (token: AliasToken, componentPrefixCls: string, rootCls?: string, resetFont?: boolean) => CSSObject;
export declare const genFocusOutline: (token: AliasToken, offset?: number) => CSSObject;
export declare const genFocusStyle: (token: AliasToken, offset?: number) => CSSObject;
export declare const genIconStyle: (iconPrefixCls: string) => CSSObject;
export declare const operationUnit: (token: AliasToken) => CSSObject;
