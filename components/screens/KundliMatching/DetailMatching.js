import { View, Text, StatusBar, ScrollView } from "react-native";
import { Header, Card } from "react-native-elements";
import { RFPercentage } from "react-native-responsive-fontsize";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import React, { useState } from "react";

const DetailMatching = ({ navigation }) => {
  const [varna, setVarna] = useState(85);
  const [bhakut, setBhakut] = useState(76);
  const [maitri, setMaitri] = useState(21);
  const [nadi, setNadi] = useState(43);
  const [vashya, setVashya] = useState(65);
  const [tara, setTara] = useState(32);
  const [gana, setGana] = useState(56);
  const [yani, setYani] = useState(12);
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
              fill={80}
              rotation={270}
              arcSweepAngle={180}
              style={{ marginTop: RFPercentage(2) }}
              tintColor="#423b88"
              onAnimationComplete={() => console.log("onAnimationComplete")}
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
                23/36
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
                    Some Desptionsasasasa sasa sa sasa sa sa sasa
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
                    onAnimationComplete={() =>
                      console.log("onAnimationComplete")
                    }
                    backgroundColor="#E0E1E1"
                  >
                    {(varna) => (
                      <Text style={{ color: "black" }}>{varna}%</Text>
                    )}
                  </AnimatedCircularProgress>
                </View>
              </View>
            </Card>

            {/* Love (Bhakut) */}
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
                    Love (Bhakut)
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Ubuntu-Regular",
                      fontSize: RFPercentage(1.5),
                      color: "#808080",
                    }}
                  >
                    Some Desptionsasasasa sasa sa sasa sa sa sasa
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
                    fill={bhakut}
                    arcSweepAngle={360}
                    tintColor="#6FCE96"
                    style={{ marginTop: RFPercentage(3), marginBottom: 0 }}
                    onAnimationComplete={() =>
                      console.log("onAnimationComplete")
                    }
                    backgroundColor="#E0E1E1"
                  >
                    {(bhakut) => (
                      <Text style={{ color: "black" }}>{bhakut}%</Text>
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
                    Some Desptionsasasasa sasa sa sasa sa sa sasa
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
                    onAnimationComplete={() =>
                      console.log("onAnimationComplete")
                    }
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
                    Some Desptionsasasasa sasa sa sasa sa sa sasa
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
                    onAnimationComplete={() =>
                      console.log("onAnimationComplete")
                    }
                    backgroundColor="#E0E1E1"
                  >
                    {(nadi) => <Text style={{ color: "black" }}>{nadi}%</Text>}
                  </AnimatedCircularProgress>
                </View>
              </View>
            </Card>

            {/* Dominance (Vashya) */}
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
                    Dominance (Vashya)
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Ubuntu-Regular",
                      fontSize: RFPercentage(1.5),
                      color: "#808080",
                    }}
                  >
                    Some Desptionsasasasa sasa sa sasa sa sa sasa
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
                    fill={vashya}
                    arcSweepAngle={360}
                    tintColor="#FE83BB"
                    style={{ marginTop: RFPercentage(3), marginBottom: 0 }}
                    onAnimationComplete={() =>
                      console.log("onAnimationComplete")
                    }
                    backgroundColor="#E0E1E1"
                  >
                    {(vashya) => (
                      <Text style={{ color: "black" }}>{vashya}%</Text>
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
                    Some Desptionsasasasa sasa sa sasa sa sa sasa
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
                    onAnimationComplete={() =>
                      console.log("onAnimationComplete")
                    }
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
                    Some Desptionsasasasa sasa sa sasa sa sa sasa
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
                    onAnimationComplete={() =>
                      console.log("onAnimationComplete")
                    }
                    backgroundColor="#E0E1E1"
                  >
                    {(tara) => <Text style={{ color: "black" }}>{tara}%</Text>}
                  </AnimatedCircularProgress>
                </View>
              </View>
            </Card>

            {/* Physical Compatibility (Yani) */}
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
                    Physical Compatibility (Yani)
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Ubuntu-Regular",
                      fontSize: RFPercentage(1.5),
                      color: "#808080",
                    }}
                  >
                    Some Desptionsasasasa sasa sa sasa sa sa sasa
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
                    fill={yani}
                    arcSweepAngle={360}
                    tintColor="#B96AD8"
                    style={{ marginTop: RFPercentage(3), marginBottom: 0 }}
                    onAnimationComplete={() =>
                      console.log("onAnimationComplete")
                    }
                    backgroundColor="#E0E1E1"
                  >
                    {(yani) => <Text style={{ color: "black" }}>{yani}%</Text>}
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
