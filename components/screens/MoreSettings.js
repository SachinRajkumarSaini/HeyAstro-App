import { View, Text, StatusBar, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Header, Card } from "react-native-elements";
import AntDesign from "react-native-vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CometChat } from "@cometchat-pro/react-native-chat";

const MoreSettings = ({ navigation }) => {
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
          text: "Settings",
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

      <View style={{ flex: 1 }}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => navigation.navigate("TermsAndConditions")}
        >
          <Card
            containerStyle={{
              margin: RFPercentage(2),
              borderRadius: RFPercentage(1),
            }}
          >
            <Text
              style={{
                color: "black",
                fontFamily: "Ubuntu-Regular",
                fontSize: RFPercentage(1.8),
                color: "green",
              }}
            >
              Terms and Conditions
            </Text>
          </Card>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => navigation.navigate("PrivacyPolicy")}
        >
          <Card
            containerStyle={{
              margin: RFPercentage(2),
              borderRadius: RFPercentage(1),
            }}
          >
            <Text
              style={{
                color: "black",
                fontFamily: "Ubuntu-Regular",
                fontSize: RFPercentage(1.8),
                color: "green",
              }}
            >
              Privacy Policy
            </Text>
          </Card>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            Alert.alert(
              "Logout",
              "Are you sure you want to logout?",
              [
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel",
                },
                {
                  text: "OK",
                  onPress: async () => {
                    CometChat.logout().then(
                      () => {
                        console.log("Logout completed successfully");
                      },
                      (error) => {
                        console.log("Logout failed with exception:", { error });
                      }
                    );
                    navigation.navigate("Login");
                    await AsyncStorage.setItem("jwtToken", "");
                    await AsyncStorage.setItem("userId", "");
                    await AsyncStorage.setItem("userFullName", "");
                    await AsyncStorage.setItem("userName", "");
                  },
                },
              ],
              { cancelable: true }
            );
          }}
        >
          <Card
            containerStyle={{
              margin: RFPercentage(2),
              borderRadius: RFPercentage(1),
            }}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "flex-start" }}
            >
              <AntDesign name="logout" color={"black"} size={20} />
              <Text
                style={{
                  color: "black",
                  fontFamily: "Ubuntu-Regular",
                  fontSize: RFPercentage(1.8),
                  color: "black",
                  marginStart: RFPercentage(1.5),
                }}
              >
                Logout my account
              </Text>
            </View>
          </Card>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MoreSettings;
