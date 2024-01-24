import PushNotification from 'react-native-push-notification';
const handleScheduledNotification = (
  title: string,
  // message: string,
  date: Date,
) =>
  PushNotification.localNotificationSchedule({
    title: title,
    date: date,
    message: `Your reminder for ${title} at ${
      date.getHours() + ':' + date.getMinutes()
    }`,
    allowWhileIdle: true,
    channelId: 'reminders',
  });

const handleNotification = (title: string, message: string) =>
  PushNotification.localNotification({
    channelId: 'reminders',
    title: title,
    message: message,
  });

export {handleScheduledNotification, handleNotification};
