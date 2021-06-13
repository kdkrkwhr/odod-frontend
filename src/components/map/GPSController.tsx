import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

type Props = {
  increaseInterval: any,
  decreaseInterval: any,
};

const GPSController = ({
  increaseInterval, decreaseInterval
}: Props) => {
  return (
    <>
      <Text style={styles.descriptionText}>{"gps control"}</Text>
      <View style={styles.controller}>
        <Button title="up" color="#0066ff" onPress={increaseInterval} />
        <Button title="down" color="#0066ff" onPress={decreaseInterval} />
      </View>
    </>
  );
}

export default GPSController;

const styles = StyleSheet.create({
  descriptionText: {
    fontSize: 20,
    textAlign: "center",
  },
  controller: {
    width: '100%',
  },
});