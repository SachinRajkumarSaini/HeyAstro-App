import React, { Fragment } from "react";
import { StatusBar, View } from "react-native";
import { CometChatUI } from "../../CometChatWorkspace/src/index";

export default function CometChatUIView() {
  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <CometChatUI />
    </Fragment>
  );
}
