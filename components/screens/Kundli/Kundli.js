import {
  View,
  Text,
  StatusBar,
  ScrollView,
  ToastAndroid,
  Alert,
  Modal,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Header, Button, Card } from "react-native-elements";
import { RFPercentage } from "react-native-responsive-fontsize";
import Ionicons from "react-native-vector-icons/Ionicons";
import React, { useState, useEffect } from "react";
import { FetchAPI, Fetch_API } from "../../helpers/FetchInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KundliPlaceholder } from "../../helpers/SkeletonPlaceholder";
import moment from "moment";
import { STRAPI_API_URL } from "@env";

const Kundli = ({ navigation }) => {
  const [kundlies, setKundlies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refresh, setRefresh] = useState(true);
  const [isKundliDeleting, setIsKundliDeleting] = useState(false);

  const fetchKundli = async () => {
    try {
      setIsLoading(true);
      const userId = await AsyncStorage.getItem("userId");
      const getKundli = await FetchAPI({
        query: `
            query{
              usersPermissionsUser(id:${userId}){
                data{
                  attributes{
                    Kundli
                  }
                }
              }
            }
        `,
      });
      setKundlies(
        getKundli.data.usersPermissionsUser.data.attributes.Kundli,
        setIsLoading(false)
      );
      // console.log(getKundli.data.usersPermissionsUser.data.attributes.Kundli);
    } catch (error) {
      ToastAndroid.show(
        "Something went wrong, Please try again",
        ToastAndroid.SHORT
      );
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchKundli();
  }, [refresh]);

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
          text: "Kundli",
          style: {
            color: "#fff",
            fontSize: RFPercentage(3.5),
            fontFamily: "Dongle-Regular",
            marginTop: RFPercentage(0.5),
          },
        }}
      />

      {/* Previous Kundli */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1 }}>
          {isLoading ? (
            <KundliPlaceholder />
          ) : kundlies ? (
            kundlies.map((kundli, index) => {
              const date = new Date(kundli.DOB);
              return (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.9}
                  onPress={() => {
                    navigation.navigate("DetailedKundli", {
                      Kundli: kundli.Kundli,
                      PlanetPosition: kundli.PlanetPosition,
                      userData: {
                        Name: kundli.Name,
                        Date: date.toDateString(),
                        Time: moment(date).format("hh:mm a"),
                        Place: kundli.Place,
                      },
                      Charts: [
                        {
                          Name: "Lagna Chart",
                          SVG_XML: kundli.Charts[0].SVG_XML,
                        },
                        {
                          Name: "Navamsa Chart",
                          SVG_XML: kundli.Charts[1].SVG_XML,
                        },
                        {
                          Name: "Saptamsa Chart",
                          SVG_XML: kundli.Charts[2].SVG_XML,
                        },
                      ],
                    });
                  }}
                >
                  <Card containerStyle={{ borderRadius: RFPercentage(1.5) }}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Card
                        containerStyle={{
                          flex: 1,
                          margin: 0,
                          borderRadius: RFPercentage(5),
                          marginRight: RFPercentage(2),
                          backgroundColor: `#${(
                            ((1 << 24) * Math.random()) |
                            0
                          ).toString(16)}`,
                        }}
                      >
                        <Text
                          style={{ textAlign: "center", fontWeight: "bold" }}
                        >
                          {kundli.Name[0]}
                        </Text>
                      </Card>
                      <View style={{ flex: 10 }}>
                        <Text
                          style={{ fontFamily: "Dongle-Bold", color: "black" }}
                        >
                          {kundli.Name}
                        </Text>
                        <Text
                          style={{
                            fontFamily: "Dongle-Regular",
                            color: "black",
                          }}
                        >
                          {date.toDateString()}
                        </Text>
                        <Text
                          style={{
                            fontFamily: "Dongle-Regular",
                            color: "black",
                          }}
                        >
                          {kundli.Place}
                        </Text>
                      </View>
                      <View style={{ flex: 1, justifyContent: "center" }}>
                        <Ionicons
                          name="trash-sharp"
                          color="#e04e1d"
                          onPress={() => {
                            Alert.alert(
                              "Delete",
                              "Are you sure you want to delete?",
                              [
                                {
                                  text: "Cancel",
                                  onPress: () => console.log("Cancel Pressed"),
                                  style: "cancel",
                                },
                                {
                                  text: "OK",
                                  onPress: async () => {
                                    try {
                                      setIsKundliDeleting(true);
                                      const userId = await AsyncStorage.getItem(
                                        "userId"
                                      );
                                      const deleteKundli = await fetch(
                                        `${STRAPI_API_URL}/api/users/kundli/delete/${userId}/${kundli.id}`,
                                        {
                                          method: "PUT",
                                          headers: {
                                            "Content-Type": "application/json",
                                          },
                                        }
                                      );
                                      const isKundliDeleted =
                                        await deleteKundli.json();
                                      if (isKundliDeleted.deletedKundli) {
                                        setIsKundliDeleting(false);
                                        ToastAndroid.show(
                                          "Kundli deleted successfully",
                                          ToastAndroid.SHORT
                                        );
                                        setRefresh(!refresh);
                                      }
                                    } catch (error) {
                                      ToastAndroid.show(
                                        "Something went wrong, Please try again",
                                        ToastAndroid.SHORT
                                      );
                                      setIsKundliDeleting(false);
                                    }
                                  },
                                },
                              ],
                              { cancelable: true }
                            );
                          }}
                          size={RFPercentage(3)}
                        />
                      </View>
                    </View>
                  </Card>
                </TouchableOpacity>
              );
            })
          ) : (
            <Text
              style={{
                textAlign: "center",
                fontFamily: "Dongle-Regular",
                fontSize: RFPercentage(3),
                marginTop: RFPercentage(40),
                color: "black",
              }}
            >
              No Previous Kundli
            </Text>
          )}
        </View>
      </ScrollView>

      {/* Create Kundli */}
      <View style={{ backgroundColor: "white" }}>
        <Button
          title={"Create New Kundli"}
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
          onPress={() => navigation.navigate("CreateKundli")}
        />
      </View>
      {/* Loading Model */}
      <Modal transparent={true} visible={isKundliDeleting}>
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

export default Kundli;
