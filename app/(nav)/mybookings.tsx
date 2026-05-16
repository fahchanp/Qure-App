import BookingCard from '@/components/BookingCard';
import HospitalStyles from '@/components/HospitalStyles';
import { BookingItem } from '@/components/interface';
import getBookings from '@/lib/getBookings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  FlatList, ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAppContext } from './_layout';

const handleLogout = async () => {
  await AsyncStorage.removeItem('userEmail');
  await AsyncStorage.removeItem('userName');
  router.replace('/login');
};

export default function MyBookingsScreen() {
  const { userEmail, userName } = useAppContext();
  const [bookings, setBookings] = useState<BookingItem[]>([]);
  const [loading, setLoading]   = useState(true);

  useFocusEffect(
    useCallback(() => {
      if (userEmail) loadBookings();
    }, [userEmail])
  );

  const loadBookings = () => {
    setLoading(true);
    getBookings({
      email: userEmail,
      setBookingData: (data: BookingItem[]) => {
        setBookings(data);
        setLoading(false);
      },
    });
  };

  return (
    <ScrollView style={HospitalStyles.container}>
      <View style={{ padding: 16 }}>

        {/*header*/}
        <View style={{ marginBottom: 16 }}>
          <Text style={{ fontSize: 22, fontWeight: '800', color: '#1e293b' }}>
            My Bookings
          </Text>
          <TouchableOpacity
            onPress={handleLogout}
            style={{ position: 'absolute', top: 16, right: 16, padding: 8 }}
          >
            <Text style={{ color: '#c80000', fontWeight: '600', fontSize: 14 }}>Logout</Text>
          </TouchableOpacity>
          {userName !== '' && (
            <Text style={{ fontSize: 14, color: '#64748b', marginTop: 2 }}>
              Logged in as {userName}
            </Text>
          )}
        </View>

        {loading && (
          <View style={{ paddingVertical: 40, alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#AC3130" />
            <Text style={{ color: '#94a3b8', marginTop: 10 }}>Loading bookings...</Text>
          </View>
        )}

        {!loading && bookings.length === 0 && (
          <View style={HospitalStyles.emptyState}>
            <Text style={HospitalStyles.emptyText}>No bookings yet</Text>
            <Text style={HospitalStyles.emptySubText}>
              Find a hospital and book a queue to get started
            </Text>
          </View>
        )}

        {/*booking list*/}
        {!loading && bookings.length > 0 && (
          <FlatList
            data={bookings}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => <BookingCard item={item} />}
            scrollEnabled={false}
          />
        )}

        <View style={{ height: 32 }} />
      </View>
    </ScrollView>
  );
}
