import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import Header from '../components/header/Header';

import { useGPS } from "../components/map/useGPS";
import MapDisplay from "../components/map/MapDisplay";
import GPSController from "../components/map/GPSController";

type Props = {};

const Map = (props: Props) => {
  const { marks, summarizedData, Interval, region } =
    useGPS();

  return (
    <>
      <Header title="MAP"></Header>
      <View style={styles.container}>
        <View style={styles.map}>
          <MapDisplay region={region} marks={marks} />
        </View>
        <View style={styles.mapDescription}>
          <Text style={styles.descriptionText}>{summarizedData}</Text>
        </View>
        <View style={styles.gpsController}>
          <GPSController
            increaseInterval={Interval.increase}
            decreaseInterval={Interval.decrease}
          />
        </View>
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
    flexDirection: "column",
  },
  map: {
    flex: 6,
    width: Dimensions.get("window").width,
  },
  mapDescription: {
    flex: 1,
    width: Dimensions.get("window").width,
  },
  gpsController: {
    flex: 2,
    width: Dimensions.get("window").width,
  },
  descriptionText: {
    fontSize: 20,
    textAlign: "center",
  },
});
