import express from 'express';
import { storeRouter } from './routes/StoreRoute';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/store', storeRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
