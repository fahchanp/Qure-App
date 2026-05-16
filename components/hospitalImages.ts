import { ImageSourcePropType } from 'react-native';

const imageMap: Record<string, ImageSourcePropType> = {
  bangkok: require('./images/Bangkok.jpg'),
  chula: require('./images/ChulaHospital.jpg'),
  phyathai: require('./images/Phyathai2.jpg'),
  rama: require('./images/Rama.jpg'),
  siriraj: require('./images/Siriraj.jpg'),
};

export function getHospitalImage(name: string): ImageSourcePropType | null {
  const lower = name.toLowerCase();
  for (const [key, img] of Object.entries(imageMap)) {
    if (lower.includes(key)) return img;
  }
  return null;
}
