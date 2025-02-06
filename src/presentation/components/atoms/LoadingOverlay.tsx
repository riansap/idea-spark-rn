import React from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
  Modal,
  StatusBar,
} from 'react-native';
import {useLoadingStore} from '../../stores/loadingStore';
import {colors, fonts, fontSize} from '../../theme';
import Responsive from '../../../utils/responsive';

export const LoadingOverlay: React.FC = () => {
  const {isVisible, message} = useLoadingStore();

  return (
    <Modal transparent visible={isVisible} animationType="fade">
      <StatusBar
        backgroundColor={colors.black + '4D'} // 30% opacity
        barStyle="light-content"
      />
      <View style={styles.container}>
        <View style={styles.content}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.text}>{message}</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black + '4D', // 30% opacity
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: colors.white,
    padding: Responsive.spacing(24),
    borderRadius: Responsive.radius(12),
    alignItems: 'center',
    minWidth: Responsive.w(30),
  },
  text: {
    marginTop: Responsive.spacing(12),
    fontSize: fontSize.sm,
    color: colors.textPrimary,
    fontFamily: fonts.Medium,
  },
});
