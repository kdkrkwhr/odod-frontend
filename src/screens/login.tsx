import React, { useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import Header from "../components/header/Header";
import { moderateScale, verticalScale, scale } from "../components/util/Screen";
import * as Google from "expo-google-app-auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

type Props = {};

const Login = (props: Props) => {
  const navigation = useNavigation();

  useEffect(() => {
    loginCheck();
  }, []);

  const loginCheck = async () => {
    const token = await AsyncStorage.getItem("token");
    alert(token);
    if (token) {
      navigation.navigate("Home");
    }
  };

  const googleLogin = async () => {
    try {
      const result = await Google.logInAsync({
        //구글 클라우드에서 패키지이름을 host.exp.exponent로 해줘야 정상 작동
        androidClientId:
          "23029233287-f7rnvbmtaq9vncb554v5j7cp0438c14t.apps.googleusercontent.com",
        // iosClientId: YOUR_CLIENT_ID_HERE,
        scopes: ["profile", "email"],
      });
      console.log(result);
      if (result.type === "success") {
        await AsyncStorage.setItem("token", result.user.id || "");
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  };

  return (
    <>
      <Header title="LOGIN"></Header>
      <Text onPress={() => googleLogin()}>구글로그인</Text>
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
