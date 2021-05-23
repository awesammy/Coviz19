import { StatusBar } from 'expo-status-bar';
import React from 'react';

import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, TextInput, Platform, Dimensions } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { back } from 'react-native/Libraries/Animated/src/Easing';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

var email = '';
var passW = '';

var signInUrl = 'https://coviz19-node.herokuapp.com/auth/login';


class MainSignInScreen extends React.Component{

    constructor(props){
      super(props);
      this.state = {
        refreshing: false,
      }
    }
  
    
    componentDidMount(){
      
    }

    refreshData(){

    }

    changeEmailText(text){
        email = text;
    }

    changePasswordText(text){
        passW = text    
    }

    render(){
        return (
        <View style={styles.container}>
            <View style={styles.loginView}>
                <Text style={styles.loginText}>Login to Coviz19</Text>
                <TextInput
                    style={styles.loginTextField}
                    placeholder="Type email address"
                    onChangeText={(text) => {
                        this.changeEmailText(text);
                    }}
                    defaultValue={email}
                />
                <TextInput
                    style={styles.loginTextField}
                    placeholder="Type password"
                    secureTextEntry={true}
                    onChangeText={(text) => {
                        this.changePasswordText(text);
                    }}
                    defaultValue={passW}
                />
                <TouchableOpacity style={styles.loginButton} onPress={ ()=> {
                    let opts = {
                        "email": email,
                        "password": passW
                    }
                    

                    fetch(signInUrl, {
                        method: 'POST',
                        body: JSON.stringify(opts),
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                      })
                        .then(response => response.json())
                        .then((data) => {

                            

                            if (data.userId != ''){
                                global.userId = data.userId;
                                this.props.navigation.goBack();
                            }
                            else{
                                alert('error: your email or password is wrong, please try again!');
                            }
                            
                        });

                    
                }
                    
                }>
                    <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
        );
    }
}


export default MainSignInScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#eee'
    },
    loginView:{
        width: windowWidth / 2,
        height: windowHeight / 2,
        padding: 10,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
    },
    loginText:{
        fontSize: 25,
        fontWeight: '700',
        marginBottom: 25,
    },
    loginTextField:{
        height: 45, 
        width: windowWidth / 3,
        borderBottomWidth: 1,
        marginVertical: 5
    },
    loginButton:{
        width: windowWidth / 4,
        height: 40,
        marginTop: 15,
        backgroundColor: '#EEE',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginButtonText:{
        fontSize: 22,
        fontWeight: '500',
    },
    postItm:{
        width: windowWidth - windowWidth / 2,
        alignContent: 'flex-start',
        alignItems: 'flex-start',
        alignSelf: 'flex-start',
        backgroundColor: '#fff',
        marginLeft: windowWidth/4,
        marginRight: windowWidth/4,
        padding: 10,
        marginTop: 10,
        borderRadius: 5,
    },
    postProfile: {
        width: 35,
        height: 35
    },
    postTitle: {
        fontSize: 25,
        fontWeight: '700',
    },
    postSubtitle: {
        fontSize: 15,
        fontWeight: '300',
    },
    postContent: {
        fontSize: 18,
        fontWeight: '400',
    },
    postButton:{
        width: (windowWidth - windowWidth / 2 - 20) / 3,
        height: 50,
        padding: 15,
        backgroundColor: '#EEE',
        alignContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
    },
    postButtonText:{
        textAlign: 'center',

        fontSize: 18,
        fontWeight: '400'
    }
  });