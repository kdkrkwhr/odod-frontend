import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { moderateScale, scale, verticalScale } from "../util/Screen";
import Theme from "../util/Theme";

type Props = {
  title: string;
};

const Header = ({ title }: Props) => {
  return (
    <>
      <View style={styles.header}>
        <Image style={styles.backBtn} source={Theme.ic_back} />
        <Text style={styles.title}>{title}</Text>
        <Image style={styles.gnbBtn} source={Theme.ic_gnb} />
      </View>
    </>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    backgroundColor: "black",
    width: scale(375),
    height: verticalScale(50),

    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: moderateScale(10),
  },
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: scale(35),
  },
  backBtn: {
    width: scale(17),
    height: scale(30),
  },
  gnbBtn: {
    width: scale(30),
    height: scale(27),
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
