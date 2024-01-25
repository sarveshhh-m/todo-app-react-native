/* eslint-disable react-native/no-inline-styles */
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
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {updateTodo} from '../../../../utils/redux/reducers/todoSlice';

interface AddTodoModalTypes {
  visible: boolean;
  handleAddTodo: () => void;
  newTodo: any;
  setNewTodo: any;
  updateId: string;
  setModalForm: any;
  setUpdateId: any;
}

const AddTodoModal = ({
  visible,
  handleAddTodo,
  newTodo,
  setNewTodo,
  updateId,
  setModalForm,
  setUpdateId,
}: AddTodoModalTypes) => {
  const [timeModal, setTimeModal] = useState(false);
  const [label, setLabel] = useState<string>('setTime');
  const dispatch = useDispatch();
  const todos = useSelector((state: any) => {
    return state.todoReducer.todoList;
  });

  useEffect(() => {
    if (updateId) {
      const todoToUpdate = todos.find((item: any) => item.id === updateId);
      console.log(todoToUpdate);
      if (todoToUpdate) {
        setNewTodo({
          title: todoToUpdate.title,
          description: todoToUpdate.description,
          notification: todoToUpdate.notification,
          timestamp: todoToUpdate.timestamp,
        });
        setLabel('Updated Time'); // Customize this label if needed
      }
    }
  }, [updateId, todos, setNewTodo]);

  const handleUpdateTodo = () => {
    dispatch(
      updateTodo({
        id: updateId,
        title: newTodo.title,
        description: newTodo.description,
        timestamp: newTodo.timestamp,
        completed: false,
        notification: newTodo.notification,
      }),
    );

    // Reset form and close modal
    setModalForm(false);
    setUpdateId('');
    setNewTodo({
      title: '',
      description: '',
      timestamp: Date.now(),
      completed: false,
      notification: false,
    });
  };

  return (
    <Modal visible={visible} transparent={false}>
      <View style={styles.modalContainer}>
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 0,
            right: 20,
            padding: 10,
          }}
          onPress={() => setModalForm(false)}>
          <Text
            style={{
              fontSize: 30,
            }}>
            x
          </Text>
        </TouchableOpacity>
        <Text style={styles.modalTitle}>
          {updateId ? 'UPDATE TODO' : 'ADD TODO'}
        </Text>
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
            onValueChange={() =>
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
          date={new Date(newTodo.timestamp)}
        />
        <Button
          title={updateId ? 'Update Todo' : 'Add Todo'}
          onPress={updateId ? handleUpdateTodo : handleAddTodo}
        />
      </View>
    </Modal>
  );
};

export default AddTodoModal;
