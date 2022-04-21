import InMemoryStore from './storage/inMemory/InMemoryStore';
import FileStore from './storage/file/FileStore';
import IRepository from './repository/IRepository';
import StoreData from './data/StoreData';

export enum StorageType {
    InMemoryDatabase,
    File,
    SQL,
}

export function getStorageType(storageType: StorageType): IRepository {
    const storeData: StoreData[] = [];
    switch (storageType) {
        case StorageType.File: {
            const path = 'backend/src/storage/file/store.json';
            return new FileStore(path, storeData);
        }
        case StorageType.SQL: {
            const path = 'backend/src/storage/file/store.json';
            return new FileStore(path, storeData);
        }
        default: {
            const path = 'backend/src/storage/file/store.json';
            return new FileStore(path, storeData);
        }
    }
}
