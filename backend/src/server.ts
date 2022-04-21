import express from 'express';
import { getStorageType, StorageType } from './StorageType';

const app = express();
const port = 3000;

const store = getStorageType(StorageType.File);

store.clear();

store.add({
    id: 2,
    itemName: 'Pear',
    creator: 'Mike',
});
store.add({
    id: 4,
    itemName: 'orange',
    creator: 'Sam',
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/store/:key', (req, res) => {
    res.send(store.get(parseInt(req.params.key)));
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
