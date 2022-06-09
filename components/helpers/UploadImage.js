import { View, Text, StatusBar, ActivityIndicator } from "react-native";
import React from "react";
import { Header } from "react-native-elements";
import { WebView } from "react-native-webview";
import { RFPercentage } from "react-native-responsive-fontsize";

const UploadImage = ({ route, navigation }) => {
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
          onPress: () => navigation.goBack(),
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
