import React, {useState, useEffect, useLayoutEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  FlatList,
  Image,
  BackHandler,
  Alert,
} from 'react-native';
import {MaterialIcons} from '../config/theme/icons';
import {database} from '../services/DatabaseService';
import {Task} from '../types/Task';
import {useLoadingStore} from '../state/loadingStore';
import {colors, fonts, fontSize} from '../config/theme';
import Responsive from '../utils/responsive';
import {TabNavigationProps} from '../navigation/types';
import {Images} from '../assets/images';
import {Button} from '../components/atoms';
import {TaskCard} from '../components/molecules';
import {useFocusEffect} from '@react-navigation/native';

export const HomeScreen = ({navigation}: TabNavigationProps<'Home'>) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: 'Idea Spark',
      headerTitleAlign: 'left',
      headerStyle: {
        backgroundColor: colors.white,
      },
      headerTitleStyle: {
        fontFamily: fonts.SemiBold,
        fontSize: fontSize.lg,
        color: colors.textPrimary,
      },
      headerLeft: () => (
        <Image
          source={Images.LogoOutline}
          style={{
            width: Responsive.w(10),
            height: Responsive.w(10),
            marginLeft: Responsive.spacing(10),
          }}
        />
      ),
      headerShadowVisible: false,
    });
  }, [navigation]);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert(
          'Exit App',
          'Are you sure you want to exit?',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Exit',
              style: 'destructive',
              onPress: () => BackHandler.exitApp(),
            },
          ],
          {
            cancelable: false,
          },
        );
        return true;
      };

      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress,
      );

      return () => subscription.remove();
    }, []),
  );

  const {showLoading, hideLoading} = useLoadingStore();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      await fetchTasks();
    } finally {
      setRefreshing(false);
    }
  };

  const fetchTasks = async () => {
    try {
      showLoading('Loading...');
      await database.initialize();
      const fetchedTasks = await database.getAllTasks();
      setTasks(fetchedTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      hideLoading();
    }
  };

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderTask = ({item}: {item: Task}) => (
    <TaskCard
      task={item}
      onPress={() => console.log('Task pressed:', item.id)}
    />
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <MaterialIcons
        name="assignment"
        size={Responsive.fs(48)}
        color="#8E8E93"
      />
      <Text style={styles.emptyStateText}>No tasks found</Text>
      <Text style={styles.emptyStateSubtext}>
        Create a new task to get started.
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <MaterialIcons
          name="search"
          size={Responsive.fs(24)}
          color="#8E8E93"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search tasks..."
          placeholderTextColor={colors.grey400}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <View style={styles.sectionGenerateAi}>
        <Button
          label="Generate Idea"
          size="medium"
          variant="primary"
          onPress={() => {
            navigation.navigate('AIGenerate');
          }}
        />
      </View>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Today's Tasks</Text>
        <Text style={styles.sectionCount}>{tasks.length} tasks</Text>
      </View>
      <FlatList
        data={tasks}
        renderItem={renderTask}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmptyState}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  sectionGenerateAi: {
    paddingHorizontal: Responsive.spacing(12),
    paddingVertical: Responsive.spacing(12),
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Responsive.spacing(8),
    paddingVertical: Responsive.spacing(4),
    backgroundColor: colors.grey100,
    borderRadius: Responsive.radius(10),
    marginHorizontal: Responsive.spacing(12),
  },
  searchIcon: {
    marginRight: Responsive.spacing(8),
  },
  searchInput: {
    flex: 1,
    fontSize: fontSize.sm,
    fontFamily: fonts.Regular,
    color: colors.textPrimary,
  },
  content: {
    flex: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Responsive.spacing(12),
    paddingBottom: Responsive.spacing(8),
  },
  sectionTitle: {
    fontSize: fontSize.sm,
    fontFamily: fonts.Medium,
    color: colors.textPrimary,
  },
  sectionCount: {
    fontSize: fontSize.sm,
    fontFamily: fonts.Regular,
    color: colors.grey600,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Responsive.spacing(48),
  },
  emptyStateText: {
    fontSize: fontSize.md,
    fontFamily: fonts.Medium,
    color: colors.grey600,
    marginTop: Responsive.spacing(12),
  },
  emptyStateSubtext: {
    fontSize: fontSize.sm,
    fontFamily: fonts.Medium,
    color: colors.grey600,
    marginTop: Responsive.spacing(8),
  },
  listContent: {
    flexGrow: 1,
    padding: Responsive.spacing(12),
  },
});
