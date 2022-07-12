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
import Feather from "react-native-vector-icons/Feather";
import auth from "@react-native-firebase/auth";
import React, { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/core";

const ForgotPassword = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [phone, setPhone] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [otpModal, setOtpModal] = useState(false);
  const [otpErrorText, setOtpErrorText] = useState("");
  const [Confirm, SetConfirm] = useState();
  const [Code, SetCode] = useState();
  const [userId, setUserId] = useState();

  useEffect(() => {
    setOtpErrorText("");
  }, [isFocused, otpModal]);

  const onSubmit = async () => {
    if (phone) {
      try {
        setIsLoading(true);
        const fetchProfile = await FetchAPI({
          query: `
            query{
              usersPermissionsUsers(filters:{Phone:{eq:${phone}}}){
                data{
                  id
                }
              }
            }
        `,
        });
        console.log(fetchProfile.data.usersPermissionsUsers.data);
        if (fetchProfile.data.usersPermissionsUsers.data.length === 1) {
          setUserId(fetchProfile.data.usersPermissionsUsers.data[0].id);
          try {
            setIsLoading(true);
            const confirmation = await auth().signInWithPhoneNumber(
              `+91 ${phone}`
            );
            ToastAndroid.show("OTP Sent Successfully", ToastAndroid.SHORT);
            SetConfirm(confirmation);
            setIsLoading(false);
            setOtpModal(true);
          } catch (error) {
            setIsLoading(false);
            ToastAndroid.show(
              "Usage limit exceeded, Please try again later",
              ToastAndroid.SHORT
            );
            if (
              error.message ===
              "[auth/invalid-phone-number] The format of the phone number provided is incorrect. Please enter the phone number in a format that can be parsed into E.164 format. E.164 phone numbers are written in the format [+][country code][subscriber number including area code]. [ TOO_SHORT ]"
            ) {
              ToastAndroid.show("Invalid Number", ToastAndroid.SHORT);
            }
            if (
              error.message ===
              "[auth/network-request-failed] A network error (such as timeout, interrupted connection or unreachable host) has occurred."
            ) {
              ToastAndroid.show(
                "Network Error,  Please try again later",
                ToastAndroid.SHORT
              );
            }
          }
        } else {
          ToastAndroid.show("No User Found!", ToastAndroid.SHORT);
          setIsLoading(false);
        }
      } catch (error) {
        ToastAndroid.show(
          "Something went wrong, Please try again later!",
          ToastAndroid.SHORT
        );
        setIsLoading(false);
      }
    } else {
      ToastAndroid.show("Please enter your phone number", ToastAndroid.SHORT);
    }
  };

  const verifyNumber = async () => {
    if (Code) {
      try {
        setIsLoading(true);
        setOtpErrorText("");
        await Confirm.confirm(Code);
        setIsLoading(false);
        setOtpModal(false);
        navigation.navigate("ResetPassword", { userId });
      } catch (error) {
        if (
          error.message ===
          "[auth/invalid-verification-code] The sms verification code used to create the phone auth credential is invalid. Please resend the verification code sms and be sure use the verification code provided by the user."
        ) {
          setOtpErrorText("Invalid OTP");
          setIsLoading(false);
        }
        if (
          error.message ===
          "[auth/session-expired] The sms code has expired. Please re-send the verification code to try again."
        ) {
          setOtpErrorText("OTP Session Expired!");
          setIsLoading(false);
        }
        setOtpErrorText("Invalid OTP");
        setIsLoading(false);
      }
    } else {
      setOtpErrorText("Please enter OTP");
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
          Forgot Password
        </Text>
        <TextInput
          textInputStyle={{ marginTop: RFPercentage(1), color: "black" }}
          placeholder="Mobile Number"
          keyboardType="numeric"
          maxLength={10}
          onChangeText={(identifier) =>
            setPhone(identifier.replace(/^\s+|\s+$/gm, ""))
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
              Verify Number
            </Text>
            <Text
              style={{
                color: "#696969",
                fontSize: 12,
                fontFamily: "Ubuntu-Regular",
              }}
            >
              We Have Sent an OTP to
            </Text>
            <View style={{ flexDirection: "row", paddingTop: 10 }}>
              <Text
                style={{
                  color: "#696969",
                  fontSize: 12,
                  fontFamily: "Ubuntu-Bold",
                }}
              >
                {phone}
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
                fontFamily: "Ubuntu-Regular",
              }}
              keyboardType="numeric"
              placeholder="OTP"
              onChangeText={(code) => SetCode(code.replace(/^\s+|\s+$/gm, ""))}
            />
            <Text
              style={{
                color: "#b00020",
                fontSize: RFPercentage(1.5),
                fontFamily: "Ubuntu-Regular",
                marginHorizontal: RFPercentage(4),
                textAlign: "center",
                marginTop: RFPercentage(0.5),
              }}
            >
              {otpErrorText}
            </Text>
            <Button
              containerStyle={{
                marginTop: RFPercentage(2),
                width: "80%",
              }}
              buttonStyle={{ backgroundColor: "#1F4693" }}
              titleStyle={{
                fontFamily: "Dongle-Regular",
                fontSize: RFPercentage(2.5),
              }}
              onPress={verifyNumber}
              title="Submit"
              loading={isLoading}
              type="solid"
            />
            <Button
              containerStyle={{
                marginTop: RFPercentage(2),
                width: "80%",
              }}
              buttonStyle={{
                backgroundColor: "white",
                borderWidth: 1,
                borderColor: "#1F4693",
              }}
              titleStyle={{
                fontFamily: "Dongle-Regular",
                fontSize: RFPercentage(2.5),
                color: "#1F4693",
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

export default ForgotPassword;
