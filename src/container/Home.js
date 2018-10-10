
/*
 * @file: Home.js
 * @description: Contains the Home Page Container.
 * @date: 9.Oct.2018
 * @author: Parshant Nagpal
 * */

import React from 'react'
import {
  View,
  Text,
  Button,
  StyleSheet,
  BackHandler
} from 'react-native'
import { goToAuth } from '../config/navigation'
import {connect} from 'react-redux';
import * as AppAction from '../actions'
import {removeListeners} from '../utilities/listeners';
import { handleBackPress } from '../utilities/BackButtonHandling';
import {Navigation} from 'react-native-navigation';
import firebase from 'react-native-firebase';
let removeListener = true;
 class Home extends React.Component {
	/*
		Constructor Function
	*/
	constructor(props) {
		super(props);
    Navigation.events().bindComponent(this);

  }
  componentDidAppear() {
  	// BackHandler.addEventListener('hardwareBackPress', handleBackPress); // Back Button handling
  }
   componentDidDisappear() {
    // BackHandler.removeEventListener('hardwareBackPress', handleBackPress); // Back Button handling
  }
   componentWillUnmount(){
    if(removeListener){
      removeListeners();
    }  
  }
  static get options() {
    return {
      topBar: {
        title: {
          text: 'Home'
        },
      }
    };
  }

  logout = async() => {
    removeListener = false;
    try{
      const reponse =  await firebase.auth().signOut();
      this.props.dispatch(AppAction.logOut());
      goToAuth()
    }
   catch(err){
      console.log('error signing up: ', err.message)
      alert(err.message);
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Hello from Home screen.</Text>
        <Button
          onPress={()=>this.logout()}
          title="Sign Out"
        />
        <Button
          onPress={() => {
            // Navigation.push(this.props.componentId, {
            //   component: {
            //     name: 'Screen2',
            //   }
            // });
            this.props.dispatch(AppAction.pushTParticulatScreen(this.props.componentId,'Screen2'))
          }}
          title="View next screen"
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
export default connect(null,null)(Home);