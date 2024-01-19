interface MyUser {
  id: number;
  name: string;
  email?: string;
  phone?: string;
}

// interface with optional fields. But feels more like code duplication.
// whenever the original interface is changed, its changes won't reflect
// into the optional interface directly
// interface MyUserOptional {
//   id?: number;
//   name?: string;
//   email?: string;
//   phone?: string;
// }

type MyUserOptional = Partial<MyUser>;

const merge = (user: MyUser, overrides: MyUserOptional): MyUser => {
  return { ...user, ...overrides };
};

console.log(
  merge(
    { name: "akhilesh", id: 3, email: "john@gmail.com" },
    { email: "john@yahoo.in", phone: "8888888888" },
  ),
);

type MyUserRequired = Required<MyUser>;
type MyUserPick = Pick<MyUser, "name" | "phone">;

type MyUserWithoutID = Omit<MyUser, "id">;

const mapByID = (users: MyUser[]): Record<string, MyUserWithoutID> => {
  return users.reduce((acc, curr) => {
    const { id, ...other } = curr;
    return { ...acc, [id]: other };
  }, {});
};

console.log(
  mapByID([
    { id: 1, name: "Mr. Foo" },
    { id: 2, name: "Mr. Bar" },
  ]),
);
