import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  Linking,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Header } from "react-native-elements";
import { RFPercentage } from "react-native-responsive-fontsize";
import FileBase64 from "../helpers/FileBase64";
import Share from "react-native-share";
// Icons
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import Foundation from "react-native-vector-icons/Foundation";
import { FetchAPI } from "../helpers/FetchInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Settings = ({ navigation }) => {
  const [settings, setSettings] = useState();
  const [balance, setBalance] = useState();
  const customShare = () => {
    try {
      const ShareOptions = {
        message:
          "Hey! Download HeyAstro app & get the first chat with an astrologer for FREE! Ask anything related to love, relationship, marriage or Career. I am loving it 🥰",
        urls: [FileBase64.heyAstro],
      };
      Share.open(ShareOptions);
    } catch (error) {
      ToastAndroid.show(
        "Some error occurred, Please try again!",
        ToastAndroid.SHORT
      );
    }
  };

  const fetchSettings = async () => {
    try {
      const getSettings = await FetchAPI({
        query: `
                    query{
                        setting{
                            data{
                                attributes{
                                    MediaLinks{
                                        Instagram
                                        Whatsapp
                                        Facebook
                                        Youtube
                                        Twitter
                                        Linkedin
                                    },
                                    Version
                                }
                            }
                        }
                    }
              `,
      });
      setSettings(getSettings.data.setting.data.attributes);
    } catch (error) {
      ToastAndroid.show(
        "Something went wrong, Please try again later!",
        ToastAndroid.SHORT
      );
    }
  };

  const fetchBalance = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      const getBalance = await FetchAPI({
        query: `
            query{
              usersPermissionsUser(id: ${userId}){
                data{
                  attributes{
                    Balance
                  }
                }
              }
            }
        `,
      });
      setBalance(getBalance.data.usersPermissionsUser.data.attributes.Balance);
    } catch (error) {
      ToastAndroid.show(
        "Something went wrong, Please try again later!",
        ToastAndroid.SHORT
      );
    }
  };

  useEffect(() => {
    fetchSettings();
    fetchBalance();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
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
          text: "Settings",
          style: {
            color: "#fff",
            fontSize: RFPercentage(3.5),
            fontFamily: "Dongle-Regular",
            marginTop: RFPercentage(0.5),
          },
        }}
      />

      {/* Body Section */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginBottom: RFPercentage(2) }}>
          <View style={{ margin: RFPercentage(1) }}>
            <View style={{ margin: RFPercentage(1) }}>
              <Text
                style={{
                  color: "black",
                  fontFamily: "Ubuntu-Bold",
                  fontSize: RFPercentage(2),
                }}
              >
                My Account
              </Text>
              <Text
                style={{
                  marginTop: RFPercentage(0.5),
                  color: "#818181",
                  fontFamily: "Ubuntu-Regular",
                  fontSize: RFPercentage(1.5),
                }}
              >
                Check your favourites, edit your settings & notifications
              </Text>
            </View>

            <View
              style={{
                flexDirection: "column",
                margin: RFPercentage(1),
                marginTop: 0,
              }}
            >
              {/* <TouchableOpacity
                onPress={() => navigation.navigate('Following')}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    margin: RFPercentage(1),
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <FontAwesome5
                      color={'#818181'}
                      name="user-plus"
                      size={18}
                    />
                    <Text
                      style={{
                        marginStart: RFPercentage(2),
                        color: '#818181',
                        fontFamily: 'Ubuntu-Regular',
                        fontSize: RFPercentage(1.4),
                        marginTop: RFPercentage(0.4),
                      }}>
                      Following
                    </Text>
                  </View>
                  <View>
                    <FontAwesome5
                      color={'#818181'}
                      name="angle-right"
                      size={20}
                    />
                  </View>
                </View>
              </TouchableOpacity> */}

              <TouchableOpacity
                onPress={() => navigation.navigate("MoreSettings")}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    margin: RFPercentage(1),
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <Feather color={"#818181"} name="settings" size={18} />
                    <Text
                      style={{
                        marginStart: RFPercentage(2),
                        color: "#818181",
                        fontFamily: "Ubuntu-Regular",
                        fontSize: RFPercentage(1.4),
                        marginTop: RFPercentage(0.4),
                      }}
                    >
                      Settings
                    </Text>
                  </View>
                  <View>
                    <FontAwesome5
                      color={"#818181"}
                      name="angle-right"
                      size={20}
                    />
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate("Notifications")}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    margin: RFPercentage(1),
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <Ionicons
                      color={"#818181"}
                      name="notifications"
                      size={18}
                    />
                    <Text
                      style={{
                        marginStart: RFPercentage(2),
                        color: "#818181",
                        fontFamily: "Ubuntu-Regular",
                        fontSize: RFPercentage(1.4),
                        marginTop: RFPercentage(0.4),
                      }}
                    >
                      Notifications
                    </Text>
                  </View>
                  <View>
                    <FontAwesome5
                      color={"#818181"}
                      name="angle-right"
                      size={20}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.horizontalLine} />
          <View style={{ margin: RFPercentage(1) }}>
            <View style={{ margin: RFPercentage(1) }}>
              <Text
                style={{
                  color: "black",
                  fontFamily: "Ubuntu-Bold",
                  fontSize: RFPercentage(2),
                }}
              >
                My Orders
              </Text>
              <Text
                style={{
                  marginTop: RFPercentage(0.5),
                  color: "#818181",
                  fontFamily: "Ubuntu-Regular",
                  fontSize: RFPercentage(1.5),
                }}
              >
                View your Order & Wallet Transactions
              </Text>
            </View>

            <View
              style={{
                flexDirection: "column",
                margin: RFPercentage(1),
                marginTop: 0,
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("OrderHistory")}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    margin: RFPercentage(1),
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <AntDesign color={"#818181"} name="slack" size={18} />
                    <Text
                      style={{
                        marginStart: RFPercentage(2),
                        color: "#818181",
                        fontFamily: "Ubuntu-Regular",
                        fontSize: RFPercentage(1.4),
                        marginTop: RFPercentage(0.4),
                      }}
                    >
                      Order History
                    </Text>
                  </View>
                  <View>
                    <FontAwesome5
                      color={"#818181"}
                      name="angle-right"
                      size={20}
                    />
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Wallet", {
                    balance: balance,
                  })
                }
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    margin: RFPercentage(1),
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <Entypo color={"#818181"} name="wallet" size={18} />
                    <Text
                      style={{
                        marginStart: RFPercentage(2),
                        fontFamily: "Ubuntu-Regular",
                        color: "#818181",
                        fontSize: RFPercentage(1.4),
                        marginTop: RFPercentage(0.4),
                      }}
                    >
                      Wallet Transactions
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <FontAwesome
                      name="inr"
                      color="green"
                      size={15}
                      style={{ marginTop: RFPercentage(0.5) }}
                    />
                    <Text
                      style={{
                        marginEnd: RFPercentage(2),
                        marginStart: RFPercentage(0.5),
                        fontFamily: "Ubuntu-Regular",
                        fontSize: RFPercentage(1.4),
                        marginTop: RFPercentage(0.4),
                        color: "#818181",
                      }}
                    >
                      {balance}
                    </Text>
                    <FontAwesome5
                      color={"#818181"}
                      name="angle-right"
                      size={20}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.horizontalLine} />

          {/* Help And Customer Support */}
          <TouchableOpacity
            onPress={() => navigation.navigate("HelpAndSupport")}
          >
            <View style={{ margin: RFPercentage(2) }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    color: "black",
                    fontFamily: "Ubuntu-Regular",
                    fontSize: RFPercentage(1.8),
                  }}
                >
                  Help
                </Text>
                <FontAwesome5 name="angle-right" color={"#818181"} size={20} />
              </View>
              <Text
                style={{
                  fontFamily: "Ubuntu-Regular",
                  color: "#818181",
                  fontSize: RFPercentage(1.3),
                  marginTop: RFPercentage(0.4),
                }}
              >
                FAQ's and Customer Support
              </Text>
            </View>
          </TouchableOpacity>

          <View style={styles.horizontalLine} />

          {/* Rate Us */}
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(
                "https://play.google.com/store/apps/details?id=com.heyastro"
              ).catch((error) => {
                ToastAndroid.show(
                  "Some error occurred, Please try again!",
                  ToastAndroid.SHORT
                );
              });
            }}
          >
            <View
              style={{
                margin: RFPercentage(2),
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  color: "black",
                  fontFamily: "Ubuntu-Regular",
                  fontSize: RFPercentage(1.8),
                }}
              >
                Rate us
              </Text>
              <FontAwesome5 name="angle-right" color={"#818181"} size={20} />
            </View>
          </TouchableOpacity>

          <View style={styles.horizontalLine} />

          {/* Refer and Earn
          <TouchableOpacity onPress={() => navigation.navigate('ReferAndEarn')}>
            <View
              style={{
                margin: RFPercentage(2),
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  color: 'black',
                  fontFamily: 'Ubuntu-Regular',
                  fontSize: RFPercentage(1.8),
                }}>
                Refer and Earn
              </Text>
              <FontAwesome5 name="angle-right" color={'#818181'} size={20} />
            </View>
          </TouchableOpacity> */}

          {/* <View style={styles.horizontalLine} /> */}

          {/* Feedback */}
          <TouchableOpacity onPress={() => navigation.navigate("Feedback")}>
            <View style={{ margin: RFPercentage(2) }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    color: "black",
                    fontFamily: "Ubuntu-Regular",
                    fontSize: RFPercentage(1.8),
                  }}
                >
                  Feedback
                </Text>
                <FontAwesome5 name="angle-right" color={"#818181"} size={20} />
              </View>
            </View>
          </TouchableOpacity>

          <View style={styles.horizontalLine} />

          {/* Share */}
          <TouchableOpacity onPress={customShare}>
            <View
              style={{
                margin: RFPercentage(2),
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  color: "black",
                  fontFamily: "Ubuntu-Regular",
                  fontSize: RFPercentage(1.8),
                }}
              >
                Share
              </Text>
              <FontAwesome5 name="angle-right" color={"#818181"} size={20} />
            </View>
          </TouchableOpacity>

          <View style={styles.horizontalLine} />

          {/* Social Media Handles */}
          <View style={{ margin: RFPercentage(2) }}>
            <Text
              style={{
                color: "black",
                fontFamily: "Ubuntu-Regular",
                fontSize: RFPercentage(1.3),
                marginTop: RFPercentage(0.5),
              }}
            >
              Also available on
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "70%",
                marginTop: RFPercentage(1),
              }}
            >
              <AntDesign
                onPress={() => {
                  Linking.openURL(settings.MediaLinks.Instagram).catch(
                    (error) => {
                      ToastAndroid.show(
                        "Some error occurred, Please try again!",
                        ToastAndroid.SHORT
                      );
                    }
                  );
                }}
                name="instagram"
                color={"#c6408e"}
                size={15}
              />
              <FontAwesome
                onPress={() => {
                  Linking.openURL(settings.MediaLinks.Whatsapp).catch(
                    (error) => {
                      ToastAndroid.show(
                        "Some error occurred, Please try again!",
                        ToastAndroid.SHORT
                      );
                    }
                  );
                }}
                name="whatsapp"
                color={"#58aa14"}
                size={15}
              />
              <FontAwesome
                onPress={() => {
                  Linking.openURL(settings.MediaLinks.Facebook).catch(
                    (error) => {
                      ToastAndroid.show(
                        "Some error occurred, Please try again!",
                        ToastAndroid.SHORT
                      );
                    }
                  );
                }}
                name="facebook-square"
                color={"#0b529f"}
                size={15}
              />
              <FontAwesome5
                onPress={() => {
                  Linking.openURL(settings.MediaLinks.Youtube).catch(
                    (error) => {
                      ToastAndroid.show(
                        "Some error occurred, Please try again!",
                        ToastAndroid.SHORT
                      );
                    }
                  );
                }}
                name="youtube"
                size={15}
                color={"#e53d32"}
              />
              <AntDesign
                onPress={() => {
                  Linking.openURL(settings.MediaLinks.Twitter).catch(
                    (error) => {
                      ToastAndroid.show(
                        "Some error occurred, Please try again!",
                        ToastAndroid.SHORT
                      );
                    }
                  );
                }}
                name="twitter"
                size={15}
                color={"#46aeeb"}
              />
              <Foundation
                onPress={() => {
                  Linking.openURL(settings.MediaLinks.Linkedin).catch(
                    (error) => {
                      ToastAndroid.show(
                        "Some error occurred, Please try again!",
                        ToastAndroid.SHORT
                      );
                    }
                  );
                }}
                name="social-linkedin"
                color={"#0b529f"}
                size={15}
              />
            </View>
          </View>

          {/* Versions */}
          <View style={{ marginTop: RFPercentage(1) }}>
            <Text
              style={{
                textAlign: "center",
                fontFamily: "Ubuntu-Bold",
                color: "green",
              }}
            >
              Version {settings && settings.Version}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  horizontalLine: {
    marginHorizontal: RFPercentage(2),
    borderBottomColor: "#e1e1e1",
    borderBottomWidth: 1,
  },
});

export default Settings;
