import { BookingResponseJson } from '@/components/interface';

const NGROK_URL = 'https://nonsyllogistically-tomfoolish-liana.ngrok-free.dev';

interface Props {
  email: string;
  hospitalId: string;
  department: string;
  bookingDate: string;
  setResponse: (data: BookingResponseJson) => void;
}

export default function addBooking({
  email,
  hospitalId,
  department,
  bookingDate,
  setResponse,
}: Props) {
  const postBooking = async () => {
    try {
      const response = await fetch(`${NGROK_URL}/add_booking`, {
        method: 'POST',
        headers: {
          'ngrok-skip-browser-warning': 'true',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          hospital_id: hospitalId,
          department,
          booking_date: bookingDate,
        }),
      });

      const json: BookingResponseJson = await response.json();
      setResponse(json);
    } catch (error) {
      console.error('Error posting booking:', error);
      setResponse({ message: 'Network error. Please try again.' });
    }
  };

  postBooking();
}
