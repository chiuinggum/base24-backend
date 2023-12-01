import express from 'express';
import userRouter from './routes/userRouter.js';
import cors from 'cors';
import markerRouter from './routes/markerRouter.js';
import mapRouter from './routes/mapRouter.js';
const port = process.env.PORT || 4000;

const app = express();

app.get('/healthcheck', (req, res) => {
    res.send('base24-backend is up and running');
});

app.use('/users', userRouter);
app.use(cors());

app.use('/marker', markerRouter);

app.use('/map', mapRouter);

app.listen(port, () => {
    console.log(`base24-backend listening on port ${port}`);
});