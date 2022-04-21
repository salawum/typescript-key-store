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

    add(value: StoreData): void {
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
        } else {
            fs.writeFileSync(this.path, JSON.stringify([item]));
        }
        this.storeData.push(item);
    }

    get(id: number): StoreData | undefined {
        const item = this.storeData.find((data) => data.id === id);
        if (item) {
            this.setLastAccessed(item);
        }
        return item;
    }

    removeByItemName(itemName: string): void {
        this.storeData.find((data) => data.itemName === itemName);
        throw new Error('Method not implemented.');
    }

    dbSize(): number {
        // return this.storeData.length;
        const rawData: Buffer = fs.readFileSync(this.path);
        const data: JSON = JSON.parse(rawData.toString('utf-8'));
        return Object.keys(data).length;
    }

    listItems(): string {
        return this.storeData.toString();
    }

    getStoreItems(): StoreData[] | undefined {
        return this.storeData;
    }

    clear(): void {
        this.storeData = [];
        fs.writeFileSync(this.path, '');
    }

    removeById(id: number): void {
        throw new Error('Method not implemented.');
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
