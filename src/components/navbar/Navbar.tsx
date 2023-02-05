import { Menu, MenuProps } from 'antd';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { PAGES } from '../../constants';
import DiaryIcons from '../icons/DiaryIcons';

const items: MenuProps['items'] = PAGES.map((page) => {
  const iconKey = `${page[0].toUpperCase()}${page.slice(1)}NavIcon` as keyof typeof DiaryIcons;
  const IconComponent = DiaryIcons[iconKey] || null;

  return {
    label: (<Link to={`/${page.toLowerCase()}`}>
      <IconComponent />
    </Link>),
    key: page.toLowerCase(),
  };
});

function Navbar({ activeKey }: { activeKey: string | undefined }) {
  return (
    <nav className="diary-navbar">
      <Menu selectedKeys={activeKey ? [activeKey] : []} mode="horizontal" items={items} />
    </nav>
  );
}

export default Navbar;
