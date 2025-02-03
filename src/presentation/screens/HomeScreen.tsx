import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {GlobalHeader} from '../components/GlobalHeader';
import {AIGenerateIdea} from '../components/AIGenerateIdea';

export const HomeScreen = () => (
  <SafeAreaView style={styles.container}>
    <GlobalHeader headerType="primary" primaryTitle="IdeaSpark" />
    <View style={styles.searchContainer}>
      <Icon name="search" size={24} color="#8E8E93" style={styles.searchIcon} />
      <TextInput
        style={styles.searchInput}
        placeholder="Search tasks..."
        placeholderTextColor="#8E8E93"
      />
    </View>
    <ScrollView style={styles.content}>
      <AIGenerateIdea />
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Today's Tasks</Text>
        <Text style={styles.sectionCount}>0 tasks</Text>
      </View>
      <View style={styles.emptyState}>
        <Icon name="assignment" size={48} color="#8E8E93" />
        <Text style={styles.emptyStateText}>No tasks for today</Text>
        <Text style={styles.emptyStateSubtext}>
          Create a new task to get started
        </Text>
      </View>
    </ScrollView>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F2F2F7',
    margin: 16,
    borderRadius: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
    padding: 0,
  },
  content: {
    flex: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  sectionCount: {
    fontSize: 16,
    color: '#8E8E93',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#8E8E93',
    marginTop: 16,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 8,
  },
});
