import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TabNavigator} from './TabNavigator';
import {SplashScreen, AIGenerateScreen} from '../screens';
import {colors, fonts, fontSize} from '../theme';
import {RootStackParamList} from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.white,
        },
        headerTitleStyle: {
          fontSize: fontSize.lg,
          fontFamily: fonts.SemiBold,
          color: colors.textPrimary,
        },
        headerTitleAlign: 'center',
        headerTintColor: colors.primary,
        headerShadowVisible: false,
      }}>
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MainTabs"
        component={TabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AIGenerate"
        component={AIGenerateScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
