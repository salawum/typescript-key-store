import { User } from '../src/data/Users/User';
import checkStorageType from '../src/storageType';

describe('Users.add()', () => {
    it('Add user to database', () => {
        const db = checkStorageType()?.users;

        db?.add({
            id: 0,
            user: new User(0, 'Mike', 'pass'),
        });
        db?.add({
            id: 1,
            user: new User(1, 'Gus', '1234'),
        });

        expect(db?.dbSize()).toBe(2);
    });
});

describe('Users.removeById()', () => {
    it('Removes user from database by id', () => {
        const db = checkStorageType()?.users;
        db?.add({
            id: 0,
            user: new User(0, 'Mike', 'pass'),
        });
        db?.add({
            id: 1,
            user: new User(1, 'Gus', '1234'),
        });

        db?.removeById(0);

        expect(db?.dbSize()).toBe(1);
    });
});

describe('Users.removeByUsername()', () => {
    it('Removes user from database by username', () => {
        const db = checkStorageType()?.users;
        db?.add({
            id: 0,
            user: new User(0, 'Mike', 'pass'),
        });
        db?.add({
            id: 1,
            user: new User(1, 'Gus', '1234'),
        });

        db?.removeByUsername('Mike');

        expect(db?.dbSize()).toBe(1);
    });
});
