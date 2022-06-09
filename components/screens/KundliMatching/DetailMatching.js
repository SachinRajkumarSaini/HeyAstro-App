import { View, Text, StatusBar, ScrollView } from "react-native";
import { Header, Card } from "react-native-elements";
import { RFPercentage } from "react-native-responsive-fontsize";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import React, { useState } from "react";

const DetailMatching = ({ route, navigation }) => {
  const [varna] = useState(
    (
      (route.params.KundliMatching.guna_milan.guna[0].obtained_points /
        route.params.KundliMatching.guna_milan.guna[0].maximum_points) *
      100
    ).toFixed(2)
  );
  const [vasya] = useState(
    (
      (route.params.KundliMatching.guna_milan.guna[1].obtained_points /
        route.params.KundliMatching.guna_milan.guna[1].maximum_points) *
      100
    ).toFixed(2)
  );
  const [tara] = useState(
    (
      (route.params.KundliMatching.guna_milan.guna[2].obtained_points /
        route.params.KundliMatching.guna_milan.guna[2].maximum_points) *
      100
    ).toFixed(2)
  );
  const [yoni] = useState(
    (
      (route.params.KundliMatching.guna_milan.guna[3].obtained_points /
        route.params.KundliMatching.guna_milan.guna[3].maximum_points) *
      100
    ).toFixed(2)
  );
  const [maitri] = useState(
    (
      (route.params.KundliMatching.guna_milan.guna[4].obtained_points /
        route.params.KundliMatching.guna_milan.guna[4].maximum_points) *
      100
    ).toFixed(2)
  );
  const [nadi] = useState(
    (
      (route.params.KundliMatching.guna_milan.guna[7].obtained_points /
        route.params.KundliMatching.guna_milan.guna[7].maximum_points) *
      100
    ).toFixed(2)
  );
  const [gana] = useState(
    (
      (route.params.KundliMatching.guna_milan.guna[5].obtained_points /
        route.params.KundliMatching.guna_milan.guna[5].maximum_points) *
      100
    ).toFixed(2)
  );
  const [bhakoot] = useState(
    (
      (route.params.KundliMatching.guna_milan.guna[6].obtained_points /
        route.params.KundliMatching.guna_milan.guna[6].maximum_points) *
      100
    ).toFixed(2)
  );

  const [compatibiltyScore] = useState(
    (
      (route.params.KundliMatching.guna_milan.total_points /
        route.params.KundliMatching.guna_milan.maximum_points) *
      100
    ).toFixed(2)
  );

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
          text: "Kundli Matching",
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1 }}>
          <Card
            containerStyle={{
              alignItems: "center",
              borderBottomLeftRadius: RFPercentage(6),
              borderBottomRightRadius: RFPercentage(6),
              height: RFPercentage(28),
              margin: 0,
            }}
          >
            <Text
              style={{
                fontFamily: "Dongle-Regular",
                fontSize: RFPercentage(3.5),
                color: "black",
                textAlign: "center",
              }}
            >
              Compatibilty Score
            </Text>
            <AnimatedCircularProgress
              size={250}
              width={25}
              fill={compatibiltyScore}
              rotation={270}
              arcSweepAngle={180}
              style={{ marginTop: RFPercentage(2) }}
              tintColor="#1F4693"
              backgroundColor="#b7b4d9"
            />
            <Card
              containerStyle={{
                position: "absolute",
                top: 170,
                left: 70,
                right: 70,
                bottom: 65,
                borderRadius: RFPercentage(1.5),
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "black",
                  fontFamily: "Dongle-Bold",
                  fontSize: RFPercentage(2.5),
                }}
              >
                {route.params.KundliMatching.guna_milan.total_points}/
                {route.params.KundliMatching.guna_milan.maximum_points}
              </Text>
            </Card>
          </Card>
          <View style={{ marginBottom: RFPercentage(4) }}>
            <Text
              style={{
                color: "black",
                textAlign: "center",
                fontFamily: "Ubuntu-Bold",
                marginTop: RFPercentage(5),
                fontSize: RFPercentage(1.8),
              }}
            >
              Details
            </Text>

            {/* Compatibility (Varna) */}
            <Card
              containerStyle={{
                borderRadius: RFPercentage(1.5),
                justifyContent: "center",
                backgroundColor: "#FFF6F1",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flex: 2 }}>
                  <Text
                    style={{
                      color: "black",
                      fontFamily: "Dongle-Bold",
                      fontSize: RFPercentage(2.5),
                    }}
                  >
                    Compatibility (Varna)
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Ubuntu-Regular",
                      fontSize: RFPercentage(1.5),
                      color: "#808080",
                    }}
                  >
                    {route.params.KundliMatching.guna_milan.guna[0].description}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    paddingBottom: RFPercentage(1),
                  }}
                >
                  <AnimatedCircularProgress
                    size={80}
                    width={10}
                    fill={varna}
                    arcSweepAngle={360}
                    tintColor="#FEA379"
                    style={{ marginTop: RFPercentage(3), marginBottom: 0 }}
                    backgroundColor="#E0E1E1"
                  >
                    {(varna) => (
                      <Text style={{ color: "black" }}>{varna}%</Text>
                    )}
                  </AnimatedCircularProgress>
                </View>
              </View>
            </Card>

            {/* Love (Bhakoot) */}
            <Card
              containerStyle={{
                borderRadius: RFPercentage(1.5),
                justifyContent: "center",
                backgroundColor: "#EFFAF4",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flex: 2 }}>
                  <Text
                    style={{
                      color: "black",
                      fontFamily: "Dongle-Bold",
                      fontSize: RFPercentage(2.5),
                    }}
                  >
                    Love (Bhakoot)
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Ubuntu-Regular",
                      fontSize: RFPercentage(1.5),
                      color: "#808080",
                    }}
                  >
                    {route.params.KundliMatching.guna_milan.guna[6].description}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    paddingBottom: RFPercentage(1),
                  }}
                >
                  <AnimatedCircularProgress
                    size={80}
                    width={10}
                    fill={bhakoot}
                    arcSweepAngle={360}
                    tintColor="#6FCE96"
                    style={{ marginTop: RFPercentage(3), marginBottom: 0 }}
                    backgroundColor="#E0E1E1"
                  >
                    {(bhakoot) => (
                      <Text style={{ color: "black" }}>{bhakoot}%</Text>
                    )}
                  </AnimatedCircularProgress>
                </View>
              </View>
            </Card>

            {/* Mental Compatibility (Maitri) */}
            <Card
              containerStyle={{
                borderRadius: RFPercentage(1.5),
                justifyContent: "center",
                backgroundColor: "#FCF2FD",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flex: 2 }}>
                  <Text
                    style={{
                      color: "black",
                      fontFamily: "Dongle-Bold",
                      fontSize: RFPercentage(2.5),
                    }}
                  >
                    Mental Compatibility (Maitri)
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Ubuntu-Regular",
                      fontSize: RFPercentage(1.5),
                      color: "#808080",
                    }}
                  >
                    {route.params.KundliMatching.guna_milan.guna[4].description}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    paddingBottom: RFPercentage(1),
                  }}
                >
                  <AnimatedCircularProgress
                    size={80}
                    width={10}
                    fill={maitri}
                    arcSweepAngle={360}
                    tintColor="#B96AD9"
                    style={{ marginTop: RFPercentage(3), marginBottom: 0 }}
                    backgroundColor="#E0E1E1"
                  >
                    {(maitri) => (
                      <Text style={{ color: "black" }}>{maitri}%</Text>
                    )}
                  </AnimatedCircularProgress>
                </View>
              </View>
            </Card>

            {/* Health (Nadi) */}
            <Card
              containerStyle={{
                borderRadius: RFPercentage(1.5),
                justifyContent: "center",
                backgroundColor: "#EEF7EE",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flex: 2 }}>
                  <Text
                    style={{
                      color: "black",
                      fontFamily: "Dongle-Bold",
                      fontSize: RFPercentage(2.5),
                    }}
                  >
                    Health (Nadi)
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Ubuntu-Regular",
                      fontSize: RFPercentage(1.5),
                      color: "#808080",
                    }}
                  >
                    {route.params.KundliMatching.guna_milan.guna[7].description}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    paddingBottom: RFPercentage(1),
                  }}
                >
                  <AnimatedCircularProgress
                    size={80}
                    width={10}
                    fill={nadi}
                    arcSweepAngle={360}
                    tintColor="#5AA3EE"
                    style={{ marginTop: RFPercentage(3), marginBottom: 0 }}
                    backgroundColor="#E0E1E1"
                  >
                    {(nadi) => <Text style={{ color: "black" }}>{nadi}%</Text>}
                  </AnimatedCircularProgress>
                </View>
              </View>
            </Card>

            {/* Dominance (Vasya) */}
            <Card
              containerStyle={{
                borderRadius: RFPercentage(1.5),
                justifyContent: "center",
                backgroundColor: "#FFF2F9",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flex: 2 }}>
                  <Text
                    style={{
                      color: "black",
                      fontFamily: "Dongle-Bold",
                      fontSize: RFPercentage(2.5),
                    }}
                  >
                    Dominance (Vasya)
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Ubuntu-Regular",
                      fontSize: RFPercentage(1.5),
                      color: "#808080",
                    }}
                  >
                    {route.params.KundliMatching.guna_milan.guna[1].description}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    paddingBottom: RFPercentage(1),
                  }}
                >
                  <AnimatedCircularProgress
                    size={80}
                    width={10}
                    fill={vasya}
                    arcSweepAngle={360}
                    tintColor="#FE83BB"
                    style={{ marginTop: RFPercentage(3), marginBottom: 0 }}
                    backgroundColor="#E0E1E1"
                  >
                    {(vasya) => (
                      <Text style={{ color: "black" }}>{vasya}%</Text>
                    )}
                  </AnimatedCircularProgress>
                </View>
              </View>
            </Card>

            {/* Temperament (Gana) */}
            <Card
              containerStyle={{
                borderRadius: RFPercentage(1.5),
                justifyContent: "center",
                backgroundColor: "#FFF6F1",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flex: 2 }}>
                  <Text
                    style={{
                      color: "black",
                      fontFamily: "Dongle-Bold",
                      fontSize: RFPercentage(2.5),
                    }}
                  >
                    Temperament (Gana)
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Ubuntu-Regular",
                      fontSize: RFPercentage(1.5),
                      color: "#808080",
                    }}
                  >
                    {route.params.KundliMatching.guna_milan.guna[5].description}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    paddingBottom: RFPercentage(1),
                  }}
                >
                  <AnimatedCircularProgress
                    size={80}
                    width={10}
                    fill={gana}
                    arcSweepAngle={360}
                    tintColor="#FFA27A"
                    style={{ marginTop: RFPercentage(3), marginBottom: 0 }}
                    backgroundColor="#E0E1E1"
                  >
                    {(gana) => <Text style={{ color: "black" }}>{gana}%</Text>}
                  </AnimatedCircularProgress>
                </View>
              </View>
            </Card>

            {/* Destiny (Tara) */}
            <Card
              containerStyle={{
                borderRadius: RFPercentage(1.5),
                justifyContent: "center",
                backgroundColor: "#EFFAF4",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flex: 2 }}>
                  <Text
                    style={{
                      color: "black",
                      fontFamily: "Dongle-Bold",
                      fontSize: RFPercentage(2.5),
                    }}
                  >
                    Destiny (Tara)
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Ubuntu-Regular",
                      fontSize: RFPercentage(1.5),
                      color: "#808080",
                    }}
                  >
                    {route.params.KundliMatching.guna_milan.guna[2].description}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    paddingBottom: RFPercentage(1),
                  }}
                >
                  <AnimatedCircularProgress
                    size={80}
                    width={10}
                    fill={tara}
                    arcSweepAngle={360}
                    tintColor="#6FCF97"
                    style={{ marginTop: RFPercentage(3), marginBottom: 0 }}
                    backgroundColor="#E0E1E1"
                  >
                    {(tara) => <Text style={{ color: "black" }}>{tara}%</Text>}
                  </AnimatedCircularProgress>
                </View>
              </View>
            </Card>

            {/* Physical Compatibility (Yoni) */}
            <Card
              containerStyle={{
                borderRadius: RFPercentage(1.5),
                justifyContent: "center",
                backgroundColor: "#FCF2FD",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flex: 2 }}>
                  <Text
                    style={{
                      color: "black",
                      fontFamily: "Dongle-Bold",
                      fontSize: RFPercentage(2.5),
                    }}
                  >
                    Physical Compatibility (Yoni)
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Ubuntu-Regular",
                      fontSize: RFPercentage(1.5),
                      color: "#808080",
                    }}
                  >
                    {route.params.KundliMatching.guna_milan.guna[3].description}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    paddingBottom: RFPercentage(1),
                  }}
                >
                  <AnimatedCircularProgress
                    size={80}
                    width={10}
                    fill={yoni}
                    arcSweepAngle={360}
                    tintColor="#B96AD8"
                    style={{ marginTop: RFPercentage(3), marginBottom: 0 }}
                    backgroundColor="#E0E1E1"
                  >
                    {(yoni) => <Text style={{ color: "black" }}>{yoni}%</Text>}
                  </AnimatedCircularProgress>
                </View>
              </View>
            </Card>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default DetailMatching;
