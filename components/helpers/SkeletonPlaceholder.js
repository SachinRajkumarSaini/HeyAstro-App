import React from "react";
import { View } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { RFPercentage } from "react-native-responsive-fontsize";

export const HomeLatestPlaceholder = () => {
  return (
    <SkeletonPlaceholder
      highlightColor={"#b7b7b7"}
      backgroundColor={"#efedef"}
      speed={1000}
    >
      <View
        style={{
          borderRadius: RFPercentage(1),
          height: RFPercentage(20),
          margin: RFPercentage(2),
          width: RFPercentage(45),
        }}
      ></View>
    </SkeletonPlaceholder>
  );
};

export const HomeCarouselPlaceholder = () => {
  return (
    <SkeletonPlaceholder
      highlightColor={"#b7b7b7"}
      backgroundColor={"#efedef"}
      speed={1000}
    >
      <View
        style={{
          borderRadius: RFPercentage(1),
          height: RFPercentage(15),
          margin: RFPercentage(2),
          width: RFPercentage(40),
        }}
      ></View>
    </SkeletonPlaceholder>
  );
};

export const ProfileHoroscopePlaceholder = () => {
  return (
    <SkeletonPlaceholder
      highlightColor={"#b7b7b7"}
      backgroundColor={"#efedef"}
      speed={1000}
    >
      <View
        style={{
          borderRadius: RFPercentage(1),
          height: RFPercentage(15),
          margin: RFPercentage(2),
          width: RFPercentage(40),
        }}
      ></View>
    </SkeletonPlaceholder>
  );
};

export const ProfileHoroscopePredictionsPlaceholder = () => {
  return (
    <SkeletonPlaceholder
      highlightColor={"#b7b7b7"}
      backgroundColor={"#efedef"}
      speed={1000}
    >
      <View
        style={{
          borderRadius: RFPercentage(1),
          height: RFPercentage(25),
          margin: RFPercentage(2),
          width: RFPercentage(40),
        }}
      ></View>
    </SkeletonPlaceholder>
  );
};

export const ProfilePlaceholder = () => {
  return (
    <SkeletonPlaceholder
      highlightColor={"#b7b7b7"}
      backgroundColor={"#efedef"}
      speed={1000}
    >
      <View
        style={{
          borderRadius: RFPercentage(1),
          height: RFPercentage(12),
          width: RFPercentage(25),
        }}
      ></View>
    </SkeletonPlaceholder>
  );
};

export const ProfileImagePlaceholder = () => {
  return (
    <SkeletonPlaceholder
      highlightColor={"#b7b7b7"}
      backgroundColor={"#efedef"}
      speed={1000}
    >
      <View
        style={{
          height: RFPercentage(10),
          width: RFPercentage(10),
          borderRadius: RFPercentage(5),
        }}
      ></View>
    </SkeletonPlaceholder>
  );
};

export const WalletTransactionPlaceholder = () => {
  return (
    <SkeletonPlaceholder
      highlightColor={"#b7b7b7"}
      backgroundColor={"#efedef"}
      speed={1000}
    >
      <View
        style={{
          borderRadius: RFPercentage(1),
          height: RFPercentage(10),
          margin: RFPercentage(2),
          width: RFPercentage(45),
        }}
      />
      <View
        style={{
          borderRadius: RFPercentage(1),
          height: RFPercentage(10),
          margin: RFPercentage(2),
          width: RFPercentage(45),
        }}
      />
      <View
        style={{
          borderRadius: RFPercentage(1),
          height: RFPercentage(10),
          margin: RFPercentage(2),
          width: RFPercentage(45),
        }}
      />
      <View
        style={{
          borderRadius: RFPercentage(1),
          height: RFPercentage(10),
          margin: RFPercentage(2),
          width: RFPercentage(45),
        }}
      />
      <View
        style={{
          borderRadius: RFPercentage(1),
          height: RFPercentage(10),
          margin: RFPercentage(2),
          width: RFPercentage(45),
        }}
      />
    </SkeletonPlaceholder>
  );
};
