import {
  View,
  Text,
  StatusBar,
  Alert,
  ScrollView,
  ToastAndroid,
} from "react-native";
import React, { useState, useEffect } from "react";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Header, Card } from "react-native-elements";
import { FetchAPI } from "../helpers/FetchInstance";
import Markdown from "react-native-markdown-display";

const TermsAndConditions = ({ navigation }) => {
  const [termsAndConditions, setTermsAndConditions] = useState();
  const fetchTermsAndConditions = async () => {
    try {
      const getTermsAndConditions = await FetchAPI({
        query: `
                    query{
                        setting{
                            data{
                                attributes{
                                    TermsandConditions
                                }
                            }
                        }
                    }
            `,
      });
      setTermsAndConditions(
        getTermsAndConditions.data.setting.data.attributes.TermsandConditions
      );
    } catch (error) {
      ToastAndroid.show(
        "Some error occured, Please try again later",
        ToastAndroid.SHORT
      );
    }
  };
  useEffect(() => {
    fetchTermsAndConditions();
  }, []);
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
          text: "Terms And Conditions",
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
      <ScrollView
        style={{ paddingHorizontal: RFPercentage(1) }}
        showsVerticalScrollIndicator={true}
      >
        {termsAndConditions && (
          <Markdown
            style={{
              body: { color: "black" },
            }}
          >{`${termsAndConditions}`}</Markdown>
        )}
      </ScrollView>
    </View>
  );
};

export default TermsAndConditions;
