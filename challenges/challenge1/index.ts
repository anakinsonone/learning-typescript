import houses from "./houses.json";

interface House {
  name: string;
  planets: string | string[];
}

interface HouseWithID extends House {
  id: number;
}

type FilterFunction = (house: House) => boolean;

function findHouses(
  input: string | House[],
  filter?: FilterFunction,
): HouseWithID[] {
  const houses: House[] = typeof input === "string" ? JSON.parse(input) : input;

  return (filter ? houses.filter(filter) : houses).map((house: House) => ({
    id: houses.indexOf(house),
    ...house,
  }));
}

console.log(
  findHouses(JSON.stringify(houses), ({ name }) => name === "Atreides"),
);
console.log(findHouses(houses, ({ name }) => name === "Harkonnen"));
console.log(findHouses(houses, ({ planets }) => planets.includes("Kaitan")));
