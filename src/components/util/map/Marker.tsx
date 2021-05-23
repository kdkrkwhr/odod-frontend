import React from 'react';
import { Marker as MarkerElement } from 'react-native-maps';
import { StyleSheet, View, Text, Image } from 'react-native';
import markerImage from '../../../assets/images/marker.png';

interface ICorrdinate {
  latitude: number;
  longitude: number;
}
interface IProps {
  coordinate: ICorrdinate;
  title?: string;
};

const Marker = ({ coordinate, title }: IProps) => {
  return (
    <MarkerElement
      coordinate={coordinate}
      image={markerImage}
    >
    </MarkerElement>
  );
};
export default Marker;