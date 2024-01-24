import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {addTodo, removeTodo} from '../../../utils/redux/reducers/todoSlice';
import {Switch} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import PushNotification from 'react-native-push-notification';
import styles from './styles';
import AddTodoModal from './comp/AddTodoModal';
const Tasks = () => {
  const [modalForm, setModalForm] = useState<boolean>(false);
  const [newTodo, setNewTodo] = useState({
    title: '',
    description: '',
    completed: false,
    timestamp: Date.now(),
    notification: false,
  });
  const todos = useSelector((state: any) => {
    return state.todoReducer.todoList;
  });
  const timestamps = todos
    .map((item: any) => item.timestamp)
    .filter((item: any) => item > Date.now());
  useEffect(() => {
    console.log(todos);
    console.log(timestamps);
  });
  const dispatch = useDispatch();
  const handleAddTodo = () => {
    PushNotification.localNotification({
      channelId: 'default',
      message: 'TEST',
      playSound: true,
    });

    dispatch(
      addTodo({
        title: newTodo.title,
        description: newTodo.description,
        timestamp: newTodo.timestamp,
        completed: newTodo.completed,
        notification: newTodo.notification,
      }),
    );

    setNewTodo({
      title: '',
      description: '',
      completed: false,
      notification: false,
      timestamp: Date.now(),
    });

    setModalForm(false);
  };

  const renderItem = ({item}: any) => (
    <View style={styles.listItemContainer}>
      <Text>{item.title}</Text>
      <Text>{item.description}</Text>
      <Switch value={item.notification} />
      <Switch value={item.completed} />
      <MaterialIcons
        name="delete"
        size={25}
        onPress={() => dispatch(removeTodo(item.id))}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={todos}
        keyExtractor={item => item.id}
        renderItem={item => renderItem(item)}
      />
      <TouchableOpacity
        onPress={() => setModalForm(true)}
        style={styles.addButton}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
      <AddTodoModal
        visible={modalForm}
        newTodo={newTodo}
        setNewTodo={setNewTodo}
        handleAddTodo={handleAddTodo}
      />
    </SafeAreaView>
  );
};

export default Tasks;
