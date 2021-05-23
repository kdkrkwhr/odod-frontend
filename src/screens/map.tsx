import { useNavigation } from "@react-navigation/core";
import React, { useState, useEffect } from "react";
import { Button, StyleSheet, Text, View, Dimensions } from "react-native";
import MapView from 'react-native-maps';
import Marker from '../components/util/map/Marker';
import * as Location from 'expo-location';

type Props = {};

let _updateInterval = 3000;

const Map = (props: Props) => {
  const navigation = useNavigation();
  const [updateInterval, setUpdateInterval] = useState<number>(_updateInterval);
  const [region, setRegion] = useState<any>(undefined);
  const [positionText, setPositionText] = useState<string>('Waiting...');
  const [marks, setMarks] = useState<any>({});
  const markList: Array<any> = [];

  //methods///////////////////////////////////////////////////////////////
  const goBack = () => {
    navigation.goBack();
  }

  const increateInterval = () => {
    setUpdateInterval(updateInterval + 500);
    updatePositionText();
  }

  const decreateInterval = () => {
    setUpdateInterval(Math.max(updateInterval - 500, 500));
    updatePositionText();
  }

  const updateLocation = async () => {
    const { coords: { latitude, longitude } } = await getLocation();
    focusCurrentPosition(latitude, longitude);
    updatePositionData(latitude, longitude);
    console.log(latitude, longitude, _updateInterval);
    setTimeout(updateLocation, _updateInterval);
  };

  const getLocation = async () => await Location.getCurrentPositionAsync({ accuracy: 6 });

  const focusCurrentPosition = (latitude: number, longitude: number) => {
    setRegion({
      latitude, longitude,
      latitudeDelta: 0.001 * 10,
      longitudeDelta: 0.0008 * 10,
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
    updatePositionText();
  }

  const updatePositionText = () => {
    if (!markList.length) return;
    console.log(
      `count: ${markList.length}  ` +
      `interval: ${_updateInterval / 1000} sec\n` +
      `latitude: ${Math.round(markList[markList.length - 1].coordinate.latitude * 100) / 100}  ` +
      `longitude: ${Math.round(markList[markList.length - 1].coordinate.longitude * 100) / 100}`
    )
    setPositionText(
      `count: ${markList.length}  ` +
      `interval: ${_updateInterval / 1000} sec\n` +
      `latitude: ${Math.round(markList[markList.length-1].coordinate.latitude * 100) / 100}  ` +
      `longitude: ${Math.round(markList[markList.length - 1].coordinate.longitude * 100) / 100}`
    );
  }

  //run////////////////////////////////////////////////////////////
  //initialize
  useEffect(() => {(async () => {
    const permission = await Location.requestForegroundPermissionsAsync();
    if (!permission || permission.status !== 'granted') {
      setPositionText('Permission denied.');
      return;
    }
    updateLocation();
  })(); }, []);
  //updateInterval update event
  useEffect(() => {
    _updateInterval = updateInterval;
  }, [updateInterval]);

  //module////////////////////////////////////////////////////////////////
  return (
    <View style={styles.container}>
      <View style={styles.tools}>
        <Button title="뒤로가기" onPress={goBack}></Button>
      </View>
      <MapView style={styles.map} initialRegion={region}>{
        Object.entries(marks).map(([key, mark]: any[]) => (
          <Marker
            key={key}
            coordinate={mark.coordinate}
          />
        ))
      }</MapView>
      <View style={styles.mapDescription}>
        <Text style={styles.descriptionText}>{positionText}</Text>
      </View>
      <View style={styles.gpsControl}>
        <Text style={styles.descriptionText}>{'gps control'}</Text>
        <View style={styles.controller}>
          <Button title='up' color='#0066ff' onPress={increateInterval} />
          <Button title='down' color='#0066ff' onPress={decreateInterval} />
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
    flex: 1,
    width: Dimensions.get('window').width,
  },
  gpsControl: {
    flex: 2,
    width: Dimensions.get('window').width,
  },
  controller: {
    width: Dimensions.get('window').width,
  },
  descriptionText: {
    fontSize: 20,
    textAlign: 'center',
  }
});
