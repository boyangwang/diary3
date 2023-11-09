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
