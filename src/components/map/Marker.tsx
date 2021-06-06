import React from 'react';
import { Marker as MarkerElement } from 'react-native-maps';
import { StyleSheet, View, Text, Image } from 'react-native';
import markerImage from '../../assets/images/marker.png';

interface ICoordinate {
  latitude: number;
  longitude: number;
}
interface IProps {
  mark: {
    coordinate: ICoordinate;
    title: string;
    description: string;
  }
};

const round2 = (target: number) => Math.round(target * 100) / 100;

const Marker = ({ mark }: IProps) => {
  const onSelect = (event) => {
    console.log('marker selected');
  }
  return (
    <MarkerElement
      coordinate={mark.coordinate}
      image={markerImage}
      title={mark.title}
      description={mark.description}
      onSelect={onSelect}
    >
    </MarkerElement>
  );
};
export default Marker;