import React, {useEffect} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {StackNavigator} from './src/presentation/navigation/StackNavigator';
import {database} from './src/infrastructure/services/DatabaseService';

function App(): React.JSX.Element {
  useEffect(() => {
    const initDB = async () => {
      try {
        await database.initialize();
      } catch (error) {
        console.error('Failed to initialize database:', error);
      }
    };
    initDB();
  }, []);
  return (
    <GestureHandlerRootView>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;
