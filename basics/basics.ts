let userName: string = "Akhilesh";
const hasLoggedIn: boolean = true;

userName += " Sonone";

console.log(userName);
console.log(hasLoggedIn);

const myNumber: number = 10;
console.log(myNumber);

const myRegex: RegExp = /foo/;
console.log(myRegex);

const names: string[] = userName.split(" ");
const myValues: Array<number> = [1, 2, 3];
console.log(myValues);
console.log(names);

const myObject: {
  first: string;
  last: string;
} = {
  first: "Akhilesh",
  last: "Sonone",
};
console.log(myObject);
// you can define it everytime you want, but it is counter-productive
// so instead use interface
interface Person {
  first: string;
  last: string;
}

const myPerson: Person = {
  first: "John",
  last: "Doe",
};

console.log(myPerson.first);

const ids: Record<number, string> = {
  10: "a",
  20: "b",
};

ids[30] = "c";
