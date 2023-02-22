export default (time: string) => {
  return new Date(Date.parse(time)).toLocaleString('ru', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
};
