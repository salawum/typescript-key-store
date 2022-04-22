import StoreData from '../data/StoreData';

type IRepository = {
    storeData: StoreData[];

    add(value: StoreData): boolean;
    get(id: number): StoreData | undefined;
    clear(): boolean;
    listItems(): string;
    getStoreItems(): StoreData[] | undefined;
    removeById(id: number): boolean;
    removeByItemName(itemName: string): boolean;
    dbSize(): number;
};

export default IRepository;
