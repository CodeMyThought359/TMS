import express from 'express';
import cors from 'cors';

import authRoutes from './routes/auth.routes';
import superRoutes from './routes/super.routes';
import bookingRoutes from './routes/booking.routes';
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/super', superRoutes);
app.use('/api/bookings', bookingRoutes);
export default app;
