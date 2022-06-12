import { View, Text, ToastAndroid, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import { WebView } from "react-native-webview";
import { RFPercentage } from "react-native-responsive-fontsize";
import Entypo from "react-native-vector-icons/Entypo";

const EmbbedPlayer = ({ route, navigation }) => {
  return (
    <View style={{ backgroundColor: "#000000aa", flex: 1 }}>
      <View style={{ flex: 1.5 }}>
        <Entypo
          onPress={() => navigation.goBack()}
          name="cross"
          style={{
            textAlign: "right",
            margin: RFPercentage(2.5),
            marginTop: RFPercentage(5),
          }}
          color={"white"}
          size={25}
        />
      </View>

      <View
        style={{
          flex: 0.7,
          marginHorizontal: RFPercentage(1),
        }}
      >
        <WebView
          scrollEnabled={false}
          allowsFullscreenVideo={true}
          domStorageEnabled={true}
          style={{ height: RFPercentage(40) }}
          originWhitelist={["*"]}
          allowsInlineMediaPlayback
          bounces={true}
          source={{ uri: route.params.videoUrl }}
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
      <View style={{ flex: 1.5 }} />
    </View>
  );
};

export default EmbbedPlayer;
