import { View, Text, StatusBar } from "react-native";
import { Header } from "react-native-elements";
import { RFPercentage } from "react-native-responsive-fontsize";
import React from "react";

const CreateKundli = ({ navigation }) => {
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
          backgroundColor: "#423b88",
          paddingVertical: 6,
          borderBottomWidth: 0,
        }}
        centerComponent={{
          text: "New Kundli",
          style: {
            color: "#fff",
            fontSize: RFPercentage(3.5),
            fontFamily: "Dongle-Regular",
            marginTop: RFPercentage(0.5),
          },
        }}
      />
    </View>
  );
};

export default CreateKundli;
