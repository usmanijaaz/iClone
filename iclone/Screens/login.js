import { View, Text,StyleSheet,Button,TouchableOpacity,TextInput,Alert } from 'react-native';
import React, {useState } from 'react'
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Link } from '@react-navigation/native';
import axios from 'axios';
import { AuthContext } from '../context';


export const  Login = ({navigation}) => {
    const [username,setuser] = useState('');
    const [password,setpassword] = useState('');
    
    const {signIn} = React.useContext(AuthContext);
    const login = async () => {
        axios.post('http://10.0.2.2:3001/login',{user: username, pass:password})
        .then((res)=>{
            if(res.data.cred == 'valid'){
                {signIn();}
            }else{
                Alert.alert(res.data.cred);
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
            <View style={styles.input1}>
                <TextInput placeholder='Your Email'
                textAlign='center'
                onChangeText={username => setuser(username)}
                defaultValue={username}
                style = {styles.textfield}
                />
            </View>
            <View style={styles.input2}>
            <TextInput placeholder='Your Password' 
                textAlign='center'
                onChangeText={password => setpassword(password)}
                defaultValue={password}
                style = {styles.textfield}
                />

            </View>

            <TouchableOpacity style={{paddingTop:25,justifyContent: 'center',alignItems: 'center'}} 
            onPress={()=>{
                login();
                

            }}>
               <View style={styles.button}>
                   <Text style={styles.buttontext}> Login </Text>
               </View>
           </TouchableOpacity>
           <View style={styles.input3}>
               <Text>Don't have an account ? <Link to={{screen:'Signup'}}><Text style={{fontWeight:'bold',fontSize:15}}>Sign Up</Text> </Link></Text>
           </View>
           <View style={styles.footinput}>
           <Text style={styles.foottitle}>iClone</Text>
          <Text style={styles.footsubtitle}>   Y O U R      P E R S O N A L      A S S I S T A N T</Text>
           </View>
        </View>
    </View>
    );
  }


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
    input1:{
        justifyContent: 'center',
      alignItems: 'center',
      paddingVertical:18,
      marginTop:25,
    },
    input2:{
        justifyContent: 'center',
      alignItems: 'center',
      paddingVertical:10,
    },input3:{
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
