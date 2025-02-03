import React, {useCallback, useMemo, useRef} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {Routes} from '../navigation/routes';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type RootStackParamList = {
  MainTabs: {screen: string};
  AIGenerate: undefined;
};
type SuccessBottomSheetProps = {
  isVisible: boolean;
  onClose: () => void;
  onCreateNew: () => void;
};

export const SuccessBottomSheet: React.FC<SuccessBottomSheetProps> = ({
  isVisible,
  onClose,
  onCreateNew,
}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['50%'], []);

  const handleGoHome = useCallback(() => {
    onClose();
    navigation.navigate(Routes.MainTabs.name, {
      screen: Routes.MainTabs.screens.Home,
    });
  }, [navigation, onClose]);

  React.useEffect(() => {
    if (isVisible) {
      bottomSheetModalRef.current?.present();
    } else {
      bottomSheetModalRef.current?.dismiss();
    }
  }, [isVisible]);

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        onDismiss={onClose}
        backgroundStyle={styles.bottomSheet}>
        <View style={styles.content}>
          <Text style={styles.title}>Task Created Successfully!</Text>
          <Text style={styles.message}>
            Your task has been saved. What would you like to do next?
          </Text>

          <TouchableOpacity style={styles.button} onPress={onCreateNew}>
            <Text style={styles.buttonText}>Create Another Task</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={handleGoHome}>
            <Text style={[styles.buttonText, styles.secondaryButtonText]}>
              Go to Home Screen
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  bottomSheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  content: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: '100%',
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  secondaryButton: {
    backgroundColor: '#F2F2F7',
  },
  secondaryButtonText: {
    color: '#007AFF',
  },
});
