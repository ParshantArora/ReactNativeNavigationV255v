/*
 * @file: SignUp.js
 * @description: Contains the SignUp Container.
 * @date: 9.Oct.2018
 * @author: Parshant Nagpal
 * */

import React, { Fragment } from 'react'
import {
  View,
  Button,
  Text,
  TextInput,
  StyleSheet
} from 'react-native';
import firebase from 'react-native-firebase';
import * as AppAction from '../actions';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { goHome } from '../config/navigation'
 class SignUp extends React.Component {
  state = {
    username: '', password: '', email: '', phone_number: ''
  }
  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }
  signUp = async () => {
    const { password, email } = this.state;
    if(email.trim() == ''){
      alert('Please Enter email Id');
      return;
    }
    if(password.trim() == ''){
      alert('Please Enter Password');
      return;
    }
    try {
     const data = await firebase.auth().createUserWithEmailAndPassword(email,password);
      // here place your signup logic
      console.log('user successfully signed up!: ', data)
      // alert('User Created Successfully')
      // this.props.appAction.pop(this.props.componentId);
      this.props.appAction.login();
      goHome();
    } catch (err) {
      console.log('error signing up: ', err.message)
      alert(err.message);
    }
  }
  render() {
    return (
      <View style={styles.container}>
         <TextInput
          style={styles.input}
          placeholder='Email'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('email', val)}
        />
        <TextInput
          style={styles.input}
          placeholder='Password'
          secureTextEntry={true}
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('password', val)}
        />
        <Button
          title='Sign Up'
          onPress={this.signUp}
        />
      </View>
    )
  }
}
const mapDispatchToProps = dispatch => ({
  appAction : bindActionCreators(AppAction,dispatch)  
})
const styles = StyleSheet.create({
  input: {
    width: 350,
    height: 55,
    backgroundColor: '#42A5F5',
    margin: 10,
    padding: 8,
    color: 'white',
    borderRadius: 14,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
export default connect(null,mapDispatchToProps)(SignUp);