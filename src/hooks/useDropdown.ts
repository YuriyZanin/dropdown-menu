import { useEffect, useRef, useState } from 'react';
import { Position } from '../types/dropdown';

export const useDropdown = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [position, setPosition] = useState<Position[]>([]);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsOpen(prev => !prev);

  const closeMenu = () => setIsOpen(false);

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
  }, [isOpen]);

  return { isOpen, toggleMenu, closeMenu, position, dropdownRef, menuRef };
};
