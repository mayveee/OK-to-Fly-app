import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, Animated } from 'react-native';
import { MotiImage } from 'moti';
import { router } from 'expo-router';

export default function App() {
  
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/(tabs)/upload');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <ImageBackground
        source={require('@/assets/images/clouds-background.png')}
        style={styles.background}
        resizeMode="cover"
      >
      <View style={styles.container}>
        <MotiImage
          source={require('@/assets/images/airplane.png')}
          style={styles.icon}
          from={{ opacity: 0, translateY: -40 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 1000 }}
        />       
        <Text style={styles.title}>OK to Fly</Text>
      </View>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  icon: {
    width: 350,
    height: 350,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 10,
  }
});
