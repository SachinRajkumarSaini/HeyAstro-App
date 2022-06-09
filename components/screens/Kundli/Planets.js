import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import { Table, Row, Rows } from "react-native-table-component";
import { RFPercentage } from "react-native-responsive-fontsize";

const Planets = (props) => {
  const [planets] = useState(props.data);
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ flex: 1 }}>
        <Text
          style={{
            textAlign: "center",
            fontFamily: "Dongle-Regular",
            fontSize: RFPercentage(3.5),
            color: "black",
            marginTop: RFPercentage(2),
          }}
        >
          Planet Position
        </Text>
        <Table
          style={{ margin: RFPercentage(2), marginBottom: RFPercentage(3) }}
          borderStyle={{ borderWidth: 2, borderColor: "#1F4693" }}
        >
          <Row
            data={["Planet", "Rashi", "Naksh Lord", "Degree", "House"]}
            style={{ height: 40, backgroundColor: "#c6c3eb" }}
            textStyle={{
              margin: 6,
              color: "black",
              fontFamily: "Dongle-Bold",
              fontSize: RFPercentage(3),
            }}
          />
          {planets &&
            planets.map((item, index) => {
              return (
                <Row
                  key={index}
                  data={[
                    item.name,
                    item.rasi.name,
                    item.rasi.lord.name,
                    item.degree,
                    item.position,
                  ]}
                  style={{ height: 40, backgroundColor: "#c6c3eb" }}
                  textStyle={{
                    margin: 6,
                    color: "black",
                    fontFamily: "Dongle-Light",
                    fontSize: RFPercentage(2.5),
                  }}
                />
              );
            })}
        </Table>
      </View>
    </ScrollView>
  );
};

export default Planets;
