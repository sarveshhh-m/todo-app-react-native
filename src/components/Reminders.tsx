import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Modal } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomInput from '../custom-comp/CustomInput';
import DatePicker from 'react-native-date-picker';
import {
  createReminderTable,
  getDataFromReminder,
  setDataInReminder,
  deleteRecord,
} from '../db/remindersTX';
import { handleScheduledNotification } from '../notifications.android';
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
    handleScheduledNotification(name,"this is message", new Date(selectedTime))
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
              onPress={() => deleteRecord(element.id)}
              style={styles.deleteBtn}>
              <AntDesign name="delete" color={"rgba(255,0,0,0.5)"} size={25} />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <Modal transparent={true} visible={reminderModal} animationType='fade'>
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalContent}>
          <Text style={{fontSize:30,color:"#3498DB", alignSelf:"center"}}>Add Reminder</Text>
            <TouchableOpacity
              onPress={() => setReminderModal(false)}
              style={styles.closeBtn}>
              <AntDesign name="close" size={25} color="#555" />
            </TouchableOpacity>
           <View style={{marginVertical:30}}>
           <Text style={styles.modalLabel}>Title</Text>
            <CustomInput
              onChangeText={(val: any) => setName(val)}
              tiStyles={styles.input}
              placeholder={'Enter Reminder Title'}
              value={name}
            />
            <Text style={styles.modalLabel}>Set Notification Timer</Text>
            <TouchableOpacity
            style={{alignItems:"center"}}
            onPress={() => setTimeModal(true)}>
              {selectedTime ? (
                <Text style={styles.timeDisplay}>{timeString}</Text>
              ) : (
                <Text style={styles.setTimingText}>Set time</Text>
              )}
            </TouchableOpacity>
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

            <TouchableOpacity
              onPress={() => {
                console.log(new Date(selectedTime));
                addReminder();
              }}
              style={styles.addBtn}>
              <Text style={styles.addBtnText}>Add</Text>
            </TouchableOpacity>
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
    margin:10
  },
  heading: {
    fontSize: 40,
    flex:1,
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
    fontSize: 16,
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
    height:"100%",
    width:"100%",
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalContent: {
    width: '100%',
    backgroundColor: '#fff',
    position:"absolute",
    bottom:0,
    // borderRadius: 20,
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
  padding:20
  },
  closeBtn: {
    position: 'absolute',
    top: 20,
    right: 20,
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalLabel: {
    fontSize: 18,
    marginHorizontal: 10,
    color: '#333',
  },
  input: {
    width: '90%',
    margin: 10,
    color: '#333',
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 10,
    marginTop: 5,
  },
  timeDisplay: {
    color: '#3498DB',
    fontSize: 16,
    marginTop: 10,
  },
  setTimingText: {
    color: '#888',
    fontSize: 16,
    marginTop: 10,
  },
  addBtn: {
    padding:10,
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#3498DB',
    marginTop: 10,
    justifyContent: 'center',
  },
  addBtnText: {
    color: '#f8f8f8',
    fontSize: 20,
  },
});

export default Reminders;
