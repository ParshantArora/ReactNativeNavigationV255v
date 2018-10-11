/*
 * @file: Tab2.js
 * @description: Contains the Tab2 Container.
 * @date: 9.Oct.2018
 * @author: Parshant Nagpal
 * */
import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage
} from 'react-native'
import firebase from 'react-native-firebase';
import { goToAuth, goHome } from '../config/navigation'
let usersRef = firebase.database().ref('/todos');
export default class Tab2 extends React.Component {
  
  componentDidMount(){
    console.log("firebase",firebase.database().ref('todos'))
 
    usersRef.once('value').then(function(s){console.log("data123",s.val());})

    usersRef.on('value',(data)=>{
      console.log("datatatatat",data)
    })
usersRef.push({
        Task : 'do it today',
        name : 'Parshant',
        status : 'pending'
    },(resp)=>{
  console.log("resp",resp)
    })
//     firebase.database().ref('/todos').push({
//       Task : 'do it today',
//       name : 'Parshant',
//       status : 'pending'
//   },(resp)=>{
// conaole.log("resp",resp)
//   })
//   var messageListRef = firebase.database().ref('message_list');
//   var newMessageRef = messageListRef.push();
//   firebase.database().ref('/todos').once('value',(data)=>{
//     console.log('data',data)
//   })
  }
  componentWillUnmount(){
    console.log('unmount')
    usersRef.off('value',()=>{
console.log("datahjdsghjdgsfg")
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Tab 2</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  welcome: {
    fontSize: 28
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
