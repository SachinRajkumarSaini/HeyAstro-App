import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
  Modal,
} from "react-native";
import React, { useState, Fragment, useEffect } from "react";
import { RFPercentage } from "react-native-responsive-fontsize";
import TextInput from "react-native-text-input-interactive";
import { Button, Image } from "@rneui/themed";
import FileBase64 from "../helpers/FileBase64";
import { FetchAPI, Fetch_API } from "../helpers/FetchInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DatePicker from "react-native-date-picker";
import moment from "moment";
import { CometChat } from "@cometchat-pro/react-native-chat";
import { COMETCHAT_AUTH_KEY } from "@env";
import auth from "@react-native-firebase/auth";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Feather from "react-native-vector-icons/Feather";
import { useIsFocused } from "@react-navigation/core";

const Signup = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");
  const [DOB, setDOB] = useState(new Date());
  const [password, setPassword] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [openDate, setOpenDate] = useState(false);
  const [openTime, setOpenTime] = useState(false);
  const [pincode, setPincode] = useState();
  const [firstScreen, setFirstScreen] = useState(true);
  const [otpModal, setOtpModal] = useState(false);
  const [isOTPLoading, setisOTPLoading] = useState(false);
  const [otpErrorText, setOtpErrorText] = useState("");
  const [Confirm, SetConfirm] = useState();
  const [Code, SetCode] = useState();

  useEffect(() => {
    setOtpErrorText("");
  }, [isFocused]);

  const getLocation = async () => {
    try {
      const gettingLocation = await Fetch_API(
        `${process.env.HEYASTRO_API_URL}/getLocation`,
        {
          pincode: pincode,
        },
        "POST",
        {
          "Content-Type": "application/json",
        }
      );
      return gettingLocation;
    } catch (error) {
      // console.log(error);
      ToastAndroid.show("Pincode is not valid", ToastAndroid.SHORT);
      setIsLoading(false);
    }
  };

  const isNumberRegistered = async () => {
    try {
      setIsLoading(true);
      const isNumberRegistered = await FetchAPI({
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
      if (isNumberRegistered.data.usersPermissionsUsers.data.length === 1) {
        setIsLoading(false);
        ToastAndroid.show("Number is already registered", ToastAndroid.SHORT);
        return true;
      } else {
        setIsLoading(false);
        return false;
      }
    } catch (error) {
      // console.log(error);
      ToastAndroid.show("Phone number is not valid", ToastAndroid.SHORT);
      setIsLoading(false);
      return false;
    }
  };

  const createUser = async () => {
    try {
      const userName = email.split("@")[0].toLowerCase();

      const location = await getLocation();

      const createUser = await FetchAPI({
        query: `
                mutation {
                  createUsersPermissionsUser(
                    data: {
                      username: ${JSON.stringify(
                        userName.replace(/[.,\s]/g, "")
                      )},
                      email: ${JSON.stringify(email)},
                      password: ${JSON.stringify(password)},
                      confirmed: true
                      FullName: ${JSON.stringify(fullName)},
                      Phone: ${phone},
                      DOB: ${JSON.stringify(DOB.toISOString())}
                      BirthPlacePincode: ${pincode},
                      Balance: ${parseFloat(0)},
                      BirthPlace: {
                        Country: ${JSON.stringify(location.Country)},
                        City: ${JSON.stringify(location.City)},
                        State: ${JSON.stringify(location.State)},
                        Latitude: "${JSON.stringify(location.Latitude)}",
                        Longitude: "${JSON.stringify(location.Longitude)}",
                      }
                    }
                  ) {
                    data {
                      attributes {
                        username
                      }
                    }
                  }
                }
        `,
      });
      if (createUser.errors) {
        if (createUser.errors[0].message === "Email already taken") {
          ToastAndroid.show("Email already used", ToastAndroid.SHORT);
          setIsLoading(false);
        } else if (
          createUser.errors[0].message === "email must be a valid email"
        ) {
          ToastAndroid.show("Email is not valid", ToastAndroid.SHORT);
          setIsLoading(false);
        } else if (
          createUser.errors[0].message ===
          "password must be at least 6 characters"
        ) {
          ToastAndroid.show(
            "Password must be at least 6 characters",
            ToastAndroid.SHORT
          );
          setIsLoading(false);
        } else if (
          createUser.errors[0].message ===
          "username must be at least 3 characters"
        ) {
          ToastAndroid.show(
            "Email must be at least 3 characters",
            ToastAndroid.SHORT
          );
          setIsLoading(false);
        }
      }
      return createUser.data.createUsersPermissionsUser.data.attributes
        .username;
    } catch (error) {
      ToastAndroid.show(
        "Something went wrong, Please try again later!",
        ToastAndroid.SHORT
      );
      setIsLoading(false);
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
        setFirstScreen(false);
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

  const signup = async () => {
    if (fullName && pincode) {
      try {
        setIsLoading(true);
        const createNewUser = await createUser();
        if (createNewUser) {
          // Login in APP
          const login = await FetchAPI({
            query: `
                  mutation {
                    login(input: { identifier: ${JSON.stringify(
                      email
                    )}, password: ${JSON.stringify(
              password
            )}, provider: "local" }) {
                      jwt
                      user {
                        id
                        username
                      }
                    }
                  }                    
                `,
          });
          if (login.data) {
            if (login.data.login.jwt) {
              const { jwt, user } = login.data.login;
              await AsyncStorage.setItem("jwtToken", jwt);
              await AsyncStorage.setItem("userId", user.id);
              await AsyncStorage.setItem("userFullName", fullName);
              await AsyncStorage.setItem("userName", user.username);
              setIsLoading(false);
              navigation.navigate("Home");
            }
          }
        }
      } catch (error) {
        setIsLoading(false);
        ToastAndroid.show(
          "Something went wrong, Please try again later!",
          ToastAndroid.SHORT
        );
      }
    } else {
      ToastAndroid.show("Please fill all the fields", ToastAndroid.SHORT);
      setIsLoading(false);
    }
  };

  const sendOTP = async () => {
    try {
      setIsLoading(true);
      const confirmation = await auth().signInWithPhoneNumber(`+91 ${phone}`);
      ToastAndroid.show("OTP Sent Successfully", ToastAndroid.SHORT);
      SetConfirm(confirmation);
      setIsLoading(false);
      setOtpModal(true);
    } catch (error) {
      console.log(error);
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
        }}
      >
        <View style={{ alignItems: "center" }}>
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
            Sign Up
          </Text>
        </View>
        {firstScreen ? (
          <View style={{ alignItems: "center" }}>
            <TextInput
              textInputStyle={{ marginTop: RFPercentage(1), color: "black" }}
              placeholder="Mobile Number"
              keyboardType="numeric"
              maxLength={10}
              onChangeText={(number) =>
                setPhone(number.replace(/^\s+|\s+$/gm, ""))
              }
            />
            <TextInput
              textInputStyle={{ marginTop: RFPercentage(1), color: "black" }}
              placeholder="Email"
              onChangeText={(email) =>
                setEmail(email.replace(/^\s+|\s+$/gm, ""))
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
              onPress={async () => {
                if (email && password && phone) {
                  if (
                    email.includes("@") &&
                    password.length >= 6 &&
                    phone.length === 10
                  ) {
                    const numberRegistered = await isNumberRegistered();
                    if (!numberRegistered) {
                      sendOTP();
                    }
                  }
                  if (!email.includes("@")) {
                    ToastAndroid.show(
                      "Please enter valid email",
                      ToastAndroid.SHORT
                    );
                  }
                  if (password.length < 6) {
                    ToastAndroid.show(
                      "Password must be at least 6 characters",
                      ToastAndroid.SHORT
                    );
                  }
                  if (!phone.length === 10) {
                    ToastAndroid.show(
                      "Please enter valid phone number",
                      ToastAndroid.SHORT
                    );
                  }
                } else {
                  ToastAndroid.show(
                    "Please fill all the fields",
                    ToastAndroid.SHORT
                  );
                }
              }}
              title="Next"
              loading={isLoading}
              type="solid"
            />
          </View>
        ) : (
          <Fragment>
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
            <Text
              style={{
                fontFamily: "Dongle-Bold",
                color: "black",
                fontSize: RFPercentage(2),
                marginTop: RFPercentage(1.5),
                marginStart: RFPercentage(3),
              }}
            >
              Date of Birth
            </Text>
            <View style={{ alignItems: "center" }}>
              <TextInput
                textInputStyle={{ color: "black" }}
                placeholder="Date of Birth"
                value={DOB.toDateString()}
                onFocus={() => setOpenDate(true)}
                onPressIn={() => setOpenDate(true)}
              />
              <DatePicker
                modal
                mode="date"
                open={openDate}
                date={DOB}
                onConfirm={(date) => {
                  setOpenDate(false);
                  setDOB(date);
                }}
                onCancel={() => {
                  setOpenDate(false);
                }}
              />
            </View>
            <Text
              style={{
                fontFamily: "Dongle-Bold",
                color: "black",
                fontSize: RFPercentage(2),
                marginTop: RFPercentage(1.5),
                marginStart: RFPercentage(3),
              }}
            >
              Time of Birth
            </Text>
            <View style={{ alignItems: "center" }}>
              <TextInput
                textInputStyle={{ color: "black" }}
                placeholder="Time of Birth"
                value={moment(DOB).format("hh:mm a")}
                onFocus={() => setOpenTime(true)}
                onPressIn={() => setOpenTime(true)}
              />
              <DateTimePickerModal
                isVisible={openTime}
                mode="time"
                date={DOB}
                onConfirm={(time) => {
                  DOB.setTime(time);
                  setOpenTime(false);
                }}
                onCancel={() => {
                  setOpenTime(false);
                }}
              />
            </View>
            <Text
              style={{
                fontFamily: "Dongle-Regular",
                textAlign: "left",
                color: "black",
                marginStart: RFPercentage(3),
              }}
            >
              If you don't know time, then select 12:00 AM
            </Text>
            <Text
              style={{
                fontFamily: "Dongle-Bold",
                color: "black",
                fontSize: RFPercentage(2),
                marginTop: RFPercentage(1.5),
                marginStart: RFPercentage(3),
              }}
            >
              Pincode
            </Text>
            <View style={{ alignItems: "center" }}>
              <TextInput
                textInputStyle={{ color: "black" }}
                placeholder="Birth Place Pincode"
                maxLength={6}
                keyboardType="numeric"
                onChangeText={(pincode) => setPincode(pincode)}
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
                onPress={signup}
                title="Signup"
                loading={isLoading}
                type="solid"
              />
            </View>
          </Fragment>
        )}
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              navigation.navigate("Login");
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
              Already have an account?
            </Text>
          </TouchableOpacity>
        </View>
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
              loading={isOTPLoading}
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

export default Signup;
