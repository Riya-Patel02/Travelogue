import AsyncStorage from '@react-native-async-storage/async-storage';

// Function to save data in AsyncStorage
export async function handleAsyncSaveData(key, value) {
  console.log(key);
  console.log('val', value);

  // Input validation
  if (!key || !value) {
    console.error('Invalid key or value provided.');
    return false;
  }

  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    console.error('Error saving data:', e);
    return false;
  }
}

// Function to read data from AsyncStorage
export async function handleAsyncReadData(key) {
  try {
    const userDataVal = await AsyncStorage.getItem(key);

    if (userDataVal) {
      const parsedData = JSON.parse(userDataVal);
      return parsedData;
    } else {
      return null; // Return null when userDataVal is null
    }
  } catch (e) {
    console.error('Error retrieving user data:', e);
    return null; // Return null in case of an error
  }
}

///function to remove data from Async Storage
export async function handleRemoveAsyncData(key) {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Error removing data:', error);
    return false;
  }
}

export async function handleUpdateAsyncData(key) {
  try {
  } catch (error) {
    console.error('Error updating data:', error);
    return false;
  }
}
