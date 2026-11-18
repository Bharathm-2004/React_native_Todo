import AsyncStorage from '@react-native-async-storage/async-storage';

export const storageService = {
  // Data edukka: JSON string-ah object ah maathi tharum
  async get<T>(key: string): Promise<T | null> {
    try {
      const json = await AsyncStorage.getItem(key);
      return json ? (JSON.parse(json) as T) : null;
    } catch (error) {
      console.log('Storage get error:', error);
      return null;
    }
  },

  // Data save panna: object-ah JSON string ah maathi save pannum
  async set<T>(key: string, value: T): Promise<void> {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log('Storage set error:', error);
    }
  },

  // Data delete panna
  async remove(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.log('Storage remove error:', error);
    }
  },
};