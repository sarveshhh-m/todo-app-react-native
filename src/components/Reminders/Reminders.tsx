import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Modal} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomInput from '../../custom-comp/CustomInput';
import DatePicker from 'react-native-date-picker';
import {
  createReminderTable,
  getDataFromReminder,
  setDataInReminder,
  deleteRecord,
} from '../../db/remindersTX';
import Feather from 'react-native-vector-icons/Feather';
import {handleScheduledNotification} from '../../notifications.android';
import PushNotification from 'react-native-push-notification';
const Reminders = () => {
  const [reminderModal, setReminderModal] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [data, setData] = useState<any[]>([]);
  const [selectedTime, setSelectedTime] = useState<number>(0);
  const [timeModal, setTimeModal] = useState(false);
  const date = new Date(selectedTime);
  const timeString = date.toLocaleTimeString();

  useEffect(() => {
    createReminderTable();
    PushNotification.getScheduledLocalNotifications((notiff)=> console.log(notiff))
  }, []);

  useEffect(() => {
    getDataFromReminder(fetchedData => setData(fetchedData));
  }, [data]);

  const handleTime = (date: any) => {
    const timeStamp = date.getTime();
    console.log(timeStamp);
  };

  const addReminder = () => {
    setReminderModal(false);
    setDataInReminder(name, selectedTime);
    handleScheduledNotification(
      name,
      // 'this is message',
      new Date(selectedTime),
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.heading}>Reminders</Text>
        <TouchableOpacity
          onPress={() => setReminderModal(true)}
          style={styles.addReminderBtn}>
          <Text style={styles.addReminderBtnText}>Add Reminder</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {data.map(element => (
          <View key={element.id} style={styles.reminderItem}>
            <View style={styles.reminderItemContent}>
              <Text style={styles.reminderTitle}>{element.name}</Text>
              <Text style={styles.timestamp}>
                {new Date(element.timestamp).toLocaleString()}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {deleteRecord(element.id)
              // PushNotification.cancelLocalNotification()
              }}
              style={styles.deleteBtn}>
              <AntDesign name="delete" color={'rgba(255,0,0,0.5)'} size={25} />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <Modal transparent={true} visible={reminderModal} animationType="slide">
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={{fontSize: 24, color: '#000'}}>Add Reminder</Text>
              <TouchableOpacity style={styles.closeBtn}>
                {name !== '' && selectedTime !== 0 ? (
                  <Text
                    style={styles.addBtnText}
                    onPress={() => {
                      addReminder();
                      setName("")
                      setSelectedTime(0)
                    }}>
                    Done
                  </Text>
                ) : (
                  <Text
                    onPress={() =>
                      {
                        setReminderModal(false)
                      setName("")
                      setSelectedTime(0)
                      }
                      }
                    style={{color: '#888888'}}>
                    close
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          <View style={{backgroundColor:"#ddd",height:3, width:"100%", alignSelf:"center", marginTop:20}}>

          </View>

            <View style={{marginVertical: 50,padding:5}}>
              <Text style={styles.modalLabel}>
                Title<Text style={{color: 'red'}}>*</Text>
              </Text>
              <CustomInput
                onChangeText={(val: any) => setName(val)}
                tiStyles={styles.input}
                placeholder={'Enter Reminder Title'}
                value={name}
              />
              <Text style={styles.modalLabel}>Set Notification Timer</Text>
              <TouchableOpacity
                style={{
                  flexDirection: 'row-reverse',
                  justifyContent: 'center',
                  borderWidth: 1,
                  padding:10,
                backgroundColor:"#efe",
                marginVertical:10,
                borderRadius:5,
                width:"50%"
                }}
                onPress={() => setTimeModal(true)}>
                <Feather color={'orange'} size={25} name="clock" />
                {selectedTime ? (
                  <Text style={styles.timeDisplay}>{timeString}</Text>
                ) : (
                  <Text style={styles.setTimingText}>Set time</Text>
                )}
              </TouchableOpacity>
            <Text>
               {selectedTime !== 0 && <Text>{}</Text>}
              </Text>
              <DatePicker
                modal={true}
                open={timeModal}
                mode="datetime"
                onConfirm={date => {
                  setTimeModal(false);
                  setSelectedTime(date.getTime());
                }}
                onCancel={() => setTimeModal(false)}
                date={new Date()}
                onDateChange={date => handleTime(date)}
              />
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C3E50',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 10,
  },
  heading: {
    fontSize: 30,
    flex: 1,
    color: '#ECF0F1',
  },
  addReminderBtn: {
    backgroundColor: '#3498DB',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 5,
  },
  addReminderBtnText: {
    color: '#f8f8f8',
    fontSize: 12,
  },
  scrollViewContent: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  reminderItem: {
    flexDirection: 'row',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ddd',
    marginVertical: 5,
    padding: 15,
    backgroundColor: '#fff',
  },
  reminderItemContent: {
    flex: 1,
  },
  reminderTitle: {
    fontSize: 18,
    color: '#333',
  },
  timestamp: {
    color: '#888',
    fontSize: 12,
    marginTop: 5,
  },
  deleteBtn: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginLeft: 10,
  },
  modalContainer: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalContent: {
    width: '100%',
    height: '95%',
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    // borderRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  closeBtn: {
    // position: 'absolute',
    // top: 20,
    // right: 20,
    // height: 30,
    // width: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalLabel: {
    fontSize: 14,
    // marginHorizontal: 10,
    color: '#666',
  },
  input: {
    // margin: 10,
    marginVertical:10,
    color: '#333',
    backgroundColor: '#f8f8f8',
    // borderRadius: 10,
    padding: 10,
    fontSize:16
    // marginTop: 5,
  },
  timeDisplay: {
    color: '#3498DB',
    fontSize: 16,
    // marginTop: 10,
  },
  setTimingText: {
    color: '#888',
    fontSize: 16,
    // marginTop: 20,
  },
  addBtn: {
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#3498DB',
    marginTop: 10,
    justifyContent: 'center',
  },
  addBtnText: {
    color: '#3498db',
    fontSize: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
});

export default Reminders;
