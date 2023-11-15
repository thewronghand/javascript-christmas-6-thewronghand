const year = 2023;
const month = 11;
const dayStart = 1;
const dayEnd = 31;
const defaultDate = new Date(year, month, dayStart);

const DATE = Object.freeze({
  year,
  month,
  dayStart,
  dayEnd,
  defaultDate,
});

export default DATE;
