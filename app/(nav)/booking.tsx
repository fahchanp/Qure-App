import HospitalStyles from '@/components/HospitalStyles';
import { BookingResponseJson, HospitalItem } from '@/components/interface';
import addBooking from '@/lib/addBooking';
import { Picker } from '@react-native-picker/picker';
import { format } from 'date-fns';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Text, TouchableOpacity,
  useWindowDimensions,
  View
} from 'react-native';
import { Button } from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates';
import { useAppContext } from './_layout';

const NGROK_URL = 'https://nonsyllogistically-tomfoolish-liana.ngrok-free.dev';

export default function BookingScreen() {
  const { selectedHospital, userEmail } = useAppContext();
  const { width } = useWindowDimensions();
  const SM_SCREEN = 576;

  const [hospital, setHospital]         = useState<HospitalItem | null>(null);
  const [loading, setLoading]           = useState(true);
  const [department, setDepartment]     = useState('');
  const [bookingDate, setBookingDate]   = useState<Date | undefined>(undefined);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [bookResponse, setBookResponse] = useState<BookingResponseJson | undefined>(undefined);
  const [invalidMsg, setInvalidMsg]     = useState('');
  const [submitting, setSubmitting]     = useState(false);

  useEffect(() => {
    if (!selectedHospital) {
      router.replace('/(nav)');
      return;
    }
    fetchHospital();
  }, [selectedHospital]);

  //pre select first department when hospital loads
  useEffect(() => {
    if (hospital && hospital.departments.length > 0) {
      setDepartment(hospital.departments[0]);
    }
  }, [hospital]);

  const fetchHospital = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${NGROK_URL}/get_hospital/${selectedHospital}`,
        { headers: { 'ngrok-skip-browser-warning': 'true', 'Content-Type': 'application/json' } }
      );
      if (response.ok) {
        const json = await response.json();
        setHospital(json.hospital);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const onDateConfirm = ({ date }: { date: Date | undefined }) => {
    setShowDatePicker(false);
    setBookingDate(date);
  };

  const handleSubmit = () => {
    //validation
    const today = new Date();
    today.setHours(23, 59, 59, 0);

    if (!department) {
      setInvalidMsg('Please select a department.');
      return;
    }
    if (!bookingDate || bookingDate === undefined) {
      setInvalidMsg('Please select a booking date.');
      return;
    }
    if (bookingDate <= today) {
      setInvalidMsg('Booking date must be a future date.');
      return;
    }
    if (!userEmail) {
      setInvalidMsg('You must be logged in to book.');
      return;
    }

    setInvalidMsg('');
    setSubmitting(true);
    setBookResponse(undefined);

    const formattedDate = format(bookingDate, 'dd-MM-yyyy');

    addBooking({
      email: userEmail,
      hospitalId: selectedHospital,
      department,
      bookingDate: formattedDate,
      setResponse: (res: BookingResponseJson) => {
        setBookResponse(res);
        setSubmitting(false);
        if (res.queue_number) {
          //reset form
          setBookingDate(undefined);
        }
      },
    });
  };

  if (loading) {
    return (
      <View style={[HospitalStyles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#AC3130" />
      </View>
    );
  }

  if (!hospital) {
    return (
      <View style={[HospitalStyles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={HospitalStyles.emptyText}>No hospital selected.</Text>
        <Button onPress={() => router.replace('/(nav)')}>Find Hospital</Button>
      </View>
    );
  }

  return (
    <ScrollView style={HospitalStyles.container}>
      <View style={{ padding: 16 }}>

        {/*hospital name header*/}
        <View style={{ backgroundColor: '#fff0f0', borderRadius: 12, padding: 14, marginBottom: 16 }}>
          <Text style={{ fontSize: 13, color: '#64748b', fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.8 }}>
            Booking at
          </Text>
          <Text style={{ fontSize: 18, fontWeight: '800', color: '#1e293b', marginTop: 2 }}>
            {hospital.name}
          </Text>
          <Text style={{ fontSize: 13, color: '#64748b', marginTop: 2 }}>{hospital.address}</Text>
        </View>

        {/*form card*/}
        <View style={[
          HospitalStyles.formContainer,
          { width: width > SM_SCREEN ? '60%' : '100%', alignSelf: 'center' }
        ]}>

          {/*department pick*/}
          <Text style={HospitalStyles.label}>Select Department</Text>
          <View style={{ borderWidth: 1, borderColor: '#cbd5e1', borderRadius: 12, overflow: 'hidden', backgroundColor: '#f8fafc' }}>
            <Picker
              selectedValue={department}
              onValueChange={(val) => setDepartment(val)}
              style={{ height: 50, color: '#1e293b' }}
              dropdownIconColor="#AC3130"
            >
              {hospital.departments.map((dept) => (
                <Picker.Item label={dept} value={dept} key={dept} />
              ))}
            </Picker>
          </View>

          {/*date pick*/}
          <Text style={HospitalStyles.label}>Select Booking Date</Text>
          <TouchableOpacity
            style={HospitalStyles.dateButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Text
              style={
                bookingDate
                  ? HospitalStyles.dateButtonTextSelected
                  : HospitalStyles.dateButtonText
              }
            >
              {bookingDate
                ? `${format(bookingDate, 'dd MMMM yyyy')}`
                : 'Tap to select a date'}
            </Text>
          </TouchableOpacity>

          <DatePickerModal
            locale="en"
            mode="single"
            visible={showDatePicker}
            onDismiss={() => setShowDatePicker(false)}
            date={bookingDate}
            onConfirm={onDateConfirm}
          />

          {/*submit*/}
          <View style={HospitalStyles.submitButton}>
            <Button
              mode="contained"
              buttonColor="#AC3130"
              textColor="#ffffff"
              style={{ borderRadius: 12 }}
              contentStyle={{ height: 52 }}
              labelStyle={{ fontSize: 16, fontWeight: '700' }}
              loading={submitting}
              onPress={handleSubmit}
            >
              Confirm Booking
            </Button>
          </View>

          {/*validation error*/}
          {invalidMsg !== '' && (
            <Text style={HospitalStyles.errorText}>{invalidMsg}</Text>
          )}

          {/*success*/}
          {bookResponse !== undefined && (
            <Text
              style={
                bookResponse.queue_number
                  ? HospitalStyles.successText
                  : HospitalStyles.errorText
              }
            >
              {bookResponse.queue_number
                ? `Booking confirmed! Your queue number is #${bookResponse.queue_number}`
                : `${bookResponse.error || bookResponse.message}`}
            </Text>
          )}
        </View>

        <View style={{ height: 32 }} />
      </View>
    </ScrollView>
  );
}
