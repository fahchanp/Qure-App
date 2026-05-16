import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, Tabs } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Platform } from 'react-native';

interface AppContextType {
  userEmail: string;
  setUserEmail: (v: string) => void;
  userName: string;
  setUserName: (v: string) => void;
  selectedHospital: string;
  setSelectedHospital: (v: string) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function useAppContext(): AppContextType {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used inside AppContext.Provider');
  }
  return context;
}

export default function NavLayout() {
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [selectedHospital, setSelectedHospital] = useState('');

  useEffect(() => {
    (async () => {
      const email = await AsyncStorage.getItem('userEmail');
      const name  = await AsyncStorage.getItem('userName');
      if (!email) {
        router.replace('/login');
      } else {
        setUserEmail(email);
        setUserName(name || '');
      }
    })();
  }, []);

  const contextValue: AppContextType = {
    userEmail, setUserEmail,
    userName,  setUserName,
    selectedHospital, setSelectedHospital,
  };

  if (Platform.OS === 'web') {
    return (
      <AppContext.Provider value={contextValue}>
        <Drawer>
          <Drawer.Screen name="index"      options={{ title: 'Find Hospital' }} />
          <Drawer.Screen name="detail"     options={{ title: 'Hospital Detail' }} /> 
          <Drawer.Screen name="booking"    options={{ title: 'Book Queue' }} />
          <Drawer.Screen name="mybookings" options={{ title: 'My Bookings' }} />

        </Drawer>
      </AppContext.Provider>
    );
  }

  return (
    <AppContext.Provider value={contextValue}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#AC3130',
          tabBarInactiveTintColor: '#94a3b8',
          tabBarStyle: {
            backgroundColor: '#ffffff',
            borderTopColor: '#e2e8f0',
            height: 60,
            paddingBottom: 8,
          },
          headerStyle: { backgroundColor: '#AC3130' },
          headerTintColor: '#ffffff',
          headerTitleStyle: { fontWeight: '700' },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Find Hospital',
            tabBarIcon: ({ color }) => (
              <MaterialIcons size={20} name='search' color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="detail"
          options={{
            title: 'Hospital',
            tabBarIcon: ({ color }) => (
              <MaterialIcons size={20} name='local-hospital' color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="booking"
          options={{
            title: 'Book Queue',
            tabBarIcon: ({ color }) => (
              <MaterialIcons size={20} name='calendar-today' color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="mybookings"
          options={{
            title: 'My Bookings',
            tabBarIcon: ({ color }) => (
              <MaterialIcons size={20} name='history' color={color} />
            ),
          }}
        />
      </Tabs>
    </AppContext.Provider>
  );
}

function TabIcon({ label, color }: { label: string; color: string }) {
  const { Text } = require('react-native');
  return <Text style={{ fontSize: 15 }}>{label}</Text>;
}
