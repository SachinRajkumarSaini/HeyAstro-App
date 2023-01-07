import {
  View,
  Text,
  StatusBar,
  ScrollView,
  Modal,
  ActivityIndicator,
  ToastAndroid
} from "react-native";
import { Header, Button, Card } from "react-native-elements";
import { RFPercentage } from "react-native-responsive-fontsize";
import React, { useState } from "react";
import TextInput from "react-native-text-input-interactive";
import DatePicker from "react-native-date-picker";
import moment from "moment";
import { CometChat } from "@cometchat-pro/react-native-chat";
import { COMETCHAT_AUTH_KEY } from "@env";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Fetch_API } from "../../helpers/FetchInstance";

const KundliMatching = ({ navigation }) => {
  const [boyFullName, setBoyFullName] = useState("");
  const [girlFullName, setGirlFullName] = useState("");
  const [boyDOB, setBoyDOB] = useState(new Date());
  const [girlDOB, setGirlDOB] = useState(new Date());
  const [openBoyDate, setOpenBoyDate] = useState(false);
  const [openBoyTime, setOpenBoyTime] = useState(false);
  const [openGirlDate, setOpenGirlDate] = useState(false);
  const [openGirlTime, setOpenGirlTime] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [boyPincode, setBoyPincode] = useState();
  const [girlPincode, setGirlPincode] = useState();
  const [boyGeographic, setBoyGeographic] = useState({
    Latitude: null,
    Longitude: null
  });
  const [girlGeographic, setGirlGeographic] = useState({
    Latitude: null,
    Longitude: null
  });

  const matchHoroscope = async () => {
    try {
      if (
        boyFullName &&
        girlFullName &&
        boyGeographic.Latitude &&
        boyGeographic.Longitude &&
        girlGeographic.Latitude &&
        girlGeographic.Longitude
      ) {
        setIsLoading(true);
        const KundliMatching = await fetch(
          `${process.env
            .HEYASTRO_API_URL}/kundli/match/1/${girlGeographic.Latitude},${girlGeographic.Longitude}/${girlDOB.toISOString()}/${boyGeographic.Latitude},${boyGeographic.Longitude}/${boyDOB.toISOString()}`
        );
        const matchingResult = await KundliMatching.json();
        if (matchingResult.data === "Credit Exhausted") {
          ToastAndroid.show(
            "Credit Exhausted, Please try again tomorrow",
            ToastAndroid.SHORT
          );
          setIsLoading(false);
          return;
        } else {
          setIsLoading(false);
          navigation.navigate("DetailMatching", {
            KundliMatching: matchingResult
          });
        }
      } else {
        ToastAndroid.show("Please fill all the fields", ToastAndroid.SHORT);
      }
    } catch (error) {
      ToastAndroid.show(
        "Something went wrong, Please try again later!",
        ToastAndroid.SHORT
      );
      setIsLoading(false);
    }
  };

  const getLocation = async pincode => {
    try {
      setIsLoading(true);
      const gettingLocation = await Fetch_API(
        `${process.env.HEYASTRO_API_URL}/getLocation`,
        {
          pincode: parseInt(pincode)
        },
        "POST",
        {
          "Content-Type": "application/json"
        }
      );
      setIsLoading(false);
      return gettingLocation;
    } catch (error) {
      ToastAndroid.show(
        "Pincode is not valid, Please enter correct pincode",
        ToastAndroid.SHORT
      );
      setIsLoading(false);
    }
  };

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
          borderBottomWidth: 0
        }}
        centerComponent={{
          text: "Kundli Matching",
          style: {
            color: "#fff",
            fontSize: RFPercentage(3.5),
            fontFamily: "Dongle-Regular",
            marginTop: RFPercentage(0.5)
          }
        }}
      />
      <View style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Boys Details */}
          <Card
            containerStyle={{
              borderRadius: RFPercentage(1),
              paddingBottom: RFPercentage(2)
            }}
          >
            <Text
              style={{
                fontFamily: "Dongle-Bold",
                color: "black",
                fontSize: RFPercentage(3),
                marginTop: RFPercentage(1),
                textAlign: "center"
              }}
            >
              Boy's Details
            </Text>
            <View>
              <Text
                style={{
                  fontFamily: "Dongle-Bold",
                  color: "black",
                  fontSize: RFPercentage(2),
                  marginTop: RFPercentage(1)
                }}
              >
                Name
              </Text>
              <View style={{ alignItems: "center" }}>
                <TextInput
                  textInputStyle={{ color: "black" }}
                  placeholder="Full Name"
                  onChangeText={fullName => setBoyFullName(fullName)}
                />
              </View>
              <Text
                style={{
                  fontFamily: "Dongle-Bold",
                  color: "black",
                  fontSize: RFPercentage(2),
                  marginTop: RFPercentage(1.5)
                }}
              >
                Date of Birth
              </Text>
              <View style={{ alignItems: "center" }}>
                <TextInput
                  textInputStyle={{ color: "black" }}
                  placeholder="Date of Birth"
                  value={boyDOB.toDateString()}
                  onFocus={() => setOpenBoyDate(true)}
                  onPressIn={() => setOpenBoyDate(true)}
                />
                <DatePicker
                  modal
                  mode="date"
                  open={openBoyDate}
                  date={boyDOB}
                  onConfirm={date => {
                    setOpenBoyDate(false);
                    setBoyDOB(date);
                  }}
                  onCancel={() => {
                    setOpenBoyDate(false);
                  }}
                />
              </View>
              <Text
                style={{
                  fontFamily: "Dongle-Bold",
                  color: "black",
                  fontSize: RFPercentage(2),
                  marginTop: RFPercentage(1.5)
                }}
              >
                Time of Birth
              </Text>
              <View style={{ alignItems: "center" }}>
                <TextInput
                  textInputStyle={{ color: "black" }}
                  placeholder="Time of Birth"
                  value={moment(boyDOB).format("hh:mm a")}
                  onFocus={() => setOpenBoyTime(true)}
                  onPressIn={() => setOpenBoyTime(true)}
                />
                <DateTimePickerModal
                  isVisible={openBoyTime}
                  mode="time"
                  date={boyDOB}
                  onConfirm={time => {
                    boyDOB.setTime(new Date(time));
                    setOpenBoyTime(false);
                  }}
                  onCancel={() => {
                    setOpenBoyTime(false);
                  }}
                />
              </View>
              <Text
                style={{
                  fontFamily: "Dongle-Regular",
                  textAlign: "left",
                  color: "black"
                }}
              >
                If you don't know time, then select 12:00 AM
              </Text>
              <Text
                style={{
                  fontFamily: "Dongle-Bold",
                  color: "black",
                  fontSize: RFPercentage(2),
                  marginTop: RFPercentage(1.5)
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
                  onChangeText={async pincode => {
                    if (pincode.length === 6) {
                      const data = await getLocation(pincode);
                      setBoyGeographic({
                        Longitude: data.Longitude,
                        Latitude: data.Latitude
                      });
                    }
                  }}
                />
              </View>
            </View>
          </Card>
          {/* Girls Detail */}
          <Card
            containerStyle={{
              borderRadius: RFPercentage(1),
              paddingBottom: RFPercentage(2),
              marginBottom: RFPercentage(2)
            }}
          >
            <Text
              style={{
                fontFamily: "Dongle-Bold",
                color: "black",
                fontSize: RFPercentage(3),
                marginTop: RFPercentage(1),
                textAlign: "center"
              }}
            >
              Girl's Details
            </Text>
            <View>
              <Text
                style={{
                  fontFamily: "Dongle-Bold",
                  color: "black",
                  fontSize: RFPercentage(2),
                  marginTop: RFPercentage(1)
                }}
              >
                Name
              </Text>
              <View style={{ alignItems: "center" }}>
                <TextInput
                  textInputStyle={{ color: "black" }}
                  placeholder="Full Name"
                  onChangeText={fullName => setGirlFullName(fullName)}
                />
              </View>
              <Text
                style={{
                  fontFamily: "Dongle-Bold",
                  color: "black",
                  fontSize: RFPercentage(2),
                  marginTop: RFPercentage(1.5)
                }}
              >
                Date of Birth
              </Text>
              <View style={{ alignItems: "center" }}>
                <TextInput
                  textInputStyle={{ color: "black" }}
                  placeholder="Date of Birth"
                  value={girlDOB.toDateString()}
                  onFocus={() => setOpenGirlDate(true)}
                  onPressIn={() => setOpenGirlDate(true)}
                />
                <DatePicker
                  modal
                  mode="date"
                  open={openGirlDate}
                  date={girlDOB}
                  onConfirm={date => {
                    setOpenGirlDate(false);
                    setGirlDOB(date);
                  }}
                  onCancel={() => {
                    setOpenGirlDate(false);
                  }}
                />
              </View>
              <Text
                style={{
                  fontFamily: "Dongle-Bold",
                  color: "black",
                  fontSize: RFPercentage(2),
                  marginTop: RFPercentage(1.5)
                }}
              >
                Time of Birth
              </Text>
              <View style={{ alignItems: "center" }}>
                <TextInput
                  textInputStyle={{ color: "black" }}
                  placeholder="Time of Birth"
                  value={moment(girlDOB).format("hh:mm a")}
                  onFocus={() => setOpenGirlTime(true)}
                  onPressIn={() => setOpenGirlTime(true)}
                />
                <DateTimePickerModal
                  isVisible={openGirlTime}
                  mode="time"
                  date={girlDOB}
                  onConfirm={time => {
                    girlDOB.setTime(new Date(time));
                    setOpenGirlTime(false);
                  }}
                  onCancel={() => {
                    setOpenGirlTime(false);
                  }}
                />
              </View>
              <Text
                style={{
                  fontFamily: "Dongle-Regular",
                  textAlign: "left",
                  color: "black"
                }}
              >
                If you don't know time, then select 12:00 AM
              </Text>
              <Text
                style={{
                  fontFamily: "Dongle-Bold",
                  color: "black",
                  fontSize: RFPercentage(2),
                  marginTop: RFPercentage(1.5)
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
                  onChangeText={async pincode => {
                    if (pincode.length === 6) {
                      const data = await getLocation(pincode);
                      setGirlGeographic({
                        Longitude: data.Longitude,
                        Latitude: data.Latitude
                      });
                    }
                  }}
                />
              </View>
            </View>
          </Card>
        </ScrollView>
      </View>
      {/* Create Kundli */}
      <View style={{ backgroundColor: "white" }}>
        <Button
          title={"Match Horoscope"}
          titleStyle={{ fontFamily: "Ubuntu-Regular" }}
          buttonStyle={{
            borderRadius: RFPercentage(1),
            backgroundColor: "#1F4693"
          }}
          containerStyle={{
            width: "100%",
            paddingVertical: RFPercentage(1),
            paddingHorizontal: RFPercentage(2)
          }}
          onPress={matchHoroscope}
        />
      </View>
      {/* Loading Model */}
      <Modal transparent={true} visible={isLoading}>
        <View
          style={{
            backgroundColor: "#000000aa",
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <ActivityIndicator size="large" color="white" />
        </View>
      </Modal>
    </View>
  );
};

export default KundliMatching;
