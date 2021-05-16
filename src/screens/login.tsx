import React from "react";
import { StyleSheet } from "react-native";
import Header from "../components/header/Header";
import { moderateScale, verticalScale, scale } from "../components/util/Screen";

type Props = {};

const Login = (props: Props) => {
  return (
    <>
      <Header title="LOGIN"></Header>
    </>
  );
};

export default Login;

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
