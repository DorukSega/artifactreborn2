"use strict";
// @ts-ignore
const peer = new Peer();
peer.on('open', (id) => { var _a; (_a = document.getElementById("peerID")) === null || _a === void 0 ? void 0 : _a.append(id); console.log('My peer ID is: ' + id); });
peer.on('connection', (conn) => {
    conn.on('open', function () {
        // Receive messages
        conn.on('data', function (data) {
            console.log('Received', data);
            console.log(typeof data);
        });
    });
});
window.onload = () => {
    Game.setRuleset(FoundryRules);
    let connectButton = document.getElementById("connect");
    if (connectButton)
        connectButton.addEventListener("click", () => {
            console.log("test");
            let peerInput = document.getElementById("peerInput");
            if (peerInput)
                if (typeof peerInput.value === "string") {
                    let OtherID;
                    OtherID = peerInput.value;
                    var conn = peer.connect(OtherID);
                    console.log(OtherID);
                    conn.on('open', function () {
                        // Send messages
                        console.log("connected");
                        conn.send('Hello!');
                    });
                }
        });
};
