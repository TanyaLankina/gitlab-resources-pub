import { notification } from 'antd';

interface Notification {
  type: 'success' | 'info' | 'error' | 'warning';
  title: string;
  description?: string;
}

const openNotification = ({ type, title, description }: Notification) => {
  notification[type]({
    message: title,
    description: description,
  });
};

export default openNotification;
