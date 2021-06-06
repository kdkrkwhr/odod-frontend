import React from 'react';
import { Marker as MarkerElement, Callout } from 'react-native-maps';
import { StyleSheet, View, Text, Image } from 'react-native';
import markerImage from '../../assets/images/marker.png';
import roadImage0 from '../../assets/images/road/00.jpeg';
import roadImage1 from '../../assets/images/road/01.jpeg';
import roadImage2 from '../../assets/images/road/02.jpeg';
import roadImage3 from '../../assets/images/road/03.jpeg';
import roadImage4 from '../../assets/images/road/04.jpeg';
import CalloutArrow from './CalloutArrow';

const roadImageList = [
  roadImage0, roadImage1, roadImage2, roadImage3, roadImage4
];

interface ICoordinate {
  latitude: number;
  longitude: number;
}
interface IProps {
  mark: {
    coordinate: ICoordinate;
    title: string;
    description: string;
  };
  index: number;
};

const round2 = (target: number) => Math.round(target * 100) / 100;

const Marker = ({ mark, index }: IProps) => {
  const onSelect = (event) => {
    console.log('marker selected');
  }
  return (
    <MarkerElement
      coordinate={mark.coordinate}
      image={markerImage}
      onSelect={onSelect}
    >
      <Callout tooltip>
        <View>
          <View style={styles.bubble}>
            <Text style={styles.name}>{'Image no.' + mark.title}</Text>
            <Image
              style={styles.image}
              source={roadImageList[index%5]}
            />
          </View>
          <CalloutArrow />
        </View>
      </Callout>
    </MarkerElement>
  );
};
export default Marker;

const styles = StyleSheet.create({
  bubble: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 6,
    borderColor: '#ccc',
    borderWidth: 0.5,
    padding: 15,
    width: 150,
  },
  name: {
    fontSize: 16,
    marginBottom: 5,
  },
  image: {
    width: 120,
    height: 80
  },
});