import {
  View,
  Text,
  StatusBar,
  ActivityIndicator,
  BackHandler,
} from "react-native";
import React from "react";
import { Header } from "react-native-elements";
import { WebView } from "react-native-webview";
import { RFPercentage } from "react-native-responsive-fontsize";
import { useFocusEffect } from "@react-navigation/native";

const UploadImage = ({ route, navigation }) => {
  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      const onBackPress = () => {
        navigation.navigate("Profile");
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
      };
    }, [])
  );

  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        translucent={true}
        barStyle="light-content"
        backgroundColor={"transparent"}
      />
      {/* Header Section */}
      <Header
        statusBarProps={{ backgroundColor: "transparent" }}
        containerStyle={{
          backgroundColor: "#1F4693",
          paddingVertical: 6,
          borderBottomWidth: 0,
        }}
        centerComponent={{
          text: "Edit",
          style: {
            color: "#fff",
            fontSize: RFPercentage(3.5),
            fontFamily: "Dongle-Regular",
            marginTop: RFPercentage(0.5),
          },
        }}
        leftComponent={{
          icon: "arrow-back",
          color: "#fff",
          iconStyle: {
            marginLeft: RFPercentage(1),
            marginTop: RFPercentage(0.8),
          },
          onPress: () => navigation.navigate("Profile"),
        }}
      />
      <WebView
        domStorageEnabled={true}
        originWhitelist={["*"]}
        allowsInlineMediaPlayback
        bounces={true}
        source={{ uri: route.params.uploadImageUrl }}
        startInLoadingState
        scalesPageToFit
        javaScriptEnabled={true}
        renderLoadingView={() => {
          return (
            <ActivityIndicator
              color="#1F4693"
              size="large"
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            />
          );
        }}
      />
    </View>
  );
};

export default UploadImage;
