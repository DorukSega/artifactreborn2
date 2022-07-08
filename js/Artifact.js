"use strict";
const FoundryRules = {
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
};
class Entity {
    constructor(parent) {
        this.id = Entity.currentId++;
        this.parent = parent;
    }
}
Entity.currentId = 1;
class Game {
    static setRuleset(Ruleset) {
        Game.Ruleset = Ruleset;
    }
    static addPlayer(Player) {
        Game.Players.push(Player);
    }
}
Game.Players = new Array();
Game.Lanes = new Array();
class Deck {
}
class Lane extends Entity {
    constructor() {
        super(Game);
        this.sides = new Array(Game.Ruleset.Player.amount);
    }
}
class Card {
    constructor() {
        this.name = "CardName";
        this.artID = 0;
        this.color = "GRAY" /* Gray */;
        this.attack = 0;
        this.armour = 0;
        this.health = 0;
    }
    static newInstance(Parent) {
        return new Active(new this(), Parent);
    }
}
class Hero extends Card {
    constructor() {
        super(...arguments);
        this.signature = Card.prototype;
    }
}
class Active extends Entity {
    constructor(cardInstance, Parent) {
        super(Parent);
        this.color = cardInstance.color;
        this.name = cardInstance.name;
        this.artID = cardInstance.artID;
        this.armour = cardInstance.armour;
        this.attack = cardInstance.attack;
        this.health = cardInstance.health;
    }
    setParent(Parent) {
        this.parent = Parent;
    }
}
class Player {
    constructor(Name, Id, Deck) {
        this.name = Name;
        this.id = Id;
        this.passiveDeck = Deck;
    }
}
class Designer {
    designCard(card) {
        let CardElement = document.createElement("Card");
        let CardArt = document.createElement("CardArt");
        CardArt.style.backgroundImage = `url(card_art/full_art/${card.artID}.png)`;
    }
}
