import { useEffect, useState } from 'react';
import api from '../../api/axios';
import { Booking } from '../../types/booking';

const BookingPage = () => {
  const [list, setList] = useState<Booking[]>([]);

  useEffect(() => {
    api.get('/bookings').then(res => setList(res.data));
  }, []);

  return (
    <div>
      <h2>Bookings</h2>
      {list.map(b => (
        <div key={b.id}>{b.devotee_name}</div>
      ))}
    </div>
  );
};

export default BookingPage;
