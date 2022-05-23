// Base Artifact Class/Module - Abstract
class Game {
    readonly LaneAmount: number; // default is 3
    readonly LaneSize: number; // 5
    readonly DeckLimit: number; // 12
    readonly TowerHealth: number; // 30
    players: Array<Player>;
    spectators: Array<Spectator> = new Array<Spectator>();

    constructor(LaneAmount: number, LaneSize: number, DeckLimit: number, TowerHealth: number, PlayerCount: number) {
        this.LaneAmount = LaneAmount;
        this.LaneSize = LaneSize;
        this.DeckLimit = DeckLimit;
        this.TowerHealth = TowerHealth;
        this.players = new Array<Player>(PlayerCount);
    }

    setPlayer(index: number, name: string): boolean {
        if (this.players[index])
            return false;
        else {
            this.players[index] = new Player(name, index, this.LaneAmount, this.LaneSize, this.TowerHealth);
            return true;
        }
    }

    addSpectator(name: string): boolean {
        this.spectators.push(new Spectator(name, this.spectators.length));
        return true;
    }
}

class User {
    name: string;
    id: number;
    constructor(Name: string, Id: number) {
        this.name = Name;
        this.id = Id;
    }
}

class Spectator extends User {

}

class Player extends User {

    lanes: Array<Lane>;

    constructor(Name: string, Id: number, LaneAmount: number, LaneSize: number, TowerHealth: number) {
        super(Name, Id);
        this.lanes = new Array<Lane>(LaneAmount);
        for (let i = 0; i < LaneAmount; i++)
            this.lanes[i] = new Lane(LaneSize, TowerHealth, this);
    }

    LaneAmount(): number {
        return this.lanes.length;
    }
}

class Lane {
    readonly cards: Array<Deployable | Empty>;
    tower: Tower;
    player: Player;
    constructor(LaneSize: number, TowerHealth: number, player: Player) {
        this.cards = new Array<Empty>(LaneSize);
        this.tower = new Tower(TowerHealth);
        this.player = player;
    }

    deployCard(card: Deployable, at: number): boolean {
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

    removeCard(at: number): boolean {
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
    health: number;
    constructor(Health: number) {
        this.health = Health;
    }
}

class Color {
    readonly type: string;
    constructor(Type: string) {
        if (Type == "Red" || "Blue" || "Black" || "Green" || "Colourless")
            this.type = Type;
        else
            this.type = "Colourless"; //Default Behaviour
    }
}

abstract class Card {
    name: string;
    color: Color;
    constructor(Name: string, color: string) {
        this.name = Name;
        this.color = new Color(color);
    }
}

abstract class Deployable extends Card {
    isDeployed: boolean = false;
    deployedAt?: number;
    player?: Player;
    lane?: Lane;

    deploy(lane: Lane, at: number): boolean {
        return lane.deployCard(this, at);
    }

    remove(): boolean {
        if (this.lane && this.isDeployed && this.deployedAt)
            return this.lane?.removeCard(this.deployedAt);
        else
            return false;
    }
}
class Empty {

}
abstract class Castable extends Card {
}


class Hero extends Deployable {

}

class Creep extends Deployable {

}

class Spell extends Castable {

    mana: number;
    constructor(Name: string, Color: string, Mana: number) {
        super(Name, Color);
        this.mana = Mana;
    }
}

class TowerEnchantment extends Castable {

    mana: number;
    constructor(Name: string, Color: string, Mana: number) {
        super(Name, Color);
        this.mana = Mana;
    }
}

class Signature extends Spell {

}

class Item extends Card {
    mana: number;
    gold: number;
    constructor(Name: string, Color: string, Mana: number, Gold: number) {
        super(Name, Color);
        this.mana = Mana;
        this.gold = Gold;
    }
}

class Effect {

}

class Ability {

}



