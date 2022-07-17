import {
  View,
  Text,
  StatusBar,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
} from "react-native";
import React, { useState, useEffect } from "react";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Header, Card, SearchBar, Image } from "react-native-elements";
import FileBase64 from "../helpers/FileBase64";
import { FetchAPI } from "../helpers/FetchInstance";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { CometChat } from "@cometchat-pro/react-native-chat";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CometChatAuth } from "../helpers/CometChatAuth";

const Searching = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const inputRef = React.useRef();
  const [userBalance, setUserBalance] = useState(null);
  setTimeout(() => inputRef.current.focus(), 100);
  const [astrologers, setAstrologers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [statusLoading, setStatusLoading] = useState(false);
  const [showContactDialog, setShowContactDialog] = useState(false);
  const [selectedAstrologer, setSelectedAstrologer] = useState();

  const fetchAstrologers = async () => {
    try {
      setIsLoading(true);
      setAstrologers([]);
      const getAstrologers = await FetchAPI({
        query: `
                query{
                    astrologers{
                    data{
                        attributes{
                            Username
                            Name
                            Languages
                            Experience
                            ChargePerMinute
                            ProfileImage
                        }
                    }
                    }
                }
              `,
      });
      setAstrologers(
        getAstrologers.data.astrologers.data.map((item) => item.attributes)
      );
      setIsLoading(false);
    } catch (error) {
      ToastAndroid.show(
        "Something went wrong, Please try again later!",
        ToastAndroid.SHORT
      );
      setIsLoading(false);
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
    fetchAstrologers();
    fetchUserBalance();
  }, []);

  const searchAstrologer = async () => {
    try {
      setIsLoading(true);
      setAstrologers([]);
      const getAstrologer = await FetchAPI({
        query: `
                query{
                    astrologers(filters:{Name:{containsi: ${JSON.stringify(
                      search
                    )}}}){
                    data{
                        attributes{
                            Name
                            Languages
                            Experience
                            ChargePerMinute
                            ProfileImage
                        }
                    }
                    }
                }    
              `,
      });
      setAstrologers(
        getAstrologer.data.astrologers.data.map((item) => item.attributes)
      );
      setIsLoading(false);
    } catch (error) {
      ToastAndroid.show(
        "Some error occured, Please try again later",
        ToastAndroid.SHORT
      );
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
          backgroundColor: "#1F4693",
          paddingVertical: 6,
          borderBottomWidth: 0,
        }}
        centerComponent={{
          text: "Search",
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

      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          {/* Search Bar */}
          <View style={{ marginTop: RFPercentage(1) }}>
            <SearchBar
              ref={inputRef}
              onChangeText={(e) => {
                setSearch(e);
                searchAstrologer();
              }}
              returnKeyType="search"
              onClear={() => {
                setSearch("");
                fetchAstrologers();
              }}
              value={search}
              inputContainerStyle={{
                backgroundColor: "white",
                height: RFPercentage(4),
              }}
              containerStyle={{
                backgroundColor: "white",
                borderRadius: RFPercentage(1),
                margin: RFPercentage(1),
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.8,
                shadowRadius: 2,
                elevation: 5,
                borderBottomColor: "transparent",
                borderTopColor: "transparent",
                marginHorizontal: RFPercentage(2),
              }}
              inputStyle={{
                color: "black",
                fontFamily: "Ubuntu-Regular",
                fontSize: RFPercentage(1.8),
              }}
              placeholder="Search astrologers..."
            />
          </View>
          {isLoading && (
            <ActivityIndicator
              style={{ marginVertical: RFPercentage(5) }}
              size={RFPercentage(5)}
              color={"#1F4693"}
            />
          )}
          {/* Search Results */}
          <View style={{ paddingBottom: RFPercentage(3) }}>
            {astrologers.length > 0
              ? astrologers.map((astrologer, index) => {
                  return (
                    <Card
                      key={index}
                      containerStyle={{
                        borderRadius: RFPercentage(1),
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.8,
                        shadowRadius: 2,
                        elevation: 5,
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
                        <View>
                          <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={async () => {
                              try {
                                setStatusLoading(true);
                                const authCometChat = await CometChatAuth(
                                  astrologer.Username,
                                  astrologer.Name
                                );
                                if (authCometChat) {
                                  const astrologerStatus =
                                    await CometChat.getUser(
                                      astrologer.Username
                                    );
                                  astrologer.status = astrologerStatus.status;
                                  setSelectedAstrologer(
                                    JSON.stringify(astrologer)
                                  );
                                  setShowContactDialog(true);
                                } else {
                                  ToastAndroid.show(
                                    "Something went wrong, Please try again later!",
                                    ToastAndroid.SHORT
                                  );
                                }
                                setStatusLoading(false);
                              } catch (error) {
                                if (error.code === "ERR_UID_NOT_FOUND") {
                                  setStatusLoading(false);
                                  ToastAndroid.show(
                                    "Astrologer not found, Please try again later!",
                                    ToastAndroid.SHORT
                                  );
                                }
                              }
                            }}
                          >
                            <Card
                              containerStyle={{
                                borderRadius: RFPercentage(1),
                                borderColor: "green",
                                borderWidth: 1,
                                shadowColor: "#000",
                                shadowOffset: { width: 0, height: 1 },
                                shadowOpacity: 0.8,
                                shadowRadius: 2,
                                elevation: 5,
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
                  <Text
                    style={{
                      color: "black",
                      fontFamily: "Dongle-Regular",
                      textAlign: "center",
                      fontSize: RFPercentage(3),
                      marginTop: RFPercentage(5),
                    }}
                  >
                    No Astrologer Found
                  </Text>
                )}
          </View>
        </View>
      </ScrollView>
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
                          videoCallUrl: `https://heyastro.vercel.app/user/${userName}/chatwith/${astrologerId}`,
                          astrologerId: astrologerId,
                          userId: userId,
                          astrologerName: astrologerName,
                        });
                        setShowContactDialog(false);
                      } else {
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
      {/* Loading Model */}
      <Modal
        onRequestClose={() => {
          setStatusLoading(false);
          setShowContactDialog(false);
        }}
        transparent={true}
        visible={statusLoading}
      >
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

export default Searching;
