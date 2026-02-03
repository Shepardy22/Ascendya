import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function AreaCard({ title, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={{
      backgroundColor: '#2a2831',
      padding: 16,
      marginVertical: 8,
      borderRadius: 12
    }}>
      <Text style={{ color: '#e4e2f1', fontSize: 18 }}>{title}</Text>
    </TouchableOpacity>
  );
}
