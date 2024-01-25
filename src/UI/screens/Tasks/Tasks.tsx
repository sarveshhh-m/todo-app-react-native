/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {addTodo, removeTodo} from '../../../utils/redux/reducers/todoSlice';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from './styles';
import AddTodoModal from './comp/AddTodoModal';
import theme from '../../theme';
import Feather from 'react-native-vector-icons/Feather';
import {
  createChannel,
  handleScheduledNotification,
} from '../../../notifications.android';

const Tasks = () => {
  const [modalForm, setModalForm] = useState<boolean>(false);
  const [updateId, setUpdateId] = useState<string>('');
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

  useEffect(() => {
    createChannel();
    console.log(updateId);
  }, [updateId]);

  const dispatch = useDispatch();

  const handleAddTodo = () => {
    dispatch(
      addTodo({
        title: newTodo.title,
        description: newTodo.description,
        timestamp: newTodo.timestamp,
        completed: newTodo.completed,
        notification: newTodo.notification,
      }),
    );

    handleScheduledNotification(newTodo.title, new Date(newTodo.timestamp));
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
      <TouchableOpacity
        onPress={() => {
          setUpdateId(item.id);
          setModalForm(true);
        }}
        style={{flex: 1}}>
        <Text style={{fontSize: 18, fontWeight: '500'}}>{item.title}</Text>
        <Text>{item.description}</Text>
      </TouchableOpacity>
      <View
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        {item.notification ? (
          <Feather
            name="bell"
            size={25}
            color={theme.colors.border}
            style={{marginHorizontal: 10}}
          />
        ) : (
          <Feather
            name="bell-off"
            size={25}
            color={theme.colors.border}
            style={{marginHorizontal: 10}}
          />
        )}

        <MaterialIcons
          name="edit"
          size={25}
          color={theme.colors.border}
          style={{marginHorizontal: 10}}
        />
        <MaterialIcons
          name="delete"
          size={25}
          color={theme.colors.notification}
          style={{marginHorizontal: 10}}
          onPress={() => dispatch(removeTodo(item.id))}
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={todos}
        keyExtractor={item => item.id}
        renderItem={renderItem}
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
        updateId={updateId}
        setModalForm={setModalForm}
        setUpdateId={setUpdateId}
      />
    </SafeAreaView>
  );
};

export default Tasks;
