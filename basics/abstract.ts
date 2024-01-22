abstract class StreetFighter {
  constructor() {}

  move() {}
  fight() {
    return `${this.name} attacks with ${this.getSpecialAttack()}.`;
  }

  abstract getSpecialAttack(): string;
  abstract get name(): string;
}

class Ryu extends StreetFighter {
  getSpecialAttack() {
    return "Hadoken";
  }
  get name() {
    return "Ryu";
  }
}

class Chunli extends StreetFighter {
  getSpecialAttack() {
    return "Lightning Kick";
  }
  get name() {
    return "Chun-Li";
  }
}

const ryu = new Ryu();
const chunli = new Chunli();
console.log(ryu.fight());
console.log(chunli.fight());
