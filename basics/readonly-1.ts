interface Cat {
  name: string;
  breed: string;
}
// you can make a property readonly by adding 'readonly' keyword before it
// interface Cat {
// readonly name: string;
// breed: string;
// }
// or you can use the 'Readonly' utility type
type ReadonlyCat = Readonly<Cat>;

const makeCat = (name: string, breed: string): ReadonlyCat => {
  return {
    name,
    breed,
  };
};

const tommy = makeCat("tommy", "persian");
// making it readonly ensures that its properties cannot be mutated
// tommy.breed = "birman";
console.log(tommy);

const makeCoordinate = (
  x: number,
  y: number,
  z: number,
): readonly [number, number, number] => {
  return [x, y, z];
};

const c1 = makeCoordinate(2, 3, 4);
// now, as the reuturn type of makeCoordinate has been changed to
// readonly tuple, c1's values cannot be changed.
// c1[0] = 9;

const realConst = [1, 2, 3];
// even though the above array has been declared as a const,
// its values are still mutable
realConst[0] = 8;
console.log(realConst);
// in order to make its vales immutable as well, we need to do
// the follwing
const realConst2 = [1, 2, 3] as const;
// now the following line of code should throw an error
// realConst2[0] = 8;
