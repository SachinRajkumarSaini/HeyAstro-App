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
  Modal,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { RFPercentage } from "react-native-responsive-fontsize";
import {
  Header,
  Card,
  Image,
  SearchBar,
  FAB,
  Divider,
} from "react-native-elements";
import FileBase64 from "../helpers/FileBase64";
import Ionicons from "react-native-vector-icons/Ionicons";
import { FlatListSlider } from "react-native-flatlist-slider";
import { FetchAPI } from "../helpers/FetchInstance";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CometChat } from "@cometchat-pro/react-native-chat";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { CometChatAuth } from "../helpers/CometChatAuth";
import {
  HomeLatestPlaceholder,
  HomeCarouselPlaceholder,
} from "../helpers/SkeletonPlaceholder";

const Home = ({ navigation }) => {
  const width = Dimensions.get("window").width;

  const [carousels, setCarousels] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [astrologers, setAstrologers] = useState([]);
  const [videos, setVideos] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [showContactDialog, setShowContactDialog] = useState(false);
  const [selectedAstrologer, setSelectedAstrologer] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [statusLoading, setStatusLoading] = useState(false);

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

      //   Get Astrologers
      const getAstrologers = await FetchAPI({
        query: `query {
                    astrologers(sort: "createdAt:desc",pagination: { limit: 20 }) {
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
        getAstrologers.data.astrologers.data.map((item) => item.attributes)
      );

      //   Get Blogs
      const getBlogs = await FetchAPI({
        query: `
                query{
                    blogs(sort: "createdAt:desc",pagination: { limit: 20 }){
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
                videos(sort: "createdAt:desc"){
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
                testimonials(sort: "createdAt:desc") {
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
      setIsLoading(false);
    } catch (error) {
      ToastAndroid.show(
        "Something went wrong, Please try again later!",
        ToastAndroid.SHORT
      );
      // console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={{ backgroundColor: "#dce4f5", flex: 1 }}>
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
          text: "HeyAstro",
          style: {
            color: "#fff",
            fontSize: RFPercentage(4.5),
            fontFamily: "Dongle-Regular",
            marginTop: RFPercentage(0.5),
          },
        }}
        leftComponent={
          <View
            style={{
              height: RFPercentage(4.5),
              width: RFPercentage(4.5),
              margin: RFPercentage(1),
              borderRadius: RFPercentage(2.5),
            }}
          >
            <Image
              style={{
                height: RFPercentage(4.5),
                width: RFPercentage(4.5),
              }}
              source={{ uri: FileBase64.heyAstro }}
            />
          </View>
        }
        rightComponent={{
          icon: "account-balance-wallet",
          color: "#fff",
          size: RFPercentage(3.5),
          iconStyle: {
            paddingEnd: RFPercentage(1.5),
            paddingTop: RFPercentage(1.5),
          },
          onPress: () => navigation.navigate("Wallet"),
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
            contentContainerStyle={{ flex: 1 }}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-around",
                margin: RFPercentage(0.8),
              }}
            >
              <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <View
                    style={{
                      height: RFPercentage(8),
                      width: RFPercentage(8),
                      borderRadius: RFPercentage(4),
                      elevation: RFPercentage(0.8),
                    }}
                  >
                    <Image
                      style={{
                        height: RFPercentage(8),
                        width: RFPercentage(8),
                        borderRadius: RFPercentage(4),
                      }}
                      source={{ uri: FileBase64.dailyHoroscope }}
                    />
                  </View>
                  <Text
                    style={{
                      color: "black",
                      fontFamily: "Ubuntu-Bold",
                      textAlign: "center",
                      fontSize: RFPercentage(1.5),
                      width: RFPercentage(10),
                    }}
                  >
                    Daily Horoscope
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("Kundli")}>
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <View
                    style={{
                      height: RFPercentage(8),
                      width: RFPercentage(8),
                      borderRadius: RFPercentage(4),
                      elevation: RFPercentage(0.8),
                    }}
                  >
                    <Image
                      style={{
                        height: RFPercentage(8),
                        width: RFPercentage(8),
                        borderRadius: RFPercentage(4),
                      }}
                      source={{ uri: FileBase64.freeKundli }}
                    />
                  </View>
                  <Text
                    style={{
                      color: "black",
                      fontFamily: "Ubuntu-Bold",
                      textAlign: "center",
                      fontSize: RFPercentage(1.5),
                      width: RFPercentage(10),
                    }}
                  >
                    Free Kundli
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("KundliMatching")}
              >
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <View
                    style={{
                      height: RFPercentage(8),
                      width: RFPercentage(8),
                      borderRadius: RFPercentage(4),
                      elevation: RFPercentage(0.8),
                    }}
                  >
                    <Image
                      style={{
                        height: RFPercentage(8),
                        width: RFPercentage(8),
                        borderRadius: RFPercentage(4),
                      }}
                      source={{ uri: FileBase64.matchMaking }}
                    />
                  </View>
                  <Text
                    style={{
                      color: "black",
                      fontFamily: "Ubuntu-Bold",
                      textAlign: "center",
                      fontSize: RFPercentage(1.5),
                      width: RFPercentage(10),
                    }}
                  >
                    Kundli Matching
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("Blogs")}>
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <View
                    style={{
                      height: RFPercentage(8),
                      width: RFPercentage(8),
                      borderRadius: RFPercentage(4),
                      elevation: RFPercentage(0.8),
                    }}
                  >
                    <Image
                      style={{
                        height: RFPercentage(8),
                        width: RFPercentage(8),
                        borderRadius: RFPercentage(4),
                      }}
                      source={{ uri: FileBase64.astrologyBlog }}
                    />
                  </View>
                  <Text
                    style={{
                      color: "black",
                      fontFamily: "Ubuntu-Bold",
                      textAlign: "center",
                      fontSize: RFPercentage(1.5),
                      width: RFPercentage(10),
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
                height={RFPercentage(20)}
                onPress={(item) => navigation.navigate("ChatsAndCalls")}
                timer={2000}
                indicatorContainerStyle={{ position: "absolute", bottom: 20 }}
                indicatorActiveColor={"#1F4693"}
                indicatorInActiveColor={"#ffffff"}
                indicatorActiveWidth={15}
                animation
              />
            ) : null}
          </View>

          {/* Our Astrologers */}
          <View>
            <View
              style={{
                paddingHorizontal: RFPercentage(2),
                marginTop: RFPercentage(2.5),
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontFamily: "Ubuntu-Bold", color: "black" }}>
                Our Astrologers
              </Text>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.navigate("ChatsAndCalls")}
              >
                <Text style={{ fontFamily: "Ubuntu-Bold", color: "black" }}>
                  View All
                </Text>
              </TouchableOpacity>
            </View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {isLoading ? (
                <HomeLatestPlaceholder />
              ) : (
                astrologers.map((astrologer, index) => {
                  return (
                    <View
                      key={index}
                      style={{
                        height: RFPercentage(23),
                        width: RFPercentage(15),
                        borderRadius: RFPercentage(1),
                        backgroundColor: "white",
                        margin: RFPercentage(1.8),
                        flex: 1,
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        elevation: RFPercentage(1),
                      }}
                    >
                      <Image
                        source={{
                          uri: astrologer.ProfileImage
                            ? astrologer.ProfileImage
                            : FileBase64.profile_Placeholder,
                        }}
                        style={{
                          height: RFPercentage(8),
                          width: RFPercentage(8),
                          borderRadius: RFPercentage(4),
                          resizeMode: "contain",
                          alignSelf: "center",
                          borderWidth: 1,
                          borderColor: "black",
                        }}
                      />
                      <Text
                        numberOfLines={2}
                        ellipsizeMode="tail"
                        style={{
                          fontFamily: "Ubuntu-Regular",
                          color: "black",
                          marginTop: RFPercentage(1.2),
                          fontSize: RFPercentage(1.8),
                        }}
                      >
                        {astrologer.Name}
                      </Text>
                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{
                          fontFamily: "Ubuntu-Bold",
                          color: "black",
                          fontSize: RFPercentage(1.5),
                          maxWidth: RFPercentage(19),
                          marginVertical: RFPercentage(1),
                          marginHorizontal: RFPercentage(1),
                        }}
                      >
                        <FontAwesome name="inr" color="green" size={11} />
                        {astrologer.ChargePerMinute}
                        /Min
                      </Text>
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
                              const astrologerStatus = await CometChat.getUser(
                                astrologer.Username
                              );
                              astrologer.status = astrologerStatus.status;
                              setSelectedAstrologer(JSON.stringify(astrologer));
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
                        <View
                          style={{
                            borderRadius: RFPercentage(1),
                            borderColor: "green",
                            borderWidth: 1,
                            width: RFPercentage(10),
                            paddingVertical: RFPercentage(1),
                          }}
                        >
                          <Text
                            style={{
                              color: "green",
                              fontFamily: "Ubuntu-Regular",
                              fontSize: RFPercentage(1.5),
                              textAlign: "center",
                              alignItems: "center",
                            }}
                          >
                            Connect
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  );
                })
              )}
            </ScrollView>
          </View>

          <Divider
            width={RFPercentage(0.1)}
            style={{
              marginVertical: RFPercentage(3),
              marginHorizontal: RFPercentage(2),
            }}
            orientation="horizontal"
          />

          {/* Astrologer Blogs */}
          <View>
            <View
              style={{
                paddingHorizontal: RFPercentage(2),
                marginTop: RFPercentage(2),
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontFamily: "Ubuntu-Bold", color: "black" }}>
                Latest from the Blog
              </Text>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.navigate("Blogs")}
              >
                <Text style={{ fontFamily: "Ubuntu-Bold", color: "black" }}>
                  View All
                </Text>
              </TouchableOpacity>
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
                      <View
                        style={{
                          backgroundColor: "white",
                          margin: RFPercentage(1.8),
                          height: RFPercentage(25),
                          borderRadius: RFPercentage(1),
                          width: RFPercentage(30),
                          elevation: RFPercentage(1),
                        }}
                      >
                        <Image
                          style={{
                            height: RFPercentage(15),
                            width: "100%",
                            borderTopLeftRadius: RFPercentage(1),
                            borderTopRightRadius: RFPercentage(1),
                          }}
                          source={{
                            uri: blog.attributes.CoverImage.data.attributes.url,
                          }}
                        />
                        <View
                          style={{
                            padding: RFPercentage(1),
                            height: RFPercentage(10),
                          }}
                        >
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
                          <View style={{ flex: 1, justifyContent: "flex-end" }}>
                            <Text
                              style={{
                                color: "#181A18",
                                fontFamily: "Ubuntu-Regular",
                                textAlign: "right",
                                fontSize: RFPercentage(1.4),
                                marginTop: RFPercentage(0.5),
                              }}
                            >
                              {date.toDateString()}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                })
              )}
            </ScrollView>
          </View>

          <Divider
            width={RFPercentage(0.1)}
            style={{
              marginVertical: RFPercentage(3),
              marginHorizontal: RFPercentage(2),
            }}
            orientation="horizontal"
          />

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
                      <View
                        style={{
                          backgroundColor: "white",
                          margin: RFPercentage(1.8),
                          height: RFPercentage(25),
                          borderRadius: RFPercentage(1),
                          width: RFPercentage(30),
                          elevation: RFPercentage(1),
                        }}
                      >
                        <Image
                          style={{
                            height: RFPercentage(15),
                            width: "100%",
                            borderTopLeftRadius: RFPercentage(1),
                            borderTopRightRadius: RFPercentage(1),
                          }}
                          source={{ uri: video.CoverImage.data.attributes.url }}
                        />
                        <View
                          style={{
                            padding: RFPercentage(1),
                            height: RFPercentage(10),
                          }}
                        >
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
                          <View style={{ flex: 1, justifyContent: "flex-end" }}>
                            <Text
                              style={{
                                color: "#181A18",
                                fontFamily: "Ubuntu-Regular",
                                textAlign: "right",
                                fontSize: RFPercentage(1.4),
                                marginTop: RFPercentage(0.5),
                              }}
                            >
                              {date.toDateString()}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                })
              )}
            </ScrollView>
          </View>

          <Divider
            width={RFPercentage(0.1)}
            style={{
              marginVertical: RFPercentage(4),
              marginHorizontal: RFPercentage(2),
            }}
            orientation="horizontal"
          />

          {/* Testimonials */}
          <View style={{ marginTop: RFPercentage(1) }}>
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
                        elevation: RFPercentage(1),
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
                            color: "#181A18",
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
                                uri: testimonial.UserImage.data.attributes.url
                                  ? testimonial.UserImage.data.attributes.url
                                  : FileBase64.profile_Placeholder,
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
                                color: "#181A18",
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
                  color: "black",
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
                  color: "black",
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
                  color: "black",
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
        color="#1F4693"
      />
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

export default Home;
