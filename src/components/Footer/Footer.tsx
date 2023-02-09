import React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import style from './Footer.scss';
import { useTypedSelector } from '../../redux/hooks';

const Footer = () => {
  const { isLightTheme } = useTypedSelector(({ common }) => common);
  const themeClass = isLightTheme ? style.footer_light : style.footer_dark;

  return (
    <footer className={themeClass}>
      <div className={style.footer__container}>
        <div className={style.footer__githubs}>
          <a
            className={style.footer__github}
            href="https://github.com/IvanBusygin"
            target="_blank"
            rel="noreferrer"
          >
            <GitHubIcon sx={{ fontSize: 30 }} />
          </a>
          <a
            className={style.footer__github}
            href="https://github.com/fgriff"
            target="_blank"
            rel="noreferrer"
          >
            <GitHubIcon sx={{ fontSize: 30 }} />
          </a>
          <a
            className={style.footer__github}
            href="https://github.com/teumik"
            target="_blank"
            rel="noreferrer"
          >
            <GitHubIcon sx={{ fontSize: 30 }} />
          </a>
        </div>
        <time
          className={style.footer__year}
          dateTime="2023"
        >
          2023
        </time>
        <a
          href="https://rs.school/js/"
          target="_blank"
          rel="noreferrer"
        >
          <span className={style.footer__logo} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
