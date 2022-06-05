import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
} from "react-native";
import React, { useState, Fragment } from "react";
import { RFPercentage } from "react-native-responsive-fontsize";
import TextInput from "react-native-text-input-interactive";
import { Button, Image } from "@rneui/themed";
import FileBase64 from "../helpers/FileBase64";
import { FetchAPI, Fetch_API } from "../helpers/FetchInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import DatePicker from "react-native-date-picker";
import moment from "moment";
import { CometChat } from "@cometchat-pro/react-native-chat";
import { COMETCHAT_AUTH_KEY } from "@env";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const Signup = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [DOB, setDOB] = useState(new Date());
  const [TOB, setTOB] = useState(new Date());
  const [password, setPassword] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [openDate, setOpenDate] = useState(false);
  const [openTime, setOpenTime] = useState(false);
  const [pincode, setPincode] = useState();
  const [firstScreen, setFirstScreen] = useState(true);

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
      console.log(error);
      ToastAndroid.show("Pincode is not valid", ToastAndroid.SHORT);
      setIsLoading(false);
    }
  };

  const createUser = async () => {
    try {
      const userName = email.split("@")[0].toLowerCase();
      let DateOfBirth = new Date(DOB);
      DateOfBirth.setTime(TOB);

      const location = await getLocation();

      const createUser = await FetchAPI({
        query: `
                mutation {
                  createUsersPermissionsUser(
                    data: {
                      username: ${JSON.stringify(userName)},
                      email: ${JSON.stringify(email)},
                      password: ${JSON.stringify(password)},
                      confirmed: true
                      FullName: ${JSON.stringify(fullName)},
                      DOB: ${JSON.stringify(DateOfBirth.toISOString())}
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

  const signup = async () => {
    if (fullName && pincode) {
      try {
        setIsLoading(true);
        const createNewUser = await createUser();
        if (createNewUser) {
          // Create User for CometChat App
          const userName = email.split("@")[0].toLowerCase();
          let cometChatUser = new CometChat.User(userName);
          cometChatUser.setName(fullName);
          CometChat.createUser(cometChatUser, COMETCHAT_AUTH_KEY).then(
            async (cometChatSignupUser) => {
              console.log("user created", cometChatSignupUser);
              // Login CometChat App
              CometChat.getLoggedinUser().then(
                (cometChatLoginUser) => {
                  if (!cometChatLoginUser) {
                    CometChat.login(userName, COMETCHAT_AUTH_KEY).then(
                      async (cometChatLoginUser) => {
                        console.log("Login Successful:", {
                          cometChatLoginUser,
                        });
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
                        if (login.data.login.jwt) {
                          const { jwt, user } = login.data.login;
                          await AsyncStorage.setItem("jwtToken", jwt);
                          await AsyncStorage.setItem("userId", user.id);
                          await AsyncStorage.setItem("userName", user.username);
                          setIsLoading(false);
                          navigation.navigate("Home");
                        }
                      },
                      (error) => {
                        console.log("Login failed with exception:", { error });
                      }
                    );
                  }
                },
                (error) => {
                  console.log("Something went wrong", error);
                }
              );
            },
            (error) => {
              console.log("error", error);
              setIsLoading(false);
            }
          );
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
              placeholder="Email"
              onChangeText={(email) => setEmail(email)}
            />
            <TextInput
              textInputStyle={{ marginTop: RFPercentage(2), color: "black" }}
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
            />
            <Button
              containerStyle={{
                marginTop: RFPercentage(2),
                width: "90%",
              }}
              buttonStyle={{ backgroundColor: "#423b88" }}
              titleStyle={{
                fontFamily: "Dongle-Regular",
                fontSize: RFPercentage(2.5),
              }}
              onPress={() => {
                if (email && password) {
                  if (email.includes("@") && password.length >= 6) {
                    setFirstScreen(false);
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
                value={moment(TOB).format("hh:mm a")}
                onFocus={() => setOpenTime(true)}
                onPressIn={() => setOpenTime(true)}
              />
              <DateTimePickerModal
                isVisible={openTime}
                mode="time"
                date={TOB}
                onConfirm={(time) => {
                  setTOB(new Date(time));
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
              If you don't know time, then select 12:12 AM
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
                buttonStyle={{ backgroundColor: "#423b88" }}
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
    </ScrollView>
  );
};

export default Signup;
