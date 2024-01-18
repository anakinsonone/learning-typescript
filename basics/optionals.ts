// optional parameters
function printIngredients(
  quantity: string,
  ingredient: string,
  extra?: string,
) {
  console.log(`${quantity} ${ingredient} ${extra ?? ""}`);
}

printIngredients("1C", "Flour");
printIngredients("0.5C", "Sugar", "something extra");

// optional fields
interface User {
  id: string;
  info?: {
    email?: string;
  };
}

function getEmail(user: User): string {
  return user?.info?.email ?? "no email given";
}
console.log(getEmail({ id: "fuck" }));
console.log(getEmail({ id: "fuck", info: { email: "f@gmail.com" } }));

// optional callbacks
function addWithCallback(x: number, y: number, callback?: () => void) {
  console.log([x, y]);
  callback?.();
}
addWithCallback(2, 3);
addWithCallback(2, 3, () => console.log("add with callback"));
