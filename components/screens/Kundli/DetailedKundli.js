import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Header, Card } from "react-native-elements";
import { RFPercentage } from "react-native-responsive-fontsize";
import TextInput from "react-native-text-input-interactive";
import { Tab, TabView } from "@rneui/themed";
import { Table, Row, Rows } from "react-native-table-component";
import Ionicons from "react-native-vector-icons/Ionicons";
import React, { useState, Fragment } from "react";
import SvgUri from "react-native-svg-uri";
import Basic from "./Basic";
import { SvgXml } from "react-native-svg";
import Reports from "./Reports";
import Planets from "./Planets";

const DetailedKundli = ({ route, navigation }) => {
  const [index, setIndex] = useState(0);
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
          text: "Kundli",
          style: {
            color: "#fff",
            fontSize: RFPercentage(3.5),
            fontFamily: "Dongle-Regular",
            marginTop: RFPercentage(0.5),
          },
        }}
      />
      <View style={{ flex: 1 }}>
        <Tab
          value={index}
          onChange={(e) => setIndex(e)}
          indicatorStyle={{
            backgroundColor: "#1F4693",
            height: 3,
          }}
          containerStyle={{
            backgroundColor: "#c6c3eb",
          }}
          scrollable={true}
        >
          <Tab.Item
            title="Basic"
            containerStyle={(active) => {
              return {
                backgroundColor: active ? "#aba5e6" : "#c6c3eb",
              };
            }}
            titleStyle={{
              fontSize: RFPercentage(3),
              fontFamily: "Dongle-Regular",
              color: "#1F4693",
            }}
          />
          <Tab.Item
            title="Charts"
            containerStyle={(active) => {
              return {
                backgroundColor: active ? "#aba5e6" : "#c6c3eb",
              };
            }}
            titleStyle={{
              fontSize: RFPercentage(3),
              fontFamily: "Dongle-Regular",
              color: "#1F4693",
            }}
          />
          <Tab.Item
            title="Planets"
            containerStyle={(active) => {
              return {
                backgroundColor: active ? "#aba5e6" : "#c6c3eb",
              };
            }}
            titleStyle={{
              fontSize: RFPercentage(3),
              fontFamily: "Dongle-Regular",
              color: "#1F4693",
            }}
          />
          <Tab.Item
            title="Reports"
            containerStyle={(active) => {
              return {
                backgroundColor: active ? "#aba5e6" : "#c6c3eb",
              };
            }}
            titleStyle={{
              fontSize: RFPercentage(3),
              fontFamily: "Dongle-Regular",
              color: "#1F4693",
            }}
          />
        </Tab>

        <TabView value={index} onChange={setIndex} animationType="spring">
          {/* Basic Details */}
          <TabView.Item style={{ width: "100%" }}>
            <Basic
              mangal_dasha={route.params.Kundli.mangal_dosha}
              data={route.params.Kundli.nakshatra_details}
              userData={route.params.userData}
            />
          </TabView.Item>

          {/* Charts */}
          <TabView.Item style={{ height: "100%", width: "100%" }}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: RFPercentage(2),
                }}
              >
                <Text
                  style={{
                    color: "black",
                    fontFamily: "Dongle-Regular",
                    fontSize: RFPercentage(3.5),
                  }}
                >
                  Lagna Chart
                </Text>
                <SvgXml
                  height={RFPercentage(45)}
                  width={RFPercentage(45)}
                  xml={route.params.Charts[0].SVG_XML}
                />
                <Text
                  style={{
                    color: "black",
                    fontFamily: "Dongle-Regular",
                    fontSize: RFPercentage(3.5),
                    marginTop: RFPercentage(2),
                  }}
                >
                  Navamsa Chart
                </Text>
                <SvgXml
                  height={RFPercentage(45)}
                  width={RFPercentage(45)}
                  xml={route.params.Charts[1].SVG_XML}
                />
                <Text
                  style={{
                    color: "black",
                    fontFamily: "Dongle-Regular",
                    fontSize: RFPercentage(3.5),
                    marginTop: RFPercentage(2),
                  }}
                >
                  Saptamsa Chart
                </Text>
                <SvgXml
                  height={RFPercentage(45)}
                  width={RFPercentage(45)}
                  xml={route.params.Charts[2].SVG_XML}
                />
                <Text
                  style={{
                    color: "black",
                    fontFamily: "Dongle-Regular",
                    fontSize: RFPercentage(3.5),
                    marginTop: RFPercentage(2),
                  }}
                >
                  Rasi Chart
                </Text>
                <SvgXml
                  height={RFPercentage(45)}
                  width={RFPercentage(45)}
                  xml={route.params.Charts[2].SVG_XML}
                />
              </View>
            </ScrollView>
          </TabView.Item>

          {/* Planet Positions */}
          <TabView.Item style={{ width: "100%" }}>
            <Planets data={route.params.PlanetPosition} />
          </TabView.Item>

          {/* Reports (Yoga) */}
          <TabView.Item style={{ width: "100%" }}>
            <Reports data={route.params.Kundli.yoga_details} />
          </TabView.Item>
        </TabView>
      </View>
    </View>
  );
};

export default DetailedKundli;
