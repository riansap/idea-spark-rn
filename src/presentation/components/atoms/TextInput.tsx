import React from 'react';
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import {colors, fonts, fontSize} from '../../theme';
import Responsive from '../../../utils/responsive';

interface TextInputProps extends RNTextInputProps {
  label?: string;
  error?: string;
  variant?: 'default' | 'textarea';
}

export const TextInput: React.FC<TextInputProps> = ({
  label,
  error,
  variant = 'default',
  style,
  ...props
}) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <RNTextInput
        style={[
          styles.input,
          variant === 'textarea' && styles.textarea,
          error && styles.inputError,
          style,
        ]}
        placeholderTextColor={colors.grey500}
        {...props}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Responsive.spacing(15),
    width: '100%',
  },
  label: {
    fontSize: fontSize.sm,
    color: colors.textPrimary,
    marginBottom: Responsive.spacing(8),
    fontFamily: fonts.Medium,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.grey300,
    borderRadius: Responsive.radius(8),
    padding: Responsive.spacing(12),
    fontSize: fontSize.sm,
    backgroundColor: colors.grey100,
    color: colors.textPrimary,
    fontFamily: fonts.Regular,
  },
  textarea: {
    height: Responsive.h(12),
    textAlignVertical: 'top',
  },
  inputError: {
    borderColor: colors.error,
  },
  errorText: {
    color: colors.error,
    fontSize: fontSize.xs,
    marginTop: Responsive.spacing(4),
    fontFamily: fonts.Regular,
  },
});
