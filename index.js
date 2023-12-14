import express from 'express';
import cors from 'cors';
import tripsRouter from './routes/tripsRouter.js';
import mapsRouter from './routes/mapsRouter.js';
import markersRouter from './routes/markersRouter.js';
import pathsRouter from './routes/pathsRouter.js';
import datesRouter from './routes/datesRouter.js';
import mapPathsRouter from './routes/mapPathsRouter.js';
import usersRouter from './routes/usersRouter.js';
const port = process.env.PORT || 4000;

const app = express();

app.use(cors());

app.get('/healthcheck', (req, res) => {
    res.send('base24-backend is up and running');
});

// app.use('/users', userRouter);

// app.use('/marker', markerRouter); 

// app.use('/map', mapRouter); 

app.use('/trips', tripsRouter);
app.use('/maps', mapsRouter);
app.use('/markers', markersRouter);
app.use('/paths', pathsRouter);
app.use('/dates', datesRouter);
app.use('/mappaths', mapPathsRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`base24-backend listening on port ${port}`);
});