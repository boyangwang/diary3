import dayjs from 'dayjs';

export const formatDateTime = (timestamp: string | number | null, showSeconds = true) =>
  timestamp ? dayjs(timestamp).format(`h:mm${showSeconds ? ':ss' : ''}a | ddd YYYY MMM DD`) : '';

export const formatDate = (timestamp: string | number | null) => (timestamp ? dayjs(timestamp).format('YYYY MMM DD') : '');
