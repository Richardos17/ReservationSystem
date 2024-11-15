import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';

import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ShoppingCart } from 'react-flaticons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          //  height: 90, // Increased height for other platforms
          },
          default: {
          //  height: 60, // Increased height for other platforms
          },
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={32} name="paperplane.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <IconSymbol size={32} name="paperplane.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="qr"
        options={{
          title: 'Ukáž QR',
          tabBarIcon: ({ color }) => <IconSymbol size={32} name="paperplane.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Vyhľadať',
          tabBarIcon: ({ color }) => <IconSymbol size={32} name="paperplane.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="user"
        options={{
          title: 'Ja',
          tabBarIcon: ({ color }) => <IconSymbol size={32} name="paperplane.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
