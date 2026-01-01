import React from 'react';
import { TextInput, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface InputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  error?: string;
  label?: string;
  rightIcon?: React.ReactNode;
  keyboardType?: 'default' | 'email-address';
}

export function Input({
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  error,
  label,
  rightIcon,
  keyboardType = 'default',
}: InputProps) {
  return (
    <View className="mb-4">
      {label && <Text className="text-gray-700 mb-2 font-medium">{label}</Text>}
      <View className="relative">
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize="none"
          className={`
            bg-white border rounded-lg px-4 py-3 text-base
            ${error ? 'border-red-500' : 'border-gray-300'}
          `}
        />
        {rightIcon && (
          <View className="absolute right-4 top-3">
            {rightIcon}
          </View>
        )}
      </View>
      {error && <Text className="text-red-500 text-sm mt-1">{error}</Text>}
    </View>
  );
}
