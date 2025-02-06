import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MaterialIcons} from '../theme/icons/index';
import {HomeScreen, CreateTaskScreen, ProfileScreen} from '../screens';
import {StyleSheet, View} from 'react-native';
import {colors, fonts, fontSize} from '../theme';
import Responsive from '../../utils/responsive';
import {MainTabParamList} from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();

const TabIcon = ({name, color}: {name: string; color: string}) => (
  <MaterialIcons name={name} size={Responsive.fs(24)} color={color} />
);

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.grey400,
        tabBarStyle: styles.tabBar,
        tabBarBackground: () => <View style={styles.tabBarContent} />,
        tabBarLabelStyle: styles.tabBarLabel,
        headerShown: false,
        tabBarItemStyle: styles.tabBarItem,
        tabBarShowLabel: true,
        tabBarHideOnKeyboard: true,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color}) => <TabIcon name="home" color={color} />,
        }}
      />
      <Tab.Screen
        name="CreateTask"
        component={CreateTaskScreen}
        options={{
          tabBarLabel: 'Create',
          tabBarIcon: ({color}) => <TabIcon name="add-circle" color={color} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({color}) => <TabIcon name="person" color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'transparent',
    overflow: 'hidden',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: Responsive.h(7),
    borderTopLeftRadius: Responsive.radius(200),
    borderTopRightRadius: Responsive.radius(200),
    elevation: 6,
    shadowOpacity: 0,
  },
  tabBarContent: {
    backgroundColor: colors.white,
    height: '100%',
    width: '100%',
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 6,
  },
  tabBarItem: {
    paddingTop: Responsive.spacing(1),
  },
  tabBarLabel: {
    fontFamily: fonts.Medium,
    fontSize: fontSize.xs,
  },
});
