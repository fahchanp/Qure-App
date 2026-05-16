import { BookingItem } from '@/components/interface';

const NGROK_URL = 'https://nonsyllogistically-tomfoolish-liana.ngrok-free.dev';

interface Props {
  email: string;
  setBookingData: (data: BookingItem[]) => void;
}

export default function getBookings({ email, setBookingData }: Props) {
  const fetchBookings = async () => {
    try {
      const response = await fetch(
        `${NGROK_URL}/get_bookings?email=${encodeURIComponent(email)}`,
        {
          method: 'GET',
          headers: {
            'ngrok-skip-browser-warning': 'true',
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        const json = await response.json();
        setBookingData(json.bookings);
      } else {
        console.error('Failed to fetch bookings');
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  fetchBookings();
}
