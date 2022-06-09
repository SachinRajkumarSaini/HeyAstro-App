import { View, Text } from "react-native";
import React from "react";
import FileBase64 from "../helpers/FileBase64";
import { Button, Image } from "react-native-elements";
import { RFPercentage } from "react-native-responsive-fontsize";

const IntroScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 2 }}>
        <Image
          source={{ uri: FileBase64.introScreen }}
          containerStyle={{
            width: "100%",
            height: "100%",
            borderBottomEndRadius: RFPercentage(3),
            borderBottomStartRadius: RFPercentage(3),
            backgroundColor: "#000",
          }}
        />
      </View>
      <View style={{ flex: 1.5, justifyContent: "space-around" }}>
        <Text
          style={{
            textAlign: "center",
            fontSize: RFPercentage(4),
            color: "#1F4693",
            fontFamily: "Dongle-Regular",
          }}
        >
          ASTROLOGY APP
        </Text>
        <Text
          style={{
            textAlign: "center",
            fontSize: RFPercentage(3.4),
            color: "black",
            fontFamily: "Ubuntu-Bold",
          }}
        >
          Get to know your horoscope by the stars from our specialists.
        </Text>
        <Text
          style={{
            textAlign: "center",
            fontSize: RFPercentage(2),
            color: "#b4b4b6",
            fontFamily: "Ubuntu-Regular",
          }}
        >
          Extend your arms in welcome to the future.
        </Text>
        <Button
          title="CONTINUE"
          onPress={() => navigation.navigate("Login")}
          titleStyle={{
            fontFamily: "Dongle-Regular",
            fontSize: RFPercentage(3.5),
          }}
          buttonStyle={{
            backgroundColor: "#1F4693",
            borderRadius: RFPercentage(1),
          }}
          containerStyle={{
            marginHorizontal: RFPercentage(2),
            position: "relative",
          }}
          type="solid"
          iconRight
          iconContainerStyle={{ position: "absolute", left: 15 }}
          icon={{ name: "arrow-right", color: "white", type: "font-awesome" }}
        />
      </View>
    </View>
  );
};

export default IntroScreen;
