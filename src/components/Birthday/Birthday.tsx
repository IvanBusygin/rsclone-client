import React, { useState } from 'react';
import style from './Birthday.scss';
import Select from '../Select/Select';
import { daysGenerator, yearsGenerator } from '../../utils/editPage';

const Birthday = () => {
  const [day, setDay] = useState('1');
  const [month, setMonth] = useState('Январь');
  const [year, setYear] = useState('1930');

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

  return (
    <div className={style.birthday}>
      <div className={style.birthday__day}>
        <Select
          options={dayOptions}
          selected={day}
          setSelected={setDay}
        />
      </div>
      <div className={style.birthday__month}>
        <Select
          options={monthOptions}
          selected={month}
          setSelected={setMonth}
        />
      </div>
      <div className={style.birthday__year}>
        <Select
          options={yearOptions}
          selected={year}
          setSelected={setYear}
        />
      </div>
    </div>
  );
};

export default Birthday;
