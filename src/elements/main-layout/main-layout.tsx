import type { ReactNode } from 'react';
import './main-layout.css';

export interface MainLayoutProps {
  children?: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return <div className="layout">{children}</div>;
};
