import React, { FC, useState } from 'react';
import classNames from 'classnames';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useTypedSelector } from '../../redux/hooks';
import style from './MessengerFriendsList.scss';
import { IMessengerFriendsListProps } from '../../types/messenger';

const MessengerFriendsList: FC<IMessengerFriendsListProps> = (props) => {
  const { options, onOptionClick } = props;
  const [isActive, setIsActive] = useState(false);

  const { isLightTheme } = useTypedSelector(({ common }) => common);
  const themeClass = isLightTheme ? style.friendList_light : style.friendList_dark;

  const [selectedName, setSelectedName] = useState('Выберите диалог');

  const onClick = (id: string) => {
    onOptionClick(id);

    const friend = options.find((option) => option._id === id);

    if (friend) {
      setSelectedName(friend.info.fullName);
    }
  };

  return (
    <div
      className={classNames(style.friendList, themeClass)}
      onClick={() => setIsActive((s) => !s)}
      onKeyDown={() => {}}
    >
      <div className={style.friendList__selectedItem}>
        <span>{selectedName}</span>
        {isActive ? (
          <ArrowDropUpIcon style={{ fontSize: 'large' }} />
        ) : (
          <ArrowDropDownIcon style={{ fontSize: 'large' }} />
        )}
      </div>
      {isActive && (
        <div className={classNames(style.friendList__content)}>
          {options.map((option) => (
            <div
              key={option._id}
              className={style.friendList__item}
              onClick={() => onClick(option._id)}
              onKeyDown={() => {}}
            >
              {option.info.fullName}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MessengerFriendsList;
