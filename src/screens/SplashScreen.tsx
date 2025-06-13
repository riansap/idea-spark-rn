import React, {useEffect} from 'react';
import {StyleSheet, Image, SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import Responsive from '../utils/responsive';
import {colors, fonts, fontSize} from '../config/theme';
import {Images} from '../assets/images';
import {database} from '../services/DatabaseService';
import {useLoadingStore} from '../state/loadingStore';

export const SplashScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const {showLoading, hideLoading} = useLoadingStore();
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(50);

  useEffect(() => {
    scale.value = withSequence(
      withSpring(1.2, {
        damping: 12,
        stiffness: 80,
      }),
      withSpring(0.9, {
        damping: 12,
        stiffness: 80,
      }),
    );

    opacity.value = withTiming(1, {
      duration: 1200,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });

    translateY.value = withTiming(0, {
      duration: 1000,
      easing: Easing.out(Easing.cubic),
    });

    const initializeApp = async () => {
      try {
        await database.initialize();
        await new Promise(resolve => setTimeout(resolve, 2500));

        navigation.reset({
          index: 0,
          routes: [{name: 'Welcome'}],
        });
      } catch (error) {
        console.error('Initialization failed:', error);
        showLoading('Initialization database failed.');
      } finally {
        hideLoading();
      }
    };

    initializeApp();
  }, [navigation, scale, opacity, translateY, showLoading, hideLoading]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}, {translateY: translateY.value}],
    opacity: opacity.value,
  }));

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[animatedStyle, styles.logoContainer]}>
        <Image source={Images.Logo} style={styles.logo} resizeMode="contain" />
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Responsive.spacing(16),
  },
  logoContainer: {
    width: Responsive.w(100),
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  version: {
    position: 'absolute',
    bottom: Responsive.h(5),
    color: colors.textTertiary,
    fontSize: fontSize.xs,
    fontFamily: fonts.Medium,
  },
});
