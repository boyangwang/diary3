import { Menu, MenuProps } from 'antd';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { PAGES } from '../../constants';

const items: MenuProps['items'] = PAGES.map((page) => {
  return {
    label: (<Link to={`/${page.toLowerCase()}`}>{`${page[0].toUpperCase()}${page.slice(1)}`}</Link>),
    key: page.toLowerCase(),
  };
});

function Navbar({ activeKey }: { activeKey: string | undefined }) {
  return <Menu className="diary-navbar" selectedKeys={activeKey ? [activeKey] : []} mode="horizontal" items={items} />;
}

export default Navbar;
