import React, { useEffect, useState } from "react";
import { View, StatusBar, ActivityIndicator } from "react-native";
import { CometChat } from "@cometchat-pro/react-native-chat";
import { CometChatMessages } from "../../CometChatWorkspace/src/index";
import { RFPercentage } from "react-native-responsive-fontsize";

export default function CometChatMessagesView({ route, navigation }) {
  const [localUser, setLocalUser] = useState(null);
  const [astrologerUser, setAstrologerUser] = useState(null);

  const getLoggedinUser = () => {
    CometChat.getLoggedinUser().then(
      (user) => {
        console.log("user details:", { user });
        setLocalUser(user);
      },
      (error) => {
        console.log("error getting details:", { error });
      }
    );
  };

  const getAstrologerUser = () => {
    const astrologerUsername = route.params.userName;
    CometChat.getUser(astrologerUsername).then(
      (user) => {
        console.log("User details fetched for user:", user);
        setAstrologerUser(user);
      },
      (error) => {
        console.log("User details fetching failed with error:", error);
      }
    );
  };

  useEffect(() => {
    getLoggedinUser();
    getAstrologerUser();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        translucent={true}
        barStyle="dark-content"
        backgroundColor={"transparent"}
      />
      {localUser && astrologerUser ? (
        <CometChatMessages
          type={"user"}
          item={astrologerUser} //The object will be of user or group depending on type
          loggedInUser={localUser}
          navigation={navigation}
          actionGenerated={(actionType) => {
            console.log(actionType);
          }}
        />
      ) : (
        <ActivityIndicator
          color="#423b88"
          size={RFPercentage(8)}
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: RFPercentage(2),
          }}
        />
      )}
    </View>
  );
}
