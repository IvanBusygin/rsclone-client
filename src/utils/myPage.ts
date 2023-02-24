export default (time: string) => {
  const dateString = new Date(Date.parse(time)).toLocaleString('ru', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });

  return dateString.replace('г.,', 'в');
};
