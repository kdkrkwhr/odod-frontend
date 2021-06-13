import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Theme from '../util/Theme';

type Props = {
  size: {
    width: number,
    height: number
  }
};

const GoBackButton = ({ size }: Props) => {
  const navigation = useNavigation();
  const goBack = () => {
    if (navigation.canGoBack())
      navigation.goBack();
  }

  return (
    <View onTouchStart = {goBack}>
      <Image
        style={size}
        source={Theme.ic_back}
      />
    </View>
  );
}

export default GoBackButton;