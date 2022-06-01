import React from "react";
import { View, Image, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Screens
import SplashScreen from "../screens/SplashScreen";
import Home from "../screens/Home";
import IntroScreen from "../screens/IntroScreen";
import FileBase64 from "./FileBase64";
import Settings from "../screens/Settings";
import Profile from "../screens/Profile";
import Live from "../screens/Live";
import ChatsAndCalls from "../screens/ChatsAndCalls";
import { RFPercentage } from "react-native-responsive-fontsize";
import Following from "../screens/Following";
import MoreSettings from "../screens/MoreSettings";
import Notifications from "../screens/Notifications";
import OrderHistory from "../screens/OrderHistory";
import Wallet from "../screens/Wallet";
import PaymentInformation from "../screens/PaymentInformation";
import ReferAndEarn from "../screens/ReferAndEarn";
import HelpAndSupport from "../screens/HelpAndSupport";
import EditProfile from "../screens/EditProfile";
import Feedback from "../screens/Feedback";
import Searching from "../screens/Searching";
import Blogs from "../screens/Blogs";
import TermsAndConditions from "../screens/TermsAndConditions";
import PrivacyPolicy from "../screens/PrivacyPolicy";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import Blog from "../screens/Blog";
import EmbbedPlayer from "./EmbbedPlayer";
import VideoCall from "../screens/VideoCall";
import CometChatUIView from "../screens/ChatUI";
import {
  CometChatUI,
  CometChatConversationListWithMessages,
  CometChatConversationList,
  CometChatGroupListWithMessages,
  CometChatMessages,
  CometChatUserList,
  CometChatGroupList,
  CometChatUserListWithMessages,
} from "../../CometChatWorkspace/src";

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Home" component={TabNavigator} />
        <Stack.Screen name="Searching" component={Searching} />
        <Stack.Screen name="IntroScreen" component={IntroScreen} />
        {/* <Stack.Screen name="Following" component={Following} /> */}
        <Stack.Screen name="Blogs" component={Blogs} />
        <Stack.Screen name="Blog" component={Blog} />
        <Stack.Screen name="EmbbedPlayer" component={EmbbedPlayer} />
        <Stack.Screen name="VideoCall" component={VideoCall} />
        <Stack.Screen name="MoreSettings" component={MoreSettings} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ChatUI" component={CometChatUIView} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="Notifications" component={Notifications} />
        <Stack.Screen name="OrderHistory" component={OrderHistory} />
        <Stack.Screen name="Wallet" component={Wallet} />
        <Stack.Screen
          name="PaymentInformation"
          component={PaymentInformation}
        />
        <Stack.Screen
          name="TermsAndConditions"
          component={TermsAndConditions}
        />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
        {/* <Stack.Screen name="ReferAndEarn" component={ReferAndEarn} /> */}
        <Stack.Screen name="HelpAndSupport" component={HelpAndSupport} />
        <Stack.Screen name="Feedback" component={Feedback} />

        <Stack.Screen name="CometChatUI" component={CometChatUI} />
        <Stack.Screen
          name="Conversation"
          component={CometChatConversationListWithMessages}
        />
        <Stack.Screen
          name="ConversationComponent"
          component={CometChatConversationList}
        />
        <Stack.Screen name="Group" component={CometChatGroupListWithMessages} />
        <Stack.Screen name="GroupComponent" component={CometChatGroupList} />
        <Stack.Screen name="Users" component={CometChatUserListWithMessages} />
        <Stack.Screen name="UsersComponent" component={CometChatUserList} />
        <Stack.Screen name="CometChatMessages" component={CometChatMessages} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          elevation: 0,
          height: RFPercentage(7),
          borderTopWidth: 0,
          backgroundColor: "white",
          paddingBottom: RFPercentage(1),
        },
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{ alignItems: "center", justifyContent: "center", top: 2 }}
            >
              <Image
                source={{ uri: FileBase64.homeTab }}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "blue" : "black",
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="ChatsAndCalls"
        component={ChatsAndCalls}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{ alignItems: "center", justifyContent: "center", top: 2 }}
            >
              <Image
                source={{ uri: FileBase64.chatsTab }}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "blue" : "black",
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Live"
        component={Live}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{ alignItems: "center", justifyContent: "center", top: 2 }}
            >
              <Image
                source={{ uri: FileBase64.liveTab }}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "blue" : "black",
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{ alignItems: "center", justifyContent: "center", top: 2 }}
            >
              <Image
                source={{ uri: FileBase64.profileTab }}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "blue" : "black",
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{ alignItems: "center", justifyContent: "center", top: 2 }}
            >
              <Image
                source={{ uri: FileBase64.settingsTab }}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "blue" : "black",
                }}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default StackNavigator;
