import { StatusBar } from 'expo-status-bar';
import React from 'react';

import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, TextInput, Platform, Dimensions, SectionList, ScrollView, ActivityIndicator} from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { back } from 'react-native/Libraries/Animated/src/Easing';
import {} from 'moment';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

var baseUrl = 'https://coviz19-node.herokuapp.com/auth/user/';

var createQuest = baseUrl + 'quest';


var DATA = [{_id:'a', 
timelocation:'2021-05-23 - Toronto, ON', 
imgRef: [], 
content: 'Hello, how are you guys doing? really really good? Hello, how are you guys doing? really really good? Hello, how are you guys doing? really really good? Hello, how are you guys doing? really really good? Hello, how are you guys doing? really really good?',
loc: {}, 
comments: [], 
reactions: [],
popularity: 0,
userRef: '',
createdAt: new Date(),
updatedAt: new Date()}];

var avgDays = 0;
var recoveryPercent = 0;
var postContentS = '';


class HomePostsScreen extends React.Component{

    constructor(props){
      super(props);
      this.state = {
        refreshing: false,
        postContentS: postContentS,
      }
    }
  
    
    componentDidMount(){
      this.refreshData();
    }

    refreshData(){
        fetch(baseUrl+'avgRecoveryDays')
            .then(response => response.json())
            .then((data) => {
                avgDays = data.avgDays;
                this.setState({refreshing: false});
            });
            fetch(baseUrl+'recoveryPercent')
            .then(response => response.json())
            .then((data) => {
                recoveryPercent = data.recoveryPercent;
                this.setState({refreshing: false});
            });
            this.loadPosts();
    }

    loadPosts(){
        fetch(baseUrl+'posts')
            .then(response => response.json())
            .then((data) => {
                this.setState({refreshing: true});
                var allPosts = [];
                allPosts = data.posts;
                DATA = allPosts;
                
                
                this.setState({refreshing: false});
            });
    }

    createPost(postContentS, postUid){
        var opts = {
            "userId": postUid,
            "content": postContentS
        };
        
        fetch(baseUrl+'post', {
            method: 'POST',
            body: JSON.stringify(opts),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
          })
            .then(response => response.json())
            .then((data) => {
                postContentS = '';
                this.setState({postContentS: ''});
                this.loadPosts();
                this.setState({refreshing: false});
            });
    }

    renderItem = ({ item }) => (
        <Item content={item.content} imgRef={item.imgRef} comments={item.comments} reactions={item.reactions} createdAt={item.createdAt}/>
    );

    Item = (content, imgRef, comments, reactions, createdAt) => (
        <View style={styles.postItm}>
            <TouchableOpacity onPress={()=>{
                this.props.navigation.navigate('PostDetails');
            }}>
            <View style={{flexDirection: 'row'}}>
                <View>
                    <Text style={styles.postTitle}>User</Text>
                    <Text style={styles.postSubtitle}>{createdAt.toString()}</Text>
                </View>
                <Text></Text>
            </View>
            
            <Text style={styles.postContent}>{content}</Text>
            <Image style={{width: (imgRef.length == 0) ? 0 : 200, height: (imgRef.length == 0) ? 0 : 200, borderRadius: 20}} source={{uri: (imgRef.length != 0) ? imgRef[0] : ''}}/>
            <View style={{flexDirection: 'row', width: windowWidth - windowWidth / 2, marginTop: 10}}>
                <TouchableOpacity style={styles.postButton}>
                    <Text style={styles.postButtonText}>{reactions.length} Reactions</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.postButton}>
                    <Text style={styles.postButtonText}>{comments.length} Comments</Text>
                </TouchableOpacity>
            </View>
            </TouchableOpacity>
        </View>
    )

    render(){
        
        return (
        <View style={styles.container}>
            <ScrollView>
                <View style={{flexDirection: 'row', width: windowWidth - windowWidth / 2, marginTop: 10, marginLeft: windowWidth/4, marginRight: windowWidth/4, backgroundColor: '#fff', borderRadius: 10}}>
                <TouchableOpacity style={styles.postTopButton}>
                    <Text style={styles.postButtonText}>Average Recovery Days</Text>
                    <Text style={styles.postButtonTextBold}>{avgDays}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.postTopButton}>
                    <Text style={styles.postButtonText}>Recovery Percentage</Text>
                    <Text style={styles.postButtonTextBold}>{recoveryPercent}%</Text>
                </TouchableOpacity>
                </View>
                <View style={{width: windowWidth - windowWidth / 2, marginTop: 10, marginLeft: windowWidth/4, marginRight: windowWidth/4, backgroundColor: '#fff', borderRadius: 10, padding: 10}}>
                    <View style={{flexDirection: 'row', alignContent: 'center', alignItems: 'center'}}>
                        <Image style={{width: 45, height: 45, marginBottom: 5, marginRight: 5}} source={require('./../assets/icon.png')}/>
                        <Text style={{fontSize: 25, fontWeight: '500'}}>Welcome to Coviz19!</Text>
                    </View>
                    <TextInput
                    
                    style={styles.addPostTextField}
                    value={this.state.postContentS}
                    placeholder="What's on your mind?"
                    onChangeText={(text) => {
                        postContentS = text;
                        this.setState({postContentS: text});
                    }}/>
                    <TouchableOpacity style={styles.addPostButton} onPress={()=>{
                        
                        
                        if (global.userId == null){
                            this.props.navigation.navigate('SignIn');
                        }
                        else{
                            
                            this.createPost(postContentS,'60a9dcbfeb23bc886c0c45ed');
                            
                        }
                        
                    }}>
                        <Text style={{textAlign: 'center', fontSize: 20, fontWeight: '500'}}>Post</Text>
                    </TouchableOpacity>
                    
                </View>
            <FlatList
              data={DATA.reverse()}
              //content, imgRef, comments, reactions
              renderItem={(item) => this.Item(item['item'].content, item['item'].imgRef, item['item'].comments, item['item'].reactions, item['item'].createdAt)}
              keyExtractor={item => item._id}
              refreshing={this.state.refreshing}
              onRefresh={this.refreshData}
          />
            </ScrollView>
            
        </View>
        );
    }
}


export default HomePostsScreen;

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
        fontWeight: '500',
    },
    postContent: {
        fontSize: 18,
        fontWeight: '400',
        marginVertical: 10,
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
    postTopButton:{
        width: (windowWidth - windowWidth / 2 - 20) / 2,
        height: 75,
        padding: 15,
        alignContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
    },
    postButtonText:{
        textAlign: 'center',
        fontSize: 15,
        fontWeight: '400'
    },
    postButtonTextBold:{
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '800'
    },
    addPostTextField:{
        height: 100, 
        width: windowWidth - windowWidth / 2 - 20,
        fontSize: 20,
        fontWeight: '500'
    },
    addPostButton:{
        height: 50, 
        width: windowWidth / 10,
        borderRadius: 15,
        backgroundColor: '#EEE',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'

    },
  });