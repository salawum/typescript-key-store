export class Item {
    id: number;
    name: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

    toString(): string {
        return `Item name: ${this.name}, id: ${this.id}`;
    }
}

export const itemsList = {
    Pencil: new Item(0, 'Pencil'),
    Paint: new Item(1, 'Paint'),
    Paper: new Item(2, 'Paper'),
    Glitter: new Item(3, 'Glitter'),
};
