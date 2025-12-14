import type { JSX } from 'react';

export interface DropdownItem {
  label: string;
  icon?: JSX.Element | string;
  onClick?: () => void;
}

export type Position = 'top' | 'bottom' | 'left' | 'right' | 'hidden';
