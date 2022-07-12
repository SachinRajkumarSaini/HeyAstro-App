import { CometChat } from "@cometchat-pro/react-native-chat";
import { ToastAndroid } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COMETCHAT_AUTH_KEY } from "@env";

export const CometChatAuth = async (props) => {
  try {
    const userName = await AsyncStorage.getItem("userName");
    const userFullName = await AsyncStorage.getItem("userFullName");
    const login = await CometChat.login(userName, COMETCHAT_AUTH_KEY);
    if (login.authToken) {
      console.log("login Success");
      return true;
    }
  } catch (error) {
    if (error.code === "ERR_UID_NOT_FOUND") {
      let cometChatUser = new CometChat.User(userName);
      cometChatUser.setName(userFullName);
      const createUser = await CometChat.createUser(
        cometChatUser,
        COMETCHAT_AUTH_KEY
      );
      if (createUser.uid) {
        const loginCometChat = await CometChat.login(
          userName,
          COMETCHAT_AUTH_KEY
        );
        if (loginCometChat.authToken) {
          console.log("Created login Success");
          return true;
        }
      }
    } else {
      return false;
    }
  }
};
