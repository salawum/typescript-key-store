import StoreData from '../../src/data/StoreData';
import FileStore from '../../src/storage/file/FileStore';

describe('FileStore add() and dbSize()', () => {
    it('Adds item to store and checks that the size of the database has increased', () => {
        const path = 'backend/tests/file-storage/store.json';
        const storeData: StoreData[] = [];
        const store = new FileStore(path, storeData);

        store.clear();

        store.add({
            id: 0,
            itemName: 'apple',
            creator: 'John',
        });
        store.add({
            id: 1,
            itemName: 'banana',
            creator: 'Mike',
        });
        store.add({
            id: 3,
            itemName: 'orange',
            creator: 'Adam',
        });

        expect(store.dbSize()).toBe(3);
    });
});

describe('FileStore listItems()', () => {
    it('Lists all items in store', () => {
        const path = 'backend/tests/file-storage/store.json';
        const storeData: StoreData[] = [];
        const store = new FileStore(path, storeData);

        store.clear();

        store.add({
            id: 0,
            itemName: 'apple',
            creator: 'John',
        });
        store.add({
            id: 3,
            itemName: 'orange',
            creator: 'Adam',
        });

        const expectedStoreData: StoreData[] = [
            {
                id: 0,
                itemName: 'apple',
                creator: 'John',
            },
            {
                id: 3,
                itemName: 'orange',
                creator: 'Adam',
            },
        ];

        expect(store.listItems()).toStrictEqual(expectedStoreData.toString());
    });
});

describe('FileStore Store.get()', () => {
    it('Gets an item from the store and updates the last accessed time', () => {
        const path = 'backend/tests/file-storage/store.json';
        const storeData: StoreData[] = [];
        const store = new FileStore(path, storeData);

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

        // Don't know how to properly test dates
        // expect(store.get(4)?.meta?.lastAccessed).toStrictEqual(new Date());
    });
});

describe('FileStore removeById()', () => {
    it('Removes an item from the store by its id', () => {
        const path = 'backend/tests/file-storage/store.json';
        const storeData: StoreData[] = [];
        const store = new FileStore(path, storeData);

        store.clear();

        store.add({
            id: 1,
            itemName: 'Apricot',
            creator: 'Mike',
        });
        store.add({
            id: 3,
            itemName: 'Pear',
            creator: 'Adam',
        });

        const expectedStoreData: StoreData[] = [
            {
                id: 3,
                itemName: 'Pear',
                creator: 'Adam',
            },
        ];

        store.removeById(1);

        expect(store.listItems()).toStrictEqual(expectedStoreData.toString());
    });
});

describe('FileStore removeByItemName()', () => {
    it('Removes an item from the store by its name', () => {
        const path = 'backend/tests/file-storage/store.json';
        const storeData: StoreData[] = [];
        const store = new FileStore(path, storeData);

        store.add({
            id: 1,
            itemName: 'Kiwi',
            creator: 'Mike',
        });
        store.add({
            id: 3,
            itemName: 'Pear',
            creator: 'Adam',
        });

        const expectedStoreData: StoreData[] = [
            {
                id: 1,
                itemName: 'Kiwi',
                creator: 'Mike',
            },
        ];

        store.removeByItemName('Pear');

        expect(store.listItems()).toStrictEqual(expectedStoreData.toString());
    });
});
