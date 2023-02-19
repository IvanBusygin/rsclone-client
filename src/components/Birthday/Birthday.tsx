import React, { FC } from 'react';
import style from './Birthday.scss';
import Select from '../Select/Select';
import { daysGenerator, formatDate, yearsGenerator } from '../../utils/editPage';
import { IBirthDayProps } from '../../types/editPage';

const Birthday: FC<IBirthDayProps> = (props) => {
  const { date, returnInfo } = props;

  const dayOptions = daysGenerator();
  const monthOptions = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ];
  const yearOptions = yearsGenerator(1930);

  const day = String(new Date(date).getDate());
  const month = new Date(date).getMonth();
  const year = String(new Date(date).getFullYear());

  const combineDate = (value: { [key: string]: string }) => {
    const [key] = Object.keys(value);
    switch (key) {
      case 'day':
        returnInfo({ birthDate: formatDate(+year, month, +value[key]) });
        break;
      case 'month': {
        const number = monthOptions.findIndex((m) => m === value[key]);
        returnInfo({ birthDate: formatDate(+year, number, +day) });
        break;
      }
      case 'year':
        returnInfo({ birthDate: formatDate(+value[key], month, +day) });
        break;
      default:
        break;
    }
  };

  return (
    <div className={style.birthday}>
      <div className={style.birthday__day}>
        <Select
          options={dayOptions}
          selected={day}
          fieldName="day"
          returnInfo={combineDate}
        />
      </div>
      <div className={style.birthday__month}>
        <Select
          options={monthOptions}
          selected={monthOptions[month]}
          fieldName="month"
          returnInfo={combineDate}
        />
      </div>
      <div className={style.birthday__year}>
        <Select
          options={yearOptions}
          selected={year}
          fieldName="year"
          returnInfo={combineDate}
        />
      </div>
    </div>
  );
};

export default Birthday;
