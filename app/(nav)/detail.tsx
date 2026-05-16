import HospitalStyles from '@/components/HospitalStyles';
import { getHospitalImage } from '@/components/hospitalImages';
import { HospitalItem } from '@/components/interface';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  View
} from 'react-native';
import { Button } from 'react-native-paper';
import { useAppContext } from './_layout';

const NGROK_URL = 'https://nonsyllogistically-tomfoolish-liana.ngrok-free.dev';

export default function HospitalDetailScreen() {
  const { selectedHospital } = useAppContext();
  const [hospital, setHospital] = useState<HospitalItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!selectedHospital) {
      router.replace('/(nav)');
      return;
    }
    fetchHospital();
  }, [selectedHospital]);

  const fetchHospital = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${NGROK_URL}/get_hospital/${selectedHospital}`,
        {
          headers: {
            'ngrok-skip-browser-warning': 'true',
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.ok) {
        const json = await response.json();
        setHospital(json.hospital);
      }
    } catch (e) {
      console.error('Error fetching hospital:', e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={[HospitalStyles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#AC3130" />
        <Text style={{ color: '#94a3b8', marginTop: 10 }}>Loading...</Text>
      </View>
    );
  }

  if (!hospital) {
    return (
      <View style={[HospitalStyles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={HospitalStyles.emptyText}>Hospital not found</Text>
        <Button onPress={() => router.replace('/(nav)')}>Go Back</Button>
      </View>
    );
  }

  const isPublic = hospital.type === 'Public';
  const localImage = getHospitalImage(hospital.name);
  const imageSource = hospital.image_url ? { uri: hospital.image_url } : localImage;

  return (
    <ScrollView style={HospitalStyles.container}>

      {/* Header with image or blue fallback */}
      {imageSource && (
        <Image
          source={imageSource}
          style={{ width: '100%', height: 200 }}
          resizeMode="cover"
        />
      )}
      <View style={[HospitalStyles.detailHeader, imageSource ? { paddingTop: 16 } : undefined]}>
        <View
          style={{
            alignSelf: 'flex-start',
            backgroundColor: isPublic ? '#dcfce7' : '#fff7ed',
            paddingHorizontal: 10,
            paddingVertical: 3,
            borderRadius: 20,
            marginBottom: 8,
          }}
        >
          <Text
            style={{
              fontSize: 12,
              fontWeight: '700',
              color: isPublic ? '#16a34a' : '#ea580c',
            }}
          >
            {hospital.type.toUpperCase()}
          </Text>
        </View>
        <Text style={HospitalStyles.detailHeaderName}>{hospital.name}</Text>
        <Text style={HospitalStyles.detailHeaderAddr}>{hospital.address}</Text>
      </View>

      {/* Contact info */}
      <View style={HospitalStyles.detailSection}>
        <Text style={HospitalStyles.detailSectionTitle}>Contact</Text>
        <Text style={{ fontSize: 15, color: '#475569' }}>{hospital.phone}</Text>
      </View>

      {/* Departments */}
      <View style={HospitalStyles.detailSection}>
        <Text style={HospitalStyles.detailSectionTitle}>
          Available Departments ({hospital.departments.length})
        </Text>
        <View style={HospitalStyles.deptRow2}>
          {hospital.departments.map((dept) => (
            <View key={dept} style={HospitalStyles.deptChip2}>
              <Text style={HospitalStyles.deptChipText2}>{dept}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Book button */}
      <View style={HospitalStyles.bookButtonWrap}>
        <Button
          mode="contained"
          buttonColor="#AC3130"
          textColor="#ffffff"
          style={{ borderRadius: 12, paddingVertical: 4 }}
          contentStyle={{ height: 52 }}
          labelStyle={{ fontSize: 16, fontWeight: '700' }}
          onPress={() => router.replace('/(nav)/booking')}
        >
          Book a Queue
        </Button>
      </View>

      <View style={{ height: 32 }} />
    </ScrollView>
  );
}
