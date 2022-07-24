import {ScrollView, View, Text,TextInput,TouchableOpacity, StyleSheet,Button } from 'react-native';
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';

export const  DetailsofEvent = ({route}) => {
    return (
       
          <View >
              {/* <Text style={{color:'white',marginTop:20,paddingVertical:10 ,fontSize:30,fontWeight:'bold',backgroundColor:"#e89b9b"}}> Details of event</Text>       */}
              <Text style={{
                backgroundColor: "red",
                top:10,
                marginBottom:10,
                paddingVertical:10,
                paddingHorizontal:8,
                fontSize:17,
                fontWeight:'bold',
                color:"white",
              }}>From:</Text> 
              <Text  style={{fontWeight:'bold',fontSize:18,}}>  {route?.params?.From}</Text> 
              <Text style={{
                backgroundColor: "red",
                top:10,
                marginBottom:10,
                paddingVertical:10,
                paddingHorizontal:8,
                fontSize:17,
                fontWeight:'bold',
                color:"white",
              }}>Date:</Text> 
              <Text  style={{fontWeight:'bold',fontSize:18,}}>  {route?.params?.Date}</Text> 
              <Text style={{
                backgroundColor: "red",
                top:10,
                marginBottom:10,
                paddingVertical:10,
                paddingHorizontal:8,
                fontSize:17,
                fontWeight:'bold',
                color:"white",
              }}>Task Details:</Text> 
              <Text  style={{fontWeight:'bold',fontSize:18,}}>  {route?.params?.Imperative}</Text> 
              <Text style={{
                backgroundColor: "red",
                top:10,
                marginBottom:10,
                paddingVertical:10,
                paddingHorizontal:8,
                fontSize:17,
                fontWeight:'bold',
                color:"white",
              }}>Events:</Text> 
              <Text  style={{fontWeight:'bold',fontSize:18,}}>  {route?.params?.Events}</Text> 

        </View> 
      );
    }