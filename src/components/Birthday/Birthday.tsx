import React, { FC } from 'react';
import style from './Birthday.scss';
import Select from '../Select/Select';
import {
  daysGenerator,
  formatDate,
  getCountDays,
  getMonthNumber,
  yearsGenerator,
} from '../../utils/editPage';
import { IBirthDayProps } from '../../types/editPage';

const Birthday: FC<IBirthDayProps> = (props) => {
  const { date, returnInfo } = props;

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

  const day = new Date(date).getDate();
  const month = new Date(date).getMonth();
  const year = new Date(date).getFullYear();

  const days = getCountDays(year, month);
  const dayOptions = daysGenerator(days);

  const combineDate = (value: { [key: string]: string }) => {
    const [key] = Object.keys(value);
    let daysCount;

    switch (key) {
      case 'day':
        returnInfo({ birthDate: formatDate(year, month, +value[key]) });
        break;
      case 'month': {
        const monthNumber = getMonthNumber(value[key], monthOptions);
        daysCount = getCountDays(year, monthNumber);

        if (day > daysCount) {
          returnInfo({ birthDate: formatDate(year, monthNumber, 1) });
        } else {
          const number = monthOptions.findIndex((m) => m === value[key]);
          returnInfo({ birthDate: formatDate(year, number, day) });
        }
        break;
      }
      case 'year':
        daysCount = getCountDays(+value[key], month);

        if (day > daysCount) {
          returnInfo({ birthDate: formatDate(+value[key], month, 1) });
        } else {
          returnInfo({ birthDate: formatDate(+value[key], month, day) });
        }
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
          selected={String(day)}
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
          selected={String(year)}
          fieldName="year"
          returnInfo={combineDate}
        />
      </div>
    </div>
  );
};

export default Birthday;
