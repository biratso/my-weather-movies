import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native';

interface ButtonProps {
  onPress: () => void;
  title: string;
  variant?: 'primary' | 'secondary';
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}

export function Button({
  onPress,
  title,
  variant = 'primary',
  loading = false,
  disabled = false,
  className = '',
}: ButtonProps) {
  const isPrimary = variant === 'primary';
  
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      className={`
        py-4 px-6 rounded-lg items-center justify-center
        ${isPrimary ? 'bg-blue-600' : 'bg-gray-200'}
        ${(disabled || loading) && 'opacity-50'}
        ${className}
      `}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={isPrimary ? 'white' : 'black'} />
      ) : (
        <Text
          className={`font-semibold text-base ${
            isPrimary ? 'text-white' : 'text-gray-800'
          }`}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}
