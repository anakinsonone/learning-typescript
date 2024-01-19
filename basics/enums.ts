// instead of keeping 3 separate variables, just keep one variable that accepts
// one of the above states.

enum LoadingState {
  beforeLoading = "beforeLoad",
  loading = "loading",
  loaded = "loaded",
}

const isLoading = (state: LoadingState) => state === LoadingState.loading;

// console.log(isLoading("dog"));
// function should accept only one of the available states;
// this can be enforced with the help of enums
// now, as a result of enum, it will throw an error if any alien variable is passed.
console.log(isLoading(LoadingState.loading));

// Literal types

// here, dice can be any number. but if we wanted to limit it, we can add
// a literal type to it.
// const rollDice = (dice: number): number => {
//   let pip = 0;
//   for (let i = 0; i < dice; i++) {
//     pip += Math.floor(Math.random() * 9) + 1;
//   }
//   return pip;
// };
// This is how it can be enumerated. Also called as 'Numeric literals'
const rollDice = (dice: 1 | 2 | 3): number => {
  let pip = 0;
  for (let i = 0; i < dice; i++) {
    pip += Math.floor(Math.random() * 9) + 1;
  }
  return pip;
};

console.log(rollDice(3));

// These are string literals
function sendEvent(name: "addToCart", data: { productID: number }): void;
function sendEvent(name: "checkout", data: { cartCount: number }): void;
function sendEvent(name: string, data: unknown): void {
  console.log(`${name} ${JSON.stringify(data)}`);
}

sendEvent("checkout", { cartCount: 5 });
sendEvent("addToCart", { productID: 69 });
