export const yearsGenerator = (from: number, to = new Date().getFullYear()) => {
  const result = [];

  for (let i = from; i <= to; i += 1) {
    result.push(String(i));
  }

  return result;
};

export const daysGenerator = (daysCount: number) => {
  return new Array(daysCount).fill(0).map((_, idx) => String(idx + 1));
};

export const formatDate = (y: number, m: number, d: number) => {
  const timestamp = new Date(y, m, d).getTime();
  const offset = new Date().getTimezoneOffset();
  return new Date(timestamp - offset).toISOString();
};
