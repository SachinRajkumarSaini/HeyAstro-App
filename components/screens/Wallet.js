import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Modal,
  ToastAndroid,
} from "react-native";
import React, { useState, useEffect } from "react";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Header, Card } from "react-native-elements";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import TextInput from "react-native-text-input-interactive";
import { Button } from "@rneui/themed";
import { FetchAPI } from "../helpers/FetchInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  WalletTransactionPlaceholder,
  WalletBalancePlaceholder,
} from "../helpers/SkeletonPlaceholder";
import moment from "moment";

const Wallet = ({ route, navigation }) => {
  const [showAddBalance, setShowAddBalance] = useState(false);
  const [amount, setAmount] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [balance, setBalance] = useState(0);

  const fetchWallet = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      const getWallet = await FetchAPI({
        query: `
                query {
                  usersPermissionsUser(id: ${JSON.stringify(userId)}) {
                    data {
                      attributes {
                        Transactions
                        Balance
                      }
                    }
                  }
                }
        `,
      });
      setBalance(getWallet.data.usersPermissionsUser.data.attributes.Balance);
      setTransactions(
        getWallet.data.usersPermissionsUser.data.attributes.Transactions,
        setIsLoading(false)
      );
    } catch (error) {
      ToastAndroid.show(
        "Some error occured, Please try again later",
        ToastAndroid.SHORT
      );
    }
  };

  useEffect(() => {
    fetchWallet();
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
          text: "Wallet",
          style: {
            color: "#fff",
            fontSize: RFPercentage(4),
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
        <View style={{ margin: RFPercentage(1) }}>
          {/* Show Balance */}
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View
              style={{
                justifyContent: "center",
                marginStart: RFPercentage(0.5),
              }}
            >
              <Text
                style={{
                  color: "#181A18",
                  fontFamily: "Ubuntu-Regular",
                  fontSize: RFPercentage(1.8),
                }}
              >
                Available Balance
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  marginTop: RFPercentage(0.5),
                }}
              >
                <FontAwesome
                  name="inr"
                  color="black"
                  size={20}
                  style={{ marginTop: RFPercentage(0.5) }}
                />
                {isLoading ? (
                  <WalletBalancePlaceholder />
                ) : (
                  <Text
                    style={{
                      fontFamily: "Ubuntu-Bold",
                      color: "black",
                      marginStart: RFPercentage(0.5),
                      fontSize: RFPercentage(2.5),
                    }}
                  >
                    {balance}
                  </Text>
                )}
              </View>
            </View>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => setShowAddBalance(true)}
            >
              <Card
                containerStyle={{
                  backgroundColor: "#1F4693",
                  borderRadius: RFPercentage(1),
                  height: RFPercentage(5.5),
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontFamily: "Ubuntu-Regular",
                    color: "white",
                    fontSize: RFPercentage(1.3),
                  }}
                >
                  Recharge
                </Text>
              </Card>
            </TouchableOpacity>
          </View>
          {/* Transaction Buttons */}
          <Card
            containerStyle={{
              backgroundColor: "#f4f4f4",
              borderRadius: RFPercentage(2.2),
              borderColor: "#1F4693",
              height: RFPercentage(5.5),
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "Ubuntu-Regular",
                color: "#828282",
                fontSize: RFPercentage(1.3),
              }}
            >
              Wallet Transaction
            </Text>
          </Card>
        </View>
        <View
          style={{
            marginHorizontal: RFPercentage(2),
            marginTop: RFPercentage(2),
            marginBottom: RFPercentage(1),
            borderBottomColor: "#e1e1e1",
            borderBottomWidth: 1,
          }}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ paddingBottom: RFPercentage(3) }}>
            {isLoading ? (
              <WalletTransactionPlaceholder />
            ) : transactions ? (
              transactions.map((transaction, index) => {
                const date = new Date(JSON.parse(transaction.DateAndTime));
                const formattedDate = moment(date).format(
                  "DD MMM YYYY hh:mm A"
                );
                return (
                  <Card
                    key={index}
                    containerStyle={{ borderRadius: RFPercentage(1) }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginHorizontal: RFPercentage(1),
                      }}
                    >
                      <View>
                        <Text
                          style={{
                            fontFamily: "Ubuntu-Bold",
                            color: "black",
                            fontSize: RFPercentage(1.3),
                          }}
                        >
                          Recharge
                        </Text>
                        <Text
                          style={{
                            fontFamily: "Ubuntu-Regular",
                            color: "#181A18",
                            fontSize: RFPercentage(1.3),
                          }}
                        >
                          {formattedDate}
                        </Text>
                        <Text
                          style={{
                            fontFamily: "Ubuntu-Regular",
                            color: "#181A18",
                            fontSize: RFPercentage(1.3),
                          }}
                        >
                          {
                            JSON.parse(transaction.Razorpay_Order_Id).split(
                              "_"
                            )[1]
                          }
                        </Text>
                      </View>
                      <View>
                        <Text
                          style={{
                            fontFamily: "Ubuntu-Bold",
                            color: "black",
                            fontSize: RFPercentage(1.3),
                          }}
                        >
                          Amount
                        </Text>
                        <Text
                          style={{
                            fontFamily: "Ubuntu-Regular",
                            color: "#181A18",
                            fontSize: RFPercentage(1.3),
                          }}
                        >
                          GST :{" "}
                          <Text
                            style={{
                              fontFamily: "Ubuntu-Regular",
                              color: "black",
                              fontSize: RFPercentage(1.3),
                            }}
                          >
                            {transaction.Amount}{" "}
                          </Text>
                          <FontAwesome
                            name="inr"
                            color="green"
                            size={9.5}
                            style={{ marginTop: RFPercentage(0.5) }}
                          />
                        </Text>
                        <Text
                          style={{
                            fontFamily: "Ubuntu-Regular",
                            color: "#181A18",
                            fontSize: RFPercentage(1.3),
                          }}
                        >
                          Status:{" "}
                          <Text
                            style={{
                              fontFamily: "Ubuntu-Regular",
                              color: transaction.Success ? "green" : "red",
                              fontSize: RFPercentage(1.3),
                            }}
                          >
                            {transaction.Success ? "Success" : "Failed"}
                          </Text>
                        </Text>
                      </View>
                    </View>
                  </Card>
                );
              })
            ) : (
              <Text
                style={{
                  fontFamily: "Dongle-Regular",
                  fontSize: RFPercentage(3),
                  textAlign: "center",
                  marginTop: RFPercentage(5),
                  color: "black",
                }}
              >
                No Transactions
              </Text>
            )}
          </View>
        </ScrollView>
      </View>
      {/* Modal For Enter Amount */}
      <Modal
        onRequestClose={() => setShowAddBalance(false)}
        transparent={true}
        visible={showAddBalance}
      >
        <View style={{ backgroundColor: "#000000aa", flex: 1 }}>
          <View style={{ flex: 2 }} />
          <View
            style={{
              backgroundColor: "white",
              flex: 1,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "Dongle-Regular",
                fontSize: RFPercentage(3.5),
                color: "black",
                textAlign: "center",
                marginTop: RFPercentage(3),
              }}
            >
              Amount to add in Balance
            </Text>
            <TextInput
              textInputStyle={{ marginTop: RFPercentage(3), color: "black" }}
              placeholder="Amount"
              keyboardType="numeric"
              onChangeText={(amount) => {
                setAmount(parseFloat(amount));
              }}
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
              onPress={() => {
                navigation.navigate("PaymentInformation", {
                  Amount: amount,
                  Balance: balance,
                  Transactions: transactions,
                });
                setShowAddBalance(false);
              }}
              title="Submit"
              type="solid"
            />
            <Button
              containerStyle={{
                marginTop: RFPercentage(2),
                width: "90%",
              }}
              buttonStyle={{ backgroundColor: "#ebeef5" }}
              titleStyle={{
                fontFamily: "Dongle-Regular",
                fontSize: RFPercentage(2.5),
                color: "#1F4693",
              }}
              onPress={() => setShowAddBalance(false)}
              title="Cancel"
              type="solid"
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Wallet;
