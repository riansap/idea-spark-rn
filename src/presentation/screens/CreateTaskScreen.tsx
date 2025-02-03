import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {TaskCreationMenu} from '../components/TaskCreationMenu';

export const CreateTaskScreen = () => (
  <SafeAreaView style={styles.container}>
    <TaskCreationMenu />
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
