import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing } from 'react-native';
import { ProgressBar } from 'react-native-paper';

const LoadingSpinner = () => {
  console.log("render")
  const spinRef = useRef();
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    spinRef.current = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    spinRef.current.start();

    return () => {
      spinRef.current.stop();
    };
  }, []);  // add an empty dependency array here


  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Animated.Image
        source={require('../../../assets/logo.jpg')}
        style={{
          width: 100,
          height: 100,
          borderRadius: 50,
          transform: [{ rotate: spin }],
        }}
      />
    </View>
  );
};

export default LoadingSpinner;
