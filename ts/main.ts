// @ts-ignore
const peer = new Peer();

peer.on('open', (id: any) => { document.getElementById("peerID")?.append(id); console.log('My peer ID is: ' + id); });

peer.on('connection', (conn: any) => {
    conn.on('open', function () {
        // Receive messages
        conn.on('data', function (data: any) {
            console.log('Received', data);
            console.log(typeof data)
        });
    });
});



window.onload = () => {
    Game.setRuleset(FoundryRules);
    let connectButton = document.getElementById("connect");
    if (connectButton)
        connectButton.addEventListener("click", () => {
            let peerInput = document.getElementById("peerInput") as HTMLInputElement | null;
            if (peerInput)
                if (typeof peerInput.value === "string") {
                    let OtherID: string;
                    OtherID = peerInput.value;
                    var conn = peer.connect(OtherID);
                    console.log(OtherID)
                    conn.on('open', function () {
                        // Send messages
                        console.log("connected");
                        conn.send('Hello!');

                    });
                }
        })

}