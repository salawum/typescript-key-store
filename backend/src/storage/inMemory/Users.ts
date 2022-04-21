import UserDatabase from '../../data/Users/UserDatabase';
import UserData from '../../data/Users/UserData';

export default class Users implements UserDatabase {
    private db: Record<number, UserData> = {};

    public dbSize(): number {
        return Object.keys(this.db).length;
    }

    public get(id: number): UserData | undefined {
        return this.db[id];
    }

    public add(value: UserData): void {
        this.db[value.id] = value;
    }

    public removeById(id: number): void {
        if (this.db[id]) {
            delete this.db[id];
            return;
        }
        console.error(`Cannot find id ${id}`);
    }

    public removeByUsername(username: string): void {
        if (this.db) {
            for (const userId in this.db) {
                if (this.db[userId].user.username === username) {
                    delete this.db[userId];
                    return;
                }
            }
            console.error(`Cannot find username ${username}`);
        }
    }
}
