import express from 'express';
import userRoutes from './routes/userRoutes';
import taskRoutes from './routes/taskRoutes';
import houseRoutes from './routes/houseRoutes';

const app = express();
app.use(express.json());

app.use('/api', userRoutes);
app.use('/api', taskRoutes);
app.use('/api', houseRoutes);

export default app;
