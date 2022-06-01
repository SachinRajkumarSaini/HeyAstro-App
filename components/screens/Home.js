import {
  View,
  Text,
  StatusBar,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  BackHandler,
  Alert,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Header, Card, Image, SearchBar, FAB } from "react-native-elements";
import FileBase64 from "../helpers/FileBase64";
import Ionicons from "react-native-vector-icons/Ionicons";
import { FlatListSlider } from "react-native-flatlist-slider";
import { FetchAPI } from "../helpers/FetchInstance";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  HomeLatestPlaceholder,
  HomeCarouselPlaceholder,
} from "../helpers/SkeletonPlaceholder";

const Home = ({ navigation }) => {
  const width = Dimensions.get("window").width;

  const [carousels, setCarousels] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [videos, setVideos] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [userBalance, setUserBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      const onBackPress = () => {
        Alert.alert("Exit App", "Do you want to exit?", [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel",
          },
          { text: "YES", onPress: () => BackHandler.exitApp() },
        ]);
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
      };
    }, [])
  );

  const fetchData = async () => {
    try {
      // Get Carousels
      const getCarousels = await FetchAPI({
        query: `
                    query{
                        carousels{
                            data{
                                attributes{
                                    Images{
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

      setCarousels(
        getCarousels.data.carousels.data.map(
          (item) => item.attributes.Images.data[0].attributes
        )
      );

      //   Get Blogs
      const getBlogs = await FetchAPI({
        query: `
                query{
                    blogs{
                        data{
                            id,
                            attributes{
                                Title
                                createdAt
                                CoverImage{
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
      setBlogs(getBlogs.data.blogs.data);

      //   Get Videos
      const getVideos = await FetchAPI({
        query: `
              query{
                videos{
                    data{
                        attributes{
                            Title
                            createdAt
                            Link
                            CoverImage{
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
      setVideos(getVideos.data.videos.data.map((item) => item.attributes));

      // Get Testimonials
      const getTestimonails = await FetchAPI({
        query: `
              query {
                testimonials {
                  data {
                    attributes {
                      Username
                      Text
                      UserImage {
                        data {
                          attributes {
                            url
                          }
                        }
                      }
                      User_Location
                    }
                  }
                }
              }
        `,
      });
      setTestimonials(
        getTestimonails.data.testimonials.data.map((item) => item.attributes)
      );

      // getBalance
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
      setUserBalance(
        getBalance.data.usersPermissionsUser.data.attributes.Balance
      );
      setIsLoading(false);
    } catch (error) {
      ToastAndroid.show(
        "Something went wrong, Please try again later!",
        ToastAndroid.SHORT
      );
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={{ backgroundColor: "#ffffff", flex: 1 }}>
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
          text: "HeyAstro",
          style: {
            color: "#fff",
            fontSize: RFPercentage(4.5),
            fontFamily: "Dongle-Regular",
            marginTop: RFPercentage(0.5),
          },
        }}
        rightComponent={{
          icon: "account-balance-wallet",
          color: "#fff",
          size: RFPercentage(3.5),
          iconStyle: {
            paddingEnd: RFPercentage(1.5),
            paddingTop: RFPercentage(1.5),
          },
          onPress: () =>
            navigation.navigate("Wallet", {
              balance: userBalance,
            }),
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ paddingBottom: RFPercentage(2) }}>
          {/* Search Bar */}
          <View style={{ marginTop: RFPercentage(1) }}>
            <SearchBar
              onFocus={() => navigation.navigate("Searching")}
              returnKeyType="search"
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

          {/* Top Categoires */}
          <ScrollView
            style={{ height: RFPercentage(13) }}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
          >
            <View
              style={{
                flexDirection: "row",
                paddingHorizontal: RFPercentage(1.5),
              }}
            >
              <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                <View>
                  <Card
                    containerStyle={{
                      height: RFPercentage(8),
                      width: RFPercentage(8),
                      borderRadius: RFPercentage(4),
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      style={{
                        height: RFPercentage(7),
                        width: RFPercentage(7),
                      }}
                      source={{ uri: FileBase64.dailyHoroscope }}
                    />
                  </Card>
                  <Text
                    style={{
                      color: "#818181",
                      fontFamily: "Dongle-Bold",
                      textAlign: "center",
                      position: "absolute",
                      top: RFPercentage(10),
                      left: RFPercentage(1.2),
                    }}
                  >
                    Daily Horoscope
                  </Text>
                </View>
              </TouchableOpacity>
              <View>
                <Card
                  containerStyle={{
                    height: RFPercentage(8),
                    width: RFPercentage(8),
                    borderRadius: RFPercentage(4),
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    style={{ height: RFPercentage(7), width: RFPercentage(7) }}
                    source={{ uri: FileBase64.freeKundli }}
                  />
                </Card>
                <Text
                  style={{
                    color: "#818181",
                    fontFamily: "Dongle-Bold",
                    textAlign: "center",
                    position: "absolute",
                    top: RFPercentage(10),
                    left: RFPercentage(2.5),
                  }}
                >
                  Free Kundli
                </Text>
              </View>
              <View>
                <Card
                  containerStyle={{
                    height: RFPercentage(8),
                    width: RFPercentage(8),
                    borderRadius: RFPercentage(4),
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    style={{
                      height: RFPercentage(6.8),
                      width: RFPercentage(6.8),
                    }}
                    source={{ uri: FileBase64.matchMaking }}
                  />
                </Card>
                <Text
                  style={{
                    color: "#818181",
                    fontFamily: "Dongle-Bold",
                    textAlign: "center",
                    position: "absolute",
                    top: RFPercentage(10),
                    left: RFPercentage(1.2),
                  }}
                >
                  Match Making
                </Text>
              </View>
              <TouchableOpacity onPress={() => navigation.navigate("Blogs")}>
                <View>
                  <Card
                    containerStyle={{
                      height: RFPercentage(8),
                      width: RFPercentage(8),
                      borderRadius: RFPercentage(4),
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      style={{
                        height: RFPercentage(5.8),
                        width: RFPercentage(5.8),
                      }}
                      source={{ uri: FileBase64.astrologyBlog }}
                    />
                  </Card>
                  <Text
                    style={{
                      color: "#818181",
                      fontFamily: "Dongle-Bold",
                      textAlign: "center",
                      position: "absolute",
                      top: RFPercentage(10),
                      left: RFPercentage(1.2),
                    }}
                  >
                    Astrology Blog
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>

          {/* Carousels */}
          <View
            style={{ margin: RFPercentage(2), borderRadius: RFPercentage(2) }}
          >
            {isLoading ? (
              <HomeCarouselPlaceholder />
            ) : carousels.length != 0 ? (
              <FlatListSlider
                data={carousels}
                imageKey={"url"}
                height={RFPercentage(15)}
                timer={2000}
                indicatorContainerStyle={{ position: "absolute", bottom: 20 }}
                indicatorActiveColor={"#423b88"}
                indicatorInActiveColor={"#ffffff"}
                indicatorActiveWidth={15}
                animation
              />
            ) : null}
          </View>

          {/* Astrologer Talk */}
          <TouchableOpacity
            onPress={() => navigation.navigate("ChatsAndCalls")}
            activeOpacity={0.9}
            style={{ margin: RFPercentage(2) }}
          >
            <Image
              style={{ height: RFPercentage(12.5), width: "100%" }}
              source={{ uri: FileBase64.astroTalk }}
            />
          </TouchableOpacity>

          {/* Astrologer Blogs */}
          <View>
            <View
              style={{
                paddingHorizontal: RFPercentage(2),
                marginTop: RFPercentage(1),
              }}
            >
              <Text style={{ fontFamily: "Ubuntu-Bold", color: "black" }}>
                Latest from the Blog
              </Text>
            </View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {isLoading ? (
                <HomeLatestPlaceholder />
              ) : (
                blogs.map((blog, index) => {
                  const date = new Date(blog.attributes.createdAt);
                  return (
                    <TouchableOpacity
                      activeOpacity={0.9}
                      key={index}
                      onPress={() => {
                        navigation.navigate("Blog", { blogId: blog.id });
                      }}
                    >
                      <Card
                        containerStyle={{
                          borderRadius: RFPercentage(1),
                          height: RFPercentage(21.5),
                          width: RFPercentage(30),
                        }}
                      >
                        <Image
                          style={{
                            height: RFPercentage(10),
                            width: "100%",
                            borderRadius: RFPercentage(1),
                          }}
                          source={{
                            uri: blog.attributes.CoverImage.data.attributes.url,
                          }}
                        />
                        <Text
                          numberOfLines={2}
                          ellipsizeMode="tail"
                          style={{
                            fontFamily: "Ubuntu-Regular",
                            color: "black",
                            marginTop: RFPercentage(1),
                          }}
                        >
                          {blog.attributes.Title}
                        </Text>
                        <Text
                          style={{
                            color: "#818181",
                            fontFamily: "Ubuntu-Regular",
                            textAlign: "right",
                            marginTop: RFPercentage(0.5),
                          }}
                        >
                          {date.toDateString()}
                        </Text>
                      </Card>
                    </TouchableOpacity>
                  );
                })
              )}
            </ScrollView>
          </View>

          {/* Astrologer Videos */}
          <View style={{ marginTop: RFPercentage(2) }}>
            <View
              style={{
                paddingHorizontal: RFPercentage(2),
                marginTop: RFPercentage(1),
              }}
            >
              <Text style={{ fontFamily: "Ubuntu-Bold", color: "black" }}>
                Latest from the Videos
              </Text>
            </View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {isLoading ? (
                <HomeLatestPlaceholder />
              ) : (
                videos.map((video, index) => {
                  const date = new Date(video.createdAt);
                  return (
                    <TouchableOpacity
                      activeOpacity={0.9}
                      key={index}
                      onPress={() =>
                        navigation.navigate("EmbbedPlayer", {
                          videoUrl: video.Link,
                        })
                      }
                    >
                      <Card
                        containerStyle={{
                          borderRadius: RFPercentage(1),
                          height: RFPercentage(21.5),
                          width: RFPercentage(30),
                        }}
                      >
                        <Image
                          style={{
                            height: RFPercentage(10),
                            width: "100%",
                            borderRadius: RFPercentage(1),
                          }}
                          source={{ uri: video.CoverImage.data.attributes.url }}
                        />
                        <Text
                          numberOfLines={2}
                          ellipsizeMode="tail"
                          style={{
                            fontFamily: "Ubuntu-Regular",
                            color: "black",
                            marginTop: RFPercentage(1),
                          }}
                        >
                          {video.Title}
                        </Text>
                        <Text
                          style={{
                            color: "#818181",
                            fontFamily: "Ubuntu-Regular",
                            textAlign: "right",
                            marginTop: RFPercentage(0.5),
                          }}
                        >
                          {date.toDateString()}
                        </Text>
                      </Card>
                    </TouchableOpacity>
                  );
                })
              )}
            </ScrollView>
          </View>

          {/* Testimonials */}
          <View style={{ marginTop: RFPercentage(2) }}>
            <View
              style={{
                paddingHorizontal: RFPercentage(2),
                marginTop: RFPercentage(1),
              }}
            >
              <Text style={{ fontFamily: "Ubuntu-Bold", color: "black" }}>
                Client Testimonials
              </Text>
            </View>
            <ScrollView
              horizontal={true}
              style={{ marginBottom: RFPercentage(2) }}
              pagingEnabled
              showsHorizontalScrollIndicator={false}
            >
              {isLoading ? (
                <HomeLatestPlaceholder />
              ) : (
                testimonials.map((testimonial, index) => {
                  return (
                    <View
                      key={index}
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        width: width,
                      }}
                    >
                      <Card
                        containerStyle={{
                          borderRadius: RFPercentage(1),
                          width: RFPercentage(45),
                        }}
                      >
                        <Text
                          numberOfLines={6}
                          ellipsizeMode="tail"
                          style={{
                            fontFamily: "Ubuntu-Regular",
                            color: "#818181",
                            marginTop: RFPercentage(1),
                          }}
                        >
                          {testimonial.Text}
                        </Text>
                        <View
                          style={{
                            marginVertical: RFPercentage(2),
                            borderBottomColor: "#e1e1e1",
                            borderBottomWidth: 1,
                          }}
                        />
                        <View
                          style={{
                            flexDirection: "row",
                            marginStart: RFPercentage(1),
                          }}
                        >
                          <View style={{ justifyContent: "center" }}>
                            <Image
                              source={{
                                uri: testimonial.UserImage.data.attributes.url,
                              }}
                              style={{
                                height: RFPercentage(7),
                                width: RFPercentage(7),
                                borderRadius: RFPercentage(3.5),
                                borderWidth: 1,
                                borderColor: "black",
                              }}
                            />
                          </View>
                          <View
                            style={{
                              justifyContent: "center",
                              marginStart: RFPercentage(2),
                            }}
                          >
                            <Text
                              style={{
                                fontFamily: "Ubuntu-Bold",
                                color: "black",
                                fontSize: RFPercentage(1.7),
                              }}
                            >
                              {testimonial.Username}
                            </Text>
                            <Text
                              style={{
                                fontFamily: "Ubuntu-Regular",
                                color: "#818181",
                                fontSize: RFPercentage(1.5),
                              }}
                            >
                              {testimonial.User_Location}
                            </Text>
                          </View>
                        </View>
                      </Card>
                    </View>
                  );
                })
              )}
            </ScrollView>
          </View>

          {/* Footer */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginBottom: RFPercentage(1),
            }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Card
                containerStyle={{
                  borderRadius: RFPercentage(10),
                  height: RFPercentage(10),
                  width: RFPercentage(10),
                  borderRadius: RFPercentage(5),
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={{
                    uri: FileBase64.privacyIcon,
                  }}
                  style={{
                    height: RFPercentage(6.5),
                    width: RFPercentage(6.5),
                  }}
                />
              </Card>
              <Text
                style={{
                  fontFamily: "Ubuntu-Regular",
                  fontSize: RFPercentage(1.5),
                  marginTop: RFPercentage(1),
                  marginStart: RFPercentage(1),
                  textAlign: "center",
                }}
              >
                Privacy & {"\n"}Confidential
              </Text>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Card
                containerStyle={{
                  borderRadius: RFPercentage(10),
                  height: RFPercentage(10),
                  width: RFPercentage(10),
                  borderRadius: RFPercentage(5),
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={{
                    uri: FileBase64.verifiedAstrologers,
                  }}
                  style={{
                    height: RFPercentage(7),
                    width: RFPercentage(7),
                  }}
                />
              </Card>
              <Text
                style={{
                  fontFamily: "Ubuntu-Regular",
                  fontSize: RFPercentage(1.5),
                  marginTop: RFPercentage(1),
                  marginStart: RFPercentage(1),
                  textAlign: "center",
                }}
              >
                Verified {"\n"}Astrologers
              </Text>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Card
                containerStyle={{
                  borderRadius: RFPercentage(10),
                  height: RFPercentage(10),
                  width: RFPercentage(10),
                  borderRadius: RFPercentage(5),
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={{
                    uri: FileBase64.securedPayments,
                  }}
                  style={{
                    height: RFPercentage(6.5),
                    width: RFPercentage(6.5),
                  }}
                />
              </Card>
              <Text
                style={{
                  fontFamily: "Ubuntu-Regular",
                  fontSize: RFPercentage(1.5),
                  marginTop: RFPercentage(1),
                  marginStart: RFPercentage(1),
                  textAlign: "center",
                }}
              >
                Secure {"\n"}Payments
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <FAB
        onPress={() => navigation.navigate("ChatsAndCalls")}
        title={() => (
          <Ionicons name="ios-chatbubbles" color={"white"} size={28} />
        )}
        placement="right"
        color="#423b88"
      />
    </View>
  );
};

export default Home;
