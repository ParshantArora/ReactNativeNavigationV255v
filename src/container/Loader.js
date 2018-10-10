/*
 * @file: Loader.js
 * @description: Contains the Loader Container.
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

import { goToAuth, goHome } from '../config/navigation'
import firebase from 'react-native-firebase';
export default class Loader extends React.Component {
  
  componentDidMount(){
    this.unsubscriber = firebase.auth().onAuthStateChanged((user) => {
      console.log("authstate123", user)
      if(user == null){
        goToAuth(); 
      }else{
        goHome();
      }
    
     });
  }
  componentWillUnmount(){
    console.log('unmount')
    this.unsubscriber();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Loading</Text>
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
