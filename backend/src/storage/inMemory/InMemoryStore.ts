import IRepository from '../../repository/IRepository';
import StoreData from '../../data/StoreData';

export default class InMemoryStore implements IRepository {
    storeData: StoreData[];

    constructor(storeData: StoreData[]) {
        this.storeData = storeData;
    }

    private db: Record<string, StoreData> = {};

    public dbSize(): number {
        return Object.keys(this.db).length;
    }

    public get(id: number): StoreData | undefined {
        const item = this.db[id];
        this.setLastAccessed(item);
        return this.db[id];
    }

    public add(value: StoreData): void {
        const item = value;
        this.setDateAdded(item);
        this.db[item.id] = item;
    }

    public clear(): void {
        this.db = {};
    }

    public removeById(id: number): void {
        if (this.db[id]) {
            delete this.db[id];
            return;
        }
        console.error(`Cannot find id ${id}`);
    }

    public removeByItemName(itemName: string): void {
        for (const item in this.db) {
            if (this.db[item].itemName === itemName) {
                delete this.db[item];
                return;
            }
        }
        console.error(`Cannot find item with name '${itemName}'`);
    }

    public listItems(): string {
        // let itemsList = '';
        // for (const item in this.db) {
        //     itemsList += this.itemToString(item);
        // }
        // return itemsList;
        return this.db.toString();
    }

    public getStoreItems(): StoreData[] | undefined {
        return this.storeData;
    }

    setLastAccessed(item: StoreData, lastAccessedDate: Date = new Date()) {
        if (item.meta?.lastAccessed === undefined) {
            item.meta = {
                lastAccessed: lastAccessedDate,
            };
        }
    }

    setDateAdded(item: StoreData, dateAdded: Date = new Date()) {
        if (item.meta?.dateAdded === undefined) {
            item.meta = {
                dateAdded: dateAdded,
            };
        }
    }
}
