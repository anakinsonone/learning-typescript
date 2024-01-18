function addNumbers(a: number, b: number): number {
  return a + b;
}

export default addNumbers;

export const addStrings = (string1: string, string2: string = ""): string =>
  `${string1} ${string2}`;

export const format = (title: string, parameter: string | number): string =>
  `${title} ${parameter}`;

export const printFormat = (
  title: string,
  parameter: string | number,
): void => {
  console.log(format(title, parameter));
};

export const fetchData = (url: string): Promise<string> =>
  Promise.resolve(`Fetched Data from ${url}`);

export const introduce = (salutation: string, ...names: string[]): string =>
  `${salutation} ${names.join("")}`;

export const getName = (user: { first: string; last: string }): string =>
  `${user.first} ${user.last}`;
