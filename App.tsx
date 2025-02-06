import React, {useEffect} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {StackNavigator} from './src/presentation/navigation/StackNavigator';
import {database} from './src/infrastructure/services/DatabaseService';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {LoadingOverlay} from './src/presentation/components/atoms/LoadingOverlay';
import {useLoadingStore} from './src/presentation/stores/loadingStore';
import {StatusBar} from 'react-native';
import {colors} from './src/presentation/theme';

function App(): React.JSX.Element {
  const {showLoading, hideLoading} = useLoadingStore();

  useEffect(() => {
    const initDB = async () => {
      try {
        showLoading('Initializing database...');
        await database.initialize();
      } catch (error) {
        console.error('Failed to initialize database:', error);
      } finally {
        hideLoading();
      }
    };
    initDB();
  }, [hideLoading, showLoading]);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <BottomSheetModalProvider>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </BottomSheetModalProvider>
      <LoadingOverlay />
    </GestureHandlerRootView>
  );
}

export default App;
