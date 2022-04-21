import UserData from './UserData';

type UserDatabase = {
    dbSize(): number;
    add(value: UserData): void;
    get(id: number): UserData | undefined;
    removeById(id: number): void;
    removeByUsername(username: string): void;
};
export default UserDatabase;
