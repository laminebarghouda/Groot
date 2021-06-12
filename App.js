import React from "react";
import { StyleSheet } from "react-native";
import OneSignal from 'react-native-onesignal'

import AppLoading from 'expo-app-loading';
import { Asset } from "expo-asset";

import Navigation from "./navigation";
import { Block } from "./components";

// import all used images
const images = [
  require("./assets/icons/back.png"),
  require("./assets/icons/plants.png"),
  require("./assets/icons/seeds.png"),
  require("./assets/icons/flowers.png"),
  require("./assets/icons/sprayers.png"),
  require("./assets/icons/pots.png"),
  require("./assets/icons/fertilizers.png"),
  require("./assets/images/plants_1.png"),
  require("./assets/images/plants_2.png"),
  require("./assets/images/plants_3.png"),
  require("./assets/images/explore_1.png"),
  require("./assets/images/explore_2.png"),
  require("./assets/images/explore_3.png"),
  require("./assets/images/explore_4.png"),
  require("./assets/images/explore_5.png"),
  require("./assets/images/explore_6.png"),
  require("./assets/images/illustration_1.png"),
  require("./assets/images/illustration_2.png"),
  require("./assets/images/illustration_3.png"),
  require("./assets/images/avatar.png")
];


export default class App extends React.Component {

  constructor(properties) {
    super(properties);

    //OneSignal Init Code
    OneSignal.setLogLevel(6, 0);
    OneSignal.setAppId("7051acde-ad8c-4d35-9778-a81a0c73d669");
    //END OneSignal Init Code

    //Prompt for push on iOS
    OneSignal.promptForPushNotificationsWithUserResponse(response => {
      console.log("Prompt response:", response);
    });

    // Method for handling notifications received while app in foreground
    OneSignal.setNotificationWillShowInForegroundHandler(notifReceivedEvent => {
      console.log("OneSignal: notification will show in foreground:", notifReceivedEvent);
      let notif = notifReceivedEvent.getNotification();
      notifReceivedEvent.complete(notif);
    });

    //Method for handling notifications opened
    OneSignal.setNotificationOpenedHandler(notification => {
      console.log("OneSignal: notification opened:", notification);
    });

  }
  state = {
    isLoadingComplete: false
  };

  handleResourcesAsync = async () => {
    // we're caching all the images
    // for better performance on the app

    const cacheImages = images.map(image => {
      return Asset.fromModule(image).downloadAsync();
    });

    return Promise.all(cacheImages);
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
          <AppLoading
              startAsync={this.handleResourcesAsync}
              onError={error => console.warn(error)}
              onFinish={() => this.setState({ isLoadingComplete: true })}
          />
      );
    }

    return (
        <Block white>
          <Navigation />
        </Block>
    );
  }
}

const styles = StyleSheet.create({});
