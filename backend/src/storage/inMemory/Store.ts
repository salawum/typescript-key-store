import StoreData from '../../data/Store/StoreData';
import StoreDatabase from '../../data/Store/StoreDatabase';

export default class Store implements StoreDatabase {
    private db: Record<string, StoreData> = {};

    public dbSize(): number {
        return Object.keys(this.db).length;
    }

    public get(id: number): StoreData | undefined {
        this.db[id].lastAccessed = new Date();
        return this.db[id];
    }

    public add(value: StoreData): void {
        value.dateAdded = new Date();
        this.db[value.item.id] = value;
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
            if (this.db[item].item.name === itemName) {
                delete this.db[item];
                return;
            }
        }
        console.error(`Cannot find item with name '${itemName}'`);
    }

    public listItems(): string {
        let itemsList = '';
        for (const item in this.db) {
            itemsList += this.itemToString(item);
        }
        return itemsList;
    }

    public itemToString(id: string): string {
        return (
            this.db[id].item.toString() +
            ', ' +
            'User: ' +
            this.db[id].userName +
            ', ' +
            'Date Added: ' +
            this.db[id].dateAdded?.toISOString() +
            ', ' +
            'Last Accessed: ' +
            this.db[id].lastAccessed?.toISOString() +
            '\n'
        );
    }
}
