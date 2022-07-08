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

abstract class Entity<Ptype> { //Ptype refers to parent type
    static currentId = 1;
    id: number;
    parent: Ptype;

    constructor(parent: Ptype) {
        this.id = Entity.currentId++;
        this.parent = parent;
    }
}

class Game {
    static Players: Array<Player> = new Array<Player>();
    static Ruleset: Ruleset;

    static Lanes: Array<Lane> = new Array<Lane>();

    static setRuleset(Ruleset: Ruleset) {
        Game.Ruleset = Ruleset;
    }
    static addPlayer(Player: Player) {
        Game.Players.push(Player);
    }
}

const enum Color {
    Red = "RED",
    Blue = "BLUE",
    Green = "GREEN",
    Black = "BLACK",
    Gold = "GOLD",
    Gray = "GRAY",
}

class Deck {

}

type Side = Array<Card>;

class Lane extends Entity<Game>{
    sides: Array<Side>;
    constructor() {
        super(Game)
        this.sides = new Array<Side>(Game.Ruleset.Player.amount);
    }
}

interface CardInterface {
    name: string,
    artID: number, //location of art
    color: Color,
    armour: number,
    attack: number,
    health: number,
}

type CardParent = Lane | Player; //Parent of the Card

type Points = { armour: number, attack: number, health: number };

class Card implements CardInterface { //TODO: add a ability container
    readonly name: string = "CardName";
    readonly artID: number = 0;
    readonly color: Color = Color.Gray;
    readonly attack: number = 0;
    readonly armour: number = 0;
    readonly health: number = 0;

    static newInstance(Parent: CardParent): Active { //gives a new card
        return new Active(new this(), Parent);
    }

}

abstract class Hero extends Card {
    readonly signature: Card = Card.prototype;
}

class Active extends Entity<CardParent> implements CardInterface {
    readonly name: string;
    readonly color: Color;
    readonly artID: number;
    armour: number;
    attack: number;
    health: number;

    constructor(cardInstance: Card, Parent: CardParent) {
        super(Parent);
        this.color = cardInstance.color;
        this.name = cardInstance.name;
        this.artID = cardInstance.artID;
        this.armour = cardInstance.armour;
        this.attack = cardInstance.attack;
        this.health = cardInstance.health;
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

class Designer {
    designCard(card: CardInterface) {
        let CardElement: HTMLElement = document.createElement("Card");
        let CardArt: HTMLElement = document.createElement("CardArt");
        CardArt.style.backgroundImage = `url(card_art/full_art/${card.artID}.png)`;

    }
}