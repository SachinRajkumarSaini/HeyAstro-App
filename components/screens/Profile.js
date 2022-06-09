import React, { useEffect, useState } from "react";
import { View, StatusBar, Text, ScrollView, ToastAndroid } from "react-native";
import { Header, Image, Card } from "react-native-elements";
import { RFPercentage } from "react-native-responsive-fontsize";
import FileBase64 from "../helpers/FileBase64";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { FetchAPI, Fetch_API } from "../helpers/FetchInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import {
  ProfileHoroscopePlaceholder,
  ProfileHoroscopePredictionsPlaceholder,
  ProfilePlaceholder,
  ProfileImagePlaceholder,
} from "../helpers/SkeletonPlaceholder";

const Profile = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState({
    Name: "Full Name",
    DOB: new Date(),
    Image: null,
  });
  const [astrology, setAstrology] = useState({
    zodiacSign: "",
    horoscope: new Object(),
    quote: "",
  });

  const fetchProfile = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      const fetchProfile = await FetchAPI({
        query: `
              query{
                usersPermissionsUser(id:${userId}){
                  data{
                    attributes{
                      FullName
                      DOB
                      ProfileImage
                    }
                  }
                }
              }
        `,
      });
      setUserProfile({
        Name: fetchProfile.data.usersPermissionsUser.data.attributes.FullName,
        DOB: new Date(
          fetchProfile.data.usersPermissionsUser.data.attributes.DOB
        ),
        Image:
          fetchProfile.data.usersPermissionsUser.data.attributes.ProfileImage,
      });
    } catch (error) {
      ToastAndroid.show(
        "Something went wrong, Please try agiain later!",
        ToastAndroid.SHORT
      );
    }
  };

  const fetchHorocope = async () => {
    try {
      const month = new Date(userProfile.DOB).getMonth() + 1;
      const day = new Date(userProfile.DOB).getDate();
      const getHoroscope = await Fetch_API(
        `${process.env.HEYASTRO_API_URL}/horoscope`,
        {
          birthDay: day,
          birthMonth: month,
        },
        "POST",
        {
          "Content-Type": "application/json",
        }
      );
      setAstrology(
        {
          zodiacSign: getHoroscope.zodiacSign,
          horoscope: new Object(getHoroscope.horoscope),
          quote: getHoroscope.quote,
        },
        setTimeout(() => {
          setIsLoading(false);
        }, 2000)
      );
    } catch (error) {
      ToastAndroid.show(
        "Something went wrong, Please try agiain later!",
        ToastAndroid.SHORT
      );
      // console.log(error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [isFocused]);

  useEffect(() => {
    fetchHorocope();
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
          backgroundColor: "#1F4693",
          paddingVertical: 6,
          borderBottomWidth: 0,
        }}
        centerComponent={{
          text: "Profile",
          style: {
            color: "#fff",
            fontSize: RFPercentage(3.5),
            fontFamily: "Dongle-Regular",
            marginTop: RFPercentage(0.5),
          },
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Body Section */}
        <View style={{ margin: RFPercentage(1.5) }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              margin: RFPercentage(1),
            }}
          >
            {isLoading ? (
              <ProfilePlaceholder />
            ) : (
              <View>
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={{
                      color: "black",
                      fontFamily: "Ubuntu-Bold",
                      fontSize: RFPercentage(2),
                      margin: RFPercentage(0.5),
                    }}
                  >
                    {userProfile.Name}
                  </Text>
                  <AntDesign
                    name="edit"
                    onPress={() => navigation.navigate("EditProfile")}
                    style={{
                      marginStart: RFPercentage(0.5),
                      marginTop: RFPercentage(0.2),
                      color: "black",
                    }}
                    size={18}
                  />
                </View>
                <Text
                  style={{
                    color: "#818181",
                    fontFamily: "Ubuntu-Regular",
                    fontSize: RFPercentage(1.8),
                    margin: RFPercentage(0.5),
                  }}
                >
                  {userProfile.DOB.toDateString()}
                </Text>
                <Text
                  style={{
                    color: "#818181",
                    fontFamily: "Ubuntu-Regular",
                    fontSize: RFPercentage(1.8),
                    margin: RFPercentage(0.5),
                  }}
                >
                  {astrology.zodiacSign.name}
                </Text>
              </View>
            )}

            {isLoading ? (
              <ProfileImagePlaceholder />
            ) : (
              <Image
                source={{
                  uri: userProfile.Image
                    ? userProfile.Image
                    : FileBase64.profileLogo,
                }}
                style={{
                  height: RFPercentage(10),
                  width: RFPercentage(10),
                  borderRadius: RFPercentage(5),
                  borderWidth: 1,
                  borderColor: "black",
                }}
              />
            )}
          </View>
        </View>

        <View
          style={{
            marginHorizontal: RFPercentage(2),
            borderBottomColor: "#e1e1e1",
            borderBottomWidth: 1,
          }}
        />

        <View style={{ margin: RFPercentage(1.8) }}>
          <View>
            <Text
              style={{
                color: "black",
                fontFamily: "Ubuntu-Bold",
                fontSize: RFPercentage(2),
                margin: RFPercentage(0.5),
              }}
            >
              Today Horoscope
            </Text>
            {isLoading ? (
              <ProfileHoroscopePlaceholder />
            ) : (
              <Text
                style={{
                  color: "#818181",
                  fontFamily: "Ubuntu-Regular",
                  fontSize: RFPercentage(1.8),
                  margin: RFPercentage(0.5),
                  marginTop: RFPercentage(1),
                }}
              >
                {astrology.horoscope.today.description}
              </Text>
            )}
          </View>

          {isLoading ? (
            <ProfileHoroscopePredictionsPlaceholder />
          ) : (
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: RFPercentage(2),
                }}
              >
                <Card
                  containerStyle={{
                    borderRadius: RFPercentage(1),
                    width: RFPercentage(15),
                    maxHeight: RFPercentage(15),
                  }}
                >
                  <Text
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    style={{
                      color: "black",
                      textAlign: "center",
                      fontFamily: "Ubuntu-Bold",
                      fontSize: RFPercentage(2.3),
                      alignItems: "center",
                    }}
                  >
                    {astrology.horoscope.today.lucky_number}
                  </Text>
                  <Text
                    style={{
                      color: "#818181",
                      fontFamily: "Ubuntu-Regular",
                      fontSize: RFPercentage(1.3),
                      margin: RFPercentage(0.5),
                      marginTop: RFPercentage(1),
                      textAlign: "center",
                    }}
                  >
                    Lucky Number
                  </Text>
                </Card>
                <Card
                  containerStyle={{
                    borderRadius: RFPercentage(1),
                    width: RFPercentage(15),
                    maxHeight: RFPercentage(15),
                  }}
                >
                  <Text
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    style={{
                      color: "black",
                      textAlign: "center",
                      fontFamily: "Ubuntu-Bold",
                      fontSize: RFPercentage(2.3),
                      alignItems: "center",
                    }}
                  >
                    {astrology.horoscope.today.color}
                  </Text>
                  <Text
                    style={{
                      color: "#818181",
                      fontFamily: "Ubuntu-Regular",
                      fontSize: RFPercentage(1.5),
                      margin: RFPercentage(0.5),
                      marginTop: RFPercentage(1),
                      textAlign: "center",
                    }}
                  >
                    Lucky Color
                  </Text>
                </Card>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Card
                  containerStyle={{
                    borderRadius: RFPercentage(1),
                    width: RFPercentage(15),
                    maxHeight: RFPercentage(15),
                  }}
                >
                  <Text
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    style={{
                      color: "black",
                      textAlign: "center",
                      fontFamily: "Ubuntu-Bold",
                      fontSize: RFPercentage(2.3),
                      alignItems: "center",
                    }}
                  >
                    {astrology.horoscope.today.lucky_time}
                  </Text>
                  <Text
                    style={{
                      color: "#818181",
                      fontFamily: "Ubuntu-Regular",
                      fontSize: RFPercentage(1.5),
                      margin: RFPercentage(0.5),
                      marginTop: RFPercentage(1),
                      textAlign: "center",
                    }}
                  >
                    Lucky Time
                  </Text>
                </Card>
                <Card
                  containerStyle={{
                    borderRadius: RFPercentage(1),
                    width: RFPercentage(15),
                    maxHeight: RFPercentage(15),
                  }}
                >
                  <Text
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    style={{
                      color: "black",
                      textAlign: "center",
                      fontFamily: "Ubuntu-Bold",
                      fontSize: RFPercentage(2.3),
                      alignItems: "center",
                    }}
                  >
                    {astrology.horoscope.today.mood}
                  </Text>
                  <Text
                    style={{
                      color: "#818181",
                      fontFamily: "Ubuntu-Regular",
                      fontSize: RFPercentage(1.5),
                      margin: RFPercentage(0.5),
                      marginTop: RFPercentage(1),
                      textAlign: "center",
                    }}
                  >
                    Mood
                  </Text>
                </Card>
              </View>
            </View>
          )}
        </View>

        <View style={{ margin: RFPercentage(1.8) }}>
          <View>
            <Text
              style={{
                color: "black",
                fontFamily: "Ubuntu-Bold",
                fontSize: RFPercentage(2),
                margin: RFPercentage(0.5),
              }}
            >
              Yesterday Horoscope
            </Text>
            {isLoading ? (
              <ProfileHoroscopePlaceholder />
            ) : (
              <Text
                style={{
                  color: "#818181",
                  fontFamily: "Ubuntu-Regular",
                  fontSize: RFPercentage(1.8),
                  margin: RFPercentage(0.5),
                  marginTop: RFPercentage(1),
                }}
              >
                {astrology.horoscope.yesterday.description}
              </Text>
            )}
          </View>
          {isLoading ? (
            <ProfileHoroscopePredictionsPlaceholder />
          ) : (
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: RFPercentage(2),
                }}
              >
                <Card
                  containerStyle={{
                    borderRadius: RFPercentage(1),
                    width: RFPercentage(15),
                    maxHeight: RFPercentage(15),
                  }}
                >
                  <Text
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    style={{
                      color: "black",
                      textAlign: "center",
                      fontFamily: "Ubuntu-Bold",
                      fontSize: RFPercentage(2.3),
                      alignItems: "center",
                    }}
                  >
                    {astrology.horoscope.yesterday.lucky_number}
                  </Text>
                  <Text
                    style={{
                      color: "#818181",
                      fontFamily: "Ubuntu-Regular",
                      fontSize: RFPercentage(1.3),
                      margin: RFPercentage(0.5),
                      marginTop: RFPercentage(1),
                      textAlign: "center",
                    }}
                  >
                    Lucky Number
                  </Text>
                </Card>
                <Card
                  containerStyle={{
                    borderRadius: RFPercentage(1),
                    width: RFPercentage(15),
                    maxHeight: RFPercentage(15),
                  }}
                >
                  <Text
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    style={{
                      color: "black",
                      textAlign: "center",
                      fontFamily: "Ubuntu-Bold",
                      fontSize: RFPercentage(2.3),
                      alignItems: "center",
                    }}
                  >
                    {astrology.horoscope.yesterday.color}
                  </Text>
                  <Text
                    style={{
                      color: "#818181",
                      fontFamily: "Ubuntu-Regular",
                      fontSize: RFPercentage(1.5),
                      margin: RFPercentage(0.5),
                      marginTop: RFPercentage(1),
                      textAlign: "center",
                    }}
                  >
                    Lucky Color
                  </Text>
                </Card>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Card
                  containerStyle={{
                    borderRadius: RFPercentage(1),
                    width: RFPercentage(15),
                    maxHeight: RFPercentage(15),
                  }}
                >
                  <Text
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    style={{
                      color: "black",
                      textAlign: "center",
                      fontFamily: "Ubuntu-Bold",
                      fontSize: RFPercentage(2.3),
                      alignItems: "center",
                    }}
                  >
                    {astrology.horoscope.yesterday.lucky_time}
                  </Text>
                  <Text
                    style={{
                      color: "#818181",
                      fontFamily: "Ubuntu-Regular",
                      fontSize: RFPercentage(1.5),
                      margin: RFPercentage(0.5),
                      marginTop: RFPercentage(1),
                      textAlign: "center",
                    }}
                  >
                    Lucky Time
                  </Text>
                </Card>
                <Card
                  containerStyle={{
                    borderRadius: RFPercentage(1),
                    width: RFPercentage(15),
                    maxHeight: RFPercentage(15),
                  }}
                >
                  <Text
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    style={{
                      color: "black",
                      textAlign: "center",
                      fontFamily: "Ubuntu-Bold",
                      fontSize: RFPercentage(2.3),
                      alignItems: "center",
                    }}
                  >
                    {astrology.horoscope.yesterday.mood}
                  </Text>
                  <Text
                    style={{
                      color: "#818181",
                      fontFamily: "Ubuntu-Regular",
                      fontSize: RFPercentage(1.5),
                      margin: RFPercentage(0.5),
                      marginTop: RFPercentage(1),
                      textAlign: "center",
                    }}
                  >
                    Mood
                  </Text>
                </Card>
              </View>
            </View>
          )}
        </View>

        <View style={{ margin: RFPercentage(1.8) }}>
          <View>
            <Text
              style={{
                color: "black",
                fontFamily: "Ubuntu-Bold",
                fontSize: RFPercentage(2),
                margin: RFPercentage(0.5),
              }}
            >
              Tomorrow Horoscope
            </Text>
            {isLoading ? (
              <ProfileHoroscopePlaceholder />
            ) : (
              <Text
                style={{
                  color: "#818181",
                  fontFamily: "Ubuntu-Regular",
                  fontSize: RFPercentage(1.8),
                  margin: RFPercentage(0.5),
                  marginTop: RFPercentage(1),
                }}
              >
                {astrology.horoscope.tomorrow.description}
              </Text>
            )}
          </View>

          {isLoading ? (
            <ProfileHoroscopePredictionsPlaceholder />
          ) : (
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: RFPercentage(2),
                }}
              >
                <Card
                  containerStyle={{
                    borderRadius: RFPercentage(1),
                    width: RFPercentage(15),
                    maxHeight: RFPercentage(15),
                  }}
                >
                  <Text
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    style={{
                      color: "black",
                      textAlign: "center",
                      fontFamily: "Ubuntu-Bold",
                      fontSize: RFPercentage(2.3),
                      alignItems: "center",
                    }}
                  >
                    {astrology.horoscope.tomorrow.lucky_number}
                  </Text>
                  <Text
                    style={{
                      color: "#818181",
                      fontFamily: "Ubuntu-Regular",
                      fontSize: RFPercentage(1.3),
                      margin: RFPercentage(0.5),
                      marginTop: RFPercentage(1),
                      textAlign: "center",
                    }}
                  >
                    Lucky Number
                  </Text>
                </Card>
                <Card
                  containerStyle={{
                    borderRadius: RFPercentage(1),
                    width: RFPercentage(15),
                    maxHeight: RFPercentage(15),
                  }}
                >
                  <Text
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    style={{
                      color: "black",
                      textAlign: "center",
                      fontFamily: "Ubuntu-Bold",
                      fontSize: RFPercentage(2.3),
                      alignItems: "center",
                    }}
                  >
                    {astrology.horoscope.tomorrow.color}
                  </Text>
                  <Text
                    style={{
                      color: "#818181",
                      fontFamily: "Ubuntu-Regular",
                      fontSize: RFPercentage(1.5),
                      margin: RFPercentage(0.5),
                      marginTop: RFPercentage(1),
                      textAlign: "center",
                    }}
                  >
                    Lucky Color
                  </Text>
                </Card>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Card
                  containerStyle={{
                    borderRadius: RFPercentage(1),
                    width: RFPercentage(15),
                    maxHeight: RFPercentage(15),
                  }}
                >
                  <Text
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    style={{
                      color: "black",
                      textAlign: "center",
                      fontFamily: "Ubuntu-Bold",
                      fontSize: RFPercentage(2.3),
                      alignItems: "center",
                    }}
                  >
                    {astrology.horoscope.tomorrow.lucky_time}
                  </Text>
                  <Text
                    style={{
                      color: "#818181",
                      fontFamily: "Ubuntu-Regular",
                      fontSize: RFPercentage(1.5),
                      margin: RFPercentage(0.5),
                      marginTop: RFPercentage(1),
                      textAlign: "center",
                    }}
                  >
                    Lucky Time
                  </Text>
                </Card>
                <Card
                  containerStyle={{
                    borderRadius: RFPercentage(1),
                    width: RFPercentage(15),
                    maxHeight: RFPercentage(15),
                  }}
                >
                  <Text
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    style={{
                      color: "black",
                      textAlign: "center",
                      fontFamily: "Ubuntu-Bold",
                      fontSize: RFPercentage(2.3),
                      alignItems: "center",
                    }}
                  >
                    {astrology.horoscope.tomorrow.mood}
                  </Text>
                  <Text
                    style={{
                      color: "#818181",
                      fontFamily: "Ubuntu-Regular",
                      fontSize: RFPercentage(1.5),
                      margin: RFPercentage(0.5),
                      marginTop: RFPercentage(1),
                      textAlign: "center",
                    }}
                  >
                    Mood
                  </Text>
                </Card>
              </View>
            </View>
          )}
        </View>

        <View style={{ margin: RFPercentage(1.8) }}>
          {isLoading ? (
            <ProfileHoroscopePlaceholder />
          ) : (
            <View
              style={{
                margin: RFPercentage(2),
              }}
            >
              <Card
                containerStyle={{
                  borderRadius: RFPercentage(1),
                  backgroundColor: "#1F4693",
                  padding: RFPercentage(4),
                }}
              >
                <Text
                  style={{
                    fontFamily: "Ubuntu-Bold",
                    fontSize: RFPercentage(2.2),
                    textAlign: "center",
                    color: "white",
                  }}
                >
                  Quote of the day
                </Text>
                <Text
                  style={{
                    color: "black",
                    textAlign: "center",
                    fontFamily: "Ubuntu-Regular",
                    marginTop: RFPercentage(1.5),
                    fontSize: RFPercentage(2),
                    alignItems: "center",
                    color: "white",
                  }}
                >
                  "{astrology.quote.quote}"
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    fontFamily: "Dongle-Regular",
                    marginTop: RFPercentage(1),
                    fontSize: RFPercentage(1.8),
                    color: "white",
                  }}
                >
                  ~{astrology.quote.author}
                </Text>
              </Card>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;
