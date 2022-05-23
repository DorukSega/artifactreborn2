
window.onload = () => {
    let Artifact2 = new Game(3, 5, 12, 30, 2);

    if (Artifact2.setPlayer(0, "Doruk")) {
        let Axe = new Hero("Axe", "Red");

        console.log(Artifact2.players[0].name);

        Artifact2.players[0].lanes[1].deployCard(Axe, 1);

        console.log(Axe.player?.name);

        Axe.remove();

        console.log(Axe.isDeployed);
    }

}