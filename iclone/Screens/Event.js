import {ScrollView, View, Text,TextInput,TouchableOpacity, StyleSheet,Button } from 'react-native';
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { DetailsofEvent } from './DetailsofEvent';

export const  Event = (props) => {
    return (
          <View >
              <Text style={{marginTop:20,fontSize:18,fontWeight:'bold'}}> <Ionicons name="ios-clipboard" color = 'grey' size ={23} /> {props.data?.From}</Text>                
        </View> 
      );
    }