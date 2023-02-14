import React, { FC } from 'react';
import style from './NavItem.scss';
import { INavItemProps } from '../../../types/navigation';

const NavItem: FC<INavItemProps> = (props) => {
  const { icon, name, count } = props;

  return (
    <li className={style.navItem}>
      <div className={style.navItem__icon}>
        <img
          src={icon}
          alt="Icon"
        />
      </div>
      <span className={style.navItem__name}>{name}</span>
      {count && <span className={style.navItem__count}>{count}</span>}
    </li>
  );
};

export default NavItem;
