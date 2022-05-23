// Base Artifact Class/Module - Abstract
class Game {
    readonly LaneAmount: number; // default is 3
    readonly LaneSize: number; // 5
    readonly HandLimit: number; // 12
    readonly DeckHeroAmount: number; // 5
    readonly DeckCastableAmount: number; // 40
    readonly DeckItemAmount: number; // 10
    readonly TowerHealth: number; // 30
    players: Array<Player>;
    spectators: Array<Spectator> = new Array<Spectator>();

    constructor(
        LaneAmount: number, LaneSize: number, DeckLimit: number,
        TowerHealth: number, PlayerCount: number, DeckHeroAmount: number,
        DeckCastableAmount: number, DeckItemAmount: number
    ) {
        this.LaneAmount = LaneAmount;
        this.LaneSize = LaneSize;
        this.HandLimit = DeckLimit;
        this.TowerHealth = TowerHealth;
        this.DeckHeroAmount = DeckHeroAmount;
        this.DeckCastableAmount = DeckCastableAmount;
        this.DeckItemAmount = DeckItemAmount;
        this.players = new Array<Player>(PlayerCount);
    }

    setPlayer(index: number, name: string, deck: Deck): boolean {
        if (this.players[index])
            return false;
        else {
            this.players[index] = new Player(name, index, this, deck);
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

class Spectator extends User { }

class Player extends User {
    readonly game: Game;
    lanes: Array<Lane>;
    readonly deck: PlayDeck;
    constructor(Name: string, Id: number, game: Game, deck: Deck) {
        super(Name, Id);
        this.game = game;
        this.lanes = new Array<Lane>(game.LaneAmount);
        for (let i = 0; i < game.LaneAmount; i++)
            this.lanes[i] = new Lane(this);
        this.deck = new PlayDeck(game, deck).assign(this);
    }

    LaneAmount(): number {
        return this.lanes.length;
    }
}

class Deck {
    heroes: Array<Hero | null>;
    cards: Array<Creep | Spell | TowerEnchantment | null>;
    items: Array<Item | null>;
    player?: Player;
    readonly game: Game;
    constructor(game: Game) {
        this.game = game;
        this.heroes = new Array<null>(game.DeckHeroAmount);
        this.cards = new Array<null>(game.DeckCastableAmount);
        this.items = new Array<null>(game.DeckItemAmount);
    }

    pushCard(card: Creep | Spell | TowerEnchantment, times: number = 1): boolean {
        let indArr: Array<number> = [];

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

    pushHero(hero: Hero): boolean {
        for (let i: number = 0; i < this.heroes.length; i++)
            if (!this.heroes[i]) {
                this.heroes[i] = hero;
                if (this.player)
                    hero.player = this.player;
                this.pushCard(hero.signature, 3);
                return true;
            };

        return false;
    }

    assign(player: Player): Deck {
        this.player = player;
        return this;
    }
}

class PlayDeck extends Deck {
    constructor(game: Game, deck: Deck) {
        super(game);
        this.heroes = deck.heroes.map(e => e); //clone of the array
        this.cards = deck.cards.map(e => e);
        this.items = deck.items.map(e => e);
    }

}

class Hand {
    readonly cards: Array<Card>;
    constructor(DeckLimit: number) {
        this.cards = new Array<Card>(DeckLimit);
    }
}

class Lane {
    readonly cards: Array<Deployable | null>;
    tower: Tower;
    player: Player;
    constructor(player: Player) {
        this.player = player;
        this.cards = new Array<null>(player.game.LaneSize);
        this.tower = new Tower(player.game.TowerHealth);
    }

    deployCard(card: Deployable, at: number): boolean {
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

    removeCard(at: number): boolean {
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
    player?: Player;
    constructor(Name: string, color: string) {
        this.name = Name;
        this.color = new Color(color);
    }
}

abstract class Deployable extends Card {
    isDeployed: boolean = false;
    deployedAt?: number;
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



abstract class Castable extends Card {

}


class Hero extends Deployable {
    signature: Signature;
    constructor(name: string, color: string, signature: Signature) {
        super(name, color);
        this.signature = signature;
    }
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



