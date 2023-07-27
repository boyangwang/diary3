import { Link, useLocation, useMatches } from 'react-router-dom';
import { PAGES } from '../../app/types-constants';
import DiaryIcons from './DiaryIcons';
import clsx from 'clsx';
import { useMemo } from 'react';

function Navbar() {
  const location = useLocation();
  const activeKey = useMemo(() => {
    const path = location.pathname.slice(1);
    return PAGES.includes(path) ? path : '';
  }, [location]);
  return (
    <nav className="flex w-full items-center rounded-xl bg-white/90 px-8 shadow-xl backdrop-blur">
      {PAGES.map((page) => {
        const iconKey = `${page[0].toUpperCase()}${page.slice(1)}NavIcon` as keyof typeof DiaryIcons;
        const IconComponent = DiaryIcons[iconKey] || null;

        return (
          <Link
            key={page.toLowerCase()}
            className={clsx(
              'flex flex-grow items-center justify-center rounded-t-lg py-4',
              activeKey === page ? 'text-blue' : 'text-[#9FC2D7]',
            )}
            to={`/${page.toLowerCase()}`}
          >
            <IconComponent className="text-2xl" />
          </Link>
        );
      })}
    </nav>
  );
}

export default Navbar;
