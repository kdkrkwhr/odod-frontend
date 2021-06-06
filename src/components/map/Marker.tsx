import React from 'react';
import { Marker as MarkerElement } from 'react-native-maps';
import { StyleSheet, View, Text, Image } from 'react-native';
import markerImage from '../../assets/images/marker.png';

interface ICorrdinate {
  latitude: number;
  longitude: number;
}
interface IProps {
  coordinate: ICorrdinate;
  title?: string;
};

const round2 = (target: number) => Math.round(target * 100) / 100;

const Marker = ({ coordinate, title }: IProps) => {
  const onSelect = (event) => {
    console.log('marker selected');
  }
  return (
    <MarkerElement
      coordinate={coordinate}
      image={markerImage}
      title={`${round2(coordinate.latitude)}, ${round2(coordinate.longitude)}`}
      onSelect={onSelect}
    >
    </MarkerElement>
  );
};
export default Marker;