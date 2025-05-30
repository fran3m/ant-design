import * as React from 'react';
import type { TabsProps as RcTabsProps } from 'rc-tabs';
import type { GetIndicatorSize } from 'rc-tabs/lib/hooks/useIndicator';
import type { MoreProps, Tab } from 'rc-tabs/lib/interface';
import type { SizeType } from '../config-provider/SizeContext';
import TabPane from './TabPane';
import type { TabPaneProps } from './TabPane';
export type TabsType = 'line' | 'card' | 'editable-card';
export type TabsPosition = 'top' | 'right' | 'bottom' | 'left';
export type { TabPaneProps };
interface CompatibilityProps {
    /** @deprecated Please use `destroyOnHidden` instead */
    destroyInactiveTabPane?: boolean;
    /**
     * @since 5.25.0
     */
    destroyOnHidden?: boolean;
}
export interface TabsProps extends CompatibilityProps, Omit<RcTabsProps, 'editable' | 'destroyInactiveTabPane' | 'items'> {
    rootClassName?: string;
    type?: TabsType;
    size?: SizeType;
    hideAdd?: boolean;
    centered?: boolean;
    addIcon?: React.ReactNode;
    moreIcon?: React.ReactNode;
    more?: MoreProps;
    removeIcon?: React.ReactNode;
    onEdit?: (e: React.MouseEvent | React.KeyboardEvent | string, action: 'add' | 'remove') => void;
    children?: React.ReactNode;
    /** @deprecated Please use `indicator={{ size: ... }}` instead */
    indicatorSize?: GetIndicatorSize;
    items?: (Omit<Tab, 'destroyInactiveTabPane'> & CompatibilityProps)[];
}
declare const Tabs: React.FC<TabsProps> & {
    TabPane: typeof TabPane;
};
export default Tabs;
