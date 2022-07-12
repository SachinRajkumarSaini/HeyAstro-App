import {
  View,
  StyleSheet,
  StatusBar,
  Text,
  ToastAndroid,
  ImageBackground,
} from "react-native";
import React, { useEffect } from "react";
import { RFPercentage } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import FileBase64 from "../helpers/FileBase64";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(async () => {
      const alreadyLaunched = await AsyncStorage.getItem("alreadyLaunched");
      if (alreadyLaunched === "true") {
        const user = await AsyncStorage.getItem("userId");
        if (user) {
          navigation.navigate("Home");
        } else {
          navigation.navigate("Login");
        }
      } else {
        navigation.navigate("IntroScreen");
        await AsyncStorage.setItem("alreadyLaunched", "true");
      }
    }, 2500);
  }, []);

  return (
    <ImageBackground
      source={{ uri: FileBase64.splash_Bg_Img }}
      resizeMode="cover"
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <StatusBar
        translucent={false}
        barStyle="light-content"
        backgroundColor={"transparent"}
      />
      <Animatable.Image
        style={{ height: RFPercentage(22), width: RFPercentage(22) }}
        source={{ uri: FileBase64.heyAstro }}
        animation="bounceOut"
        iterationCount={2}
        direction="alternate"
        resizeMode="contain"
      />
      <Animatable.Text
        style={styles.text}
        animation="bounceOut"
        iterationCount={2}
        direction="alternate"
      >
        <Text style={{ fontFamily: "Dongle-Bold" }}>Hey Astro</Text>
      </Animatable.Text>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: RFPercentage(7.5),
    fontWeight: "bold",
    color: "#482a49",
  },
});

export default SplashScreen;
