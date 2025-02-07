import AsyncStorage from '@react-native-async-storage/async-storage';

export class StorageService {
    static async setItem<T extends Record<string, any>>(key: string, value: T): Promise<void> {
        if (!key) {
            throw new Error('Storage key cannot be empty');
        }

        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem(key, jsonValue);
        } catch (error) {
            console.error('Error setting item in storage:', error);
            throw new Error(`Failed to save data: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    static async getItem<T>(key: string): Promise<T | null> {
        if (!key) {
            throw new Error('Storage key cannot be empty');
        }

        try {
            const jsonValue = await AsyncStorage.getItem(key);
            if (jsonValue === null) return null;

            try {
                return JSON.parse(jsonValue) as T;
            } catch (parseError) {
                console.error('Error parsing stored JSON:', parseError);
                throw new Error('Invalid data format in storage');
            }
        } catch (error) {
            console.error('Error getting item from storage:', error);
            throw new Error(`Failed to retrieve data: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    static async removeItem(key: string): Promise<void> {
        if (!key) {
            throw new Error('Storage key cannot be empty');
        }

        try {
            await AsyncStorage.removeItem(key);
        } catch (error) {
            console.error('Error removing item from storage:', error);
            throw new Error(`Failed to remove data: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    static async clear(): Promise<void> {
        try {
            await AsyncStorage.clear();
        } catch (error) {
            console.error('Error clearing storage:', error);
            throw new Error(`Failed to clear storage: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    static async getAllKeys(): Promise<string[]> {
        try {
            const keys = await AsyncStorage.getAllKeys();
            return Array.from(keys || []);
        } catch (error) {
            console.error('Error getting all keys from storage:', error);
            throw new Error(`Failed to retrieve keys: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
}