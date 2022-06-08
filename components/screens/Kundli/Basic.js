import { View, Text, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { Table, Row, Rows } from "react-native-table-component";
import { Card } from "react-native-elements";
import { RFPercentage } from "react-native-responsive-fontsize";

const Basic = (props) => {
  useEffect(() => {
    console.log("Basic", props.mangal_dasha.has_dosha);
  }, []);
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Text
        style={{
          fontFamily: "Dongle-Regular",
          fontSize: RFPercentage(3.5),
          textAlign: "center",
          marginTop: RFPercentage(2),
          color: "black",
        }}
      >
        Basic Details
      </Text>
      <Table
        style={{ margin: RFPercentage(2) }}
        borderStyle={{ borderWidth: 2, borderColor: "#423b88" }}
      >
        <Row
          data={["Name", props.userData.Name]}
          style={{ height: 40, backgroundColor: "#c6c3eb" }}
          textStyle={{
            margin: 6,
            color: "black",
            fontFamily: "Dongle-Regular",
            fontSize: RFPercentage(3),
          }}
        />
        <Row
          data={["Date", props.userData.Date]}
          style={{ height: 40, backgroundColor: "#c6c3eb" }}
          textStyle={{
            margin: 6,
            color: "black",
            fontFamily: "Dongle-Regular",
            fontSize: RFPercentage(3),
          }}
        />
        <Row
          data={["Time", props.userData.Time]}
          style={{ height: 40, backgroundColor: "#c6c3eb" }}
          textStyle={{
            margin: 6,
            color: "black",
            fontFamily: "Dongle-Regular",
            fontSize: RFPercentage(3),
          }}
        />
        <Row
          data={["Place", props.userData.Place]}
          style={{ height: 40, backgroundColor: "#c6c3eb" }}
          textStyle={{
            margin: 6,
            color: "black",
            fontFamily: "Dongle-Regular",
            fontSize: RFPercentage(3),
          }}
        />
        <Row
          data={["Animal Sign", props.data.additional_info.animal_sign]}
          style={{ height: 40, backgroundColor: "#c6c3eb" }}
          textStyle={{
            margin: 6,
            color: "black",
            fontFamily: "Dongle-Regular",
            fontSize: RFPercentage(3),
          }}
        />
        <Row
          data={["Best Direction", props.data.additional_info.best_direction]}
          style={{ height: 40, backgroundColor: "#c6c3eb" }}
          textStyle={{
            margin: 6,
            color: "black",
            fontFamily: "Dongle-Regular",
            fontSize: RFPercentage(3),
          }}
        />
        <Row
          data={["Color", props.data.additional_info.color]}
          style={{ height: 40, backgroundColor: "#c6c3eb" }}
          textStyle={{
            margin: 6,
            color: "black",
            fontFamily: "Dongle-Regular",
            fontSize: RFPercentage(3),
          }}
        />
        <Row
          data={["Deity", props.data.additional_info.birth_stone]}
          style={{ height: 40, backgroundColor: "#c6c3eb" }}
          textStyle={{
            margin: 6,
            color: "black",
            fontFamily: "Dongle-Regular",
            fontSize: RFPercentage(3),
          }}
        />
        <Row
          data={["Enemy Yoni", props.data.additional_info.enemy_yoni]}
          style={{ height: 40, backgroundColor: "#c6c3eb" }}
          textStyle={{
            margin: 6,
            color: "black",
            fontFamily: "Dongle-Regular",
            fontSize: RFPercentage(3),
          }}
        />
        <Row
          data={["Ganam", props.data.additional_info.ganam]}
          style={{ height: 40, backgroundColor: "#c6c3eb" }}
          textStyle={{
            margin: 6,
            color: "black",
            fontFamily: "Dongle-Regular",
            fontSize: RFPercentage(3),
          }}
        />
        <Row
          data={["Nadi", props.data.additional_info.nadi]}
          style={{ height: 40, backgroundColor: "#c6c3eb" }}
          textStyle={{
            margin: 6,
            color: "black",
            fontFamily: "Dongle-Regular",
            fontSize: RFPercentage(3),
          }}
        />
        <Row
          data={["Planet", props.data.additional_info.planet]}
          style={{ height: 40, backgroundColor: "#c6c3eb" }}
          textStyle={{
            margin: 6,
            color: "black",
            fontFamily: "Dongle-Regular",
            fontSize: RFPercentage(3),
          }}
        />
        <Row
          data={["Syllables", props.data.additional_info.syllables]}
          style={{ height: 40, backgroundColor: "#c6c3eb" }}
          textStyle={{
            margin: 6,
            color: "black",
            fontFamily: "Dongle-Regular",
            fontSize: RFPercentage(3),
          }}
        />
      </Table>
      <View
        style={{
          marginTop: RFPercentage(3),
          marginBottom: RFPercentage(1),
          marginStart: RFPercentage(2),
        }}
      >
        <Text
          style={{
            fontFamily: "Dongle-Regular",
            fontSize: RFPercentage(3),
            color: "black",
            textAlign: "center",
          }}
        >
          Manglik Analysis
        </Text>
      </View>
      <Card
        containerStyle={{
          borderRadius: RFPercentage(1.5),
          marginTop: 0,
          marginBottom: RFPercentage(3),
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Card
            containerStyle={{
              flex: 0.8,
              margin: 0,
              borderRadius: RFPercentage(5),
              marginRight: RFPercentage(2),
              backgroundColor: `#${(((1 << 24) * Math.random()) | 0).toString(
                16
              )}`,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ textAlign: "center", fontWeight: "bold" }}>
              {props.userData.Name[0]}
            </Text>
          </Card>
          <View style={{ flex: 10 }}>
            <Text
              style={{
                fontFamily: "Dongle-Regular",
                color: "black",
                fontSize: RFPercentage(2),
              }}
            >
              {props.userData.Name}
            </Text>
            <Text
              style={{
                fontFamily: "Dongle-Regular",
                color: "black",
                fontSize: RFPercentage(1.8),
                lineHeight: 15,
              }}
            >
              {props.mangal_dasha.description}
            </Text>
          </View>
        </View>
      </Card>

      {/* Expections */}
      <Card
        containerStyle={{
          borderRadius: RFPercentage(1.5),
          marginBottom: RFPercentage(2),
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ flex: 10 }}>
            <Text
              style={{
                fontFamily: "Dongle-Bold",
                fontSize: RFPercentage(2.5),
                color: "black",
                textAlign: "center",
              }}
            >
              Exceptions
            </Text>
            <Text
              style={{
                fontFamily: "Dongle-Regular",
                color: "black",
                fontSize: RFPercentage(1.8),
                lineHeight: 15,
                marginTop: RFPercentage(1),
              }}
            >
              {props.mangal_dasha.exceptions.map((item, index) => {
                return (
                  <Text style={{ color: "black" }} key={index}>
                    {index + 1}
                    {". "}
                    {item}
                    {"\n"}
                  </Text>
                );
              })}
            </Text>
          </View>
        </View>
      </Card>

      {/* Remedies */}
      {props.mangal_dasha.has_dosha && props.mangal_dasha.has_exception && (
        <Card
          containerStyle={{
            borderRadius: RFPercentage(1.5),
            marginBottom: RFPercentage(3),
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View style={{ flex: 10 }}>
              <Text
                style={{
                  fontFamily: "Dongle-Bold",
                  fontSize: RFPercentage(2.5),
                  color: "black",
                  textAlign: "center",
                }}
              >
                Remedies
              </Text>
              <Text
                style={{
                  fontFamily: "Dongle-Regular",
                  color: "black",
                  fontSize: RFPercentage(1.8),
                  lineHeight: 15,
                  marginTop: RFPercentage(1),
                }}
              >
                {props.mangal_dasha.remedies.map((item, index) => {
                  return (
                    <Text style={{ color: "black" }} key={index}>
                      {index + 1}
                      {". "}
                      {item}
                      {"\n"}
                    </Text>
                  );
                })}
              </Text>
            </View>
          </View>
        </Card>
      )}
    </ScrollView>
  );
};

export default Basic;
