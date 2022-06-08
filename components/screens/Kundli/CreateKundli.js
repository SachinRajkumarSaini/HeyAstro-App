import {
  View,
  Text,
  StatusBar,
  Modal,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import { Header, Button } from "react-native-elements";
import { RFPercentage } from "react-native-responsive-fontsize";
import TextInput from "react-native-text-input-interactive";
import React, { useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DatePicker from "react-native-date-picker";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Fetch_API } from "../../helpers/FetchInstance";
import { STRAPI_API_URL } from "@env";

const CreateKundli = ({ navigation }) => {
  const [fullName, setFullName] = useState("");
  const [DOB, setDOB] = useState(new Date());
  const [openDate, setOpenDate] = useState(false);
  const [openTime, setOpenTime] = useState(false);
  const [pincode, setPincode] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [geographic, setGeographic] = useState({
    Latitude: null,
    Longitude: null,
  });
  const [place, setPlace] = useState({
    Country: "",
    State: "",
    City: "",
  });

  const getLocation = async (pincode) => {
    try {
      setIsLoading(true);
      const gettingLocation = await Fetch_API(
        `${process.env.HEYASTRO_API_URL}/getLocation`,
        {
          pincode: parseInt(pincode),
        },
        "POST",
        {
          "Content-Type": "application/json",
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

  const generateKundli = async () => {
    try {
      if (fullName && geographic.Latitude && geographic.Longitude) {
        setIsLoading(true);

        const kundliData = await fetch(
          `${process.env.HEYASTRO_API_URL}/kundli/1/${geographic.Latitude},${
            geographic.Longitude
          }/${DOB.toISOString()}`
        );
        const kundli = await kundliData.json();

        const lagnaChart = await fetch(
          `${process.env.HEYASTRO_API_URL}/kundli/chart/1/${
            geographic.Latitude
          },${geographic.Longitude}/${DOB.toISOString()}/lagna/north-indian`
        );
        const lagna = await lagnaChart.text();

        const navamsaChart = await fetch(
          `${process.env.HEYASTRO_API_URL}/kundli/chart/1/${
            geographic.Latitude
          },${geographic.Longitude}/${DOB.toISOString()}/navamsa/north-indian`
        );
        const navamsa = await navamsaChart.text();

        const saptamsaChart = await fetch(
          `${process.env.HEYASTRO_API_URL}/kundli/chart/1/${
            geographic.Latitude
          },${geographic.Longitude}/${DOB.toISOString()}/saptamsa/north-indian`
        );
        const saptamsa = await saptamsaChart.text();

        // const rasiChart = await fetch(
        //   `${process.env.HEYASTRO_API_URL}/kundli/chart/1/${
        //     geographic.Latitude
        //   },${geographic.Longitude}/${DOB.toISOString()}/rasi/north-indian`
        // );
        // const rasi = await rasiChart.text();

        const userId = await AsyncStorage.getItem("userId");

        console.log(kundli, lagna, navamsa, saptamsa);
        console.log("new", fullName, DOB, place);

        const addKundli = await Fetch_API(
          `${STRAPI_API_URL}/api/users/kundli/${userId}`,
          {
            Kundli: {
              Name: fullName,
              DOB: DOB.toISOString(),
              Place: `${place.City}, ${place.State}, ${place.Country}`,
              Kundli: kundli.kundli,
              PlanetPosition: kundli.planet_position,
              Charts: [
                {
                  Name: "Lagna Chart",
                  SVG_XML: lagna,
                },
                {
                  Name: "Navamsa Chart",
                  SVG_XML: navamsa,
                },
                {
                  Name: "Saptamsa Chart",
                  SVG_XML: saptamsa,
                },
              ],
            },
          },
          "PUT",
          {
            "Content-Type": "application/json",
          }
        );
        // ,
        //         {
        //           Name: "Rasi Chart",
        //           SVG_XML: rasi,
        //         },
        console.log(addKundli);
        setIsLoading(false);
        navigation.navigate("DetailedKundli", {
          Kundli: kundli.kundli,
          PlanetPosition: kundli.planet_position,
          userData: {
            Name: fullName,
            Date: DOB.toDateString(),
            Time: moment(DOB).format("hh:mm a"),
            Place: `${place.City},${place.State},${place.Country}`,
          },
          Charts: [
            {
              Name: "Lagna Chart",
              SVG_XML: lagna,
            },
            {
              Name: "Navamsa Chart",
              SVG_XML: navamsa,
            },
            {
              Name: "Saptamsa Chart",
              SVG_XML: saptamsa,
            },
          ],
        });
      } else {
        ToastAndroid.show("Please enter all the details", ToastAndroid.SHORT);
      }
    } catch (error) {
      ToastAndroid.show(
        "Something went wrong, Please try again later",
        ToastAndroid.SHORT
      );
      console.log(error);
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
          backgroundColor: "#423b88",
          paddingVertical: 6,
          borderBottomWidth: 0,
        }}
        centerComponent={{
          text: "New Kundli",
          style: {
            color: "#fff",
            fontSize: RFPercentage(3.5),
            fontFamily: "Dongle-Regular",
            marginTop: RFPercentage(0.5),
          },
        }}
      />
      <View style={{ flex: 1, marginTop: RFPercentage(2) }}>
        <Text
          style={{
            fontFamily: "Dongle-Bold",
            color: "black",
            fontSize: RFPercentage(2.5),
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
            onChangeText={async (pincode) => {
              if (pincode.length === 6) {
                const data = await getLocation(pincode);
                setGeographic({
                  Longitude: data.Longitude,
                  Latitude: data.Latitude,
                });
                setPlace({
                  Country: data.Country,
                  State: data.State,
                  City: data.City,
                });
              }
            }}
          />
        </View>
      </View>
      {/* Generate Kundli */}
      <View style={{ backgroundColor: "white" }}>
        <Button
          title={"Generate Kundli"}
          titleStyle={{ fontFamily: "Ubuntu-Regular" }}
          buttonStyle={{
            borderRadius: RFPercentage(1),
            backgroundColor: "#423b88",
          }}
          containerStyle={{
            width: "100%",
            paddingVertical: RFPercentage(1),
            paddingHorizontal: RFPercentage(2),
          }}
          onPress={generateKundli}
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

export default CreateKundli;
