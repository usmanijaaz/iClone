
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, { useEffect } from 'react';
import { View, Text,StyleSheet,Button } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Welcome} from './Screens/Welcome' 
import { Signup} from './Screens/signup'
 import { Login} from './Screens/login'
 import { PastEvent } from './Screens/PastEvent';
// import { WelcomeRoot} from './Screens/screens'
import { Home} from './Screens/Home'
import { Settings} from './Screens/Setting'
import { InsideApp} from './Screens/Insideapp'
import { DetailsofEvent } from './Screens/DetailsofEvent';
import { useState } from 'react/cjs/react.development';
import { ActivityIndicator } from 'react-native-paper';
import { AuthContext } from './context';
import { Event } from './Screens/Event';


const screenstack0 = createNativeStackNavigator();
const WelcomeRoot = () => {
  return (
    <screenstack0.Navigator >
      <screenstack0.Screen name="Welcome" component={Welcome} options={{headerShown :false}}></screenstack0.Screen>
      <screenstack0.Screen name="Login" component={Login} options={{headerShown :false}}></screenstack0.Screen>
      <screenstack0.Screen name="Signup" component={Signup} options={{headerShown :false}}></screenstack0.Screen>
    </screenstack0.Navigator>

  );
};


const screenstack = createNativeStackNavigator();
//const screenstack = createStackNavigator();
const App = () => {
  const [isloading, setisloading] = useState(true);
  const [usertoken, setusertoken] = useState(false);

  const authContext = React.useMemo(()=> ({
    signIn: ()=> {
      setusertoken(true);
      setisloading(true);
      setTimeout(()=>{
        setisloading(false);
      },1000);

    },
    signOut: ()=> {
      setusertoken(false);
      setisloading(true);
      setTimeout(()=>{
        setisloading(false);
      },1000);
    },
    signUp: ()=> {
      setusertoken('');
      setisloading(false);

    },

  }));

  useEffect(()=>{
    setTimeout(()=>{
      setisloading(false);
    },1599);

  },[]);

  if(isloading){
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size="large"/>
      </View>
    )

  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>  
        <screenstack.Navigator>
          { usertoken ? 
          ( 
            <>
           
           <screenstack.Screen name= "InsideApp" component={InsideApp} options={{color:'#ca011c', headerShown :false,title:'iClone',headerStyle: {
            backgroundColor: '#f55151',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            color:'white',
          },}}/> 
           <screenstack.Screen name= "DetailsofEvent" component={DetailsofEvent} options={{color:'#ca011c', headerShown :true,title:'Details of Event',headerStyle: {
            backgroundColor: 'red',
          },
          }}/>
          <screenstack.Screen name= "PastEvent" component={PastEvent} options={{color:'#ca011c', headerShown :true,title:'Past Events',headerStyle: {
            backgroundColor: 'red',
          },
          }}/>
          </>

          )
          :
          <>
          <screenstack.Screen name= "Welcome" component={Welcome} options={{color:'#ca011c', headerShown :false,title:'iClone',headerStyle: {
            backgroundColor: '#f55151',
          },
          }}/>
          <screenstack.Screen name= "Signup" component={Signup} options={{color:'#ca011c', headerShown :false,title:'iClone',headerStyle: {
            backgroundColor: '#f55151',
          },
          }}/>
          <screenstack.Screen name= "Login" component={Login} options={{color:'#ca011c', headerShown :false,title:'iClone',headerStyle: {
            backgroundColor: '#f55151',
          },
          }}/> 
          </>
       }
        </screenstack.Navigator>
      </NavigationContainer>
      </AuthContext.Provider>

  );
};

const styles = StyleSheet.create({
  textt:{
    fontWeight: "bold",
    color:'red',
  }
});

export default App;
 {/* // <screenstack.Screen name= "InsideApp" component={InsideApp} options={{color:'#ca011c', headerShown :false,title:'iClone',headerStyle: {
        //     backgroundColor: '#f55151',
        //   },
        //   headerTitleStyle: {
        //     fontWeight: 'bold',
        //     color:'white',
        //   },}}/>  */}
         {/* <screenstack.Screen name= "WelcomeRoot" component={WelcomeRoot} options={{color:'#ca011c', headerShown :false,title:'iClone',headerStyle: {
            backgroundColor: '#f55151',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            color:'white',
          },}}/>  */}