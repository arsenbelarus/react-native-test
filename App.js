import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from "./HomeScreen";
import HistoryScreen from "./HistoryScreen";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function App() {

  const Tab = createBottomTabNavigator()

  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={({route}) => ({
                       TabBarIcon: ({focused, color, size}) => {
                         let iconName;

                         if (route.name === 'Home') {
                           iconName = focused
                             ? 'ios-information-circle'
                             : 'ios-information-circle-outline';
                         } else if (route.name === 'History') {
                           iconName = focused ? 'ios-list-box' : 'ios-list';
                         }
                         return <Ionicons name={iconName} size={size} color={color}/>;
                       },
                     })}
                     tabBarOptions={{
                       activeTintColor: 'tomato',
                       inactiveTintColor: 'gray',
                     }}
      >
        <Tab.Screen
          name={"Home"}
          options={{title: 'Home Screen'}}
          component={HomeScreen}
        />
        <Tab.Screen
          name={"History"}
          options={{title: 'History Screen'}}
          component={HistoryScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
