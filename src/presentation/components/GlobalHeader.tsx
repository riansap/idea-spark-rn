import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

type IconConfig = {
  name: string;
  onPress: () => void;
};

type GlobalHeaderProps = {
  headerType?: 'primary' | 'secondary';
  primaryTitle?: string;
  secondaryTitle?: string;
  leftIcon?: IconConfig;
  rightIcon?: IconConfig;
  onBackPress?: () => void;
};

export const GlobalHeader: React.FC<GlobalHeaderProps> = ({
  headerType = 'primary',
  primaryTitle = 'IdeaSpark',
  secondaryTitle,
  leftIcon,
  rightIcon,
  onBackPress,
}) => {
  return (
    <View style={styles.container}>
      {headerType === 'primary' ? (
        <View style={styles.primaryHeader}>
          {leftIcon && (
            <TouchableOpacity
              onPress={leftIcon.onPress}
              style={styles.primaryLeftIcon}>
              <Icon name={leftIcon.name} size={24} color="#000000" />
            </TouchableOpacity>
          )}
          <Text
            style={[
              styles.primaryTitle,
              leftIcon && styles.primaryTitleWithIcon,
            ]}>
            {primaryTitle}
          </Text>
        </View>
      ) : (
        <View style={styles.secondaryHeader}>
          <View style={styles.iconContainer}>
            {onBackPress && (
              <TouchableOpacity onPress={onBackPress}>
                <Icon name="arrow-back" size={24} color="#000000" />
              </TouchableOpacity>
            )}
          </View>
          {secondaryTitle && (
            <Text style={styles.secondaryTitle}>{secondaryTitle}</Text>
          )}
          <View style={styles.iconContainer}>
            {rightIcon && (
              <TouchableOpacity onPress={rightIcon.onPress}>
                <Icon name={rightIcon.name} size={24} color="#000000" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  primaryLeftIcon: {
    position: 'absolute',
    left: 16,
    top: '50%',
    transform: [{translateY: -12}],
  },
  primaryTitleWithIcon: {
    marginLeft: 40,
  },
  container: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  primaryHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  primaryTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
  },
  secondaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
  },
  secondaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    flex: 1,
    textAlign: 'center',
  },
  iconContainer: {
    width: 24,
    alignItems: 'center',
  },
});
