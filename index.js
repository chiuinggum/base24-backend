import express from 'express';

const port = process.env.PORT || 3000;

const app = express();

app.get('/healthcheck', (req, res) => {
    res.send('base24-backend is up and running');
});

app.listen(port, () => {
    console.log(`base24-backend listening on port ${port}`);
});