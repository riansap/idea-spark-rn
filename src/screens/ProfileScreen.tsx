import React, {useLayoutEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import {MaterialIcons} from '../config/theme/icons';
import {colors, fonts, fontSize} from '../config/theme';
import Responsive from '../utils/responsive';
import {TabNavigationProps} from '../navigation/types';

const MenuItem = ({
  icon,
  title,
  onPress,
}: {
  icon: string;
  title: string;
  onPress: () => void;
}) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <MaterialIcons
      name={icon}
      size={Responsive.fs(24)}
      color={colors.grey600}
    />
    <Text style={styles.menuItemText}>{title}</Text>
    <MaterialIcons
      name="chevron-right"
      size={Responsive.fs(24)}
      color={colors.grey400}
    />
  </TouchableOpacity>
);

export const ProfileScreen = ({navigation}: TabNavigationProps<'Profile'>) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: 'Profile',
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: colors.white,
      },
      headerTitleStyle: {
        fontFamily: fonts.SemiBold,
        fontSize: fontSize.lg,
        color: colors.textPrimary,
      },
      headerShadowVisible: false,
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Image
              source={{uri: 'https://via.placeholder.com/100'}}
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.editButton}>
              <MaterialIcons
                name="edit"
                size={Responsive.fs(20)}
                color={colors.white}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.name}>John Doe</Text>
          <Text style={styles.email}>john.doe@example.com</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <MenuItem
            icon="person-outline"
            title="Edit Profile"
            onPress={() => {}}
          />
          <MenuItem
            icon="notifications-none"
            title="Notifications"
            onPress={() => {}}
          />
          <MenuItem
            icon="lock-outline"
            title="Privacy & Security"
            onPress={() => {}}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <MenuItem icon="language" title="Language" onPress={() => {}} />
          <MenuItem icon="brightness-6" title="Theme" onPress={() => {}} />
        </View>

        <TouchableOpacity style={styles.logoutButton}>
          <MaterialIcons
            name="logout"
            size={Responsive.fs(24)}
            color={colors.error}
          />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    alignItems: 'center',
    paddingVertical: Responsive.spacing(8),
    borderBottomWidth: 1,
    borderBottomColor: colors.grey100,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: Responsive.spacing(4),
  },
  avatar: {
    width: Responsive.w(25),
    height: Responsive.w(25),
    borderRadius: Responsive.w(12.5),
  },
  editButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: colors.primary,
    padding: Responsive.spacing(2),
    borderRadius: Responsive.radius(20),
  },
  name: {
    fontSize: fontSize.xl,
    fontFamily: fonts.SemiBold,
    color: colors.textPrimary,
    marginBottom: Responsive.spacing(1),
  },
  email: {
    fontSize: fontSize.md,
    fontFamily: fonts.Regular,
    color: colors.grey600,
  },
  section: {
    paddingHorizontal: Responsive.spacing(4),
    paddingVertical: Responsive.spacing(4),
  },
  sectionTitle: {
    fontSize: fontSize.sm,
    fontFamily: fonts.Medium,
    color: colors.grey600,
    marginBottom: Responsive.spacing(4),
    paddingHorizontal: Responsive.spacing(4),
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Responsive.spacing(4),
    paddingHorizontal: Responsive.spacing(4),
    backgroundColor: colors.white,
  },
  menuItemText: {
    flex: 1,
    marginLeft: Responsive.spacing(4),
    fontSize: fontSize.md,
    fontFamily: fonts.Regular,
    color: colors.textPrimary,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Responsive.spacing(4),
    marginTop: Responsive.spacing(8),
    marginBottom: Responsive.spacing(8),
  },
  logoutText: {
    marginLeft: Responsive.spacing(2),
    fontSize: fontSize.md,
    fontFamily: fonts.Medium,
    color: colors.error,
  },
});
