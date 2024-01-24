import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/Login/Login';
import Signup from '../screens/Signup/Signup';
import Tasks from '../screens/Tasks/Tasks';
import Reminders from '../screens/Reminders/Reminders';
import theme from '../theme';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import store, {persistor} from '../../utils/redux/store';
const Stack = createNativeStackNavigator();
const Nav = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer theme={theme}>
          <Stack.Navigator
            initialRouteName="tasks"
            screenOptions={{headerShown: false}}>
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="signup" component={Signup} />
            <Stack.Screen name="tasks" component={Tasks} />
            <Stack.Screen name="reminders" component={Reminders} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default Nav;
