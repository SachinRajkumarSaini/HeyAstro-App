import {
  View,
  Text,
  StatusBar,
  ScrollView,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  ActivityIndicator,
  TouchableHighlight,
  Modal,
} from "react-native";
import React, { useState, useEffect } from "react";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Header, Card, Image } from "react-native-elements";
import FileBase64 from "../helpers/FileBase64";
import { FetchAPI } from "../helpers/FetchInstance";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CometChat } from "@cometchat-pro/react-native-chat";
import { useIsFocused } from "@react-navigation/native";
import { CometChatAuth } from "../helpers/CometChatAuth";

const ChatsAndCall = (props) => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [astrologers, setAstrologers] = useState([]);
  const [category, setCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [showContactDialog, setShowContactDialog] = useState(false);
  const [selectedAstrologer, setSelectedAstrologer] = useState();
  const [userBalance, setUserBalance] = useState(null);

  const fetchAstrologers = async () => {
    try {
      setIsLoading(true);
      setAstrologers([]);
      if (category === "All") {
        const getAstrologers = await FetchAPI({
          query: `
                    query {
                        astrologers {
                            data {
                                attributes {
                                    Name
                                    Languages
                                    Experience
                                    Username
                                    ProfileImage
                                    ChargePerMinute
                                }
                            }
                        }
                    }              
            `,
        });
        setAstrologers(
          await Promise.all(
            getAstrologers.data.astrologers.data.map(async (item) => {
              try {
                const { status } = await CometChat.getUser(
                  item.attributes.Username
                );
                return {
                  ...item.attributes,
                  status: status,
                };
              } catch (error) {
                return {
                  ...item.attributes,
                  status: "offline",
                };
              }
            })
          ),
          setIsLoading(false)
        );
      } else {
        const getAstrologers = await FetchAPI({
          query: `
                query {
                  astrologers(
                    filters: {
                      or: [
                        {
                          Category: { eq: ${JSON.stringify(category)} }
                        },
                        {
                          Category: { eq: "All" }
                        }
                      ]
                    }
                  ) {
                    data {
                      attributes {
                        Name
                        Languages
                        Experience
                        Username
                        ProfileImage
                        ChargePerMinute           
                      }
                    }
                  }
                }                        
            `,
        });

        setAstrologers(
          await Promise.all(
            getAstrologers.data.astrologers.data.map(async (item) => {
              try {
                const { status } = await CometChat.getUser(
                  item.attributes.Username
                );
                return {
                  ...item.attributes,
                  status: status,
                };
              } catch (error) {
                return {
                  ...item.attributes,
                  status: "offline",
                };
              }
            })
          ),
          setIsLoading(false)
        );
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const loginCometChat = async () => {
    try {
      setIsLoading(true);
      setAstrologers([]);
      // Fetching Profile
      const userId = await AsyncStorage.getItem("userId");
      const fetchProfile = await FetchAPI({
        query: `
              query{
                usersPermissionsUser(id:${userId}){
                  data{
                    attributes{
                      FullName
                      username                     
                    }
                  }
                }
              }
        `,
      });
      const authCometChat = await CometChatAuth(
        fetchProfile.data.usersPermissionsUser.data.attributes.username,
        fetchProfile.data.usersPermissionsUser.data.attributes.FullName
      );
      if (authCometChat) {
        setIsLoading(false);
        fetchAstrologers();
      }
    } catch (error) {
      setIsLoading(false);
      ToastAndroid.show(
        "Some error occured, Please try again later",
        ToastAndroid.SHORT
      );
    }
  };

  const fetchUserBalance = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      const getBalance = await FetchAPI({
        query: `
            query {
              usersPermissionsUser(id: ${userId}) {
                data {
                  attributes {
                    Balance
                  }
                }
              }
            }
          `,
      });
      setUserBalance(
        getBalance.data.usersPermissionsUser.data.attributes.Balance
      );
    } catch (error) {
      ToastAndroid.show(
        "Some error occured, Please try again later",
        ToastAndroid.SHORT
      );
    }
  };

  useEffect(() => {
    loginCometChat();
    fetchUserBalance();
  }, [isFocused, category]);

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
          text: "Astrologers",
          style: {
            color: "#fff",
            fontSize: RFPercentage(3.5),
            fontFamily: "Dongle-Regular",
            marginTop: RFPercentage(0.5),
          },
        }}
        rightComponent={
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              activeOpacity={0.9}
              style={{ marginHorizontal: RFPercentage(1) }}
              onPress={() => navigation.navigate("Searching")}
            >
              <FontAwesome name="search" color="white" size={26} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginHorizontal: RFPercentage(1) }}
              activeOpacity={0.9}
              onPress={() => navigation.navigate("Wallet")}
            >
              <MaterialCommunityIcons name="wallet" color="white" size={27} />
            </TouchableOpacity>
          </View>
        }
      />
      <View style={{ backgroundColor: "#e4e9f5", flex: 1.1 }}>
        <ScrollView
          automaticallyAdjustContentInsets={true}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => setCategory("All")}
          >
            <Card
              containerStyle={{
                borderRadius: RFPercentage(1),
                width: RFPercentage(14),
                alignItems: "center",
                height: RFPercentage(10.5),
                borderColor: category === "All" ? "#1F4693" : "#e8e6ff",
                ...style.shadow,
              }}
            >
              <Text
                style={{
                  color: "black",
                  textAlign: "center",
                  fontFamily: "Ubuntu-Regular",
                  fontSize: RFPercentage(1.2),
                  alignItems: "center",
                  position: "absolute",
                  left: -15,
                  top: -7,
                }}
              >
                All
              </Text>
              <Image
                source={{ uri: FileBase64.categoryAll }}
                style={{
                  height: RFPercentage(7),
                  width: RFPercentage(7),
                }}
              />
            </Card>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => setCategory("Love")}
          >
            <Card
              containerStyle={{
                borderRadius: RFPercentage(1),
                width: RFPercentage(14),
                alignItems: "center",
                height: RFPercentage(10.5),
                borderColor: category === "Love" ? "#1F4693" : "#e8e6ff",
                ...style.shadow,
              }}
            >
              <Text
                style={{
                  color: "black",
                  textAlign: "center",
                  fontFamily: "Ubuntu-Regular",
                  fontSize: RFPercentage(1.2),
                  alignItems: "center",
                  position: "absolute",
                  left: -15,
                  top: -7,
                }}
              >
                Love
              </Text>
              <Image
                source={{ uri: FileBase64.categoryLove }}
                style={{
                  height: RFPercentage(7),
                  width: RFPercentage(7),
                  marginTop: RFPercentage(0.5),
                }}
              />
            </Card>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => setCategory("Career")}
          >
            <Card
              containerStyle={{
                borderRadius: RFPercentage(1),
                width: RFPercentage(14),
                alignItems: "center",
                height: RFPercentage(10.5),
                borderColor: category === "Career" ? "#1F4693" : "#e8e6ff",
                ...style.shadow,
              }}
            >
              <Text
                style={{
                  color: "black",
                  textAlign: "center",
                  fontFamily: "Ubuntu-Regular",
                  fontSize: RFPercentage(1.2),
                  alignItems: "center",
                  position: "absolute",
                  left: -15,
                  top: -7,
                }}
              >
                Career
              </Text>
              <Image
                source={{ uri: FileBase64.categoryCarrer }}
                style={{
                  height: RFPercentage(7),
                  width: RFPercentage(7),
                }}
              />
            </Card>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => setCategory("Marriage")}
          >
            <Card
              containerStyle={{
                borderRadius: RFPercentage(1),
                width: RFPercentage(14),
                alignItems: "center",
                height: RFPercentage(10.5),
                borderColor: category === "Marriage" ? "#1F4693" : "#e8e6ff",
                ...style.shadow,
              }}
            >
              <Text
                style={{
                  color: "black",
                  textAlign: "center",
                  fontFamily: "Ubuntu-Regular",
                  fontSize: RFPercentage(1.2),
                  alignItems: "center",
                  position: "absolute",
                  left: -15,
                  top: -7,
                }}
              >
                Marriage
              </Text>
              <Image
                source={{ uri: FileBase64.categoryMarriage }}
                style={{
                  height: RFPercentage(7),
                  width: RFPercentage(7),
                  marginTop: RFPercentage(0.8),
                }}
              />
            </Card>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => setCategory("Health")}
          >
            <Card
              containerStyle={{
                borderRadius: RFPercentage(1),
                width: RFPercentage(14),
                alignItems: "center",
                height: RFPercentage(10.5),
                borderColor: category === "Health" ? "#1F4693" : "#e8e6ff",
                ...style.shadow,
              }}
            >
              <Text
                style={{
                  color: "black",
                  textAlign: "center",
                  fontFamily: "Ubuntu-Regular",
                  fontSize: RFPercentage(1.2),
                  alignItems: "center",
                  position: "absolute",
                  left: -15,
                  top: -7,
                }}
              >
                Health
              </Text>
              <Image
                source={{ uri: FileBase64.categoryHealth }}
                style={{
                  height: RFPercentage(7),
                  marginTop: RFPercentage(0.9),
                  width: RFPercentage(7),
                }}
              />
            </Card>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => setCategory("Wealth")}
          >
            <Card
              containerStyle={{
                borderRadius: RFPercentage(1),
                width: RFPercentage(14),
                alignItems: "center",
                height: RFPercentage(10.5),
                borderColor: category === "Wealth" ? "#1F4693" : "#e8e6ff",
                ...style.shadow,
              }}
            >
              <Text
                style={{
                  color: "black",
                  textAlign: "center",
                  fontFamily: "Ubuntu-Regular",
                  fontSize: RFPercentage(1.2),
                  alignItems: "center",
                  position: "absolute",
                  left: -15,
                  top: -7,
                }}
              >
                Wealth
              </Text>
              <Image
                source={{ uri: FileBase64.categoryWealth }}
                style={{
                  height: RFPercentage(7),
                  width: RFPercentage(7),
                }}
              />
            </Card>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => setCategory("Family")}
          >
            <Card
              containerStyle={{
                borderRadius: RFPercentage(1),
                width: RFPercentage(14),
                alignItems: "center",
                height: RFPercentage(10.5),
                borderColor: category === "Family" ? "#1F4693" : "#e8e6ff",
                ...style.shadow,
              }}
            >
              <Text
                style={{
                  color: "black",
                  textAlign: "center",
                  fontFamily: "Ubuntu-Regular",
                  fontSize: RFPercentage(1.2),
                  alignItems: "center",
                  position: "absolute",
                  left: -15,
                  top: -7,
                }}
              >
                Family
              </Text>
              <Image
                source={{ uri: FileBase64.categoryFamily }}
                style={{
                  height: RFPercentage(7),
                  width: RFPercentage(7),
                  marginTop: RFPercentage(0.7),
                }}
              />
            </Card>
          </TouchableOpacity>
        </ScrollView>
        <Text
          style={{
            color: "black",
            fontFamily: "Dongle-Bold",
            fontSize: RFPercentage(2),
            textAlign: "right",
            marginEnd: RFPercentage(1),
          }}
        >
          Swipe >>
        </Text>
      </View>

      <View style={{ flex: 5.3, backgroundColor: "#dce4f5" }}>
        {isLoading && (
          <ActivityIndicator
            style={{ marginVertical: RFPercentage(10) }}
            size={RFPercentage(5)}
            color={"#1F4693"}
          />
        )}
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ paddingBottom: RFPercentage(3) }}>
            {astrologers.length != 0
              ? astrologers.map((astrologer, index) => {
                  return (
                    <Card
                      key={index}
                      containerStyle={{
                        borderRadius: RFPercentage(1),
                        ...style.shadow,
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <View style={{ justifyContent: "center" }}>
                          <Image
                            source={{
                              uri: astrologer.ProfileImage
                                ? astrologer.ProfileImage
                                : FileBase64.profile_Placeholder,
                            }}
                            style={{
                              height: 80,
                              width: 80,
                              borderRadius: 40,
                              borderWidth: 1,
                              borderColor: "black",
                            }}
                          />
                        </View>
                        <View style={{ justifyContent: "space-around" }}>
                          <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={{
                              fontFamily: "Ubuntu-Bold",
                              color: "black",
                              fontSize: RFPercentage(2),
                              maxWidth: RFPercentage(19),
                            }}
                          >
                            {astrologer.Name}
                          </Text>
                          <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={{
                              fontFamily: "Ubuntu-Regular",
                              color: "black",
                              fontSize: RFPercentage(1.8),
                              maxWidth: RFPercentage(19),
                            }}
                          >
                            {astrologer.Languages &&
                              astrologer.Languages.map((language, index) => {
                                return (
                                  <Text
                                    style={{
                                      fontFamily: "Ubuntu-Regular",
                                      color: "black",
                                      fontSize: RFPercentage(1.8),
                                      maxWidth: RFPercentage(19),
                                      marginTop: RFPercentage(0.5),
                                    }}
                                    key={index}
                                  >
                                    {language}&nbsp;&nbsp;
                                  </Text>
                                );
                              })}
                          </Text>
                          <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={{
                              fontFamily: "Ubuntu-Regular",
                              color: "black",
                              fontSize: RFPercentage(1.8),
                              maxWidth: RFPercentage(19),
                            }}
                          >
                            Experience:- {astrologer.Experience}
                          </Text>
                          <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={{
                              fontFamily: "Ubuntu-Regular",
                              color: "black",
                              fontSize: RFPercentage(1.8),
                              maxWidth: RFPercentage(19),
                              marginTop: RFPercentage(0.1),
                            }}
                          >
                            Status:-{" "}
                            {astrologer.status === "online" ? (
                              <Text style={{ color: "green" }}>Online</Text>
                            ) : (
                              <Text style={{ color: "red" }}>Offline</Text>
                            )}
                          </Text>
                          <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={{
                              fontFamily: "Ubuntu-Regular",
                              color: "black",
                              fontSize: RFPercentage(1.8),
                              maxWidth: RFPercentage(19),
                              marginTop: RFPercentage(0.5),
                            }}
                          >
                            <FontAwesome name="inr" color="green" size={15} />
                            <Text
                              style={{
                                fontFamily: "Ubuntu-Bold",
                                color: "black",
                              }}
                            >
                              {astrologer.ChargePerMinute} /Min
                            </Text>
                          </Text>
                        </View>
                        <View style={{ justifyContent: "center" }}>
                          <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => {
                              setSelectedAstrologer(JSON.stringify(astrologer));
                              setShowContactDialog(true);
                            }}
                          >
                            <Card
                              containerStyle={{
                                borderRadius: RFPercentage(1),
                                borderColor: "green",
                                borderWidth: 1,
                                ...style.shadow,
                              }}
                            >
                              <Text
                                style={{
                                  color: "green",
                                  fontFamily: "Ubuntu-Regular",
                                  fontSize: RFPercentage(1.6),
                                  textAlign: "center",
                                  alignItems: "center",
                                }}
                              >
                                Contact
                              </Text>
                            </Card>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </Card>
                  );
                })
              : !isLoading && (
                  <View
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginVertical: RFPercentage(2),
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Dongle-Regular",
                        color: "black",
                        fontSize: RFPercentage(3),
                      }}
                    >
                      No Astrologers Found
                    </Text>
                  </View>
                )}
          </View>
        </ScrollView>
      </View>
      {selectedAstrologer && (
        <Modal
          onRequestClose={() => setShowContactDialog(false)}
          transparent={true}
          visible={showContactDialog}
        >
          <View style={{ backgroundColor: "#000000aa", flex: 1 }}>
            <View style={{ flex: 1.6 }} />
            <View
              style={{
                backgroundColor: "white",
                flex: 1,
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: RFPercentage(4),
                }}
              >
                <Image
                  source={{
                    uri: JSON.parse(selectedAstrologer).ProfileImage
                      ? JSON.parse(selectedAstrologer).ProfileImage
                      : FileBase64.profile_Placeholder,
                  }}
                  style={{
                    height: RFPercentage(12),
                    width: RFPercentage(12),
                    borderRadius: RFPercentage(6),
                    borderWidth: 1,
                    borderColor: "black",
                    marginBottom: RFPercentage(1.5),
                  }}
                />
                <View>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{
                      fontFamily: "Ubuntu-Bold",
                      color: "black",
                      fontSize: RFPercentage(2),
                      maxWidth: RFPercentage(19),
                    }}
                  >
                    {JSON.parse(selectedAstrologer).Name}
                  </Text>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{
                      fontFamily: "Ubuntu-Regular",
                      color: "black",
                      fontSize: RFPercentage(1.8),
                      maxWidth: RFPercentage(19),
                      marginTop: RFPercentage(0.5),
                    }}
                  >
                    Rate:- <FontAwesome name="inr" color="green" size={14} />
                    <Text style={{ fontFamily: "Ubuntu-Bold", color: "black" }}>
                      {JSON.parse(selectedAstrologer).ChargePerMinute} /Min
                    </Text>
                  </Text>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{
                      fontFamily: "Ubuntu-Regular",
                      color: "black",
                      fontSize: RFPercentage(1.8),
                      maxWidth: RFPercentage(19),
                      marginTop: RFPercentage(0.5),
                    }}
                  >
                    Status :-{" "}
                    {JSON.parse(selectedAstrologer).status === "online" ? (
                      <Text style={{ color: "green" }}>Online</Text>
                    ) : (
                      <Text style={{ color: "red" }}> Offline</Text>
                    )}
                  </Text>
                </View>
                <View />
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  marginTop: RFPercentage(2),
                }}
              >
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => {
                    if (JSON.parse(selectedAstrologer).status === "online") {
                      if (
                        JSON.parse(selectedAstrologer).ChargePerMinute <=
                        userBalance
                      ) {
                        navigation.navigate("ChatUI", {
                          userName: JSON.parse(selectedAstrologer).Username,
                        });
                        setShowContactDialog(false);
                      } else {
                        navigation.navigate("Wallet");
                        ToastAndroid.show(
                          "Insufficient Balance, Please recharge your wallet",
                          ToastAndroid.SHORT
                        );
                      }
                    } else {
                      ToastAndroid.show(
                        "Astrologer is offline, Please try again later!",
                        ToastAndroid.SHORT
                      );
                    }
                  }}
                >
                  <Card
                    containerStyle={{
                      borderRadius: RFPercentage(1),
                      borderColor: "#1F4693",
                      borderWidth: 1,
                      height: RFPercentage(7),
                      width: RFPercentage(18),
                    }}
                  >
                    <Text
                      style={{
                        color: "#1F4693",
                        fontFamily: "Dongle-Regular",
                        fontSize: RFPercentage(3),
                        textAlign: "center",
                        alignItems: "center",
                      }}
                    >
                      Chat
                    </Text>
                  </Card>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={async () => {
                    if (JSON.parse(selectedAstrologer).status === "online") {
                      if (
                        JSON.parse(selectedAstrologer).ChargePerMinute <=
                        userBalance
                      ) {
                        const userName = await AsyncStorage.getItem("userName");
                        const userId = await AsyncStorage.getItem("userId");
                        const astrologerId =
                          JSON.parse(selectedAstrologer).Username;
                        const astrologerName =
                          JSON.parse(selectedAstrologer).Name;
                        navigation.navigate("VideoCall", {
                          videoCallUrl: `https://heyastro.site/user/${userName}/chatwith/${astrologerId}`,
                          astrologerId: astrologerId,
                          userId: userId,
                          astrologerName: astrologerName,
                        });
                        setShowContactDialog(false);
                      } else {
                        navigation.navigate("Wallet");
                        ToastAndroid.show(
                          "Insufficient Balance, Please recharge your wallet",
                          ToastAndroid.SHORT
                        );
                      }
                    } else {
                      ToastAndroid.show(
                        "Astrologer is offline, Please try again later!",
                        ToastAndroid.SHORT
                      );
                    }
                  }}
                >
                  <Card
                    containerStyle={{
                      borderRadius: RFPercentage(1),
                      borderColor: "#1F4693",
                      borderWidth: 1,
                      width: RFPercentage(18),
                      height: RFPercentage(7),
                    }}
                  >
                    <Text
                      style={{
                        color: "#1F4693",
                        fontFamily: "Dongle-Regular",
                        fontSize: RFPercentage(3),
                        textAlign: "center",
                        alignItems: "center",
                      }}
                    >
                      Call
                    </Text>
                  </Card>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
});

export default ChatsAndCall;
