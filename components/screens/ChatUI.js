import React, { useEffect, useState } from "react";
import {
  View,
  StatusBar,
  ActivityIndicator,
  BackHandler,
  ToastAndroid,
  PermissionsAndroid,
  Alert,
  Modal
} from "react-native";
import { CometChat } from "@cometchat-pro/react-native-chat";
import { CometChatMessages } from "../../CometChatWorkspace/src/index";
import { RFPercentage } from "react-native-responsive-fontsize";
import { FetchAPI, Fetch_API } from "../helpers/FetchInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import { STRAPI_API_URL } from "@env";

export default class CometChatMessagesView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userUsageTime: 0,
      userBalance: null,
      astrologerChargesPerMinute: null,
      showLoader: false,
      localUser: null,
      astrologerUser: null,
      sessionId: null
    };
    // Back Button Clicked
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  cameraPermission = async () => {
    let granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: "Camera Permission",
        message: "App needs access to your camera " + "so others can see you.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
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
        buttonPositive: "OK"
      }
    );
  };

  increaseUsageTime = 0;

  deductBalance = async Amount => {
    try {
      clearInterval(this.increaseUsageTime);
      this.setState({
        userBalance: this.state.userBalance - Amount,
        showLoader: true
      });
      const userId = await AsyncStorage.getItem("userId");
      const removeBalance = await FetchAPI({
        query: `
            mutation {
              updateUsersPermissionsUser(id: ${this.props.route.params
                .userId}, data: { Balance: ${this.state.userBalance} }) {
                data {
                  attributes {
                    Balance
                  }
                }
              }
            }
        `
      });
      this.setState({
        userBalance:
          removeBalance.data.updateUsersPermissionsUser.data.attributes.Balance
      });
      const date = new Date();
      const addOrderHistory = await Fetch_API(
        `${STRAPI_API_URL}/api/users/orderhistory/${this.props.route.params
          .userId}`,
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
            OrderType: JSON.stringify("Call")
          }
        },
        "PUT",
        {
          "Content-Type": "application/json"
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
      `
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
      `
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

  getLoggedinUser = () => {
    CometChat.getLoggedinUser().then(
      user => {
        // console.log("user details:", { user });
        this.setState({ localUser: user });
      },
      error => {
        // console.log("error getting details:", { error });
        ToastAndroid.show(
          "Some error occured, Please try again later",
          ToastAndroid.SHORT
        );
      }
    );
  };

  getAstrologerUser = () => {
    const astrologerId = this.props.route.params.astrologerId;
    CometChat.getUser(astrologerId).then(
      user => {
        // console.log("User details fetched for user:", user);
        this.setState({ astrologerUser: user });
      },
      error => {
        // console.log("User details fetching failed with error:", error);
        ToastAndroid.show(
          "Some error occured, Please try again later",
          ToastAndroid.SHORT
        );
      }
    );
  };

  goBack = () => {
    if (this.state.userUsageTime > 20) {
      console.log("usage", this.state.userUsageTime);
      const { userUsageTime, astrologerChargesPerMinute } = this.state;
      let amount = Math.ceil(userUsageTime / 60) * astrologerChargesPerMinute;
      console.log("amount", amount);
      this.deductBalance(amount);
    } else {
      // Exit the Screen
      this.props.navigation.goBack();
      clearInterval(this.increaseUsageTime);
    }
  };

  componentDidMount() {
    this.getLoggedinUser();
    this.getAstrologerUser();
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
          style: "cancel"
        },
        {
          text: "Leave",
          onPress: this.goBack
        }
      ],
      { cancelable: true }
    );
    return true;
  }

  startCall = callingType => {
    let receiverID = this.props.route.params.astrologerId;
    let callType =
      callingType === "audioCall"
        ? CometChat.CALL_TYPE.AUDIO
        : CometChat.CALL_TYPE.VIDEO;
    let receiverType = CometChat.RECEIVER_TYPE.USER;
    let call = new CometChat.Call(receiverID, callType, receiverType);
    CometChat.initiateCall(call).then(
      outGoingCall => {
        console.log("Call initiated successfully:", outGoingCall.sessionId);
        this.setState({ sessionId: outGoingCall.sessionId });
        let callListener = new CometChat.OngoingCallListener({
          onUserJoined: user => {
            console.log("User joined call:", user);
          },
          onUserLeft: user => {
            console.log("User left call:", user);
          },
          onUserListUpdated: userList => {
            console.log("user list:", userList);
          },
          onAudioModesUpdated: audioModes => {
            console.log("audio modes:", audioModes);
          },
          onCallEnded: call => {
            console.log("Call ended listener", call);
            CometChat.endCall(outGoingCall.sessionId).then(
              call => {
                console.log("call ended", call);
              },
              error => {
                console.log("error", error);
              }
            );
          },
          onError: error => {
            console.log("Call Error: ", error);
          },
          onCallSwitchedToVideo: (
            sessionID,
            callSwitchInitiatedBy,
            callSwitchAcceptedBy
          ) => {
            console.log("call switched to video:", {
              sessionID,
              callSwitchInitiatedBy,
              callSwitchAcceptedBy
            });
          },
          onUserMuted: (userMuted, userMutedBy) => {
            console.log("user muted:", {
              userMuted,
              userMutedBy
            });
          }
        });

        let callSettings = new CometChat.CallSettingsBuilder()
          .setSessionID(outGoingCall.sessionId)
          .enableDefaultLayout(true)
          .showEndCallButton(false)
          .setCallEventListener(callListener)
          .build();
        this.props.navigation.navigate("CallingScreen", {
          sessionId: outGoingCall.sessionId,
          callSettings: callSettings
        });
        // perform action on success. Like show your calling screen.
      },
      error => {
        console.log("Call initialization failed with exception:", error);
      }
    );
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          translucent={true}
          barStyle="dark-content"
          backgroundColor={"transparent"}
        />
        {this.state.localUser && this.state.astrologerUser
          ? <CometChatMessages
              type={"user"}
              item={this.state.astrologerUser} //The object will be of user or group depending on type
              loggedInUser={this.state.localUser}
              navigation={this.props.navigation}
              actionGenerated={actionType => {
                if (actionType === "audioCall") {
                  this.startCall("audioCall");
                }
                if (actionType === "videoCall") {
                  this.startCall("videoCall");
                }
              }}
            />
          : <ActivityIndicator
              color="#1F4693"
              size={RFPercentage(8)}
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginTop: RFPercentage(2)
              }}
            />}
      </View>
    );
  }
}
