import InMemoryUsers from './storage/inMemory/Users';
import InMemoryStore from './storage/inMemory/Store';
import FileStore from './storage/file/Store';

enum StorageType {
    InMemoryDatabase,
    File,
    SQL,
}

const storageType: StorageType = StorageType.File;

export default function checkStorageType() {
    switch (storageType) {
        case StorageType.File:
            // console.log("File System Database");
            return {
                users: new InMemoryUsers(),
                store: new FileStore(),
            };
        case StorageType.SQL:
            // console.log("SQL Database");
            break;
        default:
            // console.log("In Memory Database");
            return {
                users: new InMemoryUsers(),
                store: new InMemoryStore(),
            };
    }
}
