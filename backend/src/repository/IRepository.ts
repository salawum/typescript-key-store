import StoreData from '../data/StoreData';

type IRepository = {
    storeData: StoreData[];

    add(value: StoreData): void;
    get(id: number): StoreData | undefined;
    clear(): void;
    listItems(): string;
    getStoreItems(): StoreData[] | undefined;
    removeById(id: number): void;
    removeByItemName(itemName: string): void;
    dbSize(): number;
};

export default IRepository;
