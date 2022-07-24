import { View, Text,StyleSheet,Button,TouchableOpacity,TextInput } from 'react-native';
import React, {useState } from 'react'
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Link } from '@react-navigation/native';
import axios from 'axios';

const styles = StyleSheet.create({
    homee:{
        flex:1,
        backgroundColor:'#ca011c',
        
    },
    header:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',

    },
    foot:{
        flex:4,
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
      paddingVertical:9,
    },
    textfield:{
        height:40,
        width:280,
      backgroundColor:'#ffdddd',
      borderRadius:50

    
    }
})

export const  Signup = ({navigation}) => {
    const [fname,setfname] = useState('');
    const [lname,setlname] = useState('');
    const [email,setemail] = useState('');
    const [password,setpassword] = useState('');
    const [confirmpassword,setconfirm] = useState('');
    const [signup,setsign] = useState(false);

        const sign = async () => {
            axios.post('http://10.0.2.2:3001/signup',{fnam: fname, lnam:lname,em:email,pass:password,cpas:confirmpassword})
            .then((res)=>{
                alert(res.data.resultgen);
                if (res.data.resultgen != 'SignedUp'){
                    return false;
                }else{
                    return true;
                }
            })
            .catch((err)=>{
                alert(err);
            })
            
        }
    
    

    return (
    <View style= {styles.homee}>
        <View style= {styles.header}>
          <Text style={styles.title}>iClone</Text>
          <Text style={styles.subtitle}>   Y O U R      P E R S O N A L      A S S I S T A N T</Text>
        </View>
        <View style= {styles.foot}>
        <View style={styles.input}>
                <Text style={{fontSize:15,fontWeight:'bold',color:'grey'}}>Fill up the required information !</Text>
            </View>
        <View style={styles.input}>
                <TextInput placeholder='Your First Name'
                textAlign='center'
                onChangeText={fname => setfname(fname)}
                defaultValue={fname}
                style = {styles.textfield}
                />
            </View>
            <View style={styles.input}>
                <TextInput placeholder='Your Last Name'
                textAlign='center'
                onChangeText={lname => setlname(lname)}
                defaultValue={lname}
                style = {styles.textfield}
                />
            </View>
            <View style={styles.input}>
                <TextInput placeholder='Your Email'
                textAlign='center'
                onChangeText={email => setemail(email)}
                defaultValue={email}
                style = {styles.textfield}
                />
            </View>
            <View style={styles.input}>
            <TextInput placeholder='Your Password' 
                textAlign='center'
                onChangeText={password => setpassword(password)}
                defaultValue={password}
                style = {styles.textfield}
                />

            </View>
            <View style={styles.input}>
                <TextInput placeholder='Confirm Password'
                textAlign='center'
                onChangeText={confirmpassword => setconfirm(confirmpassword)}
                defaultValue={confirmpassword}
                style = {styles.textfield}
                />
            </View>

            <TouchableOpacity style={{paddingTop:25,justifyContent: 'center',alignItems: 'center'}} onPress={()=>{
                sign();
            }}>
               <View style={styles.button}>
                   <Text style={styles.buttontext}> Sign Up </Text>
               </View>
           </TouchableOpacity>
           <View style={styles.input}>
               <Text>Already have an account ? <Link to={{screen:'Login'}}><Text style={{fontWeight:'bold',fontSize:15}}>Login</Text> </Link></Text>
           </View>
          
        </View>
    </View>
    );
  }
