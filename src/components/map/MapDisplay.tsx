import React from 'react';
import { StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import { MarkObject } from './useGPS';
import Marker from './Marker';

type Props = {
  region: any,
  marks: any
};

const MapDisplay = (props: Props) => {
  return (
    <MapView style={styles.map} initialRegion={props.region}>
      {props.marks.map((mark: MarkObject, index: number) => (
        <Marker key={index} coordinate={mark.coordinate} />
      ))}
    </MapView>
  );
}

export default MapDisplay;

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  }
});