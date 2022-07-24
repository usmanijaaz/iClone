import { View, Text,StyleSheet,Button } from 'react-native';
import React from 'react'
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
    homee:{
        flex: 1, alignItems:'center', justifyContent:'center',
    },
})

  
export const  RemoveEvent = () => {
    return (
       <View style= {styles.homee}>
         <Text>Remove</Text>
       </View>
     );
  }