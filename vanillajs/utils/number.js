export const toNum = (num) => {
  return (num * 1).toFixed(2) * 1;
};

export const toString = (num, fixedTo = 2) => {
  return (num * 1).toFixed(fixedTo);
};

export default {
  toNum,
  toString
};
