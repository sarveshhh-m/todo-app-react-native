import {
  Button,
  Modal,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from '../styles';
import DatePicker from 'react-native-date-picker';
import React, {useState} from 'react';
interface AddTodoModalTypes {
  visible: boolean;
  handleAddTodo: () => void;
  newTodo: any;
  setNewTodo: any;
}

const AddTodoModal = ({
  visible,
  handleAddTodo,
  newTodo,
  setNewTodo,
}: AddTodoModalTypes) => {
  const [timeModal, setTimeModal] = useState(false);
  const [label] = useState<string>('setTime');
  // function handleTime(date: Date) {
  //   setLabel(date.toLocaleDateString());
  // }

  return (
    <Modal visible={visible} transparent={false}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>MODAL FORM</Text>
        <TextInput
          placeholder="Title"
          value={newTodo.title}
          onChangeText={text => setNewTodo({...newTodo, title: text})}
          style={styles.input}
        />
        <TextInput
          placeholder="Description"
          value={newTodo.description}
          onChangeText={text => setNewTodo({...newTodo, description: text})}
          style={styles.input}
        />
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.notificationText}>Notification</Text>
          <Switch
            value={newTodo.notification}
            onChange={() =>
              setNewTodo({...newTodo, notification: !newTodo.notification})
            }
          />
        </View>
        <TouchableOpacity onPress={() => setTimeModal(true)}>
          <Text style={{margin: 20}}>{label}</Text>
        </TouchableOpacity>
        <DatePicker
          modal={true}
          open={timeModal}
          mode="datetime"
          onConfirm={date => {
            setTimeModal(false);
            setNewTodo({...newTodo, timestamp: date.getTime()});
          }}
          onCancel={() => setTimeModal(false)}
          date={new Date()}
          // onDateChange={date => handleTime(date)}
        />
        <Button title="Add Todo" onPress={handleAddTodo} />
      </View>
    </Modal>
  );
};
export default AddTodoModal;
