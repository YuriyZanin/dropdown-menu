import { type DropdownItem } from '../../types/dropdown';
import { MenuItem } from './menu-item';
import './dropdown-menu.css';
import { useDropdown } from '../../hooks/useDropdown';

interface DropdownMenuProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  trigger,
  items,
}) => {
  const { isOpen, toggleMenu, closeMenu, position, dropdownRef, menuRef } =
    useDropdown();

  const handleClickMenuItem = (item: DropdownItem) => {
    if (isOpen) {
      closeMenu();
    }
    if (item.onClick) item.onClick();
  };

  return (
    <div className="dropdown" ref={dropdownRef}>
      <div className="trigger" onClick={toggleMenu}>
        {trigger}
      </div>

      <div
        className={`menu ${position.join(' ')} ${isOpen ? 'open' : ''}`}
        ref={menuRef}
      >
        {items.map((item, index) => (
          <MenuItem
            key={index}
            text={item.label}
            icon={item.icon}
            onClick={() => handleClickMenuItem(item)}
          />
        ))}
      </div>
    </div>
  );
};
