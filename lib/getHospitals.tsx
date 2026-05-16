import { HospitalItem } from '@/components/interface';

const NGROK_URL = 'https://nonsyllogistically-tomfoolish-liana.ngrok-free.dev';

interface Props {
  search?: string;
  setHospitalData: (data: HospitalItem[]) => void;
}

export default function getHospitals({ search, setHospitalData }: Props) {
  const fetchHospitals = async () => {
    try {
      let url = `${NGROK_URL}/get_hospitals?`;
      if (search && search.trim() !== '') {
        url += `search=${encodeURIComponent(search.trim())}`;
      }

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'ngrok-skip-browser-warning': 'true',
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const json = await response.json();
        setHospitalData(json.hospitals);
      } else {
        console.error('Failed to fetch hospitals');
      }
    } catch (error) {
      console.error('Error fetching hospitals:', error);
    }
  };

  fetchHospitals();
}
