"use strict";
window.onload = () => {
    var _a;
    let Artifact2 = new Game(3, 5, 12, 30, 2, 40, 10, 30);
    let dorukDeck = new Deck(Artifact2);
    let sig = new Signature("Culling Blade", "Red", 2);
    let Axe = new Hero("Axe", "Red", sig);
    dorukDeck.pushHero(Axe);
    dorukDeck.cards.forEach(e => {
        if (e)
            console.log(e.name);
    });
    if (Artifact2.setPlayer(0, "Doruk", dorukDeck)) {
        let ourAxe = Artifact2.players[0].deck.heroes[0];
        if (ourAxe) {
            console.log(Artifact2.players[0].name);
            Artifact2.players[0].lanes[1].deployCard(ourAxe, 1);
            console.log((_a = ourAxe.player) === null || _a === void 0 ? void 0 : _a.name);
            console.log(ourAxe.isDeployed);
            ourAxe.remove();
            console.log(ourAxe.isDeployed);
        }
    }
};
