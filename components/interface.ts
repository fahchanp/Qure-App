export interface HospitalItem {
  _id: string;
  name: string;
  address: string;
  departments: string[];
  phone: string;
  type: string;
  image_url?: string;
}

export interface BookingItem {
  _id: string;
  email: string;
  hospital_id: string;
  hospital_name: string;
  department: string;
  booking_date: string;
  queue_number: number;
  status: string;
  created_at: string;
}

export interface BookingResponseJson {
  message: string;
  queue_number?: number;
  booking_id?: string;
  error?: string;
}

