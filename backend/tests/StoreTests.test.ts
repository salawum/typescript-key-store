import { itemsList } from '../src/data/Store/Item';
import checkStorageType from '../src/storageType';

describe('Store.add() and Store.dbSize()', () => {
    it('Adds item to store and checks that the size of the database has increased', async () => {
        const store = checkStorageType()?.store;
        store?.clear();

        store?.add({
            item: itemsList.Paper,
            userName: 'John',
        });
        store?.add({
            item: itemsList.Paint,
            userName: 'Mike',
        });
        store?.add({
            item: itemsList.Pencil,
            userName: 'Jack',
        });

        expect(store?.dbSize()).toBe(3);
    });
});

// describe("Store.list_items()", () =>{
//     it("Lists all items in store", () => {
//         const store = checkStorageType()?.store

//         store?.add({
//             item: itemsList.Pencil,
//             user_name: "Mike"
//         })
//         store?.add({
//             item: itemsList.Paint,
//             user_name: "Gus"
//         })

//         expect(store?.list_items()).toContain("Item name: Pencil, id: 0, User: Mike");
//         expect(store?.list_items()).toContain("Item name: Paint, id: 1, User: Gus");
//     });
// });

// describe("Store.get()", () => {
//     it("Gets an item from the store and updates the last accessed time", () => {
//         const store = checkStorageType()?.store;
//         const date = new Date();

//         store?.add({
//             item: itemsList.Pencil,
//             user_name: "Mike"
//         })
//         store?.add({
//             item: itemsList.Paint,
//             user_name: "Gus"
//         })

//         expect(store?.get(0)?.last_accessed).toStrictEqual(date);
//     });
// });

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
