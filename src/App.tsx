import './App.css';
import { DropdownMenu } from './components/dropdown-menu/dropdown-menu';
import type { DropdownItem } from './components/dropdown-menu/types';
import { shareIcon, editIcon, triggerIcon, deleteIcon } from './assets/index';

function App() {
  const menuItems: DropdownItem[] = [
    {
      label: 'Поделиться в социальных сетях',
      icon: <img src={shareIcon} />,
      onClick: () => console.log('click button'),
    },
    {
      label: 'Редактировать страницу',
      icon: <img src={editIcon} />,
      onClick: () => console.log('click button'),
    },
    {
      label: 'Удалить страницу',
      icon: <img src={deleteIcon} />,
      onClick: () => console.log('click button'),
    },
  ];

  const button = <img src={triggerIcon} alt="Меню" />;

  return (
    <>
      <div className="page">
        <DropdownMenu trigger={button} items={menuItems} />
        <DropdownMenu trigger={button} items={menuItems} />
        <DropdownMenu trigger={button} items={menuItems} />
      </div>
    </>
  );
}

export default App;
