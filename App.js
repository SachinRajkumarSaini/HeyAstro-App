import React, { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Route from "./components/helpers/Route";
import { CometChat } from "@cometchat-pro/react-native-chat";
import { COMETCHAT_APP_ID, COMETCHAT_REGION } from "@env";

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

  useEffect(() => {
    initializeCometChat();
  }, []);

  return (
    <SafeAreaProvider>
      <Route />
    </SafeAreaProvider>
  );
};

export default App;
