import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {colors, fonts, fontSize} from '../../theme';
import Responsive from '../../../utils/responsive';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  variant = 'primary',
  size = 'medium',
  style,
  textStyle,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        styles[size],
        variant === 'secondary' && styles.secondaryButton,
        disabled && styles.disabledButton,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}>
      <Text
        style={[
          styles.buttonText,
          styles[`${size}Text`],
          variant === 'secondary' && styles.secondaryButtonText,
          disabled && styles.disabledButtonText,
          textStyle,
        ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: Responsive.radius(10),
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  small: {
    paddingVertical: Responsive.spacing(8),
    paddingHorizontal: Responsive.spacing(16),
  },
  medium: {
    paddingVertical: Responsive.spacing(12),
    paddingHorizontal: Responsive.spacing(24),
  },
  large: {
    paddingVertical: Responsive.spacing(16),
    paddingHorizontal: Responsive.spacing(32),
  },
  buttonText: {
    color: colors.white,
    fontFamily: fonts.Medium,
    textAlign: 'center',
  },
  smallText: {
    fontSize: fontSize.sm,
  },
  mediumText: {
    fontSize: fontSize.md,
  },
  largeText: {
    fontSize: fontSize.lg,
  },
  secondaryButton: {
    backgroundColor: colors.grey100,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  secondaryButtonText: {
    color: colors.primary,
  },
  disabledButton: {
    backgroundColor: colors.grey300,
    opacity: 0.7,
  },
  disabledButtonText: {
    color: colors.grey600,
  },
});
