import React, { useEffect } from "react";
import { Alert } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Route from "./components/helpers/Route";
import { CometChat } from "@cometchat-pro/react-native-chat";
import { COMETCHAT_APP_ID, COMETCHAT_REGION } from "@env";
import messaging from "@react-native-firebase/messaging";

const App = () => {
  const appSetting = new CometChat.AppSettingsBuilder()
    .subscribePresenceForAllUsers()
    .setRegion(COMETCHAT_REGION)
    .build();

  const initializeCometChat = async () => {
    try {
      await CometChat.init(COMETCHAT_APP_ID, appSetting);
      console.log("Initialization completed successfully");
    } catch (error) {
      console.log("Initialization failed with error:", error);
    }
  };

  // Take Permision of Push Notification and Get Token
  const setupCloudMessaging = async () => {
    messaging()
      .subscribeToTopic("HeyAstro")
      .then(() => console.log("Subscribed to HeyAstro !"));
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      console.log("Authorization status:", authStatus);
    }
  };

  useEffect(() => {
    // Handling Notification in foreground
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert(
        remoteMessage.notification.title,
        remoteMessage.notification.body
      );
    });
    setupCloudMessaging();
    initializeCometChat();
  }, []);

  return (
    <SafeAreaProvider>
      <Route />
    </SafeAreaProvider>
  );
};

export default App;
