import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {SuccessBottomSheet} from './SuccessBottomSheet';
import {database} from '../../infrastructure/services/DatabaseService';

export const TaskCreationMenu: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('uncategorized');
  const [status, setStatus] = useState<'new' | 'done'>('new');
  const [showSuccess, setShowSuccess] = useState(false);

  const validateForm = (): boolean => {
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter a task title');
      return false;
    }
    if (!description.trim()) {
      Alert.alert('Error', 'Please enter a task description');
      return false;
    }
    if (!dueDate.trim()) {
      Alert.alert('Error', 'Please enter a due date');
      return false;
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dueDate)) {
      Alert.alert('Error', 'Please enter a valid date format (YYYY-MM-DD)');
      return false;
    }
    return true;
  };

  const saveTask = async () => {
    try {
      if (!validateForm()) return;

      await database.createTask({
        title: title.trim(),
        description: description.trim(),
        dueDate: dueDate.trim(),
        category,
        status,
        createdAt: new Date(),
      });

      setShowSuccess(true);
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
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.title}>Create New Task</Text>

        <TextInput
          style={styles.input}
          placeholder="Task Title"
          value={title}
          onChangeText={setTitle}
        />

        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Task Description"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
        />

        <TextInput
          style={styles.input}
          placeholder="Due Date (YYYY-MM-DD)"
          value={dueDate}
          onChangeText={setDueDate}
        />

        <TextInput
          style={styles.input}
          placeholder="Category (optional)"
          value={category}
          onChangeText={setCategory}
        />

        <View style={styles.statusContainer}>
          <Text style={styles.statusLabel}>Status:</Text>
          <View style={styles.statusButtons}>
            <TouchableOpacity
              style={[
                styles.statusButton,
                status === 'new' && styles.statusButtonActive,
              ]}
              onPress={() => setStatus('new')}>
              <Text
                style={[
                  styles.statusButtonText,
                  status === 'new' && styles.statusButtonTextActive,
                ]}>
                New
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.statusButton,
                status === 'done' && styles.statusButtonActive,
              ]}
              onPress={() => setStatus('done')}>
              <Text
                style={[
                  styles.statusButtonText,
                  status === 'done' && styles.statusButtonTextActive,
                ]}>
                Done
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={saveTask}>
          <Text style={styles.buttonText}>Save Task</Text>
        </TouchableOpacity>
      </View>
      <SuccessBottomSheet
        isVisible={showSuccess}
        onClose={() => setShowSuccess(false)}
        onCreateNew={() => {
          setShowSuccess(false);
          setTitle('');
          setDescription('');
          setDueDate('');
          setCategory('uncategorized');
          setStatus('new');
        }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  statusContainer: {
    marginBottom: 15,
  },
  statusLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  statusButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  statusButton: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007AFF',
    alignItems: 'center',
  },
  statusButtonActive: {
    backgroundColor: '#007AFF',
  },
  statusButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '500',
  },
  statusButtonTextActive: {
    color: '#fff',
  },
});
