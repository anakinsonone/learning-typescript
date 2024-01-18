function pluck<DataType, KeyType extends keyof DataType>(
  items: DataType[],
  key: KeyType,
): DataType[KeyType][] {
  return items.map((item) => item[key]);
}

const dogs = [
  { name: "Tiger", age: 7 },
  { name: "Rio", age: 15 },
];

console.log(pluck(dogs, "name"));
console.log(pluck(dogs, "age"));

interface BaseEvent {
  time: number;
  user: string;
}

interface EventMap {
  addToCart: BaseEvent & { quantity: number; productID: string };
  checkout: BaseEvent;
}

function sendEvent<Name extends keyof EventMap>(
  name: Name,
  data: EventMap[Name],
): void {
  console.log([name, data]);
}

sendEvent("checkout", { time: 10, user: "akhilesh" });
sendEvent("addToCart", {
  user: "john",
  time: 10,
  quantity: 1,
  productID: "foo",
});
