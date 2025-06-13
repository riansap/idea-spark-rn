import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {StackNavigator} from './navigation/StackNavigator';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {LoadingOverlay} from './components/atoms/LoadingOverlay';
import {StatusBar} from 'react-native';
import {colors} from './config/theme/colors';
import Toast from 'react-native-toast-message';
import {toastConfig} from './components/atoms/Toast';

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <BottomSheetModalProvider>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </BottomSheetModalProvider>
      <LoadingOverlay />
      <Toast config={toastConfig} />
    </GestureHandlerRootView>
  );
}

export default App;
