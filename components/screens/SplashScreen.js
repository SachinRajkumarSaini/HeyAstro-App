import { View, StyleSheet, StatusBar, Text, ToastAndroid } from "react-native";
import React, { useEffect } from "react";
import { RFPercentage } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
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
    <View style={styles.splash}>
      <StatusBar
        translucent={true}
        barStyle="dark-content"
        backgroundColor={"transparent"}
      />
      <Animatable.Text
        style={styles.text}
        animation="bounceOut"
        iterationCount={2}
        direction="alternate"
      >
        <Text style={{ fontFamily: "Dongle-Bold" }}>Hey Astro</Text>
      </Animatable.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4e8de",
  },
  text: {
    fontSize: RFPercentage(8),
    fontWeight: "bold",
    color: "#482a49",
  },
});

export default SplashScreen;
