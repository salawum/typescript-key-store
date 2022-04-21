import StoreData from './StoreData';

// IRepo
type StoreDatabase = {
    add(value: StoreData): void;
    get(id: number): StoreData | undefined;
    removeById(id: number): void;
    removeByItemName(itemName: string): void;
    dbSize(): number;
    listItems(): string;
    clear(): void;
};
export default StoreDatabase;
