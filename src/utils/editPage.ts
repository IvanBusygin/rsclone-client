export const yearsGenerator = (from: number, to = new Date().getFullYear()) => {
  const result = [];

  for (let i = from; i <= to; i += 1) {
    result.push(String(i));
  }

  return result;
};

export const daysGenerator = () => {
  return new Array(31).fill(0).map((_, idx) => String(idx + 1));
};
