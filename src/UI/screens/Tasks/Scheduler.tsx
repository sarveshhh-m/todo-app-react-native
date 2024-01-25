import PushNotification from 'react-native-push-notification';
import {UseSelector} from 'react-redux';
const Scheduler = (timestamp: number) =>
  PushNotification.scheduleLocalNotification({
    date: new Date(timestamp),
    message: 'hello there',
  });
