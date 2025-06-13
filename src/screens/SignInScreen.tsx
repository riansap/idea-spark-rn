import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {colors, fonts, textStyle} from '../config/theme';
import Responsive from '../utils/responsive';
import {Button, TextInput} from '../components/atoms';
import {StackNavigationProps} from '../navigation/types';
import {
  ForgotPasswordSheet,
  ForgotPasswordSheetRef,
} from '../components/molecules/ForgotPasswordSheet';
import {showToast} from '../components/atoms/Toast';
import {emojis} from '../config/theme/emojis';

const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

export const SignInScreen = ({navigation}: StackNavigationProps<'SignIn'>) => {
  const [loading, setLoading] = useState(false);
  const forgotPasswordRef = useRef<ForgotPasswordSheetRef>(null);

  const handleSignIn = async (values: {email: string; password: string}) => {
    try {
      setLoading(true);
      const userCredential = await auth().signInWithEmailAndPassword(
        values.email,
        values.password,
      );

      // In handleSignIn:
      await userCredential.user.getIdToken();
      showToast(
        'success',
        `Welcome back, ${userCredential.user.displayName}!`,
        `Successfully signed in to your account ${emojis.wave}`,
      );
      navigation.replace('MainTabs');
    } catch (error: any) {
      // ... error handling
      showToast('error', 'Sign In Failed', error.message);
      const errorMessage =
        error.code === 'auth/invalid-credential'
          ? 'Invalid email or password'
          : error.code === 'auth/invalid-email'
          ? 'Please enter a valid email address'
          : error.code === 'auth/user-disabled'
          ? 'This account has been disabled'
          : error.code === 'auth/user-not-found'
          ? 'Invalid email or password'
          : 'An error occurred during sign in';

      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Formik
        initialValues={{
          email: 'rianrrsaputra.business@gmail.com',
          password: 'test123',
        }}
        validationSchema={SignInSchema}
        onSubmit={handleSignIn}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={styles.content}>
            <View style={styles.header}>
              <Text style={styles.title}>Hello Again!</Text>
              <Text style={styles.subtitle}>
                Sign in to turn your creative thoughts into reality and boost
                your productivity.
              </Text>
            </View>

            <View style={styles.form}>
              <TextInput
                label="Email"
                placeholder="username@example.com"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                keyboardType="email-address"
                autoCapitalize="none"
                error={touched.email ? errors.email : undefined}
              />
              <TextInput
                label="Password"
                placeholder="••••••••"
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                variant="secure"
                error={touched.password ? errors.password : undefined}
              />
              <TouchableOpacity
                style={styles.forgotPassword}
                onPress={() => forgotPasswordRef.current?.show()}
                activeOpacity={0.7}>
                <Text style={styles.forgotPasswordText}>Forgot password?</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.buttons}>
              <Button
                label="Sign in"
                onPress={handleSubmit}
                disabled={loading}
                size="medium"
              />
            </View>

            <View style={styles.footer}>
              <View style={styles.signUpContainer}>
                <Text style={styles.footerText}>Don't have an account? </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('SignUp')}
                  activeOpacity={0.7}>
                  <Text style={styles.registerText}>Sign Up</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate('MainTabs')}
                activeOpacity={0.7}>
                <Text style={styles.skipText}>Continue without an account</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
      <ForgotPasswordSheet ref={forgotPasswordRef} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
    padding: Responsive.spacing(24),
    justifyContent: 'space-between',
  },
  header: {
    gap: Responsive.spacing(8),
  },
  title: {
    ...textStyle.h1,
    color: colors.textPrimary,
  },
  subtitle: {
    ...textStyle.body1,
    color: colors.textSecondary,
  },
  form: {
    gap: Responsive.spacing(8),
  },
  forgotPassword: {
    alignSelf: 'flex-end',
  },
  forgotPasswordText: {
    ...textStyle.body2,
    fontFamily: fonts.Medium,
    color: colors.primary,
  },
  buttons: {
    gap: Responsive.spacing(8),
  },
  footer: {
    gap: Responsive.spacing(8),
    alignItems: 'center',
  },
  signUpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  skipText: {
    ...textStyle.body2,
    color: colors.grey500,
    textDecorationLine: 'underline',
  },
  footerText: {
    ...textStyle.body2,
    color: colors.textSecondary,
  },
  registerText: {
    ...textStyle.body2,
    fontFamily: fonts.Medium,
    color: colors.primary,
  },
});
