import type { JSX } from 'react';

export interface DropdownItem {
  label: string;
  icon?: JSX.Element | string;
  onClick?: () => void;
}

export enum Position {
  Top = 'top',
  Bottom = 'bottom',
  Left = 'left',
  Right = 'right',
  Hidden = 'hidden',
}
