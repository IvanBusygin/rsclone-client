import React from 'react';
import { Link } from 'react-router-dom';
import style from './Logo.scss';
import logoIcon from '../../assets/img/svg/logo.svg';

const Logo = () => {
  return (
    <Link
      to="/"
      className={style.logo}
    >
      <img
        src={logoIcon}
        alt="Logo"
      />
    </Link>
  );
};

export default Logo;
