import React from 'react';
import {StyleSheet} from 'react-native';
import {Ionicons} from '../../config/theme/icons';
import {colors} from '../../config/theme';
import Responsive from '../../utils/responsive';

type IconType = 'success' | 'error' | 'info' | 'warning';

interface IconContextProps {
  type: IconType;
  size?: number;
}

const getIconName = (type: IconType) => {
  switch (type) {
    case 'success':
      return 'checkmark-circle';
    case 'error':
      return 'alert-circle';
    case 'info':
      return 'information-circle';
    case 'warning':
      return 'warning';
  }
};

const getIconColor = (type: IconType) => {
  switch (type) {
    case 'success':
      return colors.success;
    case 'error':
      return colors.error;
    case 'info':
      return colors.info;
    case 'warning':
      return colors.warning;
  }
};

export const IconContext: React.FC<IconContextProps> = ({
  type,
  size = Responsive.fs(24),
}) => {
  return (
    <Ionicons
      name={getIconName(type)}
      size={size}
      color={getIconColor(type)}
      style={styles.icon}
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    marginBottom: Responsive.spacing(16),
  },
});
