export class User {
    id: number;
    username: string;
    password: string;

    constructor(id: number, username: string, password: string) {
        this.username = username;
        this.id = id;
        this.password = password;
    }

    toString(): string {
        return `Id: ${this.id}, Username: ${this.username}, password: ${this.password}`;
    }
}

export const usersList = {
    Gus: new User(0, 'Gus', 'pass'),
    John: new User(1, 'John', 'password'),
    Mike: new User(2, 'Mike', '1234'),
};
