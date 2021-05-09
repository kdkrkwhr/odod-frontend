import { useNavigation } from "@react-navigation/core";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

type Props = {};

const Map = (props: Props) => {
  const navigation = useNavigation();
  return (
    <>
      <View style={styles.container}>
        <Text>Map</Text>
        <Button title="뒤로가기" onPress={() => navigation.goBack()}></Button>
      </View>
    </>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
