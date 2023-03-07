import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import style from './NavItem.scss';
import { INavItemProps } from '../../../types/navigation';

const NavItem: FC<INavItemProps> = (props) => {
  const { route, icon, name, count } = props;

  return (
    <Link
      to={route}
      className={style.navItem}
    >
      <div className={style.navItem__icon}>
        <img
          src={icon}
          alt="Icon"
        />
      </div>
      <span className={style.navItem__name}>{name}</span>
      {count !== 0 && count !== undefined && <span className={style.navItem__count}>{count}</span>}
    </Link>
  );
};

export default NavItem;
