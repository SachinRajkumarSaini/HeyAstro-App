import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
} from "react-native";
import React, { useState, useEffect } from "react";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Header, Card } from "react-native-elements";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { FetchAPI } from "../helpers/FetchInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import { OrderHistoryPlaceholder } from "../helpers/SkeletonPlaceholder";

const OrderHistory = ({ navigation }) => {
  const [callOrderHistory, setCallOrderHistory] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [chatOrderhistories, setChatOrderHistories] = useState([]);
  const [callOrderhistories, setCallOrderHistories] = useState([]);

  const fetchOrderHistory = async () => {
    try {
      setIsLoading(true);
      const userId = await AsyncStorage.getItem("userId");
      const getHistories = await FetchAPI({
        query: `
          query {
            usersPermissionsUser(id: ${JSON.stringify(userId)}) {
              data {
                attributes {
                  OrderHistory
                }
              }
            }
          }     
        `,
      });

      if (getHistories.data.usersPermissionsUser.data.attributes.OrderHistory) {
        setChatOrderHistories(
          getHistories.data.usersPermissionsUser.data.attributes.OrderHistory.filter(
            (item) => JSON.parse(item.OrderType) === "Chat"
          )
        );
        setCallOrderHistories(
          getHistories.data.usersPermissionsUser.data.attributes.OrderHistory.filter(
            (item) => JSON.parse(item.OrderType) === "Call"
          )
        );
      }
      setIsLoading(false);
    } catch (error) {
      ToastAndroid.show(
        "Something went wrong, Please try again later!",
        ToastAndroid.SHORT
      );
      setIsLoading(false);
      // console.log(error);
    }
  };

  useEffect(() => {
    fetchOrderHistory();
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
          backgroundColor: "#1F4693",
          paddingVertical: 6,
          borderBottomWidth: 0,
        }}
        centerComponent={{
          text: "Order History",
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

      {/* Tab Bar */}
      <View
        style={{
          backgroundColor: "white",
          flexDirection: "row",
          justifyContent: "space-around",
          paddingVertical: RFPercentage(2),
        }}
      >
        <TouchableOpacity onPress={() => setCallOrderHistory(true)}>
          <Text
            style={{
              fontFamily: "Ubuntu-Bold",
              fontSize: RFPercentage(1.8),
              color: callOrderHistory ? "black" : "#bfbfbf",
            }}
          >
            Call
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCallOrderHistory(false)}>
          <Text
            style={{
              fontFamily: "Ubuntu-Bold",
              fontSize: RFPercentage(1.8),
              color: !callOrderHistory ? "black" : "#bfbfbf",
            }}
          >
            Chat
          </Text>
        </TouchableOpacity>
      </View>

      {/* Order History */}
      {callOrderHistory ? (
        <View
          style={{
            flex: 1,
            backgroundColor: "#dce4f5",
            paddingBottom: RFPercentage(3),
          }}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            {isLoading ? (
              <OrderHistoryPlaceholder />
            ) : callOrderhistories.length > 0 ? (
              callOrderhistories.map((item, index) => {
                const date = new Date(JSON.parse(item.DateAndTime));
                const formattedDate = moment(date).format(
                  "DD MMM YYYY hh:mm A"
                );
                return (
                  <Card
                    key={index}
                    containerStyle={{
                      margin: RFPercentage(2),
                      borderRadius: RFPercentage(1),
                    }}
                  >
                    <Text
                      style={{
                        color: "#181A18",
                        fontFamily: "Ubuntu-Regular",
                        fontSize: RFPercentage(1.8),
                        textAlign: "center",
                      }}
                    >
                      {item.OrderId.split("-")[0]}
                    </Text>
                    <Text
                      style={{
                        color: "black",
                        fontFamily: "Ubuntu-Regular",
                        fontSize: RFPercentage(1.8),
                        marginTop: RFPercentage(1),
                      }}
                    >
                      Astrologer :- {JSON.parse(item.AstrologerName)}
                    </Text>
                    <Text
                      style={{
                        color: "black",
                        fontFamily: "Ubuntu-Regular",
                        fontSize: RFPercentage(1.8),
                        marginTop: RFPercentage(0.5),
                      }}
                    >
                      Date :- {formattedDate}
                    </Text>
                    <Text
                      style={{
                        color: "black",
                        fontFamily: "Ubuntu-Regular",
                        fontSize: RFPercentage(1.8),
                        marginTop: RFPercentage(0.5),
                      }}
                    >
                      Call rate :-{" "}
                      <FontAwesome
                        name="inr"
                        color="green"
                        size={15}
                        style={{ marginTop: RFPercentage(0.5) }}
                      />{" "}
                      {JSON.parse(item.CallRate)}/min{" "}
                    </Text>
                    <Text
                      style={{
                        color: "#181A18",
                        fontFamily: "Ubuntu-Regular",
                        fontSize: RFPercentage(1.8),
                        marginTop: RFPercentage(0.5),
                      }}
                    >
                      Duration :- {item.Duration} minutes
                    </Text>
                    <Text
                      style={{
                        color: "#181A18",
                        fontFamily: "Ubuntu-Regular",
                        fontSize: RFPercentage(1.8),
                        marginTop: RFPercentage(0.5),
                      }}
                    >
                      Deduction :-{" "}
                      <FontAwesome
                        name="inr"
                        color="green"
                        size={15}
                        style={{ marginTop: RFPercentage(0.5) }}
                      />{" "}
                      {item.Deduction}
                    </Text>
                  </Card>
                );
              })
            ) : (
              <Text
                style={{
                  color: "black",
                  fontFamily: "Ubuntu-Regular",
                  textAlign: "center",
                  marginTop: RFPercentage(30),
                }}
              >
                No Call Order History
              </Text>
            )}
          </ScrollView>
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            backgroundColor: "#dce4f5",
            paddingBottom: RFPercentage(3),
          }}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            {isLoading ? (
              <OrderHistoryPlaceholder />
            ) : chatOrderhistories.length > 0 ? (
              chatOrderhistories.map((item, index) => {
                const date = new Date(JSON.parse(item.DateAndTime));
                const formattedDate = moment(date).format(
                  "DD MMM YYYY hh:mm A"
                );
                return (
                  <Card
                    key={index}
                    containerStyle={{
                      margin: RFPercentage(2),
                      borderRadius: RFPercentage(1),
                    }}
                  >
                    <Text
                      style={{
                        color: "#181A18",
                        fontFamily: "Ubuntu-Regular",
                        fontSize: RFPercentage(1.8),
                        textAlign: "center",
                      }}
                    >
                      {item.OrderId.split("-")[0]}
                    </Text>
                    <Text
                      style={{
                        color: "black",
                        fontFamily: "Ubuntu-Regular",
                        fontSize: RFPercentage(1.8),
                        marginTop: RFPercentage(1),
                      }}
                    >
                      Astrologer :- {JSON.parse(item.AstrologerName)}
                    </Text>
                    <Text
                      style={{
                        color: "black",
                        fontFamily: "Ubuntu-Regular",
                        fontSize: RFPercentage(1.8),
                        marginTop: RFPercentage(0.5),
                      }}
                    >
                      Date :- {formattedDate}
                    </Text>
                    <Text
                      style={{
                        color: "black",
                        fontFamily: "Ubuntu-Regular",
                        fontSize: RFPercentage(1.8),
                        marginTop: RFPercentage(0.5),
                      }}
                    >
                      Call rate :-{" "}
                      <FontAwesome
                        name="inr"
                        color="green"
                        size={15}
                        style={{ marginTop: RFPercentage(0.5) }}
                      />{" "}
                      {JSON.parse(item.CallRate)}/min{" "}
                    </Text>
                    <Text
                      style={{
                        color: "#181A18",
                        fontFamily: "Ubuntu-Regular",
                        fontSize: RFPercentage(1.8),
                        marginTop: RFPercentage(0.5),
                      }}
                    >
                      Duration :- {item.Duration} minutes
                    </Text>
                    <Text
                      style={{
                        color: "#181A18",
                        fontFamily: "Ubuntu-Regular",
                        fontSize: RFPercentage(1.8),
                        marginTop: RFPercentage(0.5),
                      }}
                    >
                      Deduction :-{" "}
                      <FontAwesome
                        name="inr"
                        color="green"
                        size={15}
                        style={{ marginTop: RFPercentage(0.5) }}
                      />{" "}
                      {item.Deduction}
                    </Text>
                  </Card>
                );
              })
            ) : (
              <Text
                style={{
                  color: "black",
                  fontFamily: "Ubuntu-Regular",
                  textAlign: "center",
                  marginTop: RFPercentage(30),
                }}
              >
                No Chat Order History
              </Text>
            )}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default OrderHistory;
