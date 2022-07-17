import { View, Text, StatusBar } from "react-native";
import React from "react";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Header, Card, Image } from "react-native-elements";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import FileBase64 from "../helpers/FileBase64";

const ReferAndEarn = ({ navigation }) => {
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
          text: "Refer And Earn",
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

      <View style={{ flex: 1 }}>
        <Card
          containerStyle={{
            borderRadius: RFPercentage(2),
            backgroundColor: "#1F4693",
          }}
        >
          <Text
            style={{
              color: "white",
              fontFamily: "Ubuntu-Bold",
              textAlign: "center",
            }}
          >
            1 Referral = ₹ 25
          </Text>
          <Text
            style={{
              color: "white",
              fontFamily: "Ubuntu-Bold",
              textAlign: "center",
              marginVertical: RFPercentage(1),
            }}
          >
            1000 Referral = ₹ 25000
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              margin: RFPercentage(2),
            }}
          >
            <View style={{ alignItems: "center" }}>
              <Image
                source={{ uri: FileBase64.ReferAndEarn1 }}
                style={{
                  height: 80,
                  width: 80,
                  borderRadius: 40,
                  borderWidth: 1,
                  borderColor: "white",
                }}
              />
              <Text
                style={{
                  color: "white",
                  fontFamily: "Ubuntu-Bold",
                  textAlign: "center",
                  fontSize: RFPercentage(1.5),
                  marginTop: RFPercentage(1),
                }}
              >
                Refre your friend
              </Text>
            </View>
            <FontAwesome5
              name="arrow-right"
              style={{
                marginStart: RFPercentage(2),
                marginBottom: RFPercentage(2),
              }}
              color={"white"}
              size={25}
            />
            <View style={{ alignItems: "center" }}>
              <Image
                source={{ uri: FileBase64.profileLogo }}
                style={{
                  height: 80,
                  width: 80,
                  borderRadius: 40,
                  borderWidth: 1,
                  borderColor: "white",
                }}
              />
              <Text
                style={{
                  color: "white",
                  fontFamily: "Ubuntu-Bold",
                  textAlign: "center",
                  fontSize: RFPercentage(1.5),
                  marginTop: RFPercentage(1),
                }}
              >
                ₹25 added to your wallet
              </Text>
            </View>
          </View>
        </Card>

        <View style={{ margin: RFPercentage(2) }}>
          <Text
            style={{
              color: "black",
              fontFamily: "Ubuntu-Bold",
              textAlign: "center",
            }}
          >
            Refer and Earn
          </Text>
          <Text
            style={{
              color: "#181A18",
              fontFamily: "Ubuntu-Bold",
              textAlign: "center",
              marginTop: RFPercentage(0.5),
            }}
          >
            Refer and earn ₹25 every time your friend completes a free session.
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginTop: RFPercentage(2),
            }}
          >
            <FontAwesome name="whatsapp" color={"#58aa14"} size={30} />
            <FontAwesome5 name="sms" color={"#1464BF"} size={30} />
            <Ionicons name="link" color={"#FF8A66"} size={30} />
          </View>
        </View>

        <View
          style={{
            marginHorizontal: RFPercentage(2),
            marginVertical: RFPercentage(1),
            borderBottomColor: "#e1e1e1",
            borderBottomWidth: 1,
          }}
        />

        <View style={{ margin: RFPercentage(2) }}>
          <Text style={{ color: "black", fontFamily: "Ubuntu-Bold" }}>
            How it Works?
          </Text>
          <Text
            style={{
              color: "black",
              fontFamily: "Ubuntu-Regular",
              marginTop: RFPercentage(1),
            }}
          >
            1. Invite your friend to HeyAstro App.
          </Text>
          <Text
            style={{
              color: "black",
              fontFamily: "Ubuntu-Regular",
              marginTop: RFPercentage(1),
            }}
          >
            2. Your friend will sign up and completes a free session on the app.
          </Text>
          <Text
            style={{
              color: "black",
              fontFamily: "Ubuntu-Regular",
              marginTop: RFPercentage(1),
            }}
          >
            3. As soon as your friend completes a freesession, you'll receive
            ₹25 in your wallet. You can use thus money to take a session with
            any astrologer.
          </Text>
        </View>

        <View
          style={{
            marginHorizontal: RFPercentage(2),
            marginVertical: RFPercentage(1),
            borderBottomColor: "#e1e1e1",
            borderBottomWidth: 1,
          }}
        />

        <Card
          containerStyle={{
            margin: RFPercentage(2),
            borderRadius: RFPercentage(1),
          }}
        >
          <Text style={{ color: "black", fontFamily: "Ubuntu-Bold" }}>
            My Winnings
          </Text>
          <View
            style={{ marginVertical: RFPercentage(4), alignItems: "center" }}
          >
            <Text style={{ color: "black", fontFamily: "Ubuntu-Bold" }}>
              No referral rewards
            </Text>
            <Text style={{ color: "black", fontFamily: "Ubuntu-Regular" }}>
              You have not invited any of your friends yer
            </Text>
          </View>
        </Card>
      </View>
    </View>
  );
};

export default ReferAndEarn;
