import AsyncStorage from '@react-native-async-storage/async-storage';

export const getAsyncStorageSize = async () => {
  const keys = await AsyncStorage.getAllKeys();
  const items = await AsyncStorage.multiGet(keys);

  let totalBytes = 0;

  items.forEach(([key, value]) => {
    if (value) {
      totalBytes += key.length + value.length;
    }
  });

  return totalBytes;
};


export const formatSize = (bytes: number) => {
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};

