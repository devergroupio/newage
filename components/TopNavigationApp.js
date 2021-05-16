import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

// const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

export default () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text>Top Bar</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  navigate: {},
  logoNavigate: {
    width: 40,
    height: 40,
  },
});
