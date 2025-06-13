import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  BackHandler,
  ScrollView,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {colors, fonts, textStyle} from '../config/theme';
import Responsive from '../utils/responsive';
import {Button, TextInput} from '../components/atoms';
import {StackNavigationProps} from '../navigation/types';
import {useFocusEffect} from '@react-navigation/native';
import {GlobalBottomSheet, GlobalBottomSheetRef} from '../components/organisms';

const SignUpSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
});

export const SignUpScreen = ({navigation}: StackNavigationProps<'SignUp'>) => {
  const [loading, setLoading] = useState(false);
  const bottomSheetRef = useRef<GlobalBottomSheetRef>(null);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.replace('SignIn');
        return true;
      };

      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress,
      );

      return () => subscription.remove();
    }, [navigation]),
  );

  const handleSignUp = async (values: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      setLoading(true);
      const userCredential = await auth().createUserWithEmailAndPassword(
        values.email,
        values.password,
      );
      await userCredential.user.updateProfile({
        displayName: values.name,
      });
      bottomSheetRef.current?.show();
    } catch (error: any) {
      console.error(error);
      const errorMessage =
        error.code === 'auth/email-already-in-use'
          ? 'This email is already registered'
          : error.code === 'auth/invalid-email'
          ? 'Please enter a valid email address'
          : error.code === 'auth/weak-password'
          ? 'Password is too weak'
          : 'An error occurred during sign up';

      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={SignUpSchema}
          onSubmit={handleSignUp}>
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
                <Text style={styles.title}>Sign Up</Text>
                <Text style={styles.subtitle}>
                  Join IdeaSpark and start bringing your creative ideas to life.
                </Text>
              </View>

              <View style={styles.form}>
                <TextInput
                  label="Full Name"
                  placeholder="John Doe"
                  value={values.name}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  autoCapitalize="words"
                  error={touched.name ? errors.name : undefined}
                />
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
                <TextInput
                  label="Confirm Password"
                  placeholder="••••••••"
                  value={values.confirmPassword}
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  variant="secure"
                  error={
                    touched.confirmPassword ? errors.confirmPassword : undefined
                  }
                />
              </View>

              <View style={styles.buttons}>
                <Button
                  label="Sign Up"
                  onPress={handleSubmit}
                  disabled={loading}
                  size="medium"
                />
              </View>

              <View style={styles.footer}>
                <View style={styles.signInContainer}>
                  <Text style={styles.footerText}>
                    Already have an account?{' '}
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('SignIn')}
                    activeOpacity={0.7}>
                    <Text style={styles.signInText}>Sign in</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={() => navigation.navigate('MainTabs')}
                  activeOpacity={0.7}>
                  <Text style={styles.skipText}>
                    Continue without an account
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
      <GlobalBottomSheet
        ref={bottomSheetRef}
        type="success"
        title="Account Created Successfully!"
        message="Your account has been created successfully."
        primaryButton={{
          label: 'Go to Sign In',
          onPress: () => {
            bottomSheetRef.current?.hide();
            navigation.navigate('SignIn');
          },
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollContent: {
    flexGrow: 1,
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
    marginVertical: Responsive.spacing(8),
  },
  buttons: {
    gap: Responsive.spacing(8),
  },
  footer: {
    marginTop: Responsive.spacing(8),
    gap: Responsive.spacing(8),
    alignItems: 'center',
  },
  signInContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerText: {
    ...textStyle.body2,
    color: colors.textSecondary,
  },
  signInText: {
    ...textStyle.body2,
    fontFamily: fonts.Medium,
    color: colors.primary,
  },
  skipText: {
    ...textStyle.body2,
    color: colors.grey500,
    textDecorationLine: 'underline',
  },
});
