"use strict";
// Base Artifact Class/Module - Abstract
class Game {
    constructor(LaneAmount, LaneSize, DeckLimit, TowerHealth, PlayerCount) {
        this.spectators = new Array();
        this.LaneAmount = LaneAmount;
        this.LaneSize = LaneSize;
        this.DeckLimit = DeckLimit;
        this.TowerHealth = TowerHealth;
        this.players = new Array(PlayerCount);
    }
    setPlayer(index, name) {
        if (this.players[index])
            return false;
        else {
            this.players[index] = new Player(name, index, this.LaneAmount, this.LaneSize, this.TowerHealth);
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
    constructor(Name, Id, LaneAmount, LaneSize, TowerHealth) {
        super(Name, Id);
        this.lanes = new Array(LaneAmount);
        for (let i = 0; i < LaneAmount; i++)
            this.lanes[i] = new Lane(LaneSize, TowerHealth, this);
    }
    LaneAmount() {
        return this.lanes.length;
    }
}
class Lane {
    constructor(LaneSize, TowerHealth, player) {
        this.cards = new Array(LaneSize);
        this.tower = new Tower(TowerHealth);
        this.player = player;
    }
    deployCard(card, at) {
        if (this.cards[at] instanceof Deployable)
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
            this.cards[at] = Empty;
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
class Empty {
}
class Castable extends Card {
}
class Hero extends Deployable {
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
