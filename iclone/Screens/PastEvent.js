import {ScrollView, View, Text,TextInput, StyleSheet,Button,TouchableOpacity } from 'react-native';
import React, {useEffect, useState } from 'react'
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Event } from './Event';
import axios from 'axios';


export const  PastEvent = ({navigation}) => {
  const [emails,setemails]= useState([]);
  const deletePast = async ()=>{
    axios.post('http://10.0.2.2:3001/delPast',{})
    .then((res)=>{
        setemails(res.data);
    })
    .catch((err)=>{
        alert(err);
    })
  }

  useEffect(()=>{
    axios({
      url: "http://10.0.2.2:3001/pastevent",
      method: "GET",
    })
      .then((response) => {
        setTimeout(() => {
          setemails(response.data);
          console.log(emails);
          //alert(emails);
        }, 500);
      })
      .catch((err) => {
         //console.log(err);
   });
    
  },[emails]);

    return (
          <View >
             {
                emails.map((item)=>{
                  
                  return (
                    <ScrollView>
                      <View style={{marginLeft:5, marginRight:5,paddingLeft:0}} key={item._id}>
                        <TouchableOpacity style={{height:80,backgroundColor:'#fba7a7',marginTop:8,paddingLeft:10}} onPress={()=>{
                          navigation.navigate('DetailsofEvent',item);
                        }}>
                        <Event data = {item}></Event>
                        </TouchableOpacity>
                      </View>
                    </ScrollView>
                  
                  )
                })
              }              
              {/* <Text>{emails}</Text> */}
              <View style={styles.screen}>
                  <TouchableOpacity
                    onPress = {deletePast}
                    style={styles.roundButton1}>
                    <Text><Ionicons name="close-outline" color = 'grey' size ={23} /></Text>
                  </TouchableOpacity>
               </View>
        </View> 

      
      );
    }

    const styles = StyleSheet.create({
      screen: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      roundButton1: {
        marginTop:10,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 100,
        backgroundColor: '#d4d4d4',
      },
     
    });
    