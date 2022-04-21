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
