type Name = {
  first: string;
  last: string;
};

function addName(name: Name): Name & { fullName: string } {
  return {
    ...name,
    fullName: `${name.first} ${name.last}`,
  };
}

function permuteRows<T extends (...args: any[]) => any>(
  iteratorFunction: T,
  data: Parameters<T>[0][],
): ReturnType<T>[] {
  return data.map(iteratorFunction);
}

console.log(permuteRows(addName, [{ first: "Jane", last: "Doe" }]));

class PersonWithFullName {
  constructor(public name: Name) {}

  get fullName() {
    return `${this.name.first} ${this.name.first}`;
  }
}

function createObjects<T extends new (...args: any[]) => any>(
  objectType: T,
  data: ConstructorParameters<T>[0][],
): InstanceType<T>[] {
  return data.map((item) => new objectType(item));
}

console.log(
  createObjects(PersonWithFullName, [{ first: "John", last: "Doe" }]),
);
