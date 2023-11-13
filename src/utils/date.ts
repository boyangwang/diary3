import dayjs from 'dayjs';

export const formatDateTime = (timestamp?: string | number | Date | null, showSeconds = true) =>
  timestamp ? dayjs(timestamp).format(`h:mm${showSeconds ? ':ss' : ''}a | ddd YYYY MMM DD`) : '';

export const formatDate = (timestamp?: string | number | Date | null) =>
  timestamp ? dayjs(timestamp).format('YYYY MMM DD') : '';

export const getDaysFromDateToDateNow = (startDate: string | number) => {
  const start = dayjs(startDate);
  const now = dayjs();
  const days = [];

  for (let date = start; date.isBefore(now) || date.isSame(now); date = date.add(1, 'day')) {
    days.push(date.format('YYYY-MM-DD'));
  }
  console.log('=====================getDaysFromDateToDateNow', { days });
  return days;
};

export const getWeeksFromDateToDateNow = (startDate: string | number) => {
  const start = dayjs(startDate).startOf('week');
  const now = dayjs();
  const weeks = [];

  for (let date = start; date.isBefore(now) || date.isSame(now); date = date.add(1, 'week')) {
    weeks.push(date.format('YYYY-MM-DD'));
  }

  return weeks;
};

export const getMonthsFromDateToDateNow = (startDate: string | number) => {
  const start = dayjs(startDate).startOf('month');
  const now = dayjs();
  const months = [];

  for (let date = start; date.isBefore(now) || date.isSame(now); date = date.add(1, 'month')) {
    months.push(date.format('YYYY-MM'));
  }

  return months;
};
