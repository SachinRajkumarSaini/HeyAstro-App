import {
  View,
  Text,
  StatusBar,
  ActivityIndicator,
  PermissionsAndroid,
} from "react-native";
import React, { useState, useEffect } from "react";
import { WebView } from "react-native-webview";
import { Header } from "react-native-elements";
import { RFPercentage } from "react-native-responsive-fontsize";

const VideoCall = ({ route, navigation }) => {
  const [userAgent, setUserAgent] = useState(
    "Mozilla/5.0 (Linux; An33qdroid 10; Android SDK built for x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.185 Mobile Safari/537.36"
  );

  const cameraPermission = async () => {
    let granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: "Camera Permission",
        message: "App needs access to your camera " + "so others can see you.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      }
    );
  };

  const micPermission = async () => {
    let granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      {
        title: "Audio Permission",
        message: "App needs access to your audio / microphone",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      }
    );
  };

  useEffect(() => {
    cameraPermission();
    micPermission();
  }, []);
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
        leftComponent={{
          icon: "arrow-back",
          color: "#fff",
          iconStyle: {
            marginLeft: RFPercentage(1),
            marginTop: RFPercentage(0.8),
          },
          onPress: () => navigation.goBack(),
        }}
        centerComponent={{
          text: "Call",
          style: {
            color: "#fff",
            fontSize: RFPercentage(3.5),
            fontFamily: "Dongle-Regular",
            marginTop: RFPercentage(0.5),
          },
        }}
      />

      <WebView
        userAgent={userAgent} //Set your useragent (Browser) **Very Important
        originWhitelist={["*"]}
        allowsInlineMediaPlayback
        bounces={true}
        source={{ uri: route.params.videoCallUrl }}
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

export default VideoCall;
