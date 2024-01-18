// In a tuple, every element has its own type
type ThreeDimensionalCoordinate = [x: number, y: number, z: number];

const add3DCoordinates = (
  c1: ThreeDimensionalCoordinate,
  c2: ThreeDimensionalCoordinate,
): ThreeDimensionalCoordinate => {
  return [c1[0] + c2[0], c1[1] + c2[1], c1[2] + c2[2]];
};

console.log(add3DCoordinates([1, 20, 3], [9, 8, 7]));

const simpleStringState = (
  initialValue: string,
): [() => string, (v: string) => void] => {
  let str: string = initialValue;
  return [
    () => str,
    (v: string) => {
      str = v;
    },
  ];
};

const [getstr1, setstr1] = simpleStringState("john");
const [getstr2, setstr2] = simpleStringState("jane");
console.log(getstr1());
console.log(getstr2());
setstr1("doe");
// setstr2("jenn");
console.log(getstr1());
console.log(getstr2());
