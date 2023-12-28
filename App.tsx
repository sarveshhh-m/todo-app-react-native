import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Tasks from './src/components/Tasks/Tasks';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Reminders from './src/components/Reminders/Reminders';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import PushNotification, {Importance} from 'react-native-push-notification';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Profile from './src/components/Profile/Profile';
const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

const styles = StyleSheet.create({
  profileIcon:{

  }
})

const App = () => {
  const [profileImageExist, ifProfileImageExist] = useState<boolean>(false)

  useEffect(() => {
    // PushNotification.cancelAllLocalNotifications()
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


const TopBarTabs = ({navigation}:any) => {

  return (
    <SafeAreaProvider>
      <View style={{flexDirection:"row", justifyContent:"space-between", padding:10, backgroundColor:"#ffa"}}>
       <TouchableOpacity style={styles.profileIcon} onPress={() => navigation.navigate('profile')}>
{
  profileImageExist ?
   null:   // will add the picture later
    <FontAwesome name='user-circle' color={"black"} size={30} />
}
       </TouchableOpacity>
        <Text>Hello</Text>
      </View>
      <Tab.Navigator screenOptions={{swipeEnabled:true,tabBarLabelStyle:{fontSize:12, height:15}}}>
        <Tab.Screen
          name="todo"
          component={Tasks}
          options={{
            tabBarLabel: 'Tasks',

          }}

        />
        <Tab.Screen
          name="reminders"
          component={Reminders}
          options={{
            tabBarLabel: 'Reminders',
          }}
        />
      </Tab.Navigator>
    </SafeAreaProvider>
  );
};

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="tabs"
            component={TopBarTabs}
            options={{headerShown: false}}
          />
          <Stack.Screen name='profile' component={Profile} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
export default App;
