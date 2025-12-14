import type { FC, JSX } from 'react';
import './menu-item.css';

export interface MenuItemProps {
  text: string;
  icon?: JSX.Element | string;
  onClick?: () => void;
}

export const MenuItem: FC<MenuItemProps> = ({ icon, text, onClick }) => {
  return (
    <>
      <div className="menu-item" onClick={onClick}>
        <span className="menu-item-text">{text}</span>
        {!!icon && <span className="menu-item-icon">{icon}</span>}
      </div>
    </>
  );
};
