import {
  Text,
  View,
  ScrollView,
  StatusBar,
  ToastAndroid,
  Modal,
} from "react-native";
import FileBase64 from "../helpers/FileBase64";
import { RFPercentage } from "react-native-responsive-fontsize";
import TextInput from "react-native-text-input-interactive";
import { Button, Image } from "@rneui/themed";
import { FetchAPI } from "../helpers/FetchInstance";
import React, { useState } from "react";

const ResetPassword = ({ route, navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const onSubmit = async () => {
    try {
      if (password === confirmPassword) {
        if (password.length >= 6) {
          setIsLoading(true);
          const updatePassword = await FetchAPI({
            query: `
                    mutation {
                        updateUsersPermissionsUser(id: ${
                          route.params.userId
                        }, data: { password: ${JSON.stringify(password)} }) {
                        data {
                            attributes {
                            email
                            }
                        }
                        }
                    }                
                `,
          });
          if (
            updatePassword.data.updateUsersPermissionsUser.data.attributes.email
          ) {
            ToastAndroid.show(
              "Password updated successfully",
              ToastAndroid.SHORT
            );
            navigation.navigate("Login");
          }
          if (updatePassword.errors) {
            ToastAndroid.show(
              "Something went wrong, Please try again later!",
              ToastAndroid.SHORT
            );
          }
          setIsLoading(false);
        } else {
          ToastAndroid.show(
            "Password must be at least 6 characters",
            ToastAndroid.SHORT
          );
        }
      } else {
        ToastAndroid.show(
          "Password and confirm password does not match",
          ToastAndroid.SHORT
        );
      }
    } catch (error) {
      ToastAndroid.show(
        "Something went wrong, Please try again later!",
        ToastAndroid.SHORT
      );
      setIsLoading(false);
    }
  };
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
          Reset Password
        </Text>
        <TextInput
          textInputStyle={{ marginTop: RFPercentage(1), color: "black" }}
          placeholder="Password"
          onChangeText={(password) =>
            setPassword(password.replace(/^\s+|\s+$/gm, ""))
          }
        />
        <TextInput
          textInputStyle={{ marginTop: RFPercentage(1), color: "black" }}
          placeholder="Confirm Password"
          onChangeText={(confirmPassword) =>
            setConfirmPassword(confirmPassword.replace(/^\s+|\s+$/gm, ""))
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
          onPress={onSubmit}
          title="Submit"
          loading={isLoading}
          type="solid"
        />
      </View>
    </ScrollView>
  );
};

export default ResetPassword;
