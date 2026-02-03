import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

export default function ButtonPrimary({ title, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: '#9f84ff',
        padding: 12,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 12
      }}>
      <Text style={{ color: '#fff', fontWeight: 'bold' }}>{title}</Text>
    </TouchableOpacity>
  );
}
