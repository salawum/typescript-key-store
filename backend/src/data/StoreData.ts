type StoreData = {
    id: number;
    itemName: string;
    creator: string;
    meta?: {
        dateAdded?: Date;
        lastAccessed?: Date;
    };
};
export default StoreData;
