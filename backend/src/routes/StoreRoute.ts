import express from 'express';
import StoreData from '../data/StoreData';
import { getStorageType, StorageType } from '../StorageType';
import bodyParser from 'body-parser';
import { Request } from '../data/types';

export const storeRouter = express.Router();
const jsonParser = bodyParser.json();

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

storeRouter.get('/', (req: express.Request, res: express.Response) => {
    res.status(200).send('Store Home');
});

storeRouter.get('/:key', (req: Request, res: express.Response) => {
    const key: string = req.params.key;
    const item = store.get(parseInt(key));
    if (item !== undefined) {
        res.status(200).send(item);
    } else {
        res.status(404).send('Item not found');
    }
});

storeRouter.put('/:key', jsonParser, (req: Request, res: express.Response) => {
    const item: StoreData = req.body;
    item.id = parseInt(req.params.key);
    console.log(item);
    if (store.add(item)) {
        res.status(200).send(item);
    } else {
        const obj = {
            'Failed to add item': item,
        };
        res.status(400).send(obj);
    }
});

storeRouter.delete(
    '/deleteId/:key',
    jsonParser,
    (req: Request, res: express.Response) => {
        const key: string = req.params.key;
        const deleted: boolean = store.removeById(parseInt(key));
        if (deleted === true) {
            res.status(200).send('Item deleted successfully');
        } else {
            res.status(404).send('Item not found');
        }
    }
);

storeRouter.delete(
    '/deleteItemName/:name',
    jsonParser,
    (req: Request, res: express.Response) => {
        const key: string = req.params.name;
        const deleted: boolean = store.removeByItemName(key);
        if (deleted === true) {
            res.status(200).send('Item deleted successfully');
        } else {
            res.status(404).send('Item not found');
        }
    }
);
