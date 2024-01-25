import PushNotification, {Importance} from 'react-native-push-notification';
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

const createChannel = () =>
  PushNotification.createChannel(
    {
      channelId: 'reminders',
      channelName: 'reminders',
      channelDescription: 'a notification channel for handling notifications',
      importance: Importance.HIGH,
    },
    created => {
      console.log(created);
    },
  );

export {handleScheduledNotification, createChannel};
