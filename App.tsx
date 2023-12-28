import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Tasks from './src/components/Tasks/Tasks';
import {createMaterialBottomTabNavigator} from 'react-native-paper/react-navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Reminders from './src/components/Reminders/Reminders';
import {View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import PushNotification, {Importance} from 'react-native-push-notification';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// const Tab = createMaterialBottomTabNavigator();
const Tab = createMaterialTopTabNavigator();
const App = () => {

  useEffect(() => {
    PushNotification.createChannel(
      {
        channelId: 'reminders',
        channelName: 'Reminders Channel',
        channelDescription: 'Default channel for Reminders',
        importance: Importance.HIGH,
        vibrate: false,
      },
      () => {
        console.log('channel created');
      },
    );
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          // shifting={true}
          // barStyle={{
          //   width: '100%',
          //   backgroundColor: 'white',
          //   height: 70,
          // }}
          >
          <Tab.Screen
            name="todo"
            component={Tasks}
            options={{
              tabBarLabel: 'Tasks',
              tabBarIcon: () => (
                <View>
                  <Entypo name="list" color={'black'} size={20} />
                </View>
              ),
            }}
          />
          <Tab.Screen
            name="reminders"
            component={Reminders}
            options={{
              tabBarLabel: 'Reminders',
              tabBarIcon: () => (
                <View>
                  <Entypo name="stopwatch" color={'black'} size={20} />
                </View>
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
export default App;
