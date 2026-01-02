import * as Updates from 'expo-updates';
import Constants from 'expo-constants';
import { useState } from 'react';
import { Alert } from 'react-native';

/**
 * Hook for manual update checking (useful for testing)
 */
export function useManualUpdate() {
  const [isChecking, setIsChecking] = useState(false);

  const checkForUpdate = async () => {
    if (__DEV__) {
      Alert.alert('Dev Mode', 'Updates only work in production builds');
      return;
    }

    try {
      setIsChecking(true);
      
      // Debug info
      console.log('=== Update Debug Info ===');
      console.log('Channel:', Constants.expoConfig?.extra?.variant);
      console.log('Runtime Version:', Constants.expoConfig?.runtimeVersion);
      console.log('Updates URL:', Constants.expoConfig?.updates?.url);
      console.log('Is Embedded Launch:', Updates.isEmbeddedLaunch);
      console.log('Update ID:', Updates.updateId);
      console.log('========================');

      console.log('🔍 Manually checking for updates...');

      const update = await Updates.checkForUpdateAsync();

      console.log('Update check result:', update);

      if (update.isAvailable) {
        Alert.alert(
          'Update Found',
          'Downloading update now...',
          [{ text: 'OK' }]
        );

        await Updates.fetchUpdateAsync();
        
        Alert.alert(
          'Update Ready',
          'The update has been downloaded. Restart now?',
          [
            { text: 'Later', style: 'cancel' },
            {
              text: 'Restart',
              onPress: async () => {
                await Updates.reloadAsync();
              },
            },
          ]
        );
      } else {
        Alert.alert('No Updates', 'App is already up to date');
      }
    } catch (error: any) {
      const errorMsg = error?.message || String(error);
      console.error('Full error:', error);
      Alert.alert('Error', `Update check failed:\n${errorMsg}\n\nCheck console for details`);
    } finally {
      setIsChecking(false);
    }
  };

  return { checkForUpdate, isChecking };
}
