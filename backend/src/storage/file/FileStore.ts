import StoreData from '../../data/StoreData';
import fs from 'fs';
import IRepository from '../../repository/IRepository';

export default class FileStore implements IRepository {
    constructor(path: string, storeData: StoreData[]) {
        this.path = path;
        this.storeData = storeData;
    }

    storeData: StoreData[];
    path: string;

    public add(value: StoreData): void {
        if (!fs.existsSync(this.path)) {
            console.error('No file found');
        }

        const item = value;
        this.setDateAdded(item);

        const file: Buffer = fs.readFileSync(this.path);
        if (file.length !== 0) {
            const data: StoreData[] = JSON.parse(file.toString('utf-8'));
            data.push(item);
            fs.writeFileSync(this.path, JSON.stringify(data));
            this.storeData.push(item);
        } else {
            fs.writeFileSync(this.path, JSON.stringify([item]));
            this.storeData.push(item);
        }
    }

    public get(id: number): StoreData | undefined {
        const item = this.storeData.find((data) => data.id === id);
        if (item) {
            this.setLastAccessed(item);
            return item;
        }
    }

    public removeByItemName(itemName: string): void {
        const newData: StoreData[] = this.storeData.filter(
            (element) => element.itemName !== itemName
        );
        this.storeData = newData;
        fs.writeFileSync(this.path, JSON.stringify(newData));
    }

    public dbSize(): number {
        const rawData: Buffer = fs.readFileSync(this.path);
        const data: JSON = JSON.parse(rawData.toString('utf-8'));
        return Object.keys(data).length;
    }

    public listItems(): string {
        return this.storeData.toString();
    }

    public getStoreItems(): StoreData[] | undefined {
        return this.storeData;
    }

    public clear(): void {
        this.storeData = [];
        fs.writeFileSync(this.path, '');
    }

    public removeById(id: number): void {
        const newData: StoreData[] = this.storeData.filter(
            (element) => element.id !== id
        );
        this.storeData = newData;
        fs.writeFileSync(this.path, JSON.stringify(newData));
    }

    private setLastAccessed(
        item: StoreData,
        lastAccessedDate: Date = new Date()
    ) {
        if (item.meta?.lastAccessed === undefined) {
            item.meta = {
                lastAccessed: lastAccessedDate,
            };
        }
    }

    private setDateAdded(item: StoreData, dateAdded: Date = new Date()) {
        if (item.meta?.dateAdded === undefined) {
            item.meta = {
                dateAdded: dateAdded,
            };
        }
    }
}
