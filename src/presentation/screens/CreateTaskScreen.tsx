import React, {useLayoutEffect, useRef, useState} from 'react';
import moment from 'moment';
import _ from 'lodash';
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  SafeAreaView,
  Text,
} from 'react-native';
import {database} from '../../infrastructure/services/DatabaseService';
import {GlobalBottomSheet, GlobalBottomSheetRef} from '../components/organisms';
import {Button, TextInput} from '../components/atoms';
import {colors, fonts, fontSize} from '../theme';
import Responsive from '../../utils/responsive';
import {TabNavigationProps} from '../navigation/types';

export const CreateTaskScreen = ({
  navigation,
}: TabNavigationProps<'CreateTask'>) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: 'Create Task',
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: colors.white,
      },
      headerTitleStyle: {
        fontFamily: fonts.SemiBold,
        fontSize: fontSize.lg,
        color: colors.textPrimary,
      },
      headerTintColor: colors.primary,
      headerShadowVisible: false,
    });
  }, [navigation]);

  const bottomSheetRef = useRef<GlobalBottomSheetRef>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(moment().format('YYYY-MM-DD'));
  const [category, setCategory] = useState('uncategorized');
  const [status, setStatus] = useState<'new' | 'done'>('new');

  const validateForm = (): boolean => {
    if (_.isEmpty(title.trim())) {
      Alert.alert('Error', 'Please enter a task title');
      return false;
    }
    if (_.isEmpty(description.trim())) {
      Alert.alert('Error', 'Please enter a task description');
      return false;
    }
    if (!moment(dueDate, 'YYYY-MM-DD', true).isValid()) {
      Alert.alert('Error', 'Please enter a valid date format (YYYY-MM-DD)');
      return false;
    }
    return true;
  };

  const handleGoHome = () => {
    bottomSheetRef.current?.hide();
    setTimeout(() => {
      navigation.navigate('Home');
    }, 300);
  };

  const handleCreateNew = () => {
    bottomSheetRef.current?.hide();
    setTitle('');
    setDescription('');
    setDueDate(moment().format('YYYY-MM-DD'));
    setCategory('uncategorized');
    setStatus('new');
  };

  const saveTask = async () => {
    try {
      if (!validateForm()) return;

      const bodyTask = {
        title: _.trim(title),
        description: _.trim(description),
        dueDate: moment(dueDate).format('YYYY-MM-DD'),
        category: _.toLower(category),
        status,
        createdAt: moment().toDate(),
      };

      await database.createTask(bodyTask);
      bottomSheetRef.current?.show();
    } catch (error) {
      console.error('Error saving task:', error);
      Alert.alert(
        'Error',
        error instanceof Error
          ? error.message
          : 'Failed to save task. Please try again.',
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <TextInput
            label="Task Title"
            placeholder="Enter task title"
            value={title}
            onChangeText={setTitle}
          />

          <TextInput
            label="Task Description"
            placeholder="Enter task description"
            value={description}
            onChangeText={setDescription}
            variant="textarea"
            multiline
            numberOfLines={4}
          />

          <TextInput
            label="Due Date"
            placeholder="YYYY-MM-DD"
            value={dueDate}
            onChangeText={setDueDate}
          />

          <TextInput
            label="Category"
            placeholder="Enter category (optional)"
            value={category}
            onChangeText={setCategory}
          />

          <View style={styles.statusContainer}>
            <Text style={styles.statusLabel}>Status</Text>
            <View style={styles.statusButtons}>
              <Button
                label="New"
                size="small"
                onPress={() => setStatus('new')}
                variant={status === 'new' ? 'primary' : 'secondary'}
                style={styles.statusButton}
              />
              <Button
                label="Done"
                size="small"
                onPress={() => setStatus('done')}
                variant={status === 'done' ? 'primary' : 'secondary'}
                style={styles.statusButton}
              />
            </View>
          </View>

          <Button label="Create Task" onPress={saveTask} size="medium" />
        </View>
      </ScrollView>

      <GlobalBottomSheet
        ref={bottomSheetRef}
        type="success"
        title="Task Created Successfully!"
        message="Your task has been saved. What would you like to do next?"
        primaryButton={{
          label: 'Create Another Task',
          onPress: handleCreateNew,
        }}
        secondaryButton={{
          label: 'Go to Home Screen',
          onPress: handleGoHome,
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollView: {
    flexGrow: 1,
  },
  container: {
    paddingHorizontal: Responsive.spacing(12),
  },
  statusContainer: {
    marginBottom: Responsive.spacing(16),
  },
  statusLabel: {
    fontSize: fontSize.sm,
    fontFamily: fonts.Medium,
    color: colors.textPrimary,
    marginBottom: Responsive.spacing(8),
  },
  statusButtons: {
    flexDirection: 'row',
    gap: Responsive.spacing(2.5),
  },
  statusButton: {
    flex: 1,
  },
});
