import { toast } from 'react-toastify';

export const notify = async ({ title, msg }: { title: string; msg?: string }) => {
  if (window.Notification && Notification.permission !== 'granted') {
    Notification.requestPermission((status) => {
      // 这将使我们能在 Chrome/Safari 中使用 Notification.permission
      if (Notification.permission !== status) {
        // @ts-ignore
        Notification.permission = status;
      }
    });
  }
  if (Notification.permission === 'granted') {
    let n = new Notification(title, {
      body: msg,
    });
  } else {
    toast(title, { autoClose: false });
  }
};

export function downloadICSFile(eventDetails: { title: string; description?: string; start: string; end: string }) {
  const { title, description = '', start, end } = eventDetails;

  // 格式化日期为UTC格式：'YYYYMMDDTHHmmssZ'
  const startFormatted = formatToICSDate(new Date(start));
  const endFormatted = formatToICSDate(new Date(end));

  // 创建ICS文件内容
  const icsData = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'BEGIN:VEVENT',
    `UID:${uuidv4()}`, // 使用uuid库生成唯一标识符
    `DTSTART:${startFormatted}`,
    `DTEND:${endFormatted}`,
    `SUMMARY:${escapeICSString(title)}`,
    `DESCRIPTION:${escapeICSString(description)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
  window.open('data:text/calendar;charset=utf8,' + escape(icsData));
  // document.body.removeChild(link);
}

// 格式化日期为ICS所需的格式
function formatToICSDate(date: Date) {
  return date.toISOString().replace(/-|:|\.\d+/g, '');
}

// 转义文本中的特殊字符
function escapeICSString(str: string) {
  return str.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,');
}

// 生成一个版本4的UUID
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
