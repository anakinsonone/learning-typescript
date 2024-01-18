function simpleState<T>(initialValue: T): [() => T, (v: T) => void] {
  let val: T = initialValue;
  return [
    () => val,
    (v: T) => {
      val = v;
    },
  ];
}

const [st1getter, st1setter] = simpleState(10);
console.log(st1getter());
st1setter(69);
console.log(st1getter());

const [st2getter, st2setter] = simpleState<null | string>(null);
console.log(st2getter());
st2setter("string");
console.log(st2getter());

interface Rank<RankItem> {
  item: RankItem;
  rank: number;
}

function ranker<RankItem>(
  items: RankItem[],
  rank: (v: RankItem) => number,
): RankItem[] {
  const ranks: Rank<RankItem>[] = items.map((item) => ({
    item,
    rank: rank(item),
  }));
  ranks.sort((a, b) => b.rank - a.rank);
  return ranks.map(({ item }) => item);
}

interface Pokemon {
  name: string;
  hp: number;
}

const pokemons: Pokemon[] = [
  { name: "Bulbasaur", hp: 69 },
  { name: "Charizard", hp: 97 },
];

const ranks = ranker(pokemons, ({ hp }) => hp);
console.log(ranks);
