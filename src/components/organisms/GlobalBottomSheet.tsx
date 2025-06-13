import React, {forwardRef, useImperativeHandle, useRef, useMemo} from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {BottomSheetModal, BottomSheetView} from '@gorhom/bottom-sheet';
import {Button, IconContext} from '../atoms';
import {colors, textStyle} from '../../config/theme';
import Responsive from '../../utils/responsive';
import {TouchableOpacity} from 'react-native';
import {MaterialCommunityIcons} from '../../config/theme/icons';

type BottomSheetType = 'success' | 'error' | 'info' | 'warning';

interface GlobalBottomSheetProps {
  type: BottomSheetType;
  title: string;
  message: string;
  primaryButton?: {
    label: string;
    onPress: () => void;
  };
  secondaryButton?: {
    label: string;
    onPress: () => void;
  };
}

export interface GlobalBottomSheetRef {
  show: () => void;
  hide: () => void;
}

export const GlobalBottomSheet = forwardRef<
  GlobalBottomSheetRef,
  GlobalBottomSheetProps
>(({type, title, message, primaryButton, secondaryButton}, ref) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['50%'], []);

  useImperativeHandle(ref, () => ({
    show: () => bottomSheetModalRef.current?.present(),
    hide: () => bottomSheetModalRef.current?.dismiss(),
  }));

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose
      backdropComponent={() => (
        <TouchableWithoutFeedback
          onPress={() => bottomSheetModalRef.current?.dismiss()}>
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
          <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
            {title}
          </Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => bottomSheetModalRef.current?.dismiss()}>
            <MaterialCommunityIcons
              name="close"
              size={24}
              color={colors.textSecondary}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.body}>
          <IconContext type={type} size={Responsive.fs(50)} />
          <Text style={styles.message} numberOfLines={3} ellipsizeMode="tail">
            {message}
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          {primaryButton && (
            <Button
              label={primaryButton.label}
              onPress={primaryButton.onPress}
              size="medium"
              style={styles.button}
            />
          )}
          {secondaryButton && (
            <Button
              label={secondaryButton.label}
              onPress={secondaryButton.onPress}
              variant="secondary"
              size="medium"
              style={styles.button}
            />
          )}
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  content: {
    padding: Responsive.spacing(24),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: Responsive.spacing(16),
  },
  closeButton: {
    position: 'absolute',
    right: 0,
    padding: Responsive.spacing(4),
  },
  body: {
    alignItems: 'center',
    gap: Responsive.spacing(16),
    marginBottom: Responsive.spacing(24),
  },
  title: {
    ...textStyle.h3,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  message: {
    ...textStyle.body2,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    marginBottom: Responsive.spacing(8),
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
