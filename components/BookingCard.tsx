import React from 'react';
import { Text, View } from 'react-native';
import { Card } from 'react-native-paper';
import { getHospitalImage } from './hospitalImages';
import HospitalStyles from './HospitalStyles';
import { BookingItem } from './interface';

interface Props {
  item: BookingItem;
}

export default function BookingCard({ item }: Props) {
  const image = getHospitalImage(item.hospital_name);

  return (
    <Card style={HospitalStyles.bookingCard} elevation={2}>
      {image ? (
        <Card.Cover
          source={image}
          style={{ height: 130, borderTopLeftRadius: 14, borderTopRightRadius: 14, borderBottomLeftRadius: 0, borderBottomRightRadius: 0  }}
          resizeMode="cover"
          
        />
      ) : (
        <View style={{ height: 80, backgroundColor: '#fff0f0', justifyContent: 'center', alignItems: 'center', borderTopLeftRadius: 14, borderTopRightRadius: 14 }}>
          <Text style={{ fontSize: 36 }}>🏥</Text>
        </View>
      )}
      <Card.Content style={{ paddingTop: 10 }}>
        <View style={{ alignItems: 'flex-start'}}>
          <Text style={HospitalStyles.queueLabel}>Queue No.</Text>
          <Text style={HospitalStyles.queueNumber}>#{item.queue_number}</Text>
        </View>

        <Text style={HospitalStyles.bookingInfo}>
          <Text style={HospitalStyles.bookingInfoBold}>Hospital: </Text>
          {item.hospital_name}
        </Text>
        <Text style={HospitalStyles.bookingInfo}>
          <Text style={HospitalStyles.bookingInfoBold}>Department: </Text>
          {item.department}
        </Text>
        <Text style={HospitalStyles.bookingInfo}>
          <Text style={HospitalStyles.bookingInfoBold}>Date: </Text>
          {item.booking_date}
        </Text>
      </Card.Content>
    </Card>
  );
}
