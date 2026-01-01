import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const { login } = useAuth();
  const { appName, primaryColor } = useTheme();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      await login(email, password, rememberMe);
    } catch (error) {
      Alert.alert('Login Failed', 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-gray-50"
    >
      <ScrollView
        contentContainerClassName="flex-grow justify-center p-6"
        keyboardShouldPersistTaps="handled"
      >
        <View className="items-center mb-12">
          <View
            className="w-24 h-24 rounded-full items-center justify-center mb-4"
            style={{ backgroundColor: primaryColor }}
          >
            <Ionicons name="cloud-outline" size={48} color="white" />
          </View>
          <Text className="text-3xl font-bold text-gray-800">{appName}</Text>
          <Text className="text-gray-600 mt-2">Welcome back! Please login</Text>
        </View>

        <View className="bg-white rounded-2xl p-6 shadow-sm">
          <Input
            label="Email"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              if (errors.email) setErrors({ ...errors, email: undefined });
            }}
            placeholder="Enter your email"
            keyboardType="email-address"
            error={errors.email}
          />

          <Input
            label="Password"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              if (errors.password) setErrors({ ...errors, password: undefined });
            }}
            placeholder="Enter your password"
            secureTextEntry={!showPassword}
            error={errors.password}
            rightIcon={
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={24}
                  color="#9CA3AF"
                />
              </TouchableOpacity>
            }
          />

          <TouchableOpacity
            onPress={() => setRememberMe(!rememberMe)}
            className="flex-row items-center mb-6"
            activeOpacity={0.7}
          >
            <View
              className={`w-6 h-6 rounded border-2 items-center justify-center mr-2 ${
                rememberMe ? 'bg-blue-600 border-blue-600' : 'border-gray-300'
              }`}
            >
              {rememberMe && <Ionicons name="checkmark" size={18} color="white" />}
            </View>
            <Text className="text-gray-700">Remember Me</Text>
          </TouchableOpacity>

          <Button
            title="Login"
            onPress={handleLogin}
            loading={isLoading}
            className="mb-4"
            style={{ backgroundColor: primaryColor }}
          />

          <Text className="text-center text-gray-600 text-sm">
            Demo: Use any valid email and password (min 6 chars)
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
