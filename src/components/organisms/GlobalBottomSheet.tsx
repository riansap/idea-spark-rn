import React, {forwardRef, useImperativeHandle, useRef, useMemo} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {BottomSheetModal, BottomSheetView} from '@gorhom/bottom-sheet';
import {Button, IconContext} from '../atoms';
import {colors, fonts, fontSize} from '../../config/theme';
import Responsive from '../../utils/responsive';

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
      backgroundStyle={styles.bottomSheetBackground}
      handleIndicatorStyle={styles.bottomSheetIndicator}>
      <BottomSheetView style={styles.content}>
        <IconContext type={type} size={Responsive.fs(50)} />
        <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
          {title}
        </Text>
        <Text style={styles.message} numberOfLines={3} ellipsizeMode="tail">
          {message}
        </Text>

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
    padding: Responsive.spacing(20),
    alignItems: 'center',
    flex: 1,
  },
  buttonContainer: {
    width: '100%',
    paddingBottom: Responsive.spacing(20),
  },
  button: {
    marginBottom: Responsive.spacing(10),
  },
  title: {
    fontSize: fontSize.lg,
    fontFamily: fonts.Bold,
    color: colors.textPrimary,
    marginBottom: Responsive.spacing(10),
    textAlign: 'center',
  },
  message: {
    fontSize: fontSize.md,
    fontFamily: fonts.Medium,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: Responsive.spacing(30),
  },
  bottomSheetBackground: {
    backgroundColor: colors.white,
    borderTopLeftRadius: Responsive.radius(20),
    borderTopRightRadius: Responsive.radius(20),
  },
  bottomSheetIndicator: {
    backgroundColor: colors.grey400,
    width: Responsive.w(10),
  },
});
