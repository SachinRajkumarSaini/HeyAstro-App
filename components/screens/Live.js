import { View, Text, StatusBar } from "react-native";
import React from "react";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Header } from "react-native-elements";

const Live = () => {
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
          text: "Live",
          style: {
            color: "#fff",
            fontSize: RFPercentage(3.5),
            fontFamily: "Dongle-Regular",
            marginTop: RFPercentage(0.5),
          },
        }}
      />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text
          style={{
            color: "#181A18",
            fontFamily: "Dongle-Regular",
            fontSize: RFPercentage(5),
          }}
        >
          Comming Soon...
        </Text>
      </View>
    </View>
  );
};

export default Live;
