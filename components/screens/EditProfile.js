import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
  Modal,
  ActivityIndicator,
  Platform,
} from "react-native";
import React, { useState, useEffect } from "react";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Header, Image, Button, Input } from "react-native-elements";
import FileBase64 from "../helpers/FileBase64";
import AntDesign from "react-native-vector-icons/AntDesign";
import DatePicker from "react-native-date-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FetchAPI, Fetch_API } from "../helpers/FetchInstance";
import moment from "moment";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { STRAPI_API_URL } from "@env";

const EditProfile = ({ navigation }) => {
  const [DOB, setDOB] = useState(new Date());
  const [showDOB, setShowDOB] = useState(false);
  const [showTOB, setShowTOB] = useState(false);
  const [fullName, setFullName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [birthPlace, setBirthPlace] = useState({
    Country: "",
    State: "",
    City: "",
  });
  const [birthPincode, setBirthPincode] = useState("");
  const [location, setLocation] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      const userId = await AsyncStorage.getItem("userId");
      const fetchProfile = await FetchAPI({
        query: `
              query{
                usersPermissionsUser(id:${userId}){
                  data{
                    attributes{
                    FullName,
                    ProfileImage,
                    DOB,
                    BirthPlacePincode,
                      BirthPlace{
                        City,
                        State,
                        Country
                      }
                    }
                  }
                }
              }
        `,
      });
      setProfileImage(
        fetchProfile.data.usersPermissionsUser.data.attributes.ProfileImage
      );
      setDOB(
        new Date(fetchProfile.data.usersPermissionsUser.data.attributes.DOB)
      );
      setFullName(
        fetchProfile.data.usersPermissionsUser.data.attributes.FullName
      );
      setBirthPincode(
        JSON.stringify(
          fetchProfile.data.usersPermissionsUser.data.attributes
            .BirthPlacePincode
        )
      );
      setBirthPlace(
        {
          Country:
            fetchProfile.data.usersPermissionsUser.data.attributes.BirthPlace
              .Country,
          State:
            fetchProfile.data.usersPermissionsUser.data.attributes.BirthPlace
              .State,
          City: fetchProfile.data.usersPermissionsUser.data.attributes
            .BirthPlace.City,
        },
        setIsLoading(true)
      );
    } catch (error) {
      ToastAndroid.show(
        "Something went wrong, Please try agiain later!",
        ToastAndroid.SHORT
      );
    }
  };

  const getLocation = async () => {
    try {
      setIsLoading(true);
      const gettingLocation = await Fetch_API(
        `${process.env.HEYASTRO_API_URL}/getLocation`,
        {
          pincode: parseInt(birthPincode),
        },
        "POST",
        {
          "Content-Type": "application/json",
        }
      );
      setLocation(gettingLocation);
      setBirthPlace({
        Country: gettingLocation.Country,
        State: gettingLocation.State,
        City: gettingLocation.City,
      });
      setIsLoading(false);
    } catch (error) {
      ToastAndroid.show("Pincode is not valid", ToastAndroid.SHORT);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const updateProfile = async () => {
    try {
      setIsLoading(true);
      const userId = await AsyncStorage.getItem("userId");
      const updatingProfile = await FetchAPI({
        query: `
            mutation {
              updateUsersPermissionsUser(
                id: ${userId}
                data: {
                  FullName: ${JSON.stringify(fullName)},
                  BirthPlacePincode: ${JSON.parse(birthPincode)},
                  DOB: ${JSON.stringify(DOB.toISOString())}
                  BirthPlace: { Country: ${JSON.stringify(
                    birthPlace.Country
                  )}, State: ${JSON.stringify(
          birthPlace.State
        )}, City: ${JSON.stringify(birthPlace.City)} }
                }
              ) {
                data {
                  attributes {
                    updatedAt
                  }
                }
              }
            }
        `,
      });
      if (updatingProfile.data.updateUsersPermissionsUser.data) {
        ToastAndroid.show("Profile updated successfully!", ToastAndroid.SHORT);
        navigation.navigate("Profile");
        setIsLoading(false);
      }
    } catch (error) {
      ToastAndroid.show(
        "Something went wrong, Please try again later!",
        ToastAndroid.SHORT
      );
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (birthPincode.length === 6) {
      getLocation();
    }
  }, [birthPincode]);

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
          text: "Edit Profile",
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

      <ScrollView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          {/* Profile Photo */}
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              margin: RFPercentage(2),
            }}
          >
            <Image
              source={{
                uri: profileImage ? profileImage : FileBase64.profileLogo,
              }}
              style={{
                height: RFPercentage(12),
                width: RFPercentage(12),
                borderRadius: RFPercentage(6),
                borderWidth: 1,
                borderColor: "black",
              }}
            />
            <TouchableOpacity
              onPress={async () => {
                const userName = await AsyncStorage.getItem("userName");
                const userId = await AsyncStorage.getItem("userId");
                navigation.navigate("UploadImage", {
                  uploadImageUrl: `https://heyastro.site/user/uploadImage/${userName}/${userId}`,
                });
              }}
              style={{
                position: "absolute",
                bottom: 0,
                left: 208,
                right: 140,
                top: 69,
                backgroundColor: "white",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: RFPercentage(5),
                padding: RFPercentage(1),
              }}
            >
              <AntDesign name="edit" color={"black"} size={15} />
            </TouchableOpacity>
          </View>

          {/* Profile Form */}
          <View style={{ margin: RFPercentage(0.5) }}>
            <View>
              <Text
                style={{
                  fontFamily: "Ubuntu-Bold",
                  color: "#767676",
                  fontSize: RFPercentage(1.9),
                  position: "absolute",
                  top: 0,
                  left: 12,
                }}
              >
                Full Name
              </Text>
              <Input
                inputStyle={{
                  fontFamily: "Ubuntu-Regular",
                  fontSize: RFPercentage(1.8),
                  color: "#4B4B4B",
                  marginTop: RFPercentage(1.7),
                }}
                value={fullName}
                onChangeText={(e) => setFullName(e)}
                inputContainerStyle={{ borderBottomColor: "#1F4693" }}
                placeholderTextColor="#C8C8C8"
                placeholder="Enter Your Full Name"
              />
            </View>
            <View>
              <Text
                style={{
                  fontFamily: "Ubuntu-Bold",
                  color: "#767676",
                  fontSize: RFPercentage(1.9),
                  position: "absolute",
                  top: 0,
                  left: 12,
                }}
              >
                Date of Birth
              </Text>
              <Input
                onFocus={() => setShowDOB(true)}
                onChange={() => setShowDOB(true)}
                value={DOB.toDateString()}
                inputStyle={{
                  fontFamily: "Ubuntu-Regular",
                  fontSize: RFPercentage(1.8),
                  color: "#4B4B4B",
                  marginTop: RFPercentage(1.7),
                }}
                inputContainerStyle={{ borderBottomColor: "#1F4693" }}
                placeholderTextColor="#C8C8C8"
                placeholder="Enter Date of Birth"
              />
              <DatePicker
                modal
                mode="date"
                open={showDOB}
                date={DOB}
                onConfirm={(date) => {
                  setShowDOB(false);
                  setDOB(date);
                }}
                onCancel={() => {
                  setShowDOB(false);
                }}
              />
            </View>
            <View>
              <Text
                style={{
                  fontFamily: "Ubuntu-Bold",
                  color: "#767676",
                  fontSize: RFPercentage(1.9),
                  position: "absolute",
                  top: 0,
                  left: 12,
                }}
              >
                Time of Birth
              </Text>
              <Input
                onFocus={() => setShowTOB(true)}
                onChange={() => setShowTOB(true)}
                value={moment(DOB).format("hh:mm a")}
                inputStyle={{
                  fontFamily: "Ubuntu-Regular",
                  fontSize: RFPercentage(1.8),
                  color: "#4B4B4B",
                  marginTop: RFPercentage(1.7),
                }}
                inputContainerStyle={{ borderBottomColor: "#1F4693" }}
                placeholderTextColor="#C8C8C8"
                placeholder="Enter Time of Birth"
              />
              <DateTimePickerModal
                isVisible={showTOB}
                mode="time"
                date={DOB}
                onConfirm={(time) => {
                  DOB.setTime(time);
                  setShowTOB(false);
                }}
                onCancel={() => {
                  setShowTOB(false);
                }}
              />
            </View>
            <View>
              <Text
                style={{
                  fontFamily: "Ubuntu-Bold",
                  color: "#767676",
                  fontSize: RFPercentage(1.9),
                  position: "absolute",
                  top: 0,
                  left: 12,
                }}
              >
                Pin Code
              </Text>
              <Input
                keyboardType="numeric"
                maxLength={6}
                value={birthPincode}
                onChangeText={(e) => setBirthPincode(e)}
                inputStyle={{
                  fontFamily: "Ubuntu-Regular",
                  fontSize: RFPercentage(1.8),
                  color: "#4B4B4B",
                  marginTop: RFPercentage(1.7),
                }}
                inputContainerStyle={{ borderBottomColor: "#1F4693" }}
                placeholderTextColor="#C8C8C8"
                placeholder="Enter Birth Place Pincode"
              />
              <Text
                style={{
                  fontFamily: "Ubuntu-Regular",
                  color: "#767676",
                  fontSize: RFPercentage(1.2),
                  marginStart: RFPercentage(1.2),
                  marginTop: RFPercentage(-2),
                }}
              >
                Your Place of Birth is automatically fetched from your pincode.
              </Text>
            </View>
          </View>
          <View style={{ marginTop: RFPercentage(1) }}>
            <Text
              style={{
                fontFamily: "Ubuntu-Bold",
                color: "#767676",
                fontSize: RFPercentage(1.9),
                position: "absolute",
                top: 0,
                left: 12,
              }}
            >
              Place of Birth
            </Text>
            <Input
              inputStyle={{
                fontFamily: "Ubuntu-Regular",
                fontSize: RFPercentage(1.8),
                color: "#4B4B4B",
                marginTop: RFPercentage(1.7),
              }}
              editable={false}
              selectTextOnFocus={false}
              inputContainerStyle={{ borderBottomColor: "#1F4693" }}
              value={
                birthPlace.City +
                ", " +
                birthPlace.State +
                ", " +
                birthPlace.Country
              }
              placeholderTextColor="#C8C8C8"
              placeholder="Place of Birth (City, State, Country)"
            />
          </View>
        </View>
      </ScrollView>
      <View style={{ backgroundColor: "white" }}>
        <Button
          title={"Submit"}
          titleStyle={{ fontFamily: "Ubuntu-Regular" }}
          buttonStyle={{
            borderRadius: RFPercentage(1),
            backgroundColor: "#1F4693",
          }}
          containerStyle={{
            width: "100%",
            paddingVertical: RFPercentage(1),
            paddingHorizontal: RFPercentage(2),
          }}
          onPress={updateProfile}
        />
      </View>
      {/* Loading Model */}
      <Modal transparent={true} visible={isLoading}>
        <View
          style={{
            backgroundColor: "#000000aa",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" color="white" />
        </View>
      </Modal>
    </View>
  );
};

export default EditProfile;
