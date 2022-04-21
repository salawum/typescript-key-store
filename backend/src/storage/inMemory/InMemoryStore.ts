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

    public add(value: StoreData): void {
        const item = value;
        if (item.meta?.dateAdded === undefined) {
            this.setDateAdded(item);
        }
        this.storeData.push(item);
    }

    public clear(): void {
        this.storeData = [];
    }

    public removeById(id: number): void {
        const newData: StoreData[] = this.storeData.filter(
            (element) => element.id !== id
        );
        this.storeData = newData;
    }

    public removeByItemName(itemName: string): void {
        const newData: StoreData[] = this.storeData.filter(
            (element) => element.itemName !== itemName
        );
        this.storeData = newData;
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
