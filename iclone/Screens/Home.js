import {ScrollView, View, Text,TextInput, StyleSheet,Button,TouchableOpacity } from 'react-native';
import React, {useEffect, useState } from 'react'
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Event } from './Event';
import { PastEvent } from './PastEvent';
import axios from 'axios';
import PushNotification from "react-native-push-notification";


export const  Home = ({navigation}) => {
  const [emails,setemails]= useState([]);
  const [emailsEvent,setemailsEvent]= useState([]);
  const [emailsImperative,setemailsImp]= useState([]);
  const [PastEmails,setPastEmails]= useState([]);

  const [emailss,setemailss]= useState([
    {'key':1},
    {'key':2},
    {'key':3},
  ]);

  const handleNotification = () => {
    //PushNotification.cancelAllLocalNotifications();

    PushNotification.localNotification({
        channelId: "test-channel",
        title: "You clicked on " +' item.country,',
        message: 'item.city',
        bigText: 'item.city' + " is one of the largest and most beatiful cities in " + 'item.country',
        color: "red",
        id: 0
    });

    PushNotification.localNotificationSchedule({
        channelId: "test-channel",
        title: "Alarm",
        message: "You clicked on " + 'item.country' + " 20 seconds ago",
        date: new Date(Date.now() + 10 * 1000),
        allowWhileIdle: true,
    });
}

    useEffect(()=>{
    axios({
      url: "http://10.0.2.2:3001/auth",
      method: "GET",
    })
      .then((response) => {
        setTimeout(() => {
        setemails(response.data);
        setemailsEvent(
          response.data.filter((item)=>{
            if(item.Events != 'null'){
              return item;
            }

          })
        );
        setemailsImp(
          response.data.filter((item)=>{
            if(item.Events == 'null'){
              return item;
            }
          })
        );

        // setPastEmails(
        //   response.data.filter((item)=>{
        //     const obj = /e/.exec(item.Events);
        //     const exDate = obj[0].split(",");
        //     const d = new Date();
        //     if(d.getFullYear() < parseInt(exDate[0]) || d.getMonth()+1 < parseInt(exDate[1]) || d.getDate() < parseInt(exDate[2])){
        //       return item;
        //     }
        //   })
        // );
        //alert(emailsEvent);
        //console.log(PastEmails);

        }, 500);
      })
      .catch((err) => {
         //console.log(err);
   });
    
  },[emails]);

  // const getemails = async () => {
  //   axios.get('http://10.0.2.2:3001/auth')
  //   .then((res)=>{
  //     setemails(res.data);
  //     console.log('received');
    
  //   })
  //   .catch((err)=>{
  //       alert(err); 
  //   });
    
  // }

  return (
    <ScrollView>
    <View style= {styles.homee}>
        <View style= {styles.header} >
          <Text style={styles.title}>  iClone</Text>
          <TouchableOpacity style = {{
           color: "red",
          }} onPress={()=>{
            navigation.navigate('PastEvent');
          }}>
            <View style={{paddingHorizontal:15,
        paddingVertical:12,}}>
              <Ionicons name="color-fill-outline" color = 'white' size ={26} />
            </View>
          </TouchableOpacity>
        </View>
        <View style= {styles.foot}>

              {
                emailsEvent.map((item)=>{
                  
                  return (
                    <ScrollView>
                      <View key={item.key}>
                        <TouchableOpacity style={{height:80,backgroundColor:'#d4d4d4',marginTop:8}} onPress={()=>{
                          navigation.navigate('DetailsofEvent',item);
                        }}>
                        <Event data = {item}></Event>
                        </TouchableOpacity>
                      </View>
                    </ScrollView>
                  
                  )
                })
              }

              <Text style={{
                backgroundColor: "red",
                top:10,
                marginBottom:10,
                paddingVertical:10,
                paddingHorizontal:8,
                fontSize:17,
                fontWeight:'bold',
                color:"white",
              }}>Extracted Tasks</Text>

              {
                emailsImperative.map((item)=>{
                  
                  return (
                    <ScrollView>
                      <View key={item.key}>
                        <TouchableOpacity style={{height:80,backgroundColor:'#d4d4d4',marginTop:8}} onPress={()=>{
                          navigation.navigate('DetailsofEvent',item);
                        }}>
                        <Event data = {item}></Event>
                        </TouchableOpacity>
                      </View>
                    </ScrollView>
                  
                  )
                })
              }
           
        </View>
    </View>
    </ScrollView>
    );
  }

  const styles = StyleSheet.create({
    homee:{
        flex:1,
        backgroundColor:'#ca011c',
        
    },
    header:{
        flex:1,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    foot:{
        flex:12,
        backgroundColor:'#ecebeb',
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        paddingHorizontal:10,
        paddingVertical:10,

    },
    title:{
        fontSize:32,
        fontWeight:'bold',
        color:'#ecebeb'
    },
   
   
  
    input:{
        justifyContent: 'center',
      alignItems: 'center',
      paddingVertical:10,
    },
  
})