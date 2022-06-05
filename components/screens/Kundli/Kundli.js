import { View, Text, StatusBar } from "react-native";
import { Header, Button } from "react-native-elements";
import { RFPercentage } from "react-native-responsive-fontsize";
import TextInput from "react-native-text-input-interactive";
import React from "react";

const Kundli = ({ navigation }) => {
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
          text: "Kundli",
          style: {
            color: "#fff",
            fontSize: RFPercentage(3.5),
            fontFamily: "Dongle-Regular",
            marginTop: RFPercentage(0.5),
          },
        }}
      />
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontFamily: "Dongle-Bold",
            color: "black",
            fontSize: RFPercentage(2),
            marginTop: RFPercentage(1),
            marginStart: RFPercentage(3),
          }}
        >
          Name
        </Text>
        <View style={{ alignItems: "center" }}>
          <TextInput
            textInputStyle={{ color: "black" }}
            placeholder="Full Name"
            onChangeText={(fullName) => setFullName(fullName)}
          />
        </View>
      </View>
      {/* Create Kundli */}
      <View style={{ backgroundColor: "white" }}>
        <Button
          title={"Create New Kundli"}
          titleStyle={{ fontFamily: "Ubuntu-Regular" }}
          buttonStyle={{
            borderRadius: RFPercentage(1),
            backgroundColor: "#423b88",
          }}
          containerStyle={{
            width: "100%",
            paddingVertical: RFPercentage(1),
            paddingHorizontal: RFPercentage(2),
          }}
          onPress={() => navigation.navigate("createKundli")}
        />
      </View>
    </View>
  );
};

export default Kundli;
