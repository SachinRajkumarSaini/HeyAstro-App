import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  BackHandler
} from "react-native";
import { CometChat } from "@cometchat-pro/react-native-chat";
import { Card } from "react-native-elements";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Button } from "@rneui/themed";
import { useIsFocused, useFocusEffect } from "@react-navigation/core";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CallingScreen = props => {
  const isFocused = useIsFocused();
  const [showEnd, setShowEnd] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowEnd(true);
    }, 2000);
  }, []);

  useEffect(
    () => {
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        () => true
      );
      return () => backHandler.remove();
    },
    [isFocused]
  );

  useFocusEffect(
    React.useCallback(() => {
      console.log("Screen is Focused");
      return async () => {
        const sessionId = await AsyncStorage.getItem("sessionId");
        console.log("Screen is unfocused");
        CometChat.endCall(sessionId).then(
          call => {
            console.log("call ended", call);
          },
          error => {
            console.log("error", error);
          }
        );
      };
    }, [])
  );

  return (
    <View style={{ height: "100%", width: "100%" }}>
      <StatusBar
        translucent={false}
        barStyle="dark-content"
        backgroundColor={"#f2f2f2"}
      />
      <CometChat.CallingComponent
        callsettings={props.route.params.callSettings}
      />
      {showEnd &&
        <View
          style={{
            backgroundColor: "#222222",
            marginTop: RFPercentage(0),
            paddingHorizontal: RFPercentage(2),
            paddingBottom: RFPercentage(1)
          }}
        >
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              CometChat.endCall(props.route.params.sessionId).then(
                call => {
                  props.navigation.goBack();
                },
                error => {
                  console.log("error", error);
                }
              );
            }}
          >
            <Card
              containerStyle={{
                width: "100%",
                alignItems: "center",
                marginLeft: RFPercentage(0),
                justifyContent: "center",
                height: RFPercentage(6),
                backgroundColor: "red",
                borderWidth: 0
              }}
            >
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  fontFamily: "Ubuntu-Regular",
                  fontSize: RFPercentage(1.2),
                  alignItems: "center"
                }}
              >
                End
              </Text>
            </Card>
          </TouchableOpacity>
        </View>}
    </View>
  );
};

export default CallingScreen;
