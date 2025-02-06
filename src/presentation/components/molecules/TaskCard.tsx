import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {MaterialIcons} from '../../theme/icons';
import {Task} from '../../../domain/models/Task';
import {colors, fonts, fontSize} from '../../theme';
import Responsive from '../../../utils/responsive';

interface TaskCardProps {
  task: Task;
  onPress?: () => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({task, onPress}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}>
      <View style={styles.header}>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {task.title}
        </Text>
        <View
          style={[
            styles.status,
            task.status === 'done' ? styles.statusDone : styles.statusNew,
          ]}>
          <Text style={styles.statusText} numberOfLines={1}>
            {task.status}
          </Text>
        </View>
      </View>
      <Text style={styles.description} numberOfLines={2} ellipsizeMode="tail">
        {task.description}
      </Text>
      <View style={styles.footer}>
        <View style={styles.metaInfo}>
          <MaterialIcons
            name="event"
            size={Responsive.fs(16)}
            color={colors.textSecondary}
          />
          <Text style={styles.metaText} numberOfLines={1} ellipsizeMode="tail">
            {task.dueDate}
          </Text>
        </View>
        {task.category && (
          <View style={styles.category}>
            <Text
              style={styles.categoryText}
              numberOfLines={1}
              ellipsizeMode="tail">
              {task.category}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: Responsive.radius(12),
    padding: Responsive.spacing(12),
    marginBottom: Responsive.spacing(8),
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.22,
    shadowRadius: 5,
    elevation: 6,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Responsive.spacing(8),
  },
  title: {
    fontSize: fontSize.md,
    fontFamily: fonts.SemiBold,
    color: colors.textPrimary,
    flex: 1,
    marginRight: Responsive.spacing(8),
  },
  status: {
    paddingHorizontal: Responsive.spacing(8),
    paddingVertical: Responsive.spacing(4),
    borderRadius: Responsive.radius(12),
  },
  statusNew: {
    backgroundColor: colors.primary + '20',
  },
  statusDone: {
    backgroundColor: colors.success + '20',
  },
  statusText: {
    fontSize: fontSize.xs,
    fontFamily: fonts.Medium,
    color: colors.primary,
    textTransform: 'capitalize',
  },
  description: {
    fontSize: fontSize.sm,
    fontFamily: fonts.Medium,
    color: colors.textSecondary,
    marginBottom: Responsive.spacing(12),
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: fontSize.xs,
    fontFamily: fonts.Medium,
    color: colors.textSecondary,
    marginLeft: Responsive.spacing(4),
  },
  category: {
    backgroundColor: colors.grey100,
    paddingHorizontal: Responsive.spacing(8),
    paddingVertical: Responsive.spacing(4),
    borderRadius: Responsive.radius(12),
  },
  categoryText: {
    fontSize: fontSize.xs,
    fontFamily: fonts.Medium,
    color: colors.textSecondary,
  },
});
