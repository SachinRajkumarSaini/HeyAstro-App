import {
  View,
  Text,
  StatusBar,
  Modal,
  TouchableOpacity,
  ToastAndroid,
  ScrollView,
  BackHandler,
  Alert
} from "react-native";
import React, { useState, useEffect } from "react";
import { RFPercentage } from "react-native-responsive-fontsize";
import TextInput from "react-native-text-input-interactive";
import { Button, Image } from "@rneui/themed";
import FileBase64 from "../helpers/FileBase64";
import { FetchAPI } from "../helpers/FetchInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import Feather from "react-native-vector-icons/Feather";
import auth from "@react-native-firebase/auth";

const Login = ({ navigation }) => {
  const [number, setNumber] = useState();
  const [otpModal, setOtpModal] = useState(false);
  const [isOTPLoading, setisOTPLoading] = useState(false);
  const [otpErrorText, setOtpErrorText] = useState("");
  const [Confirm, SetConfirm] = useState();
  const [Code, SetCode] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [counter, setCounter] = useState(90);

  useEffect(
    () => {
      const timer =
        counter > 0 &&
        setInterval(() => {
          if (otpModal) {
            setCounter(counter - 1);
          }
        }, 1000);
      return () => clearInterval(timer);
    },
    [counter, otpModal]
  );

  const login = async () => {
    try {
      setIsLoading(true);
      const getLogin = await FetchAPI({
        query: `
          query {
            usersPermissionsUsers(filters: { Phone: { eq: ${parseInt(
              number
            )} } }) {
              data {
                id
                attributes {
                  username
                  FullName
                }
              }
            }
          }        
        `
      });
      if (getLogin.data.usersPermissionsUsers.data.length === 0) {
        setIsLoading(false);
        ToastAndroid.show("User not found", ToastAndroid.SHORT);
      } else {
        if (getLogin.data.usersPermissionsUsers.data[0]) {
          const {
            username,
            FullName
          } = getLogin.data.usersPermissionsUsers.data[0].attributes;
          const { id } = getLogin.data.usersPermissionsUsers.data[0];
          // Main App Login Logic
          setIsLoading(false);
          await AsyncStorage.setItem("userId", id);
          await AsyncStorage.setItem("userFullName", FullName);
          await AsyncStorage.setItem("userName", username);
          navigation.navigate("Home");
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
  };

  const verifyNumber = async () => {
    setisOTPLoading(true);
    setOtpErrorText("");
    if (Code) {
      try {
        await Confirm.confirm(Code);
        setOtpModal(false);
        setisOTPLoading(false);
        console.warn("Success");
        login();
      } catch (error) {
        if (
          error.message ===
          "[auth/invalid-verification-code] The sms verification code used to create the phone auth credential is invalid. Please resend the verification code sms and be sure use the verification code provided by the user."
        ) {
          setOtpErrorText("Invalid OTP");
          setisOTPLoading(false);
        }
        if (
          error.message ===
          "[auth/session-expired] The sms code has expired. Please re-send the verification code to try again."
        ) {
          setOtpErrorText("OTP Session Expired!");
          setisOTPLoading(false);
        }
        setOtpErrorText("Invalid OTP");
        setisOTPLoading(false);
      }
    } else {
      otpErrorText("Invalid OTP");
      setisOTPLoading(false);
    }
  };

  const sendOTP = async () => {
    if (number && number.length === 10) {
      try {
        setisOTPLoading(true);
        setIsLoading(true);
        const confirmation = await auth().signInWithPhoneNumber(
          `+91 ${number}`
        );
        ToastAndroid.show("OTP Sent Successfully", ToastAndroid.SHORT);
        SetConfirm(confirmation);
        setIsLoading(false);
        setisOTPLoading(false);
        setCounter(90);
        setOtpModal(true);
      } catch (error) {
        console.log(error);
        setisOTPLoading(false);
        ToastAndroid.show("OTP Not Sent", ToastAndroid.LONG);
        if (
          error.message ===
          "[auth/invalid-phone-number] The format of the phone number provided is incorrect. Please enter the phone number in a format that can be parsed into E.164 format. E.164 phone numbers are written in the format [+][country code][subscriber number including area code]. [ TOO_SHORT ]"
        ) {
          ToastAndroid.show("Invalid Number", ToastAndroid.SHORT);
          setIsLoading(false);
        } else if (
          error.message ===
          "[auth/network-request-failed] A network error (such as timeout, interrupted connection or unreachable host) has occurred."
        ) {
          setIsLoading(false);
          ToastAndroid.show(
            "Network Error,  Please try again later",
            ToastAndroid.SHORT
          );
        } else {
          setIsLoading(false);
          ToastAndroid.show(
            "Usage limit exceeded, Please try again later",
            ToastAndroid.SHORT
          );
        }
      }
    } else {
      ToastAndroid.show("Please enter your mobile number.", ToastAndroid.SHORT);
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
            style: "cancel"
          },
          { text: "YES", onPress: () => BackHandler.exitApp() }
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
          alignItems: "center"
        }}
      >
        <Image
          source={{ uri: FileBase64.heyAstro }}
          containerStyle={{
            height: RFPercentage(20),
            width: RFPercentage(20)
          }}
        />
        <Text
          style={{
            fontFamily: "Dongle-Bold",
            color: "#4d148c",
            fontSize: RFPercentage(4),
            marginTop: RFPercentage(1)
          }}
        >
          Login
        </Text>
        <TextInput
          textInputStyle={{ marginTop: RFPercentage(1), color: "black" }}
          placeholder="Mobile Number"
          keyboardType="numeric"
          maxLength={10}
          onChangeText={number => setNumber(number.replace(/^\s+|\s+$/gm, ""))}
        />
        <View
          style={{
            flex: 0,
            justifyContent: "flex-start",
            alignItems: "flex-start",
            textAlign: "left",
            width: "100%"
          }}
        >
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              navigation.navigate("ForgotPassword");
            }}
          >
            <Text
              style={{
                fontFamily: "Dongle-Regular",
                fontSize: RFPercentage(2.5),
                marginTop: RFPercentage(1.5),
                marginStart: RFPercentage(4),
                color: "#1F4693"
              }}
            >
              Forgot password?
            </Text>
          </TouchableOpacity>
        </View>
        <Button
          containerStyle={{
            marginTop: RFPercentage(2),
            width: "90%"
          }}
          buttonStyle={{ backgroundColor: "#1F4693" }}
          titleStyle={{
            fontFamily: "Dongle-Regular",
            fontSize: RFPercentage(2.5)
          }}
          onPress={sendOTP}
          title="Send OTP"
          loading={isLoading}
          type="solid"
        />
        <Button
          containerStyle={{
            marginTop: RFPercentage(2),
            width: "90%"
          }}
          buttonStyle={{ backgroundColor: "#1F4693" }}
          titleStyle={{
            fontFamily: "Dongle-Regular",
            fontSize: RFPercentage(2.5)
          }}
          onPress={() => navigation.navigate("Signup")}
          title="New User? Sign Up"
          type="solid"
        />
      </View>

      {/* Modal View of OTP Screen For Changing Mobile Number */}
      <Modal
        visible={otpModal}
        onRequestClose={() => setOtpModal(false)}
        transparent={true}
      >
        <ScrollView
          contentContainerStyle={{ flex: 1, backgroundColor: "white" }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Image
              source={{ uri: FileBase64.heyAstro }}
              containerStyle={{
                height: RFPercentage(20),
                width: RFPercentage(20)
              }}
            />
            <Text
              style={{
                fontFamily: "Dongle-Bold",
                color: "#4d148c",
                fontSize: RFPercentage(4),
                marginTop: RFPercentage(1)
              }}
            >
              Verify Number
            </Text>
            <Text
              style={{
                color: "#696969",
                fontSize: 12,
                fontFamily: "Ubuntu-Regular"
              }}
            >
              We Have Sent an OTP to
            </Text>
            <View style={{ flexDirection: "row", paddingTop: 10 }}>
              <Text
                style={{
                  color: "#696969",
                  fontSize: 12,
                  fontFamily: "Ubuntu-Bold"
                }}
              >
                {number}
              </Text>
              <Feather
                style={{ paddingStart: 5, color: "#1F4693" }}
                onPress={() => {
                  setOtpModal(false);
                }}
                size={12}
                name="edit"
              />
            </View>
            <TextInput
              textInputStyle={{
                marginTop: RFPercentage(2),
                color: "black",
                fontFamily: "Ubuntu-Regular"
              }}
              keyboardType="numeric"
              placeholder="OTP"
              onChangeText={code => SetCode(code.replace(/^\s+|\s+$/gm, ""))}
            />
            <Text
              style={{
                color: "#b00020",
                fontSize: RFPercentage(1.5),
                fontFamily: "Ubuntu-Regular",
                marginHorizontal: RFPercentage(4),
                textAlign: "center",
                marginTop: RFPercentage(0.5)
              }}
            >
              {otpErrorText}
            </Text>
            <View
              style={{
                flexDirection: "row",
                paddingTop: 18,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <TouchableOpacity
                disabled={counter === 0 ? false : true}
                color="black"
                mode="text"
                uppercase={false}
                labelStyle={{
                  color: "#202b58",
                  fontFamily: "Ubuntu-Regular",
                  fontSize: 14.5
                }}
                onPress={sendOTP}
              >
                {counter === 0
                  ? <Text
                      style={{ fontFamily: "Ubuntu-Regular", color: "black" }}
                    >
                      Didn't Receive SMS ? Resend
                    </Text>
                  : <Text
                      style={{ fontFamily: "Ubuntu-Regular", color: "black" }}
                    >
                      {" "}Resend OTP in{" "}
                      <Text
                        style={{ fontFamily: "Ubuntu-Regular", color: "green" }}
                      >
                        {counter}s
                      </Text>
                    </Text>}
              </TouchableOpacity>
            </View>
            <Button
              containerStyle={{
                marginTop: RFPercentage(2),
                width: "80%"
              }}
              buttonStyle={{ backgroundColor: "#1F4693" }}
              titleStyle={{
                fontFamily: "Dongle-Regular",
                fontSize: RFPercentage(2.5)
              }}
              onPress={verifyNumber}
              title="Submit"
              loading={isOTPLoading}
              type="solid"
            />

            <Button
              containerStyle={{
                marginTop: RFPercentage(2),
                width: "80%"
              }}
              buttonStyle={{
                backgroundColor: "white",
                borderWidth: 1,
                borderColor: "#1F4693"
              }}
              titleStyle={{
                fontFamily: "Dongle-Regular",
                fontSize: RFPercentage(2.5),
                color: "#1F4693"
              }}
              onPress={() => {
                setOtpModal(false);
                setOtpErrorText("");
              }}
              title="Cancel"
              type="solid"
            />
          </View>
        </ScrollView>
      </Modal>
    </ScrollView>
  );
};

export default Login;
