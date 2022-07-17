import {
  View,
  Text,
  StatusBar,
  ActivityIndicator,
  BackHandler,
  ToastAndroid,
  PermissionsAndroid,
  Modal,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { WebView } from "react-native-webview";
import { Header } from "react-native-elements";
import { RFPercentage } from "react-native-responsive-fontsize";
import { FetchAPI, Fetch_API } from "../helpers/FetchInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import { STRAPI_API_URL } from "@env";

export default class VideoCall extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userAgent:
        "Mozilla/5.0 (Linux; An33qdroid 10; Android SDK built for x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.185 Mobile Safari/537.36",
      userUsageTime: 0,
      userBalance: null,
      astrologerChargesPerMinute: null,
      showLoader: false,
    };
    // Back Button Clicked
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  cameraPermission = async () => {
    let granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: "Camera Permission",
        message: "App needs access to your camera " + "so others can see you.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      }
    );
  };

  micPermission = async () => {
    let granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      {
        title: "Audio Permission",
        message: "App needs access to your audio / microphone",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      }
    );
  };

  increaseUsageTime = 0;

  deductBalance = async (Amount) => {
    try {
      clearInterval(this.increaseUsageTime);
      this.setState({
        userBalance: this.state.userBalance - Amount,
        showLoader: true,
      });
      const userId = await AsyncStorage.getItem("userId");
      const removeBalance = await FetchAPI({
        query: `
            mutation {
              updateUsersPermissionsUser(id: ${this.props.route.params.userId}, data: { Balance: ${this.state.userBalance} }) {
                data {
                  attributes {
                    Balance
                  }
                }
              }
            }
        `,
      });
      this.setState({
        userBalance:
          removeBalance.data.updateUsersPermissionsUser.data.attributes.Balance,
      });
      const date = new Date();
      const addOrderHistory = await Fetch_API(
        `${STRAPI_API_URL}/api/users/orderhistory/${this.props.route.params.userId}`,
        {
          OrderHistory: {
            OrderId: uuid.v4(),
            AstrologerName: JSON.stringify(
              this.props.route.params.astrologerName
            ),
            DateAndTime: JSON.stringify(date.toISOString()),
            CallRate: JSON.stringify(this.state.astrologerChargesPerMinute),
            Duration: JSON.stringify(Math.ceil(this.state.userUsageTime / 60)),
            Deduction: JSON.stringify(
              Math.ceil(this.state.userUsageTime / 60) *
                this.state.astrologerChargesPerMinute
            ),
            OrderType: JSON.stringify("Call"),
          },
        },
        "PUT",
        {
          "Content-Type": "application/json",
        }
      );
      console.log("addOrderHistory", addOrderHistory);
      console.log(
        "Final Balance",
        removeBalance.data.updateUsersPermissionsUser.data.attributes.Balance
      );
      // Exit the Screen
      console.log("Exit the Screen");
      this.setState({ showLoader: false });
      this.props.navigation.goBack();
    } catch (error) {
      ToastAndroid.show("Something went wrong", ToastAndroid.SHORT);
      this.setState({ showLoader: false });
    }
  };

  calculateTime = async () => {
    // Astrologer Charge Per Minute
    const getCharges = await FetchAPI({
      query: `
        query {
          astrologers(filters: { Username: { eq: ${JSON.stringify(
            this.props.route.params.astrologerId
          )} } }) {
            data {
              attributes {
                ChargePerMinute
              }
            }
          }
        }      
      `,
    });
    const { ChargePerMinute } = getCharges.data.astrologers.data[0].attributes;
    this.setState({ astrologerChargesPerMinute: ChargePerMinute });
    // User Balance
    const userId = await AsyncStorage.getItem("userId");
    const getBalance = await FetchAPI({
      query: `
        query {
          usersPermissionsUser(id: ${this.props.route.params.userId}) {
            data {
              attributes {
                Balance
              }
            }
          }
        }
      `,
    });
    const { Balance } = getBalance.data.usersPermissionsUser.data.attributes;
    this.setState({ userBalance: Balance });

    // Calculate User Usage Time
    console.log("balance", Balance);
    console.log("ChargePerMinute", ChargePerMinute);
    let maximumTime = Math.floor(Balance / ChargePerMinute) * 60;
    let usageTime = 0;
    console.log("maximumTime", maximumTime);
    this.increaseUsageTime = setInterval(() => {
      if (usageTime < maximumTime) {
        this.setState({ userUsageTime: usageTime++ });
        console.log("userTime", this.state.userUsageTime);
      } else {
        this.deductBalance(Balance);
        setTimeout(() => {
          ToastAndroid.show(
            "Out of Balance, Please recharge your account",
            ToastAndroid.LONG
          );
        }, 2000);
      }
    }, 1000);
  };

  componentDidMount() {
    this.cameraPermission();
    this.micPermission();
    this.calculateTime();
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
    clearInterval(this.increaseUsageTime);
  }

  handleBackButtonClick() {
    Alert.alert(
      "Leave",
      "Are you sure you want to leave?",
      [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        {
          text: "Leave",
          onPress: () => {
            if (this.state.userUsageTime > 20) {
              console.log("usage", this.state.userUsageTime);
              const { userUsageTime, astrologerChargesPerMinute } = this.state;
              let amount =
                Math.ceil(userUsageTime / 60) * astrologerChargesPerMinute;
              console.log("amount", amount);
              this.deductBalance(amount);
            } else {
              // Exit the Screen
              this.props.navigation.goBack();
              clearInterval(this.increaseUsageTime);
            }
          },
        },
      ],
      { cancelable: true }
    );
    return true;
  }

  render() {
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
          leftComponent={{
            icon: "arrow-back",
            color: "#fff",
            iconStyle: {
              marginLeft: RFPercentage(1),
              marginTop: RFPercentage(0.8),
            },
            onPress: () => {
              if (this.state.userUsageTime > 10) {
                console.log("usage", this.state.userUsageTime);
                const { userUsageTime, astrologerChargesPerMinute } =
                  this.state;
                let amount =
                  Math.ceil(userUsageTime / 60) * astrologerChargesPerMinute;
                console.log("amount", amount);
                this.deductBalance(amount);
              } else {
                // Exit the Screen
                this.props.navigation.goBack();
                clearInterval(this.increaseUsageTime);
              }
            },
          }}
          centerComponent={{
            text: "Call",
            style: {
              color: "#fff",
              fontSize: RFPercentage(3.5),
              fontFamily: "Dongle-Regular",
              marginTop: RFPercentage(0.5),
            },
          }}
        />

        <WebView
          userAgent={this.state.userAgent} //Set your useragent (Browser) **Very Important
          mediaPlaybackRequiresUserAction={false}
          originWhitelist={["*"]}
          allowsInlineMediaPlayback
          bounces={true}
          source={{ uri: this.props.route.params.videoCallUrl }}
          startInLoadingState
          scalesPageToFit
          javaScriptEnabled={true}
          renderLoadingView={() => {
            return (
              <ActivityIndicator
                color="#1F4693"
                size="large"
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              />
            );
          }}
        />
        <Modal transparent={true} visible={this.state.showLoader}>
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
  }
}
