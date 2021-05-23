import { StatusBar } from 'expo-status-bar';
import React from 'react';

import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, TextInput, Platform, Dimensions, ScrollView } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { back } from 'react-native/Libraries/Animated/src/Easing';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

var userN = 'Anonymous User';
var timelocation = '2021-05-23 - Toronto, ON';
var content = 'hi';
var imgRef = '';

var postD = {userN: 'Anonymous User',id:'a', 
timelocation:'2021-05-23 - Toronto, ON', 
imgRef: 'https://explore.zoom.us/docs/image/postattendee/postattendee-onzoom.jpg', 
content: 'Hello, how are you guys doing? really really good? Hello, how are you guys doing? really really good? Hello, how are you guys doing? really really good? Hello, how are you guys doing? really really good? Hello, how are you guys doing? really really good?',
loc: {}, 
comments: [], 
reactions: []}


class PostDetailsScreen extends React.Component{

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


    render(){
        return (
        <View style={styles.container}>
            <ScrollView>
            <View style={styles.postItm}>
            <TouchableOpacity>
            <Text style={styles.postTitle}>{postD.userN}</Text>
            <Text style={styles.postSubtitle}>{postD.timelocation}</Text>
            <Text style={styles.postContent}>{postD.content}</Text>
            <Image style={{width: (postD.imgRef == '') ? 0 : 200, height: (postD.imgRef == '') ? 0 : 200}} source={{uri: postD.imgRef}}/>
            <View style={{flexDirection: 'row', width: windowWidth - windowWidth / 2, marginTop: 10}}>
                <TouchableOpacity style={styles.postButton}>
                    <Text style={styles.postButtonText}>{postD.reactions.length} Reactions</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.postButton}>
                    <Text style={styles.postButtonText}>{postD.comments.length} Comments</Text>
                </TouchableOpacity>
            </View>
            </TouchableOpacity>
        </View>
            </ScrollView>
        </View>
        );
    }
}


export default PostDetailsScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#eee'
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
        width: (windowWidth - windowWidth / 2 - 20) / 2,
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