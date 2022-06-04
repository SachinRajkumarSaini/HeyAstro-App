import {
  View,
  Text,
  StatusBar,
  ToastAndroid,
  ActivityIndicator,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Header, Card, Button } from "react-native-elements";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Octicons from "react-native-vector-icons/Octicons";
import RazorpayCheckout from "react-native-razorpay";
import uuid from "react-native-uuid";
import { Fetch_API, FetchAPI } from "../helpers/FetchInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Animatable from "react-native-animatable";
import { STRAPI_API_URL } from "@env";

const PaymentInformation = ({ route, navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPaymentStatus, setShowPaymentStatus] = useState(false);
  const [amount] = useState(route.params.Amount);
  const [balance] = useState(route.params.Balance);
  const [previousTransactions, setPreviousTransactions] = useState([
    route.params.Transactions,
  ]);
  const [status, setStatus] = useState("");

  const verifyPayment = async (data, orderId) => {
    try {
      const verifyPayment = await Fetch_API(
        `${process.env.HEYASTRO_API_URL}/razorpay/verifyOrder`,
        {
          order_id: orderId,
          payment_id: data.razorpay_payment_id,
        },
        "POST",
        {
          "Content-Type": "application/json",
          "x-razorpay-signature": data.razorpay_signature,
        }
      );

      const userId = await AsyncStorage.getItem("userId");

      if (verifyPayment.success) {
        // Update Balance
        const updateBalance = await FetchAPI({
          query: `
                mutation {
                  updateUsersPermissionsUser(
                    id: ${userId}
                    data: {
                      Balance: ${parseFloat(amount + balance).toFixed(2)}
                    }
                  ) {
                    data {
                      attributes {
                        Balance
                      }
                    }
                  }
                }
            `,
        });
        const { Balance } =
          updateBalance.data.updateUsersPermissionsUser.data.attributes;
        if (Balance) {
          // Adding Transactions to the user
          const date = new Date();
          const netAmount = parseFloat(
            route.params.Amount * 0.18 + route.params.Amount
          );
          const addTransactions = await Fetch_API(
            `${STRAPI_API_URL}/api/users/transactions/${userId}`,
            {
              Transactions: {
                Success: true,
                Razorpay_Order_Id: JSON.stringify(orderId),
                Razorpay_Payment_Id: JSON.stringify(data.razorpay_payment_id),
                Razorpay_Signature: JSON.stringify(data.razorpay_signature),
                Amount: parseFloat(netAmount).toFixed(2),
                DateAndTime: JSON.stringify(date.toISOString()),
              },
            },
            "PUT",
            {
              "Content-Type": "application/json",
            }
          );
          console.log(addTransactions);
          if (addTransactions.Balance) {
            setStatus("Success");
            setIsLoading(false);
            setShowPaymentStatus(true);
            setTimeout(() => {
              setShowPaymentStatus(false);
              navigation.navigate("Settings", {
                balance: addTransactions.Balance,
              });
            }, 2000);
            ToastAndroid.show("Payment Success", ToastAndroid.SHORT);
          }
        } else {
          setStatus("Failed");
          setIsLoading(false);
          setShowPaymentStatus(true);
          setTimeout(() => {
            setShowPaymentStatus(false);
            navigation.navigate("Settings");
          }, 2000);
          ToastAndroid.show("Payment Failed", ToastAndroid.SHORT);
        }
      }
      if (!verifyPayment.success) {
        // Adding Transactions to the user
        const date = new Date();
        const netAmount = parseFloat(
          route.params.Amount * 0.18 + route.params.Amount
        );
        const addTransactions = await Fetch_API(
          `${STRAPI_API_URL}/api/users/transactions/${userId}`,
          {
            Transactions: {
              Success: false,
              Razorpay_Order_Id: JSON.stringify(orderId),
              Razorpay_Payment_Id: JSON.stringify(data.razorpay_payment_id),
              Razorpay_Signature: JSON.stringify(data.razorpay_signature),
              Amount: parseFloat(netAmount).toFixed(2),
              DateAndTime: JSON.stringify(date.toISOString()),
            },
          },
          "PUT",
          {
            "Content-Type": "application/json",
          }
        );
        if (addTransactions.Balance) {
          setStatus("Failed");
          setIsLoading(false);
          setShowPaymentStatus(true);
          setTimeout(() => {
            setShowPaymentStatus(false);
            navigation.navigate("Settings");
          }, 2000);
          ToastAndroid.show(
            "Payment Failed, You'll get refund soon",
            ToastAndroid.SHORT
          );
        }
      }
    } catch (error) {
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
      ToastAndroid.show(
        "Payment Failed, You'll get refund soon",
        ToastAndroid.SHORT
      );
      console.log("error rrrr", error);
      setIsLoading(false);
    }
  };

  const procedToPay = async () => {
    try {
      setIsLoading(true);
      const orderId = uuid.v4();
      const netAmount = parseInt(
        (route.params.Amount * 0.18 + route.params.Amount) * 100
      );
      const createOrder = await Fetch_API(
        `${process.env.HEYASTRO_API_URL}/razorpay/createOrder`,
        {
          amount: netAmount,
          currency: "INR",
          receipt: orderId,
          notes: {
            description: "Recharge in HeyAstro Wallet",
          },
        },
        "POST",
        {
          "Content-Type": "application/json",
        }
      );
      console.log(createOrder);

      // Make Payment
      let options = {
        description: createOrder.notes.description,
        image:
          "https://heyastrostorage.sgp1.digitaloceanspaces.com/media/0130c17883f0c32295cd1bd02767b092.png?updated_at=2022-05-23T17:44:01.472Z",
        currency: "INR",
        key: "rzp_test_ykpbNGeZA2KkNC",
        amount: createOrder.amount,
        name: "Hey Astro",
        order_id: createOrder.id, //Replace this with an order_id created using Orders API.
        theme: { color: "#423b88" },
      };

      RazorpayCheckout.open(options)
        .then((data) => {
          setIsLoading(true);
          console.log(data);
          verifyPayment(data, createOrder.id);
        })
        .catch((error) => {
          setIsLoading(false);
          ToastAndroid.show("Cancelled!", ToastAndroid.SHORT);
        });
    } catch (error) {
      ToastAndroid.show(
        "Something went wrong, Please try again later!",
        ToastAndroid.SHORT
      );
      setIsLoading(false);
      console.log(error);
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
          text: "Payment Information",
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
      <View style={{ flex: 1 }}>
        {/* Payment Details */}
        <Card containerStyle={{ borderRadius: RFPercentage(1) }}>
          <Text style={{ color: "#818181", fontFamily: "Ubuntu-Bold" }}>
            Payment Details
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: RFPercentage(0.8),
            }}
          >
            <Text style={{ color: "#818181", fontFamily: "Ubuntu-Regular" }}>
              Total Amount
            </Text>
            <View style={{ flexDirection: "row" }}>
              <FontAwesome
                name="inr"
                size={15}
                style={{ marginTop: RFPercentage(0.2) }}
              />
              <Text
                style={{
                  color: "#818181",
                  marginStart: RFPercentage(0.5),
                  fontFamily: "Ubuntu-Regular",
                }}
              >
                {route.params.Amount}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: RFPercentage(0.8),
            }}
          >
            <Text style={{ color: "#818181", fontFamily: "Ubuntu-Regular" }}>
              GST (18%)
            </Text>
            <View style={{ flexDirection: "row" }}>
              <FontAwesome
                name="inr"
                size={15}
                style={{ marginTop: RFPercentage(0.35) }}
              />
              <Text
                style={{
                  color: "#818181",
                  marginStart: RFPercentage(0.5),
                  fontFamily: "Ubuntu-Regular",
                }}
              >
                {parseFloat(route.params.Amount * 0.18).toFixed(2)}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: RFPercentage(0.8),
            }}
          >
            <Text style={{ fontFamily: "Ubuntu-Bold", color: "#818181" }}>
              Total Payable Amount
            </Text>
            <View style={{ flexDirection: "row" }}>
              <FontAwesome
                name="inr"
                size={15}
                color="black"
                style={{ marginTop: RFPercentage(0.2) }}
              />
              <Text
                style={{
                  marginStart: RFPercentage(0.5),
                  fontFamily: "Ubuntu-Bold",
                  color: "black",
                }}
              >
                {parseFloat(
                  route.params.Amount * 0.18 + route.params.Amount
                ).toFixed(2)}
              </Text>
            </View>
          </View>
        </Card>
      </View>
      <View style={{ backgroundColor: "white" }}>
        <Button
          title={"Proced to Pay"}
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
          onPress={procedToPay}
        />
      </View>

      {/* Verifying Payment */}
      <Modal visible={isLoading}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size={RFPercentage(8)} color="#423b88" />
        </View>
      </Modal>

      {/* Payment Success */}
      <Modal visible={showPaymentStatus}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Octicons
            name={status === "Success" ? "verified" : "unverified"}
            color={status === "Success" ? "green" : "red"}
            size={RFPercentage(7)}
          />
          <Animatable.Text
            style={{
              fontSize: RFPercentage(8),
              fontWeight: "bold",
              color: "#482a49",
              marginTop: RFPercentage(2),
            }}
            animation="pulse"
            iterationCount={5}
            direction="alternate"
          >
            <Text
              style={{
                fontFamily: "Ubuntu-Bold",
                fontSize: RFPercentage(3),
                color: status === "Success" ? "#482a49" : "red",
              }}
            >
              Payment {status === "Success" ? "Successful" : "Failed"}
            </Text>
          </Animatable.Text>
        </View>
      </Modal>
    </View>
  );
};

export default PaymentInformation;
