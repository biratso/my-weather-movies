import * as Updates from 'expo-updates';
import { useEffect, useState } from 'react';
import { Alert, Platform } from 'react-native';

interface UpdateStatus {
  isChecking: boolean;
  isDownloading: boolean;
  isUpdateAvailable: boolean;
  error: Error | null;
}

/**
 * Hook to check for and apply OTA updates on app launch
 * Works for both Green and Orange variants independently
 */
export function useAppUpdates() {
  const [status, setStatus] = useState<UpdateStatus>({
    isChecking: false,
    isDownloading: false,
    isUpdateAvailable: false,
    error: null,
  });

  useEffect(() => {
    async function checkForUpdates() {
      // Only check in production builds
      if (__DEV__) {
        console.log('🔧 Dev mode: Skipping update check');
        return;
      }

      try {
        setStatus((prev) => ({ ...prev, isChecking: true }));

        const update = await Updates.checkForUpdateAsync();

        if (update.isAvailable) {
          console.log('📦 Update available, downloading...');
          setStatus((prev) => ({
            ...prev,
            isChecking: false,
            isDownloading: true,
            isUpdateAvailable: true,
          }));

          await Updates.fetchUpdateAsync();

          console.log('✅ Update downloaded, reloading...');

          // Notify user before reload (optional, can be removed for silent updates)
          if (Platform.OS === 'ios' || Platform.OS === 'android') {
            Alert.alert(
              'Update Available',
              'A new version has been downloaded. The app will reload now.',
              [
                {
                  text: 'OK',
                  onPress: async () => {
                    await Updates.reloadAsync();
                  },
                },
              ],
              { cancelable: false }
            );
          } else {
            await Updates.reloadAsync();
          }
        } else {
          console.log('✓ App is up to date');
          setStatus((prev) => ({ ...prev, isChecking: false }));
        }
      } catch (error) {
        console.error('❌ Error checking for updates:', error);
        setStatus((prev) => ({
          ...prev,
          isChecking: false,
          isDownloading: false,
          error: error as Error,
        }));
      }
    }

    checkForUpdates();
  }, []);

  return status;
}
