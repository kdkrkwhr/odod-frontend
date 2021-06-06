import { useNavigation } from "@react-navigation/core";
import React, { useState, useEffect } from "react";
import { Button, StyleSheet, Text, View, Dimensions } from "react-native";
import MapView from "react-native-maps";
import Marker from "../components/util/map/Marker";
import * as Location from "expo-location";

import { MarkObject, useGPS } from "../components/map/useGPS";

type Props = {};

const Map = (props: Props) => {
  const navigation = useNavigation();
  const { marks, positionText, increateInterval, decreateInterval, region } =
    useGPS(3000);

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.tools}>
        <Button title="뒤로가기" onPress={goBack}></Button>
      </View>
      <MapView style={styles.map} initialRegion={region}>
        {marks.map((mark: MarkObject, index: number) => (
          <Marker key={index} coordinate={mark.coordinate} />
        ))}
      </MapView>
      <View style={styles.mapDescription}>
        <Text style={styles.descriptionText}>{positionText}</Text>
      </View>
      <View style={styles.gpsControl}>
        <Text style={styles.descriptionText}>{"gps control"}</Text>
        <View style={styles.controller}>
          <Button title="up" color="#0066ff" onPress={increateInterval} />
          <Button title="down" color="#0066ff" onPress={decreateInterval} />
        </View>
      </View>
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  tools: {
    flex: 1,
    width: Dimensions.get("window").width,
  },
  map: {
    flex: 6,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.6,
  },
  mapDescription: {
    flex: 1,
    width: Dimensions.get("window").width,
  },
  gpsControl: {
    flex: 2,
    width: Dimensions.get("window").width,
  },
  controller: {
    width: Dimensions.get("window").width,
  },
  descriptionText: {
    fontSize: 20,
    textAlign: "center",
  },
});
