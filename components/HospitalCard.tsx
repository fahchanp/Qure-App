import { useAppContext } from '@/app/(nav)/_layout';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import { Button, Card } from 'react-native-paper';
import { getHospitalImage } from './hospitalImages';
import HospitalStyles from './HospitalStyles';
import { HospitalItem } from './interface';

interface Props {
  item: HospitalItem;
}

export default function HospitalCard({ item }: Props) {
  const { setSelectedHospital } = useAppContext();

  const isPublic = item.type === 'Public';
  const localImage = getHospitalImage(item.name);
  const imageSource = item.image_url ? { uri: item.image_url } : localImage;

  return (
    <Card style={HospitalStyles.cardItem} elevation={2}>
      {imageSource ? (
        <Card.Cover source={imageSource} style={{ height: 140, borderTopLeftRadius: 14, borderTopRightRadius: 14, borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }} />
      ) : (
        <View style={{ height: 100, backgroundColor: isPublic ? '#dcfce7' : '#fff7ed', justifyContent: 'center', alignItems: 'center', borderTopLeftRadius: 14, borderTopRightRadius: 14 }}>
          <Text style={{ fontSize: 42 }}>🏥</Text>
        </View>
      )}
      <Card.Title
        title={item.name}
        subtitle={item.type}
        titleStyle={{ color: '#1e293b' }}
        subtitleStyle={{ color: isPublic ? '#10b981' : '#f97316' }}
      />
      <Card.Content>
<Text style={HospitalStyles.addressText}>{item.address}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
          <MaterialIcons name="call" size={16}  />
          <Text style={HospitalStyles.phoneText}>{item.phone}</Text>
        </View>

        {/* Department chips */}
        <View style={HospitalStyles.deptRow}>
          {item.departments.slice(0, 3).map((dept) => (
            <View key={dept} style={HospitalStyles.deptChip}>
              <Text style={HospitalStyles.deptChipText}>{dept}</Text>
            </View>
          ))}
          {item.departments.length > 3 && (
            <View style={HospitalStyles.deptChip}>
              <Text style={HospitalStyles.deptChipText}>
                +{item.departments.length - 3} more
              </Text>
            </View>
          )}
        </View>
      </Card.Content>

      <Card.Actions>
        <Button
          mode="contained"
          buttonColor="#AC3130"
          textColor="#ffffff"
          style={{ borderRadius: 10 }}
          onPress={() => {
            setSelectedHospital(item._id);
            router.replace('/(nav)/detail');
          }}
        >
          View & Book
        </Button>
      </Card.Actions>
    </Card>
  );
}
