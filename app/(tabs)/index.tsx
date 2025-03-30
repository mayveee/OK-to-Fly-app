import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image } from 'react-native';
import { MotiImage } from 'moti';
import { useFocusEffect } from 'expo-router';

export default function App() {
  const [show, setShow] = useState(false);

  // animation on focus scene
  useFocusEffect(
    useCallback(() => {
      setShow(false);
      setTimeout(() => setShow(true), 10)
    }, [])
  )
  return (
    <>
      <ImageBackground
        source={require('@/assets/images/clouds-background.png')}
        style={styles.background}
        resizeMode="cover"
      >
      <View style={styles.container}>
        {show && (
          <MotiImage
          source={require('@/assets/images/airplane.png')}
          style={styles.icon}
          from={{ opacity: 0, translateY: -40 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 1000 }}
          />
        )}        
        <Text style={styles.title}>OK to Fly</Text>
        <Text style={styles.description}>
          기내 반입 금지 물품인지 사진으로 간편하게 확인하세요.
        </Text>
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
  },
  description: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
  },
});
