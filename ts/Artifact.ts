interface Ruleset {
    Lane: {
        amount: number,             // default is 3
        size: number                // 5
    },
    Hand: {
        limit: number,              // 12
    },
    Deck: {
        heroAmount: number,         // 5
        castableAmount: number,     // 40
        itemAmount: number          // 10
    },
    Tower: {
        health: number              // 30
    },
    Player: {
        amount: number              // 2
    }
}

const FoundryRules: Ruleset = { //Artifact 2 Ruleset
    Lane: {
        amount: 3,
        size: 5
    },
    Hand: {
        limit: 12,
    },
    Deck: {
        heroAmount: 5,
        castableAmount: 40,
        itemAmount: 10
    },
    Tower: {
        health: 30
    },
    Player: {
        amount: 2
    }
}

abstract class GameObject<Ptype> { //Ptype refers to parent type
    static #currentId = 1;
    id: number;
    parent?: Ptype;
    constructor(parent?: Ptype) {
        this.id = GameObject.#currentId++;
        this.parent = parent;
    }
}

abstract class Game {
    static Players: Array<Player> = new Array<Player>;
    static Ruleset: Ruleset;

    static Lanes: Array<Lane> = new Array<Lane>;

    static setRuleset(Ruleset: Ruleset) {
        Game.Ruleset = Ruleset;
    }
    static addPlayer(Player: Player) {
        Game.Players.push(Player);
    }
}

interface Color {
    name: string,
    cssVar: string,
    creepCssVar?: string
}

class Deck {

}

type Side = Array<Card>;

class Lane extends GameObject<Game>{
    sides: Array<Side>;
    constructor() {
        super(Game);
        this.sides = new Array<Side>(Game.Ruleset.Player.amount);
    }
}

interface CardInterface {
    name: string,
    color: Color,
    armour: number,
    attack: number,
    health: number,
}

type CardParent = Lane | Player; //Parent of the Card
type Points = { armour: number, attack: number, health: number };
abstract class Card implements CardInterface { //TODO: add a ability container
    name: string;
    color: Color;
    readonly armour: number;
    readonly attack: number;
    readonly health: number;

    constructor(Name: string, Color: Color, Points: Points | undefined) {
        this.name = Name;
        this.color = Color;

        if (Points) {
            this.armour = Points.armour;
            this.attack = Points.attack;
            this.health = Points.health;
        } else
            this.armour = this.attack = this.health = 0;

    }

    newInstance(Parent: CardParent): Active { //gives a new card
        return new Active(this, Parent);
    }
}

class Active extends GameObject<CardParent> implements CardInterface {
    readonly name: string;
    readonly color: Color;

    armour: number;
    attack: number;
    health: number;

    constructor(Card: Card, Parent: CardParent) {
        super(Parent);
        this.color = Card.color;
        this.name = Card.name;

        this.armour = Card.armour;
        this.attack = Card.attack;
        this.health = Card.health;
    }

    setParent(Parent: CardParent) {
        this.parent = Parent;
    }
}

class Player {
    //activeDeck: Deck;
    readonly passiveDeck: Deck;
    name: string;
    id: number;
    hand?: Array<Card>;

    constructor(Name: string, Id: number, Deck: Deck) {
        this.name = Name;
        this.id = Id;
        this.passiveDeck = Deck;
    }

}

const Red: Color = {
    name: "Red",
    cssVar: "--cardred",
    creepCssVar: "--creepred"
}

const Blue: Color = {
    name: "Blue",
    cssVar: "--cardblue",
    creepCssVar: "--creepblue"
}

const Green: Color = {
    name: "Green",
    cssVar: "--cardgreen",
    creepCssVar: " --creepgreen"
}

const Black: Color = {
    name: "Black",
    cssVar: "--cardblack",
    creepCssVar: "--creepblack"
}

const Gold: Color = {
    name: "Gold",
    cssVar: "--cardgold"
}

const Gray: Color = {
    name: "Gold",
    cssVar: "--creepgray",
    creepCssVar: "--creepgray"
}
