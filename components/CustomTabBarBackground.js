import React from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

const CustomTabBarBackground = () => {
  return (
    <View style={StyleSheet.absoluteFill}>
      <LinearGradient
        colors={['#5e2a84', '#da341b']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <BlurView
        intensity={20} // Ajuste la force du flou
        tint="dark"  // Peut être 'light', 'dark', ou 'default'
        style={StyleSheet.absoluteFill}
      />
    </View>
  );
};

export default CustomTabBarBackground;
