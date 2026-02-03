import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ChapterCard({ title, onPress, concluido, bloqueado, pontosMinimos }) {
  return (
    <TouchableOpacity
      onPress={bloqueado ? null : onPress}
      disabled={bloqueado}
      style={{
        backgroundColor: concluido ? 'rgba(159,132,255,0.18)' : (bloqueado ? '#22202a' : '#2f2c3a'),
        padding: 16,
        marginVertical: 8,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: concluido ? 2 : 0,
        borderColor: concluido ? '#9f84ff' : 'transparent',
        opacity: bloqueado ? 0.5 : 1
      }}
    >
      <Text style={{ color: '#d5d2eb', fontSize: 16, flex: 1 }}>{title}</Text>
      {bloqueado && (
        <>
          <Ionicons name="lock-closed" size={20} color="#ff6f91" style={{ marginLeft: 8 }} />
          <Text style={{ color: '#ff6f91', marginLeft: 4, fontSize: 13 }}>
            {pontosMinimos ? ` ${pontosMinimos} pontos` : 'Bloqueado'}
          </Text>
        </>
      )}
      {concluido && !bloqueado && (
        <Ionicons name="checkmark-circle" size={22} color="#9f84ff" style={{ marginLeft: 8 }} />
      )}
    </TouchableOpacity>
  );
}
