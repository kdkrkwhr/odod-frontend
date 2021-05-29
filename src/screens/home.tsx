import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/header/Header";
import { decrease, increase } from "../reducer/CounterReducer";
import { RootReducerType } from "../store/RootReducer";

type Props = {};

const Home = (props: Props) => {
  const counter = useSelector((state: RootReducerType) => state.counter);
  const dispatch = useDispatch();

  const navigation = useNavigation();

  return (
    <>
      <Header title="HOME"></Header>
      <View style={styles.container}>
        <Text>Home</Text>
        <Text>{counter.number}</Text>
        <Button title="증가" onPress={() => dispatch(increase())}></Button>
        <Button title="감소" onPress={() => dispatch(decrease())}></Button>
        <Button
          title="맵이동"
          onPress={() => navigation.navigate("Map")}
        ></Button>
      </View>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
