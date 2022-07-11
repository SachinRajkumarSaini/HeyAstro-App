import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ToastAndroid,
  ScrollView,
  BackHandler,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { RFPercentage } from "react-native-responsive-fontsize";
import TextInput from "react-native-text-input-interactive";
import { Button, Image } from "@rneui/themed";
import FileBase64 from "../helpers/FileBase64";
import { FetchAPI } from "../helpers/FetchInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { CometChat } from "@cometchat-pro/react-native-chat";
import { COMETCHAT_AUTH_KEY } from "@env";

const Login = ({ navigation }) => {
  const [identifier, setIdentifier] = useState();
  const [password, setPassword] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const login = async () => {
    if (identifier && password) {
      try {
        setIsLoading(true);
        const getLogin = await FetchAPI({
          query: `
            mutation{
              login(input:{identifier: ${JSON.stringify(
                identifier.toLowerCase()
              )}, password: ${JSON.stringify(password)},provider:"local"}){
                jwt
                user{
                  id
                  username
                }
              }
            }
        `,
        });
        if (getLogin.data) {
          if (getLogin.data.login.jwt) {
            const { jwt, user } = getLogin.data.login;
            CometChat.getLoggedinUser().then(
              async (cometChatUser) => {
                if (!cometChatUser) {
                  CometChat.login(user.username, COMETCHAT_AUTH_KEY).then(
                    async (cometChatUser) => {
                      // console.log("Login Successful:", { cometChatUser });
                      setIsLoading(false);
                      // Main App Login Logic
                      await AsyncStorage.setItem("jwtToken", jwt);
                      await AsyncStorage.setItem("userId", user.id);
                      await AsyncStorage.setItem("userName", user.username);
                      navigation.navigate("ChatsAndCalls");
                    },
                    (error) => {
                      // console.log("Login failed with exception:", { error });
                      ToastAndroid.show(
                        "Something went wrong, Please try again later!",
                        ToastAndroid.SHORT
                      );
                      setIsLoading(false);
                    }
                  );
                }
              },
              (error) => {
                // console.log("Something went wrong", error);
                ToastAndroid.show(
                  "Something went wrong, Please try again later!",
                  ToastAndroid.SHORT
                );
                setIsLoading(false);
              }
            );
          }
        }
        if (getLogin.errors) {
          if (getLogin.errors[0].message === "Invalid identifier or password") {
            // Invalid identifier or password
            ToastAndroid.show("Invalid email or password", ToastAndroid.SHORT);
            setIsLoading(false);
          }
        }
      } catch (error) {
        setIsLoading(false);
        ToastAndroid.show(
          "Something went wrong, Please try again later!",
          ToastAndroid.SHORT
        );
        // console.log(error);
      }
    } else {
      ToastAndroid.show("Please fill all the fields", ToastAndroid.SHORT);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      const onBackPress = () => {
        Alert.alert("Exit App", "Do you want to exit?", [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel",
          },
          { text: "YES", onPress: () => BackHandler.exitApp() },
        ]);
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
    <ScrollView contentContainerStyle={{ flex: 1 }}>
      <StatusBar
        translucent={true}
        barStyle="dark-content"
        backgroundColor={"#f2f2f2"}
      />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={{ uri: FileBase64.heyAstro }}
          containerStyle={{
            height: RFPercentage(20),
            width: RFPercentage(20),
          }}
        />
        <Text
          style={{
            fontFamily: "Dongle-Bold",
            color: "#4d148c",
            fontSize: RFPercentage(4),
            marginTop: RFPercentage(1),
          }}
        >
          Login
        </Text>
        <TextInput
          textInputStyle={{ marginTop: RFPercentage(1), color: "black" }}
          placeholder="Email or Username"
          onChangeText={(identifier) =>
            setIdentifier(identifier.replace(/^\s+|\s+$/gm, ""))
          }
        />
        <TextInput
          textInputStyle={{ marginTop: RFPercentage(2), color: "black" }}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(password) =>
            setPassword(password.replace(/^\s+|\s+$/gm, ""))
          }
        />
        <Button
          containerStyle={{
            marginTop: RFPercentage(2),
            width: "90%",
          }}
          buttonStyle={{ backgroundColor: "#1F4693" }}
          titleStyle={{
            fontFamily: "Dongle-Regular",
            fontSize: RFPercentage(2.5),
          }}
          onPress={login}
          title="Login"
          loading={isLoading}
          type="solid"
        />
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            navigation.navigate("Signup");
          }}
        >
          <Text
            style={{
              fontFamily: "Dongle-Regular",
              fontSize: RFPercentage(3),
              marginTop: RFPercentage(2),
              color: "black",
            }}
          >
            Don't have an account?
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Login;
