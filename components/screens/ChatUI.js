import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { CometChat } from "@cometchat-pro/react-native-chat";
import { CometChatMessages } from "../../CometChatWorkspace/src/index";

export default function CometChatMessagesView({ navigation }) {
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
      {localUser ? (
        <CometChatMessages
          type={"user"}
          item={astrologerUser} //The object will be of user or group depending on type
          loggedInUser={localUser}
          actionGenerated={(actionType) => {
            console.log(actionType);
          }}
        />
      ) : null}
    </View>
  );
}
