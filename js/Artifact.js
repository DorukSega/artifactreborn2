"use strict";
// Base Artifact Class/Module - Abstract
class Game {
    constructor(LaneAmount, LaneSize, DeckLimit, TowerHealth, PlayerCount, DeckHeroAmount, DeckCastableAmount, DeckItemAmount) {
        this.spectators = new Array();
        this.LaneAmount = LaneAmount;
        this.LaneSize = LaneSize;
        this.HandLimit = DeckLimit;
        this.TowerHealth = TowerHealth;
        this.DeckHeroAmount = DeckHeroAmount;
        this.DeckCastableAmount = DeckCastableAmount;
        this.DeckItemAmount = DeckItemAmount;
        this.players = new Array(PlayerCount);
    }
    setPlayer(index, name, deck) {
        if (this.players[index])
            return false;
        else {
            this.players[index] = new Player(name, index, this, deck);
            return true;
        }
    }
    addSpectator(name) {
        this.spectators.push(new Spectator(name, this.spectators.length));
        return true;
    }
}
class User {
    constructor(Name, Id) {
        this.name = Name;
        this.id = Id;
    }
}
class Spectator extends User {
}
class Player extends User {
    constructor(Name, Id, game, deck) {
        super(Name, Id);
        this.game = game;
        this.lanes = new Array(game.LaneAmount);
        for (let i = 0; i < game.LaneAmount; i++)
            this.lanes[i] = new Lane(this);
        this.deck = new PlayDeck(game, deck).assign(this);
    }
    LaneAmount() {
        return this.lanes.length;
    }
}
class Deck {
    constructor(game) {
        this.game = game;
        this.heroes = new Array(game.DeckHeroAmount);
        this.cards = new Array(game.DeckCastableAmount);
        this.items = new Array(game.DeckItemAmount);
    }
    pushCard(card, times = 1) {
        let indArr = [];
        for (let i = 0; times; i++)
            if (!this.cards[i]) {
                indArr.push(i);
                times--;
            }
        if (!times) { //times == 0
            let i;
            while ((i = indArr.pop()) != undefined) {
                this.cards[i] = card;
                if (this.player)
                    card.player = this.player;
            }
            return true;
        }
        else
            return false;
    }
    pushHero(hero) {
        for (let i = 0; i < this.heroes.length; i++)
            if (!this.heroes[i]) {
                this.heroes[i] = hero;
                if (this.player)
                    hero.player = this.player;
                this.pushCard(hero.signature, 3);
                return true;
            }
        ;
        return false;
    }
    assign(player) {
        this.player = player;
        return this;
    }
}
class PlayDeck extends Deck {
    constructor(game, deck) {
        super(game);
        this.heroes = deck.heroes.map(e => e); //clone of the array
        this.cards = deck.cards.map(e => e);
        this.items = deck.items.map(e => e);
    }
}
class Hand {
    constructor(DeckLimit) {
        this.cards = new Array(DeckLimit);
    }
}
class Lane {
    constructor(player) {
        this.player = player;
        this.cards = new Array(player.game.LaneSize);
        this.tower = new Tower(player.game.TowerHealth);
    }
    deployCard(card, at) {
        if (this.cards[at])
            return false;
        else {
            this.cards[at] = card;
            card.player = this.player;
            card.lane = this;
            card.isDeployed = true;
            card.deployedAt = at;
            return true;
        }
    }
    removeCard(at) {
        let card = this.cards[at];
        if (card instanceof Deployable) {
            card.isDeployed = false;
            this.cards[at] = null;
            return true;
        }
        else
            return false;
    }
}
class Tower {
    constructor(Health) {
        this.health = Health;
    }
}
class Color {
    constructor(Type) {
        if (Type == "Red" || "Blue" || "Black" || "Green" || "Colourless")
            this.type = Type;
        else
            this.type = "Colourless"; //Default Behaviour
    }
}
class Card {
    constructor(Name, color) {
        this.name = Name;
        this.color = new Color(color);
    }
}
class Deployable extends Card {
    constructor() {
        super(...arguments);
        this.isDeployed = false;
    }
    deploy(lane, at) {
        return lane.deployCard(this, at);
    }
    remove() {
        var _a;
        if (this.lane && this.isDeployed && this.deployedAt)
            return (_a = this.lane) === null || _a === void 0 ? void 0 : _a.removeCard(this.deployedAt);
        else
            return false;
    }
}
class Castable extends Card {
}
class Hero extends Deployable {
    constructor(name, color, signature) {
        super(name, color);
        this.signature = signature;
    }
}
class Creep extends Deployable {
}
class Spell extends Castable {
    constructor(Name, Color, Mana) {
        super(Name, Color);
        this.mana = Mana;
    }
}
class TowerEnchantment extends Castable {
    constructor(Name, Color, Mana) {
        super(Name, Color);
        this.mana = Mana;
    }
}
class Signature extends Spell {
}
class Item extends Card {
    constructor(Name, Color, Mana, Gold) {
        super(Name, Color);
        this.mana = Mana;
        this.gold = Gold;
    }
}
class Effect {
}
class Ability {
}
