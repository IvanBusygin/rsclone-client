import React from 'react';
import { useTypedSelector } from '../../redux/hooks';
import PageHeader from '../PageHeader/PageHeader';

const PageHeaderContainer = () => {
  const { isLightTheme } = useTypedSelector(({ common }) => common);
  const { infoData } = useTypedSelector(({ editPage }) => editPage);

  return (
    <PageHeader
      info={infoData}
      theme={isLightTheme}
    />
  );
};

export default PageHeaderContainer;
