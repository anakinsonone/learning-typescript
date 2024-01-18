// Challenge is to replicate forEach, filter & map functions using reduce.

function myForEach<T>(items: T[], forEachFunction: (v: T) => void): void {
  items.reduce((acc, curr) => {
    forEachFunction(curr);
    return undefined;
  }, undefined);
}

myForEach([1, 2, 3], (v) => console.log(v));

function myFilter<T>(items: T[], filterFunction: (v: T) => boolean): T[] {
  return items.reduce(
    (acc, curr) => (filterFunction(curr) ? [...acc, curr] : acc),
    [] as T[],
  );
}

console.log(myFilter([1, 2, 3, 4, 5, 6, 7, 8], (v) => v % 2 === 0));

function myMap<T, K>(items: T[], mapFunc: (v: T) => K): K[] {
  return items.reduce((acc, curr) => [...acc, mapFunc(curr)], [] as K[]);
}

console.log(myMap([1, 2, 3, 4, 5, 6, 7, 8], (v) => (v * 10).toString()));
