import {
  View,
  Text,
  StatusBar,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Header, Card, SearchBar, Image } from "react-native-elements";
import FileBase64 from "../helpers/FileBase64";
import { FetchAPI } from "../helpers/FetchInstance";

const Searching = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const inputRef = React.useRef();
  setTimeout(() => inputRef.current.focus(), 100);
  const [astrologers, setAstrologers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
                            Name
                            Languages
                            Experience
                            ChargePerMinute
                            ProfileImage{
                                data{
                                    attributes{
                                        url
                                    }
                                }
                            }
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

  useEffect(() => {
    fetchAstrologers();
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
                            ProfileImage{
                                data{
                                attributes{
                                    url
                                }
                                }
                            }
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
          backgroundColor: "#423b88",
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
              onEndEditing={searchAstrologer}
              onChangeText={(e) => setSearch(e)}
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
              style={{ marginVertical: RFPercentage(1) }}
              size={RFPercentage(5)}
              color={"#423b88"}
            />
          )}
          {/* Search Results */}
          <View style={{ paddingBottom: RFPercentage(3) }}>
            {astrologers &&
              astrologers.map((astrologer, index) => {
                return (
                  <TouchableOpacity key={index} activeOpacity={0.9}>
                    <Card containerStyle={{ borderRadius: RFPercentage(1) }}>
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
                            {astrologer.Languages.Languages.map(
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
                              Chats
                            </Text>
                          </Card>
                        </View>
                      </View>
                    </Card>
                  </TouchableOpacity>
                );
              })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Searching;
