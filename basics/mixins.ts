// A function that returns a function;
function myLogFunction() {
  return (val: string): void => {
    console.log(val);
  };
}

const logger = myLogFunction();
logger("hello");

// A function that returns a class.
function createLoggerClass() {
  return class MyLoggerClass {
    private completeLog: string = "";

    log(val: string) {
      console.log(val);
      this.completeLog += val;
    }

    dumpLog() {
      return this.completeLog;
    }
  };
}

const MyLogger = createLoggerClass();
const logger2 = new MyLogger();
logger2.log("anakin");
console.log(logger2.dumpLog());

function CreateSimpleMemoryDatabase<T>() {
  return class SimpleMemoryDatabase {
    private db: Record<string, T> = {};

    set(id: string, value: T) {
      this.db[id] = value;
    }

    get(id: string) {
      return this.db[id];
    }

    getObject(): object {
      return this.db;
    }
  };
}

const StringDatabase = CreateSimpleMemoryDatabase<string>();
const sdb1 = new StringDatabase();
sdb1.set("foo", "bar");
console.log(sdb1.get("foo"));
console.log(sdb1.getObject());

type Constructor<T> = new (...args: any[]) => T;

function Dumpable<T extends Constructor<{ getObject(): object }>>(Base: T) {
  return class Dumpable extends Base {
    dump() {
      console.log(this.getObject());
    }
  };
}

const DumpableStringDatabase = Dumpable(StringDatabase);
const sdb2 = new DumpableStringDatabase();
sdb2.set("name", "john");
sdb2.dump();
