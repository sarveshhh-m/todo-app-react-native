import PushNotification from 'react-native-push-notification';

const handleScheduledNotification = (
  title: string,
  message: string,
  date: Date,
) =>
PushNotification.localNotificationSchedule({
  title:title,
  date:date,
  message:message,
  allowWhileIdle:true,
  channelId: "reminders"
});

  const handleNotification = (title:string,message:string) => PushNotification.localNotification({
   channelId:"reminders",
    title:title,
    message:message
  })



  export {handleScheduledNotification, handleNotification}