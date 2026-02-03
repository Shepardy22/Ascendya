import React from 'react';
import { View } from 'react-native';

export default function ProgressBar({ progress }) {
  // Garante que a largura máxima visual seja 100%
  const percent = Math.max(0, Math.min(progress, 100));
  return (
    <View style={{ height: 8, backgroundColor: '#3b3847', borderRadius: 6 }}>
      <View style={{
        width: `${percent}%`,
        height: '100%',
        backgroundColor: '#9f84ff',
        borderRadius: 6
      }} />
    </View>
  );
}
