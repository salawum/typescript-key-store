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

    public add(value: StoreData): boolean {
        if (!fs.existsSync(this.path)) {
            console.error('No file found');
            return false;
        }

        const item = value;
        if (item.meta?.dateAdded === undefined) {
            this.setDateAdded(item);
        }

        const file: Buffer = fs.readFileSync(this.path);
        if (file.length !== 0) {
            const data: StoreData[] = JSON.parse(file.toString('utf-8'));
            data.push(item);
            fs.writeFileSync(this.path, JSON.stringify(data));
            this.storeData.push(item);
            return true;
        } else {
            fs.writeFileSync(this.path, JSON.stringify([item]));
            this.storeData.push(item);
            return true;
        }
    }

    public get(id: number): StoreData | undefined {
        const item = this.storeData.find((data) => data.id === id);
        if (item) {
            this.setLastAccessed(item);
            this.removeById(item.id);
            this.add(item);
            return item;
        }
    }

    public removeById(id: number): boolean {
        const newData: StoreData[] = this.storeData.filter(
            (element) => element.id !== id
        );
        if (newData.length !== this.storeData.length) {
            this.storeData = newData;
            fs.writeFileSync(this.path, JSON.stringify(this.storeData));
            return true;
        }
        return false;
    }

    public removeByItemName(itemName: string): boolean {
        const newData: StoreData[] = this.storeData.filter(
            (element) => element.itemName !== itemName
        );
        if (newData.length !== this.storeData.length) {
            this.storeData = newData;
            fs.writeFileSync(this.path, JSON.stringify(this.storeData));
            return true;
        }
        return false;
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

    public clear(): boolean {
        this.storeData = [];
        fs.writeFileSync(this.path, JSON.stringify(this.storeData));
        if (
            this.storeData.length === 0 &&
            fs.readFileSync(this.path).length === 0
        ) {
            return true;
        }
        return false;
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
