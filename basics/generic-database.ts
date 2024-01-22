interface GenericDatabase<T, K> {
  get(id: K): T;
  set(id: K, value: T): void;
}

interface GenericPersistable {
  saveToString(): string;
  restoreFromString(storedState: string): void;
}

type DBKeyType = string | number | symbol;

class GenericInMemoryDB<T, K extends DBKeyType>
  implements GenericDatabase<T, K>
{
  protected db: Record<K, T> = {} as Record<K, T>;
  get(id: K): T {
    return this.db[id];
  }
  set(id: K, value: T): void {
    this.db[id] = value;
  }
}

class GenericPersistentMemoryDB<T, K extends DBKeyType>
  extends GenericInMemoryDB<T, K>
  implements GenericPersistable
{
  saveToString(): string {
    return JSON.stringify(this.db);
  }
  restoreFromString(storedState: string): void {
    this.db = JSON.parse(storedState);
  }
}
// db: Record<string, string> = {};
// above, db is public. so its values can be changed without using its methods
// for eg myDB["foo"] = "john"
// to avoid this, we can make the 'db' private/ protected

const myGenericDB = new GenericPersistentMemoryDB<number, string>();
myGenericDB.set("foo", 69);
console.log(myGenericDB.get("foo"));
const saved1 = myGenericDB.saveToString();
myGenericDB.set("foo", 420);
console.log(myGenericDB.get("foo"));

const myGenericDB2 = new GenericPersistentMemoryDB<number, string>();
myGenericDB2.restoreFromString(saved1);
console.log(myGenericDB2.get("foo"));
