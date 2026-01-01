import React from 'react';
import { View, ViewStyle } from 'react-native';

interface SkeletonProps {
  width?: number | string;
  height?: number;
  className?: string;
}

export function Skeleton({ width = '100%', height = 20, className = '' }: SkeletonProps) {
  return (
    <View
      style={{ width, height } as ViewStyle}
      className={`bg-gray-300 rounded ${className}`}
    />
  );
}

export function WeatherSkeleton() {
  return (
    <View className="p-4">
      <Skeleton height={30} width="60%" className="mb-4" />
      <Skeleton height={60} className="mb-2" />
      <Skeleton height={20} width="40%" />
    </View>
  );
}

export function MovieSkeleton() {
  return (
    <View className="m-2">
      <Skeleton height={250} className="mb-2" />
      <Skeleton height={20} width="80%" className="mb-1" />
      <Skeleton height={16} width="40%" />
    </View>
  );
}
