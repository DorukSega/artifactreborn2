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


abstract class GameObject<Ptype, Ctype> {
    static #currentId = 1;
    id: number;
    parent?: Ptype;
    child?: Ctype;
    constructor(hierarchy?: { parent?: Ptype, child?: Ctype }) {
        this.id = GameObject.#currentId++;
        this.parent = hierarchy?.parent;
        this.child = hierarchy?.child;
    }
}

abstract class Game {
    static Players: Array<Player> = new Array<Player>;
    static Ruleset: Ruleset;
    static Board: Board;
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

type GameObjectContainer = Array<GameObject<any, any>>;

class Deck {

}

class Board extends GameObject<undefined, Lane>{

}

class Lane extends GameObject<Board, Side>{

}

class Side extends GameObject<Lane, GameObjectContainer>{

}

abstract class Card extends GameObject<Side, undefined> { //TODO: add a ability container as child
    name: string;
    color: Color;
    constructor(Name: string, Color: Color) {
        super();
        this.name = Name;
        this.color = Color;
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
