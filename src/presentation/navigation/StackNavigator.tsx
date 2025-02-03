import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TabNavigator} from './TabNavigator';
import {AIGenerateScreen} from '../screens/AIGenerateScreen';

const Stack = createNativeStackNavigator();

export const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#FFFFFF',
        },
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: '600',
          color: '#000000',
        },
        headerTitleAlign: 'center',
        headerTintColor: '#007AFF',
        headerShadowVisible: false,
      }}>
      <Stack.Screen
        name="MainTabs"
        component={TabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AIGenerate"
        component={AIGenerateScreen}
        options={{
          title: 'AI Chat',
        }}
      />
    </Stack.Navigator>
  );
};
