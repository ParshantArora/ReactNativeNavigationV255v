/*
 * @file: app.js
 * @description: Contains the main page of app.
 * @date: 9.Oct.2018
 * @author: Parshant Nagpal
 * */

import {Navigation} from 'react-native-navigation';
import {registerScreens} from './src/config/routes';
import {addListeners} from './src/utilities/listeners';
import { Provider } from "react-redux";
import setup from "./src/store/setup";
import {pushNotifificationInit} from './src/utilities/PushNotification'

Navigation.events().registerAppLaunchedListener(() => {
  const store = setup();
  pushNotifificationInit();
  registerScreens(store, Provider);
  addListeners();
  Navigation.setRoot({
    root: {
      component: {
        name: 'Loader'
      }
    },
  });
});