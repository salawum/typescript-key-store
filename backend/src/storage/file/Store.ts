import StoreDatabase from '../../data/Store/StoreDatabase';
import StoreData from '../../data/Store/StoreData';
import fs from 'fs';

export default class Store implements StoreDatabase {
    path = 'backend/src/storage/file/store.json';

    removeByItemName(itemName: string): void {
        throw new Error('Method not implemented.');
    }

    dbSize(): number {
        const rawData: Buffer = fs.readFileSync(this.path);
        const data: JSON = JSON.parse(rawData.toString('utf-8'));
        console.log(data);
        return Object.keys(data).length;
    }

    listItems(): string {
        throw new Error('Method not implemented.');
    }

    clear(): void {
        fs.writeFileSync(this.path, '');
    }

    add(value: StoreData): void {
        if (!fs.existsSync(this.path)) {
            console.log('No file found, creating file');
            fs.writeFileSync(this.path, '');
        }
        value.dateAdded = new Date();
        const file: Buffer = fs.readFileSync(this.path);
        if (file.length !== 0) {
            const data: StoreData[] = JSON.parse(file.toString('utf-8'));
            data.push(value);
            fs.writeFileSync(this.path, JSON.stringify(data));
        } else {
            fs.writeFileSync(this.path, JSON.stringify([value]));
        }
    }

    get(id: number): StoreData | undefined {
        throw new Error('Method not implemented.');
    }

    removeById(id: number): void {
        throw new Error('Method not implemented.');
    }
}
