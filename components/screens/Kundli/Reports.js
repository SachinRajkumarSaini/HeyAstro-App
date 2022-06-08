import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import { Card } from "react-native-elements";
import { RFPercentage } from "react-native-responsive-fontsize";

const Report = (props) => {
  const [majorYogas] = useState(
    props.data[0].yoga_list.filter((item) => item.has_yoga === true)
  );
  const [chandraYogas] = useState(
    props.data[1].yoga_list.filter((item) => item.has_yoga === true)
  );
  const [sooryaYogas] = useState(
    props.data[2].yoga_list.filter((item) => item.has_yoga === true)
  );
  const [inauspiciousYogas] = useState(
    props.data[3].yoga_list.filter((item) => item.has_yoga === true)
  );
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ flex: 1 }}>
        <Text
          style={{
            textAlign: "center",
            fontFamily: "Dongle-Regular",
            fontSize: RFPercentage(3.5),
            color: "black",
            marginVertical: RFPercentage(2),
          }}
        >
          Yoga
        </Text>

        <Card
          containerStyle={{
            borderRadius: RFPercentage(1.5),
            marginTop: 0,
            marginBottom: RFPercentage(3),
          }}
        >
          {/* Major Yogas */}
          <View style={{ marginBottom: RFPercentage(5) }}>
            <Text
              style={{
                fontFamily: "Ubuntu-Bold",
                textAlign: "center",
                marginVertical: RFPercentage(0.5),
                color: "black",
              }}
            >
              {props.data[0].name}
            </Text>
            <Text
              style={{
                fontFamily: "Ubuntu-Regular",
                textAlign: "center",
                marginVertical: RFPercentage(0.5),
                color: "#808080",
              }}
            >
              {props.data[0].description}
            </Text>
            {majorYogas.length > 0 &&
              majorYogas.map((majorYoga, index) => {
                return (
                  <View
                    key={index}
                    style={{ marginVertical: RFPercentage(1.5) }}
                  >
                    <Text style={{ fontFamily: "Ubuntu-Bold", color: "black" }}>
                      {majorYoga.name}
                    </Text>
                    <Text
                      style={{
                        marginTop: RFPercentage(0.5),
                        fontFamily: "Ubuntu-Regular",
                        color: "#808080",
                      }}
                    >
                      {majorYoga.description}
                    </Text>
                  </View>
                );
              })}
          </View>

          {/* Chandra Yogas */}
          <View style={{ marginBottom: RFPercentage(5) }}>
            <Text
              style={{
                fontFamily: "Ubuntu-Bold",
                textAlign: "center",
                marginVertical: RFPercentage(0.5),
                color: "black",
              }}
            >
              {props.data[1].name}
            </Text>
            <Text
              style={{
                fontFamily: "Ubuntu-Regular",
                textAlign: "center",
                marginVertical: RFPercentage(0.5),
                color: "#808080",
              }}
            >
              {props.data[1].description}
            </Text>
            {chandraYogas.length > 0 &&
              chandraYogas.map((chandraYoga, index) => {
                return (
                  <View
                    key={index}
                    style={{ marginVertical: RFPercentage(1.5) }}
                  >
                    <Text style={{ fontFamily: "Ubuntu-Bold", color: "black" }}>
                      {chandraYoga.name}
                    </Text>
                    <Text
                      style={{
                        marginTop: RFPercentage(0.5),
                        fontFamily: "Ubuntu-Regular",
                        color: "#808080",
                      }}
                    >
                      {chandraYoga.description}
                    </Text>
                  </View>
                );
              })}
          </View>

          {/* Soorya Yogas */}
          <View style={{ marginBottom: RFPercentage(5) }}>
            <Text
              style={{
                fontFamily: "Ubuntu-Bold",
                textAlign: "center",
                marginVertical: RFPercentage(0.5),
                color: "black",
              }}
            >
              {props.data[2].name}
            </Text>
            <Text
              style={{
                fontFamily: "Ubuntu-Regular",
                textAlign: "center",
                marginVertical: RFPercentage(0.5),
                color: "#808080",
              }}
            >
              {props.data[2].description}
            </Text>
            {sooryaYogas.length > 0 &&
              sooryaYogas.map((sooryaYoga, index) => {
                return (
                  <View
                    key={index}
                    style={{ marginVertical: RFPercentage(1.5) }}
                  >
                    <Text style={{ fontFamily: "Ubuntu-Bold", color: "black" }}>
                      {sooryaYoga.name}
                    </Text>
                    <Text
                      style={{
                        marginTop: RFPercentage(0.5),
                        fontFamily: "Ubuntu-Regular",
                        color: "#808080",
                      }}
                    >
                      {sooryaYoga.description}
                    </Text>
                  </View>
                );
              })}
          </View>

          {/* Inauspicious Yogas */}
          <View>
            <Text
              style={{
                fontFamily: "Ubuntu-Bold",
                textAlign: "center",
                marginVertical: RFPercentage(0.5),
                color: "black",
              }}
            >
              {props.data[3].name}
            </Text>
            <Text
              style={{
                fontFamily: "Ubuntu-Regular",
                textAlign: "center",
                marginVertical: RFPercentage(0.5),
                color: "#808080",
              }}
            >
              {props.data[3].description}
            </Text>
            {inauspiciousYogas.length > 0 &&
              inauspiciousYogas.map((inauspiciousYoga, index) => {
                return (
                  <View
                    key={index}
                    style={{ marginVertical: RFPercentage(1.5) }}
                  >
                    <Text style={{ fontFamily: "Ubuntu-Bold", color: "black" }}>
                      {inauspiciousYoga.name}
                    </Text>
                    <Text
                      style={{
                        marginTop: RFPercentage(0.5),
                        fontFamily: "Ubuntu-Regular",
                        color: "#808080",
                      }}
                    >
                      {inauspiciousYoga.description}
                    </Text>
                  </View>
                );
              })}
          </View>
        </Card>
      </View>
    </ScrollView>
  );
};

export default Report;
