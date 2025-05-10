import { Tabs } from 'expo-router';
import React from 'react';
import { useColorScheme } from '@/hooks/useColorScheme';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#1E64DD',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopColor: '#ddd',         
          borderTopWidth: 0.5,
          height: 70,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '500',
        },
      }}>
      <Tabs.Screen
        name="upload"
        options={{
          title: '업로드',
          tabBarIcon: ({ color }) => (
            <FontAwesome size={24} name="upload" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="regulationsLink"
        options={{
          title: '사이트',
          tabBarIcon: ({ color }) => (
            <FontAwesome size={24} name="external-link" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: '설정',
          tabBarIcon: ({ color }) => (
            <FontAwesome size={24} name="gear" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
