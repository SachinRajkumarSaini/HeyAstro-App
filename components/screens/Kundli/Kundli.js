import { View, Text, StatusBar, ScrollView, ToastAndroid } from "react-native";
import { Header, Button, Card } from "react-native-elements";
import { RFPercentage } from "react-native-responsive-fontsize";
import Ionicons from "react-native-vector-icons/Ionicons";
import React, { useState, useEffect } from "react";
import { FetchAPI } from "../../helpers/FetchInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KundliPlaceholder } from "../../helpers/SkeletonPlaceholder";
import moment from "moment";

const Kundli = ({ navigation }) => {
  const [kundlies, setKundlies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
      console.log(getKundli.data.usersPermissionsUser.data.attributes.Kundli);
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
  }, []);

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
                      <Text style={{ textAlign: "center", fontWeight: "bold" }}>
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
                        style={{ fontFamily: "Dongle-Regular", color: "black" }}
                      >
                        {date.toDateString()}
                      </Text>
                      <Text
                        style={{ fontFamily: "Dongle-Regular", color: "black" }}
                      >
                        {kundli.Place}
                      </Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: "center" }}>
                      <Ionicons
                        name="trash-sharp"
                        color="#e04e1d"
                        size={RFPercentage(3)}
                      />
                    </View>
                  </View>
                </Card>
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
            backgroundColor: "#423b88",
          }}
          containerStyle={{
            width: "100%",
            paddingVertical: RFPercentage(1),
            paddingHorizontal: RFPercentage(2),
          }}
          onPress={() => navigation.navigate("CreateKundli")}
        />
      </View>
    </View>
  );
};

export default Kundli;
