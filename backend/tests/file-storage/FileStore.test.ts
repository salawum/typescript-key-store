import StoreData from '../../src/data/StoreData';
import FileStore from '../../src/storage/file/FileStore';

describe('Store.add() and Store.dbSize()', () => {
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

describe('listItems()', () => {
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

describe('Store.get()', () => {
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
        expect(store.get(4)?.meta?.lastAccessed).toStrictEqual(new Date());
    });
});

// describe("Store.removeById()", () => {
//     it("Removes an item from the store by its id", () => {
//         const store = checkStorageType()?.store;

//         store?.add({
//             item: itemsList.Pencil,
//             user_name: "Mike"
//         })
//         store?.add({
//             item: itemsList.Paint,
//             user_name: "Gus"
//         })

//         store?.removeById(1);

//         expect(store?.list_items()).toContain("Item name: Pencil, id: 0, User: Mike");
//     });
// });

// describe("Store.removeByItemName()", () => {
//     it("Removes an item from the store by its name", () => {
//         const store = checkStorageType()?.store;

//         store?.add({
//             item: itemsList.Pencil,
//             user_name: "Mike"
//         })
//         store?.add({
//             item: itemsList.Paint,
//             user_name: "Gus"
//         })

//         store?.removeByItemName("Pencil");

//         expect(store?.list_items()).toContain("Item name: Paint, id: 1, User: Gus");
//     });
// });
