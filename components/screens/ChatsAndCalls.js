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
import { useNavigation } from "@react-navigation/native";

const ChatsAndCall = (props) => {
  const navigation = useNavigation();
  const [astrologers, setAstrologers] = useState([]);
  const [category, setCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [showContactDialog, setShowContactDialog] = useState(false);
  const [selectedAstrologer, setSelectedAstrologer] = useState();

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
                                    ProfileImage {
                                        data {
                                            attributes {
                                                url
                                            }
                                        }
                                    }
                                    ChargePerMinute
                                }
                            }
                        }
                    }              
            `,
        });
        setAstrologers(
          getAstrologers.data.astrologers.data.map((item) => item.attributes),
          setIsLoading(false)
        );
      } else {
        const getAstrologers = await FetchAPI({
          query: `
              query {
                astrologers(filters:{ Category: { eq : ${JSON.stringify(
                  category
                )} }}) {
                    data {
                        attributes {
                            Name
                            Languages
                            Experience
                            ProfileImage {
                                data {
                                    attributes {
                                        url
                                    }
                                }
                            }
                            ChargePerMinute
                        }
                    }
                }
              }              
            `,
        });
        setAstrologers(
          getAstrologers.data.astrologers.data.map((item) => item.attributes),
          setIsLoading(false)
        );
      }
    } catch (error) {
      ToastAndroid.show(
        "Some error occured, Please try again later",
        ToastAndroid.SHORT
      );
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAstrologers();
  }, [category]);

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
          text: "Astrologers",
          style: {
            color: "#fff",
            fontSize: RFPercentage(3.5),
            fontFamily: "Dongle-Regular",
            marginTop: RFPercentage(0.5),
          },
        }}
      />
      <ScrollView
        style={{ backgroundColor: "#e8e6ff", flex: 1 }}
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
              width: RFPercentage(12.5),
              height: RFPercentage(10.5),
              borderColor: category === "All" ? "#423b88" : "#e8e6ff",
              ...style.shadow,
            }}
          >
            <Text
              style={{
                color: "black",
                textAlign: "center",
                fontFamily: "Ubuntu-Regular",
                fontSize: RFPercentage(1),
                alignItems: "center",
                position: "absolute",
                left: -7,
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
                marginStart: RFPercentage(1),
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
              width: RFPercentage(12.5),
              height: RFPercentage(10.5),
              borderColor: category === "Love" ? "#423b88" : "#e8e6ff",
              ...style.shadow,
            }}
          >
            <Text
              style={{
                color: "black",
                textAlign: "center",
                fontFamily: "Ubuntu-Regular",
                fontSize: RFPercentage(1),
                alignItems: "center",
                position: "absolute",
                left: -7,
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
                marginStart: RFPercentage(1),
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
              width: RFPercentage(12.5),
              height: RFPercentage(10.5),
              borderColor: category === "Career" ? "#423b88" : "#e8e6ff",
              ...style.shadow,
            }}
          >
            <Text
              style={{
                color: "black",
                textAlign: "center",
                fontFamily: "Ubuntu-Regular",
                fontSize: RFPercentage(1),
                alignItems: "center",
                position: "absolute",
                left: -7,
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
                marginStart: RFPercentage(1),
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
              width: RFPercentage(12.5),
              height: RFPercentage(10.5),
              borderColor: category === "Marriage" ? "#423b88" : "#e8e6ff",
              ...style.shadow,
            }}
          >
            <Text
              style={{
                color: "black",
                textAlign: "center",
                fontFamily: "Ubuntu-Regular",
                fontSize: RFPercentage(1),
                alignItems: "center",
                position: "absolute",
                left: -7,
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
                marginTop: RFPercentage(0.5),
                marginStart: RFPercentage(1),
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
              width: RFPercentage(12.5),
              height: RFPercentage(10.5),
              borderColor: category === "Health" ? "#423b88" : "#e8e6ff",
              ...style.shadow,
            }}
          >
            <Text
              style={{
                color: "black",
                textAlign: "center",
                fontFamily: "Ubuntu-Regular",
                fontSize: RFPercentage(1),
                alignItems: "center",
                position: "absolute",
                left: -7,
                top: -7,
              }}
            >
              Health
            </Text>
            <Image
              source={{ uri: FileBase64.categoryHealth }}
              style={{
                height: RFPercentage(7),
                marginTop: RFPercentage(0.7),
                width: RFPercentage(7),
                marginStart: RFPercentage(1),
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
              width: RFPercentage(12.5),
              height: RFPercentage(10.5),
              borderColor: category === "Wealth" ? "#423b88" : "#e8e6ff",
              ...style.shadow,
            }}
          >
            <Text
              style={{
                color: "black",
                textAlign: "center",
                fontFamily: "Ubuntu-Regular",
                fontSize: RFPercentage(1),
                alignItems: "center",
                position: "absolute",
                left: -7,
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
                marginStart: RFPercentage(1),
              }}
            />
          </Card>
        </TouchableOpacity>
      </ScrollView>

      <View style={{ flex: 5.3, backgroundColor: "#f3f2fc" }}>
        {isLoading && (
          <ActivityIndicator
            style={{ marginVertical: RFPercentage(10) }}
            size={RFPercentage(5)}
            color={"#423b88"}
          />
        )}
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ paddingBottom: RFPercentage(3) }}>
            {astrologers.length != 0
              ? astrologers.map((astrologer, index) => {
                  return (
                    <Card
                      key={index}
                      containerStyle={{ borderRadius: RFPercentage(1) }}
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
                              uri: astrologer.ProfileImage.data.attributes.url,
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
                              fontSize: RFPercentage(1.5),
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
                              fontSize: RFPercentage(1.2),
                              maxWidth: RFPercentage(19),
                            }}
                          >
                            {astrologer.Languages.Languages &&
                              astrologer.Languages.Languages.map(
                                (language, index) => {
                                  return (
                                    <Text
                                      style={{
                                        fontFamily: "Ubuntu-Regular",
                                        color: "black",
                                        fontSize: RFPercentage(1.2),
                                        maxWidth: RFPercentage(19),
                                      }}
                                      key={index}
                                    >
                                      {language}&nbsp;&nbsp;
                                    </Text>
                                  );
                                }
                              )}
                          </Text>
                          <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={{
                              fontFamily: "Ubuntu-Regular",
                              color: "black",
                              fontSize: RFPercentage(1.2),
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
                              fontSize: RFPercentage(1.2),
                              maxWidth: RFPercentage(19),
                            }}
                          >
                            Charges Per Minute:- {astrologer.ChargePerMinute}
                          </Text>
                        </View>
                        <View>
                          <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => {
                              setShowContactDialog(true);
                              setSelectedAstrologer(JSON.stringify(astrologer));
                            }}
                          >
                            <Card
                              containerStyle={{
                                borderRadius: RFPercentage(1),
                                borderColor: "green",
                                borderWidth: 1,
                              }}
                            >
                              <Text
                                style={{
                                  color: "green",
                                  fontFamily: "Dongle-Regular",
                                  fontSize: RFPercentage(2),
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
            <View style={{ flex: 1.9 }} />
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
                    uri: JSON.parse(selectedAstrologer).ProfileImage.data
                      .attributes.url,
                  }}
                  style={{
                    height: 85,
                    width: 85,
                    borderRadius: 42,
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
                      fontSize: RFPercentage(1.8),
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
                      fontSize: RFPercentage(1.5),
                      maxWidth: RFPercentage(19),
                      marginTop: RFPercentage(0.5),
                    }}
                  >
                    Rate:- {JSON.parse(selectedAstrologer).ChargePerMinute}{" "}
                    <FontAwesome name="inr" color="green" size={10} />
                    /Min
                  </Text>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{
                      fontFamily: "Ubuntu-Regular",
                      color: "black",
                      fontSize: RFPercentage(1.5),
                      maxWidth: RFPercentage(19),
                      marginTop: RFPercentage(0.5),
                    }}
                  >
                    Status:- Online
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
                    navigation.navigate("ChatUI");
                    setShowContactDialog(false);
                  }}
                >
                  <Card
                    containerStyle={{
                      borderRadius: RFPercentage(1),
                      borderColor: "#423b88",
                      borderWidth: 1,
                      height: RFPercentage(6),
                      width: RFPercentage(18),
                    }}
                  >
                    <Text
                      style={{
                        color: "#423b88",
                        fontFamily: "Dongle-Regular",
                        fontSize: RFPercentage(2),
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
                  onPress={() => {
                    navigation.navigate("ChatUI");
                    setShowContactDialog(false);
                  }}
                >
                  <Card
                    containerStyle={{
                      borderRadius: RFPercentage(1),
                      borderColor: "#423b88",
                      borderWidth: 1,
                      width: RFPercentage(18),
                      height: RFPercentage(6),
                    }}
                  >
                    <Text
                      style={{
                        color: "#423b88",
                        fontFamily: "Dongle-Regular",
                        fontSize: RFPercentage(2),
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
