interface Database {
  get(id: string): string;
  set(id: string, value: string): void;
}

interface Persistable {
  saveToString(): string;
  restoreFromString(storedState: string): void;
}

class InMemoryDB implements Database {
  protected db: Record<string, string> = {};
  get(id: string): string {
    return this.db[id];
  }
  set(id: string, value: string): void {
    this.db[id] = value;
  }
}

class PersistentMemoryDB extends InMemoryDB implements Persistable {
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

const myDB = new PersistentMemoryDB();
myDB.set("foo", "bar");
console.log(myDB.get("foo"));
const saved = myDB.saveToString();

const myDB2 = new PersistentMemoryDB();
myDB2.restoreFromString(saved);
console.log(myDB2.get("foo"));
