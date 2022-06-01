import {
  View,
  Text,
  StatusBar,
  ScrollView,
  ToastAndroid,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Header, Card, SearchBar, Image } from "react-native-elements";
import FileBase64 from "../helpers/FileBase64";
import { FetchAPI } from "../helpers/FetchInstance";

const Blogs = ({ navigation }) => {
  const [search, setSearch] = React.useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      setIsLoading(true);
      setBlogs([]);
      const getBlogs = await FetchAPI({
        query: `
                query{
                    blogs{
                    data{
                        id,
                        attributes{
                            Title,
                            CoverImage{
                                data{
                                attributes{
                                    url
                                }
                                }
                            },
                            createdAt
                        }
                    }
                    }
                }
            `,
      });
      setBlogs(getBlogs.data.blogs.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      ToastAndroid.show(
        "Something went wrong, Please try again later!",
        ToastAndroid.SHORT
      );
    }
  };

  const searchBlog = async () => {
    try {
      setIsLoading(true);
      setBlogs([]);
      const getSearchBlog = await FetchAPI({
        query: `
                    query{
                        blogs(filters:{Title:{containsi:${JSON.stringify(
                          search
                        )}}}){
                            data{
                                id,
                                attributes{
                                    Title,
                                    CoverImage{
                                        data{
                                        attributes{
                                            url
                                        }
                                        }
                                    },
                                    createdAt
                                }
                            }
                        }
                    }
              `,
      });
      setBlogs(getSearchBlog.data.blogs.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      ToastAndroid.show(
        "Something went wrong, Please try again later!",
        ToastAndroid.SHORT
      );
    }
  };

  useEffect(() => {
    fetchBlogs();
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
          text: "Blogs",
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

      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          {/* Search Bar */}
          <View style={{ marginTop: RFPercentage(1) }}>
            <SearchBar
              onChangeText={(e) => setSearch(e)}
              returnKeyType="search"
              onEndEditing={searchBlog}
              onClear={() => {
                setSearch("");
                fetchBlogs();
              }}
              value={search}
              inputContainerStyle={{
                backgroundColor: "white",
                height: RFPercentage(4),
              }}
              containerStyle={{
                backgroundColor: "white",
                borderRadius: RFPercentage(1),
                margin: RFPercentage(1),
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.8,
                shadowRadius: 2,
                elevation: 5,
                borderBottomColor: "transparent",
                borderTopColor: "transparent",
                marginHorizontal: RFPercentage(2),
              }}
              inputStyle={{
                color: "black",
                fontFamily: "Ubuntu-Regular",
                fontSize: RFPercentage(1.8),
              }}
              placeholder="Search Blogs..."
            />
          </View>
          {isLoading && (
            <ActivityIndicator
              style={{ marginVertical: RFPercentage(1) }}
              size={RFPercentage(5)}
              color={"#423b88"}
            />
          )}
          {/* Blogs */}
          <View style={{ paddingBottom: RFPercentage(3) }}>
            {blogs &&
              blogs.map((blog, index) => {
                const date = new Date(blog.attributes.createdAt);
                return (
                  <TouchableOpacity
                    activeOpacity={0.9}
                    key={index}
                    onPress={() =>
                      navigation.navigate("Blog", {
                        blogId: blog.id,
                      })
                    }
                  >
                    <Card
                      containerStyle={{
                        borderRadius: RFPercentage(1),
                        height: RFPercentage(21.5),
                      }}
                    >
                      <Image
                        style={{
                          height: RFPercentage(10),
                          width: "100%",
                          borderRadius: RFPercentage(1),
                        }}
                        source={{
                          uri: blog.attributes.CoverImage.data.attributes.url,
                        }}
                      />
                      <Text
                        numberOfLines={2}
                        ellipsizeMode="tail"
                        style={{
                          fontFamily: "Ubuntu-Regular",
                          color: "black",
                          marginTop: RFPercentage(1),
                        }}
                      >
                        {blog.attributes.Title}
                      </Text>
                      <Text
                        style={{
                          color: "#818181",
                          fontFamily: "Ubuntu-Regular",
                          textAlign: "right",
                          marginTop: RFPercentage(0.5),
                        }}
                      >
                        Date :- {date.toDateString()}
                      </Text>
                    </Card>
                  </TouchableOpacity>
                );
              })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Blogs;
