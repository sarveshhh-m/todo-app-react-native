import {createSlice} from '@reduxjs/toolkit';
import {nanoid} from 'nanoid/non-secure';

interface stateInterface {
  todoList: {
    id: string;
    title: string;
    description: string;
    timestamp: number;
    completed: boolean;
    notification: boolean;
  }[];
}

const initialState: stateInterface = {
  todoList: [],
};
const todoReducer = createSlice({
  name: 'todoReducer',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const todo = {
        id: nanoid(8),
        title: action.payload.title,
        description: action.payload.description,
        timestamp: action.payload.timestamp,
        completed: action.payload.completed,
        notification: action.payload.notification,
      };
      state.todoList.push(todo);
    },
    removeTodo: (state, action) => {
      state.todoList = state.todoList.filter(
        todo => todo.id !== action.payload,
      );
    },
    updateTodo: (state, action) => {
      const todoToUpdate = state.todoList.find(
        todo => todo.id === action.payload.id,
      );

      if (todoToUpdate) {
        todoToUpdate.title = action.payload.title || todoToUpdate.title;
        todoToUpdate.description =
          action.payload.description || todoToUpdate.description;
        todoToUpdate.timestamp =
          action.payload.timestamp || todoToUpdate.timestamp;
        todoToUpdate.completed =
          action.payload.completed || todoToUpdate.completed;
        todoToUpdate.notification =
          action.payload.notification || todoToUpdate.notification;
      }
    },
  },
});

export const {addTodo, removeTodo, updateTodo} = todoReducer.actions;
export default todoReducer.reducer;
