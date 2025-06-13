import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import {colors, textStyle} from '../config/theme';
import Responsive from '../utils/responsive';
import {Button} from '../components/atoms';
import {Images} from '../assets/images';
// Change this import
import {StackNavigationProps} from '../navigation/types';

// Update the props type
export const WelcomeScreen = ({
  navigation,
}: StackNavigationProps<'Welcome'>) => {
  const handleSignUp = () => {
    console.log('Sign up button pressed');
    navigation.navigate('SignUp');
  };

  const handleSignIn = () => {
    console.log('Sign in button pressed');
    navigation.navigate('SignIn');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <ImageBackground
          source={Images.Welcome}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.welcomeContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>
              Welcome to <Text style={styles.highlightText}>IdeaSpark</Text>
            </Text>
            <Text style={styles.subtitle}>
              Transform your ideas into reality with AI-powered task management
              and achieve your goals.
            </Text>
          </View>
          <View style={styles.buttonGroup}>
            <Button
              label="Sign In"
              size="medium"
              variant="primary"
              onPress={handleSignIn}
            />
            <Button
              label="Sign Up"
              size="medium"
              variant="secondary"
              onPress={handleSignUp}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  topContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  backgroundImage: {
    width: '100%',
    height: '80%',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    backgroundColor: 'transparent',
  },
  welcomeContainer: {
    backgroundColor: colors.white,
    padding: Responsive.spacing(24),
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: '100%',
    gap: Responsive.spacing(6),
    justifyContent: 'center',
  },
  title: {
    ...textStyle.h1,
    color: colors.textPrimary,
  },
  subtitle: {
    ...textStyle.body1,
    color: colors.textSecondary,
  },
  textContainer: {
    gap: Responsive.spacing(8),
  },
  highlightText: {
    color: colors.primary,
  },
  buttonGroup: {
    gap: Responsive.spacing(12),
    marginTop: Responsive.spacing(12),
  },
});
