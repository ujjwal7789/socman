import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';


import authRoutes from './routes/authRoutes.js';
import noticeRoutes from './routes/notice.js';
import requestRoutes from './routes/request.js';


const app = express();


app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));
app.use(
cors({
origin: process.env.CORS_ORIGIN?.split(',') || '*',
credentials: true
})
);


app.get('/health', (req, res) => res.json({ status: 'ok' }));


app.use('/auth', authRoutes);
app.use('/notices', noticeRoutes);
app.use('/requests', requestRoutes);


// Global error handler
app.use((err, req, res, next) => {
console.error(err);
const code = err.statusCode || 500;
res.status(code).json({ message: err.message || 'Internal Server Error' });
});


export default app;