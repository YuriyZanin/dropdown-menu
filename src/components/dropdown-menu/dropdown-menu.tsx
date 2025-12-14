import { useEffect, useRef, useState } from 'react';
import { Position, type DropdownItem } from './types';
import { MenuItem } from '../../elements/menu-item/menu-item';
import './dropdown-menu.css';

interface DropdownMenuProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  trigger,
  items,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [position, setPosition] = useState<Position[]>([]);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const calculatePosition = () => {
      if (!menuRef.current || !dropdownRef.current) return;

      const triggerRect = dropdownRef.current.getBoundingClientRect();
      const menuRect = menuRef.current.getBoundingClientRect();

      const spaceTop = triggerRect.top;
      const spaceBottom = window.innerHeight - triggerRect.bottom;
      const spaceLeft = triggerRect.left;
      const spaceRight = window.innerWidth - triggerRect.right;

      const canOpenTop = spaceTop >= menuRect.height;
      const canOpenBottom = spaceBottom >= menuRect.height;
      const canOpenLeft = spaceLeft >= menuRect.width;
      const canOpenRight = spaceRight >= menuRect.width;

      let classes: Position[] = [];

      if (canOpenBottom) {
        classes.push(Position.Bottom);
      } else if (canOpenTop) {
        classes.push(Position.Top);
      }

      if (canOpenRight) {
        classes.push(Position.Right);
      } else if (canOpenLeft) {
        classes.push(Position.Left);
      }

      const isOutOfView =
        (menuRect.top < 0 && classes.includes(Position.Bottom)) ||
        (menuRect.bottom > window.innerHeight &&
          classes.includes(Position.Top));

      if (isOutOfView) {
        classes.push(Position.Hidden);
      } else {
        classes = classes.filter(item => item !== Position.Hidden);
      }

      setPosition(classes);
    };

    calculatePosition();

    window.addEventListener('scroll', calculatePosition);
    window.addEventListener('resize', calculatePosition);

    return () => {
      window.removeEventListener('scroll', calculatePosition);
      window.removeEventListener('resize', calculatePosition);
    };
  }, [menuRef, isOpen]);

  const toggleMenu = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };

  const handleClickMenuItem = (item: DropdownItem) => {
    if (isOpen) {
      setIsOpen(false);
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
