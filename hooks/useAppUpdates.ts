import * as Updates from 'expo-updates';
import { useEffect, useState } from 'react';
import { Alert, Platform } from 'react-native';

interface UpdateStatus {
  isChecking: boolean;
  isDownloading: boolean;
  isUpdateAvailable: boolean;
  error: Error | null;
}

export function useAppUpdates() {
  const [status, setStatus] = useState<UpdateStatus>({
    isChecking: false,
    isDownloading: false,
    isUpdateAvailable: false,
    error: null,
  });

  useEffect(() => {
    async function checkForUpdates() {
      // ✅ The ONLY correct guard
      if (!Updates.isEnabled) {
        console.log('🚫 OTA disabled in this environment');
        return;
      }

      try {
        setStatus((prev) => ({ ...prev, isChecking: true }));

        const update = await Updates.checkForUpdateAsync();

        if (!update.isAvailable) {
          console.log('✓ App is up to date');
          setStatus((prev) => ({ ...prev, isChecking: false }));
          return;
        }

        console.log('📦 Update available');
        setStatus((prev) => ({
          ...prev,
          isChecking: false,
          isDownloading: true,
          isUpdateAvailable: true,
        }));

        await Updates.fetchUpdateAsync();

        const reload = async () => {
          await Updates.reloadAsync();
        };

        // Optional UX
        if (Platform.OS === 'ios' || Platform.OS === 'android') {
          Alert.alert(
            'Update Available',
            'The app will restart to apply the update.',
            [{ text: 'OK', onPress: reload }],
            { cancelable: false }
          );
        } else {
          await reload();
        }
      } catch (e) {
        // ⚠️ This is NORMAL sometimes — not an error state
        console.log('ℹ️ OTA check skipped:', e?.message);
        setStatus((prev) => ({
          ...prev,
          isChecking: false,
          isDownloading: false,
        }));
      }
    }

    checkForUpdates();
  }, []);

  return status;
}
