import React, {useState} from 'react';
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {colors, textStyle} from '../../config/theme';
import {MaterialCommunityIcons} from '../../config/theme/icons';
import Responsive from '../../utils/responsive';

interface TextInputProps extends RNTextInputProps {
  label?: string;
  error?: string;
  variant?: 'default' | 'textarea' | 'secure';
}

export const TextInput: React.FC<TextInputProps> = ({
  label,
  error,
  variant = 'default',
  style,
  ...props
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputContainer}>
        <RNTextInput
          style={[
            styles.input,
            variant === 'textarea' && styles.textarea,
            variant === 'secure' && styles.secureInput,
            error && styles.inputError,
            style,
          ]}
          placeholderTextColor={colors.grey500}
          secureTextEntry={variant === 'secure' && !isPasswordVisible}
          {...props}
        />
        {variant === 'secure' && (
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
            <MaterialCommunityIcons
              name={isPasswordVisible ? 'eye-off' : 'eye'}
              size={24}
              color={colors.grey500}
            />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Responsive.spacing(15),
    width: '100%',
  },
  inputContainer: {
    position: 'relative',
    width: '100%',
  },
  label: {
    ...textStyle.body2,
    color: colors.textPrimary,
    marginBottom: Responsive.spacing(4),
  },
  input: {
    borderWidth: 1,
    borderColor: colors.grey300,
    borderRadius: Responsive.radius(8),
    padding: Responsive.spacing(12),
    backgroundColor: colors.grey50,
    color: colors.textPrimary,
    ...textStyle.body2,
  },
  secureInput: {
    paddingRight: Responsive.spacing(48), // Make room for the eye icon
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
    marginTop: Responsive.spacing(4),
    ...textStyle.caption,
  },
  eyeIcon: {
    position: 'absolute',
    right: Responsive.spacing(12),
    height: '100%',
    justifyContent: 'center',
  },
});
