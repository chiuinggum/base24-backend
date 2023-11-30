import express from 'express';
import userRouter from './routes/userRouter.js';
const port = process.env.PORT || 3000;

const app = express();

app.get('/healthcheck', (req, res) => {
    res.send('base24-backend is up and running');
});

app.use('/users', userRouter);

app.listen(port, () => {
    console.log(`base24-backend listening on port ${port}`);
});