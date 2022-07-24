import { View, Text,StyleSheet,TouchableOpacity,Button } from 'react-native';
import React from 'react'
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

import { AuthContext } from '../context';
import { useState } from 'react/cjs/react.development';

const styles = StyleSheet.create({
  homee:{
      flex:1,
      backgroundColor:'#ca011c',
      
  },
  header:{
      flex:11,
      justifyContent:'center',
      alignItems:'center',

  },
  foot:{
      flex:5,
      backgroundColor:'#ecebeb',
      borderTopLeftRadius:40,
      borderTopRightRadius:40,
      paddingHorizontal:20,
      paddingVertical:50,

  },
  title:{
      fontSize:44,
      fontWeight:'bold',
      color:'#ecebeb'
  },
  subtitle:{
      fontSize:13,
      fontWeight:'bold',
      color:'#ecebeb',

  },
  foottitle:{
      color:'#a7a7a7',
      fontSize:44,
      fontWeight:'bold',
  },
  footsubtitle:{
      fontSize:13,
      fontWeight:'bold',
      color:'#a7a7a7',
  },
  button:{
    width: 130,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor:'#ca011c',
  },
  signup:{
      width: 50,
      height: 15,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
      backgroundColor:'#ca011c',
    },
  buttontext:{
      color:'#ecebeb',
      fontWeight:'bold',

  },
  input:{
      justifyContent: 'center',
    alignItems: 'center',
    paddingVertical:10,
  },
  footinput:{
      justifyContent: 'center',
    alignItems: 'center',
    marginTop:'auto',
    paddingBottom:25,
  },
  textfield:{
      height:40,
      width:280,
    backgroundColor:'#ffdddd',
    borderRadius:50

  
  }
})


export const  Settings = ({navigation}) => {

  const authorize = async () => {
    axios.get('http://10.0.2.2:3001/authorize')
    .then((res)=>{
    if(res.data.status == 'linked'){
      alert('You are authorized!');
    }
    })
    .catch((err)=>{
        alert(err); 
    })
    
}
const unauthorize = async () => {
  axios.get('http://10.0.2.2:3001/unauthorize')
  .then((res)=>{
  if(res.data.status == 'unlinked'){
    //alert('You are unauthorized!');
  }
  })
  .catch((err)=>{
      alert(err); 
  })
  
}
  const {signOut} = React.useContext(AuthContext);

  
    return (
      <View style= {styles.homee}>
      <View style= {styles.header}>
        <Text style={styles.title}>iClone</Text>
         <Text style={styles.subtitle}>   Y O U R      P E R S O N A L      A S S I S T A N T</Text>
         <TouchableOpacity style={{backgroundColor:'white',height:30,width:200,marginTop:10,borderRadius:15}} 
            onPress={()=>{
              authorize();
            }}>
               <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                   <Text style={{fontSize:18,paddingLeft:10}}>Authorize your Gmail </Text>
               </View>
           </TouchableOpacity>
           <TouchableOpacity style={{backgroundColor:'white',height:30,width:200,marginTop:10,borderRadius:15}} 
            onPress={()=>{
              unauthorize();
            }}>
               <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                   <Text style={{fontSize:18,paddingLeft:10}}>Unauthorize </Text>
               </View>
           </TouchableOpacity>
         <TouchableOpacity style={{backgroundColor:'white',height:30,width:100,marginTop:10,borderRadius:15}} 
            onPress={()=>{
              {
                unauthorize();
                signOut();}
            }}>
               <View >
                   <Text style={{color:'red',fontSize:18,paddingLeft:10}}> Log out </Text>
               </View>
           </TouchableOpacity>
      </View>
      <View style= {styles.foot}>
                <Text style={{color:'grey',fontSize:17,fontWeight:'bold',fontStyle:'italic',paddingTop:7,paddingBottom:8}}>iClone is an automated  
                    personal assistant, which will act as a reminder system for you by extracting relevant
                    information from your incoming emails at your gmail account and will remind you about the 
                    important tasks. Get Started to enjoy the privileges !
                </Text>
                <Text style={{fontWeight:'bold', fontSize:18}}>Contact Developer: 
                  <Text style={{color:'red'}}> l180921@lhr.nu.edu.pk</Text></Text>
            </View>
      
      </View>
     );
  }