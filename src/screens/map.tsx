import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {};

const Map = (props: Props) => {
  return (
    <>
      <View style={styles.container}>
        <Text>Map</Text>
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
