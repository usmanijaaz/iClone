import { View, Text,StyleSheet,Button,TouchableOpacity } from 'react-native';
import React,{useEffect} from 'react'
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PushNotification from "react-native-push-notification";
import { black } from 'react-native-paper/lib/typescript/styles/colors';

const styles = StyleSheet.create({
    homee:{
        flex:1,
        backgroundColor:'#ca011c',
        
    },
    header:{
        flex:2,
        justifyContent:'center',
        alignItems:'center',

    },
    foot:{
        flex:1,
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
    button:{
      width: 100,
      height: 30,
      justifyContent: 'center',
      alignItems: 'center',
      paddingLeft:3,
      borderRadius: 50,
      backgroundColor:'#ca011c',
    },
    buttontext:{
        color:'#ecebeb',
        fontSize:19,
        fontWeight:'bold',

    }
})

export const  Welcome = ({navigation}) => {

    useEffect(() => {
        createChannels();
    }, []);

    const createChannels = () => {
        PushNotification.createChannel(
            {
                channelId: "test-channel",
                channelName: "Test Channel"
            }
        )
    }

    return (
      <View style= {styles.homee}>
        <View style= {styles.header}>
        <Text style={styles.title}>iClone</Text>
        <Text style={styles.subtitle}>   Y O U R      P E R S O N A L      A S S I S T A N T</Text>
        </View>
        <View style= {styles.foot}>
            <View>
                <Text style={{color:'black',fontSize:23,fontWeight:'bold'}}>About iClone</Text>
                <Text style={{color:'grey',fontSize:17,fontWeight:'bold',fontStyle:'italic',paddingTop:7,paddingBottom:8}}>iClone is an automated  
                    personal assistant, which will act as a reminder system for you by extracting relevant
                    information from your incoming emails at your gmail account and will remind you about the 
                    important tasks. Get Started to enjoy the privileges !
                </Text>
            </View>
            <TouchableOpacity style={{marginLeft:'auto',paddingTop:25}} onPress={() => navigation.navigate('Signup')}>
            <View style={styles.button}>
        <Text style={styles.buttontext}> Start<Ionicons name="md-chevron-forward-sharp" size ={20} />
        </Text>
        
        </View>
        </TouchableOpacity>
        </View>
      </View>

    );
  }