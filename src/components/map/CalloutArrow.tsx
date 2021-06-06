import React from 'react';
import { View, StyleSheet } from 'react-native';

const CalloutArrow = () => {
  return (
    <>
      <View style={styles.arrowBorder} />
      <View style={styles.arrow} />
    </>
  );
}

export default CalloutArrow;

const styles = StyleSheet.create({
  arrowBorder: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#ccc',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -0.5,
  },
  arrow: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#fff',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -32,
  }
});