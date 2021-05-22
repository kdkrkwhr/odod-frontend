import { useNavigation } from "@react-navigation/core";
import React, { useState, useEffect } from "react";
import { Button, StyleSheet, Text, View, Dimensions } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

type Props = {};

const updateInterval = 3000;

const Map = (props: Props) => {
  const navigation = useNavigation();
  const [region, setRegion] = useState<any>(undefined);
  const [positionText, setPositionText] = useState<string>('Waiting...');
  const [marks, setMarks] = useState<any>({});
  const markList: Array<any> = [];

  //methods///////////////////////////////////////////////////////////////
  const goBack = () => {
    navigation.goBack();
  }

  const updateLocation = async () => {
    const { coords: { latitude, longitude } } = await getLocation();
    focusCurrentPosition(latitude, longitude);
    updatePositionData(latitude, longitude);
    console.log(latitude, longitude);
    setTimeout(updateLocation, updateInterval);
  };

  const getLocation = async () => await Location.getCurrentPositionAsync({ accuracy: 6 });

  const focusCurrentPosition = (latitude: number, longitude: number) => {
    setRegion({
      latitude, longitude,
      latitudeDelta: 0.001,
      longitudeDelta: 0.0008,
    });
  }

  const updatePositionData = (latitude: number, longitude: number) => {
    markList.push({
      coordinate: { latitude, longitude },
      title: String(markList.length),
      description: String(markList.length)
    });
    const marksObject: any = Object.assign({}, markList);
    setMarks(marksObject);
    setPositionText(
      `count: ${markList.length}\n` +
      `latitude: ${latitude}\n` +
      `longitude: ${longitude}`
    );
  }

  //initialize////////////////////////////////////////////////////////////
  useEffect(() => { (async () => {
    const permission = await Location.requestForegroundPermissionsAsync();
    if (!permission || permission.status !== 'granted') {
      setPositionText('Permission denied.');
      return;
    }
    updateLocation();
  })(); }, []);
  //module////////////////////////////////////////////////////////////////
  return (
    <View style={styles.container}>
      <View style={styles.tools}>
        <Button title="뒤로가기" onPress={() => navigation.goBack()}></Button>
      </View>
      <MapView style={styles.map} initialRegion={region}>{
        Object.entries(marks).map(([key, mark]: any[]) => (
          <Marker
            key={key}
            coordinate={mark.coordinate}
            title={mark.title}
          />
        ))
      }</MapView>
      <View style={styles.mapDescription}>
        <Text style={styles.descriptionText}>{positionText}</Text>
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
    flexDirection: 'column',
  },
  tools: {
    flex: 1,
    width: Dimensions.get('window').width,
  },
  map: {
    flex: 6,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.6,
  },
  mapDescription: {
    flex: 3,
    width: Dimensions.get('window').width,
  },
  descriptionText: {
    fontSize: 20,
    textAlign: 'center',
  }
});
