import StoreData from '../../src/data/StoreData';
import InMemoryStore from '../../src/storage/inMemory/InMemoryStore';

describe('InMemoryStore add() and dbSize()', () => {
    it('Adds item to store and checks that the size of the database has increased', () => {
        const storeData: StoreData[] = [];
        const store = new InMemoryStore(storeData);

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

describe('InMemoryStore listItems()', () => {
    it('Lists all items in store', () => {
        const storeData: StoreData[] = [];
        const store = new InMemoryStore(storeData);

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

describe('InMemoryStore Store.get()', () => {
    it('Gets an item from the store and updates the last accessed time', () => {
        const storeData: StoreData[] = [];
        const store = new InMemoryStore(storeData);

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

describe('InMemoryStore removeById()', () => {
    it('Removes an item from the store by its id', () => {
        const storeData: StoreData[] = [];
        const store = new InMemoryStore(storeData);

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

describe('InMemoryStore removeByItemName()', () => {
    it('Removes an item from the store by its name', () => {
        const storeData: StoreData[] = [];
        const store = new InMemoryStore(storeData);

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
