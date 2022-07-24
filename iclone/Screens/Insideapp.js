import { View, Text,StyleSheet,Button } from 'react-native';
import React from 'react'
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Home} from './Home'
import {Settings} from './Setting'

const styles = StyleSheet.create({
    homee:{
        flex: 1, alignItems:'center', justifyContent:'center',
    },
})
const Tab = createMaterialBottomTabNavigator();
   export const  InsideApp = () => {
     return (
      <Tab.Navigator initialRouteName="Home" barStyle={{  backgroundColor: '#ca011c' }} >
     
     <Tab.Screen name="Home" component={Home} options={{
       style: {backgroundColor:'red'},
        tabBarLabel: 'Home', tabBarColor :'red',
         tabBarIcon:({color}) => (
          <Ionicons name="ios-home" color = {color} size ={23} /> ),
        }}
      />
     <Tab.Screen name="Settings" component={Settings} 
     options={{ 
       tabBarLabel: 'Settings', tabBarColor:'red',
        tabBarIcon:({color}) => (
      <Ionicons name="settings" color = {color} size ={23} /> ),
     }}/>
      </Tab.Navigator>
     );
  }