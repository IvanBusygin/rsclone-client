import React from 'react';
import classNames from 'classnames';
import style from './FriendCardFound.scss';
import { useTypedSelector } from '../../../redux/hooks';
import { IDataPeople } from '../../../types/friends';
import userDefaultAvatar from '../../../assets/img/svg/user_default_icon.svg';
import ButtonAddToFriend from '../ButtonAddToFriend/ButtonAddToFriend';

const FriendCardFound = (props: IDataPeople) => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { _id, info } = props;
  const { isLightTheme } = useTypedSelector(({ common }) => common);
  const themeClass = isLightTheme ? style.friendsPage_light : style.friendsPage_dark;

  return (
    <div className={classNames(style.friendCard, themeClass)}>
      <div className={style.friendCard__container}>
        <div className={style.friendCard__avatar}>
          <img
            className={style.friendCard__avatar}
            src={info.avatar || userDefaultAvatar}
            alt="Avatar"
          />
        </div>
        <div className={style.friendCard__info}>
          <p className={style.friendCard__name}>{info.fullName}</p>
        </div>
      </div>
      <ButtonAddToFriend id={_id} />
    </div>
  );
};

export default FriendCardFound;
