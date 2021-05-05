import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {};

const Home = (props: Props) => {
  const test = "";

  return (
    <>
      <View style={styles.container}>
        <Text>Home</Text>
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
