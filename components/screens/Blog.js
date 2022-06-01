import {
  View,
  Text,
  StatusBar,
  Alert,
  ScrollView,
  ToastAndroid,
  SafeAreaView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Header, Card } from "react-native-elements";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useRoute } from "@react-navigation/native";
import { Image } from "@rneui/themed";
import { FetchAPI } from "../helpers/FetchInstance";
import Markdown from "react-native-markdown-display";
import FileBase64 from "../helpers/FileBase64";

const Blog = ({ route, navigation }) => {
  const [blogData, setBlogData] = useState({
    title: "",
    createdAt: new Date(),
    coverImage: "",
    content: "",
  });
  const fetchBlog = async () => {
    try {
      const { blogId } = route.params;
      const getBlog = await FetchAPI({
        query: `
                query{
                    blog(id:${JSON.stringify(blogId)}){
                    data{
                        attributes{
                            Title
                            createdAt
                            CoverImage{
                                data{
                                    attributes{
                                        url
                                    }
                                }
                            },
                            Content
                        }
                    }
                    }
                }
        `,
      });
      let date = new Date(getBlog.data.blog.data.attributes.createdAt);
      setBlogData({
        title: getBlog.data.blog.data.attributes.Title,
        createdAt: date,
        coverImage:
          getBlog.data.blog.data.attributes.CoverImage.data.attributes.url,
        content: getBlog.data.blog.data.attributes.Content,
      });
    } catch (error) {
      ToastAndroid.show(
        "Some error occured, Please try again later",
        ToastAndroid.SHORT
      );
      console.log(error);
    }
  };
  useEffect(() => {
    fetchBlog();
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
          backgroundColor: "#423b88",
          paddingVertical: 6,
          borderBottomWidth: 0,
        }}
        centerComponent={{
          text: "Blog",
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
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        style={{ height: "100%", flex: 1 }}
      >
        <View style={{ flex: 1, padding: RFPercentage(1.5) }}>
          <View>
            <Text
              style={{
                fontSize: RFPercentage(4.5),
                color: "black",
                fontFamily: "Dongle-Regular",
              }}
            >
              {blogData.title}
            </Text>
          </View>
          {blogData.coverImage ? (
            <View style={{ marginTop: RFPercentage(1) }}>
              <Image
                source={{
                  uri: blogData.coverImage,
                }}
                containerStyle={{
                  height: RFPercentage(20),
                  width: "100%",
                  borderRadius: RFPercentage(1),
                }}
              />
            </View>
          ) : null}
          <View style={{ marginTop: RFPercentage(2) }}>
            <Markdown
              style={{
                body: { color: "black" },
              }}
            >{`${blogData.content}`}</Markdown>
          </View>
          <View>
            <Text
              style={{
                fontSize: RFPercentage(2.5),
                color: "black",
                fontFamily: "Dongle-Regular",
                marginTop: RFPercentage(2),
              }}
            >
              Published Date:- {blogData.createdAt.toDateString()}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Blog;
