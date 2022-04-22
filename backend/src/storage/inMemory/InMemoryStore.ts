import IRepository from '../../repository/IRepository';
import StoreData from '../../data/StoreData';

export default class InMemoryStore implements IRepository {
    storeData: StoreData[];

    constructor(storeData: StoreData[]) {
        this.storeData = storeData;
    }

    public dbSize(): number {
        return this.storeData.length;
    }

    public get(id: number): StoreData | undefined {
        const item = this.storeData.find((data) => data.id === id);
        if (item) {
            this.setLastAccessed(item);
            return item;
        }
    }

    public add(value: StoreData): boolean {
        const item = value;
        if (item.meta?.dateAdded === undefined) {
            this.setDateAdded(item);
        }
        this.storeData.push(item);
        return true;
    }

    public clear(): boolean {
        this.storeData = [];
        if (this.storeData.length === 0) {
            return true;
        }
        return false;
    }

    public removeById(id: number): boolean {
        const newData: StoreData[] = this.storeData.filter(
            (element) => element.id !== id
        );
        if (newData !== this.storeData) {
            this.storeData = newData;
            return true;
        }
        return false;
    }

    public removeByItemName(itemName: string): boolean {
        const newData: StoreData[] = this.storeData.filter(
            (element) => element.itemName !== itemName
        );
        if (newData !== this.storeData) {
            this.storeData = newData;
            return true;
        }
        return false;
    }

    public listItems(): string {
        return this.storeData.toString();
    }

    public getStoreItems(): StoreData[] | undefined {
        return this.storeData;
    }

    private setLastAccessed(
        item: StoreData,
        lastAccessedDate: Date = new Date()
    ) {
        item.meta = {
            lastAccessed: lastAccessedDate,
            dateAdded: item.meta?.dateAdded,
        };
    }

    private setDateAdded(item: StoreData, dateAddedDate: Date = new Date()) {
        item.meta = {
            dateAdded: dateAddedDate,
            lastAccessed: item.meta?.lastAccessed,
        };
    }
}
