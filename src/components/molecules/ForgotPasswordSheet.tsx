import React, {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Text,
  StyleSheet,
  Alert,
  Keyboard,
} from 'react-native';
import {BottomSheetModal, BottomSheetView} from '@gorhom/bottom-sheet';
import auth from '@react-native-firebase/auth';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {Button, TextInput} from '../atoms';
import {colors, textStyle} from '../../config/theme';
import Responsive from '../../utils/responsive';
import {TouchableOpacity} from 'react-native';
import {MaterialCommunityIcons} from '../../config/theme/icons';

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Email is required'),
});

export interface ForgotPasswordSheetRef {
  show: () => void;
  hide: () => void;
}

export const ForgotPasswordSheet = forwardRef<ForgotPasswordSheetRef>(
  (_, ref) => {
    const bottomSheetRef = useRef<BottomSheetModal>(null);
    const [loading, setLoading] = useState(false);

    useImperativeHandle(ref, () => ({
      show: () => {
        Keyboard.dismiss();
        bottomSheetRef.current?.present();
      },
      hide: () => bottomSheetRef.current?.dismiss(),
    }));

    const handleResetPassword = async (values: {email: string}) => {
      try {
        setLoading(true);
        await auth().sendPasswordResetEmail(values.email);
        Alert.alert(
          'Success',
          'Password reset email sent. Please check your inbox.',
          [{text: 'OK', onPress: () => bottomSheetRef.current?.dismiss()}],
        );
      } catch (error: any) {
        const errorMessage =
          error.code === 'auth/user-not-found'
            ? 'No account found with this email'
            : error.code === 'auth/invalid-email'
            ? 'Please enter a valid email address'
            : 'An error occurred. Please try again';

        Alert.alert('Error', errorMessage);
      } finally {
        setLoading(false);
      }
    };

    return (
      <BottomSheetModal
        ref={bottomSheetRef}
        index={0}
        snapPoints={['50%']}
        enablePanDownToClose
        backdropComponent={() => (
          <TouchableWithoutFeedback
            onPress={() => bottomSheetRef.current?.dismiss()}>
            <View
              style={[
                StyleSheet.absoluteFill,
                {
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                },
              ]}
            />
          </TouchableWithoutFeedback>
        )}
        backgroundStyle={styles.sheetBackground}
        handleIndicatorStyle={styles.indicator}>
        <BottomSheetView style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Reset Password</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => bottomSheetRef.current?.dismiss()}>
              <MaterialCommunityIcons
                name="close"
                size={24}
                color={colors.textSecondary}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.subtitle}>
            Enter your email address and we'll send you instructions to reset
            your password
          </Text>

          <Formik
            initialValues={{email: ''}}
            validationSchema={ForgotPasswordSchema}
            onSubmit={handleResetPassword}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
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
                <View style={styles.buttons}>
                  <Button
                    label="Send Reset Link"
                    onPress={handleSubmit}
                    disabled={loading}
                    size="medium"
                  />
                </View>
              </View>
            )}
          </Formik>
        </BottomSheetView>
      </BottomSheetModal>
    );
  },
);

const styles = StyleSheet.create({
  content: {
    padding: Responsive.spacing(24),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: Responsive.spacing(8),
  },
  closeButton: {
    position: 'absolute',
    right: 0,
    padding: Responsive.spacing(4),
  },
  title: {
    ...textStyle.h3,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  subtitle: {
    ...textStyle.body2,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: Responsive.spacing(12),
  },
  form: {
    gap: Responsive.spacing(4),
  },
  buttons: {
    gap: Responsive.spacing(8),
  },
  sheetBackground: {
    backgroundColor: colors.white,
    borderTopLeftRadius: Responsive.radius(20),
    borderTopRightRadius: Responsive.radius(20),
  },
  indicator: {
    backgroundColor: colors.grey400,
    width: Responsive.w(10),
  },
});
