
import React from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; 

const CustomTabBarBackground = () => {
  return (
    <LinearGradient
      colors={['#5e2a84', '#da341b']}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={StyleSheet.absoluteFill}
    />
  );
};

export default CustomTabBarBackground;
