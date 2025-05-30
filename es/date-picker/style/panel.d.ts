import type { CSSObject } from '@ant-design/cssinjs';
import type { GenerateStyle } from '../../theme/internal';
import type { PickerToken, SharedPickerToken } from './token';
export declare const genPanelStyle: (token: SharedPickerToken) => CSSObject;
declare const genPickerPanelStyle: GenerateStyle<PickerToken>;
export default genPickerPanelStyle;
