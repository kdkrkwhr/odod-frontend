import React, { useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import Header from "../components/header/Header";
import { moderateScale, verticalScale, scale } from "../components/util/Screen";
import * as Google from "expo-google-app-auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { updateUserInfo } from "../reducer/UserInfoReducer";
import { authenticate, register } from "../service/auth/AuthService";

type Props = {};

const Login = (props: Props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    loginCheck();
  }, []);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     // Do something when the screen is focused
  //     loginCheck();
  //     return () => {
  //       // Do something when the screen is unfocused
  //     };
  //   }, [])
  // );

  const loginCheck = async () => {
    const token = await AsyncStorage.getItem("token");
    const email = await AsyncStorage.getItem("email");
    if (!token) return;
    const res = await authenticate(token, email);
    const isUser = res.data.userCheck;
    if (!isUser) return;

    dispatch(updateUserInfo({ token: token }));
    alert("자동 로그인 완료");
    navigation.navigate("Home");
  };

  const googleLogin = async () => {
    const result = await Google.logInAsync({
      //구글 클라우드에서 패키지이름을 host.exp.exponent로 해줘야 정상 작동
      androidClientId:
        "23029233287-f7rnvbmtaq9vncb554v5j7cp0438c14t.apps.googleusercontent.com",
      // iosClientId: YOUR_CLIENT_ID_HERE,
      scopes: ["profile", "email"],
    });

    if (result.type === "success") {
      //TODO : accessToken 받는 API 호출
      const data = {
        email: result.user.email,
        name: result.user.name,
        picture: result.user.photoUrl,
      };
      const res = await register(data);
      const token = res.data?.token ?? "";
      if (!token) {
        alert("로그인 실패");
        return;
      }
      dispatch(updateUserInfo({ token: token }));
      await AsyncStorage.setItem("token", token || "");
      await AsyncStorage.setItem("email", data.email || "");
      navigation.navigate("Home");
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
