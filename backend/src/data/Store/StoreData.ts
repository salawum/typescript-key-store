import { Item } from './Item';

// StoreItem
type StoreData = {
    item: Item;
    userName: string;
    dateAdded?: Date;
    lastAccessed?: Date;
};
export default StoreData;
