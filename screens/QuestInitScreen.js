import { StatusBar } from 'expo-status-bar';
import React from 'react';

import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, TextInput, Platform, Dimensions } from 'react-native';
import DatePicker from "react-datepicker";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

var currentProgress = 0;
var DATA = [
    {userN: 'Question 1',
    id:0, 
    type:0,
    content: 'Do u feel feverish, have flu-like chills or a fever with an oral temperature of 38.1°C',choice: ''},
    {userN: 'Question 2',
    id:1, 
    type:0,
    content: 'Are you experiencing trouble breathing or shortness of breath?',choice: ''},
    {userN: 'Question 3',
    id:2, 
    type:0,
    content: 'Do you have a sore throat?',choice: ''},
    {userN: 'Question 4',
    id:3, 
    type:0,
    content: 'Have you been feeling depressed?',choice: ''},
    {userN: 'Question 5',
    id:4, 
    type:1,
    content: 'Select date of diagnosis',choice: ''},
    {userN: 'Question 6',
    id:5, 
    type:1,
    content: 'Select date of recovery',choice: ''},
    {userN: 'Question 7',
    id:6,
    type:2, 
    content: 'Any comments?',choice: ''}];

var submissionData = {
    userId: global.userId ?? '',
    Symptom: {
        "hasFever": 1,
        "hasCough": 0,
        "isTired": 0,
        "isDepressed": 1
    },
    ageRange: 1,
    content: "I feel fever",
    diagDate: "1621780045",
    recoveryDate: "1621175245"
};

var sDate = new Date();
var sDateStr = '';
var sComment = '';



class QuestionInitScreen extends React.Component{

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

    submitQuest(){
        var opts = submissionData;
        
        fetch('https://coviz19-node.herokuapp.com/auth/user/quest', {
            method: 'POST',
            body: JSON.stringify(opts),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
          })
            .then(response => response.json())
            .then((data) => {
                
                this.setState({refreshing: false});
            });
    }

    selectDate(){

    }
    handleDateChange(){

    }


    renderItem = ({ item }) => (
        <Item userN={item.userN} timelocation={item.timelocation} content={item.content} choice={item.choice} type={item.type} />
    );

    Item = (userN, timelocation, content, choice, type) => {
        if (type == 0){
            return (
                <View style={styles.postItm}>
                    <Text style={styles.postTitle}>{userN}</Text>
                    <Text style={styles.postContent}>{content}</Text>
        
                    <View style={{flexDirection: 'row', width: windowWidth - windowWidth / 2, marginTop: 10}}>
                        <TouchableOpacity style={styles.postButton} onPress={()=>{
                            this.setState({refreshing: true});
                            DATA[currentProgress].choice = 'Yes';
                            if (currentProgress < DATA.length) {
                                currentProgress++;
                                this.setState({refreshing: false});
                            }
                        }}>
                            <Text style={{
                                textAlign: 'center',
                                fontSize: 20,
                                fontWeight: (choice == 'Yes') ? '700' : '300'
                            }}>Yes</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.postButton}  onPress={()=>{
                            this.setState({refreshing: true});
                            DATA[currentProgress].choice = 'No';
                            if (currentProgress < DATA.length) {
                                currentProgress++;
                                this.setState({refreshing: false});
                            }
                        }}>
                            <Text style={{
                                textAlign: 'center',
                                fontSize: 20,
                                fontWeight: (choice == 'No') ? '700' : '300'
                            }}>No </Text>
                        </TouchableOpacity>
                    </View>
                    
                </View>
            )
        }
        else if (type == 1){
            return (
                <View style={styles.postItm}>
                    <Text style={styles.postTitle}>{userN}</Text>
                    <Text style={styles.postContent}>{content}</Text>
                    <View style={{flexDirection: 'row', width: windowWidth - windowWidth / 2, marginTop: 10, alignContent: 'center', alignItems: 'center'}}>
                    
                    <TextInput
                    style={{height: 45, width: 250}}
                    placeholder="Select Date YYYY-MM-DD"
                    onChangeText={(text) => {
                        sDateStr = text;
                    }}
                    defaultValue={sDateStr}
                />
                        <TouchableOpacity style={styles.postButtonS} onPress={()=>{
                            this.setState({refreshing: true});
                            DATA[currentProgress].choice = sDateStr;
                            sDateStr = '';
                            if (currentProgress < DATA.length) {
                                currentProgress++;
                                this.setState({refreshing: false});
                            }
                        }}>
                            <Text style={{
                                textAlign: 'center',
                                fontSize: 20,
                                fontWeight: '500'
                            }}>Next</Text>
                        </TouchableOpacity>
                    </View>
                    
                </View>
                )
        }
        else if (type == 2){
            return (
                <View style={styles.postItm}>
                    <Text style={styles.postTitle}>{userN}</Text>
                    <Text style={styles.postContent}>{content}</Text>
        
                    <View style={{flexDirection: 'row', width: windowWidth - windowWidth / 2, marginTop: 10}}>
                    <TextInput
                    style={{height: 45, width: 250}}
                    placeholder="Anything"
                    onChangeText={(text) => {
                        sComment = text
                    }}
                    defaultValue={sComment}/>
                    
                    </View>
                    
                </View>
                )
        }
        
    }

    render(){
        return (
        <View style={styles.container}>
            <FlatList
              data={DATA.filter((dta) => {return dta.id <= currentProgress})}
              renderItem={(item) => this.Item(item['item'].userN, item['item'].timelocation, item['item'].content, item['item'].choice, item['item'].type)}
              keyExtractor={item => item.id}
              refreshing={this.state.refreshing}
              onRefresh={this.refreshData}
          />
          <View style={{marginBottom: 15}}>
              <TouchableOpacity style={{width: 150, height: 50, backgroundColor: '#BBB', alignContent: 'center', justifyContent: 'center', alignItems: 'center'}} onPress={
                  () => {
                      
                      if (global.userId == null){
                        this.props.navigation.navigate('SignIn');
                      }
                      else{
                        DATA.forEach((dItm) =>{
                            switch (dItm.id){
                                case 0:
                                    if (dItm.choice == 'No'){
  
                                    }
                                    else{
                                      
                                    }
                                case 1:
                                  if (dItm.choice == 'No'){
  
                                  }
                                  else{
                                    
                                  }
                                case 2:
                                  if (dItm.choice == 'No'){
      
                                  }
                                  else{
                                        
                                  }
                                case 3:
                                  if (dItm.choice == 'No'){
          
                                  }
                                  else{
                                            
                                  }
                            }
                            
                        })

                        this.submitQuest();
                        
                        alert('Submission is successful, Thank you for your cooperation!');
                        this.props.navigation.goBack();
                      }
                  }
              }>
                  <Text style={{fontSize: 20, fontWeight: '500'}}>Submit</Text>
              </TouchableOpacity>
          </View>
        </View>
    );
    }
}


export default QuestionInitScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#eee'
    },
    postItm:{
        width: windowWidth - windowWidth * 2 / 3,
        alignContent: 'flex-start',
        alignItems: 'flex-start',
        alignSelf: 'flex-start',
        backgroundColor: '#fff',
        marginLeft: windowWidth/3,
        marginRight: windowWidth/3,
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
    postButtonS:{
        width: 150,
        height: 50,
        padding: 15,
        backgroundColor: '#EEE',
        alignContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
    },
    postButton:{
        width: (windowWidth - windowWidth * 2 / 3 - 20) / 2,
        height: 50,
        padding: 15,
        backgroundColor: '#EEE',
        alignContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
    },
    postButtonText:{
        textAlign: 'center',

        fontSize: 20,
        fontWeight: '500'
    }
  });