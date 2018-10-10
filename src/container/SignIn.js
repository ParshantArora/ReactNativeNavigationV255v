/*
 * @file: SignIn.js
 * @description: Contains the SignIn Container.
 * @date: 9.Oct.2018
 * @author: Parshant Nagpal
 * */
import React, { Fragment } from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  AsyncStorage
} from 'react-native'
import {removeListeners} from '../utilities/listeners';
import { goHome } from '../config/navigation'
import {Navigation} from 'react-native-navigation';
import firebase from 'react-native-firebase';


import * as AppAction from '../actions'
let removeListener = true;
class SignIn extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: '', password: ''
    }
    this.signUp = this.signUp.bind(this);
  }

  componentWillUnmount(){
    if(removeListener){
      removeListeners();
    }  
  }
  componentWillMount(){
    // firebase.auth().signInAnonymously()
    // .then((res) => {
    //  console.log("response",res)
    // });
 
  }
  componentWillUnmount() {
    if (this.unsubscriber) {
      this.unsubscriber();
    }
  }
  onChangeText = (key, value) => {
    this.setState({ [key]: value })
  }
  signIn = async() => {
    const { email, password } = this.state;
    if(email.trim() == ''){
      alert('Please Enter email Id');
      return;
    }
    if(password.trim() == ''){
      alert('Please Enter Password');
      return;
    }
    console.log(this.props,AppAction)
    try {
    const reponse = await firebase.auth().signInAndRetrieveDataWithEmailAndPassword(email, password);
          this.props.dispatch(AppAction.login());
          goHome();
          // here place your signup logic
          console.log('user successfully signed in: ', reponse)
        } catch (err) {
          console.log('error signing up: ', err.message)
          alert(err.message);
        }
  }
  signUp(){
    this.props.dispatch(AppAction.pushTParticulatScreen(this.props.componentId,'SignUp'));
  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder='Email'
          autoCapitalize="none"
          autoCorrect={false}
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('email', val)}
        />
        <TextInput
          style={styles.input}
          placeholder='Password'
          autoCapitalize="none"
          secureTextEntry={true}
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('password', val)}
        />
        <Button
          title='Sign In'
          onPress={this.signIn}
        />
         <Button
          title='Sign Up'
          onPress={()=>this.signUp()}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    width: 350,
    fontSize: 18,
    fontWeight: '500',
    height: 55,
    backgroundColor: '#42A5F5',
    margin: 10,
    color: 'white',
    padding: 8,
    borderRadius: 14
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
const mapStateToProps = state => ({
  user: state.user,
  app: state.app
});
const mapDispatchToProps = dispatch => ({
  appAction : bindActionCreators(AppAction,dispatch)  
})


export default connect(mapStateToProps,null)(SignIn);