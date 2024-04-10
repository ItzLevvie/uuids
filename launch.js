let players = World.getPlayers();
let playerCount = players.length;

FS.createFile("", "validPlayers.txt");
FS.createFile("", "validUUIDs.txt");

FS.createFile("", "invalidPlayers.txt");
FS.createFile("", "invalidUUIDs.txt");

for (let i = 0; i < playerCount; i++) {
    let player = players[i].getName();
    let uuid = players[i].getUUID();

    if (uuid[14] === "4") {
        Chat.log("§a" + player + " §fwith " + "§a" + uuid);
        FS.open("validPlayers.txt").append(player + "\r\n");
        FS.open("validUUIDs.txt").append(uuid + "\r\n");
    }

    if (uuid[14] !== "4" && player !== "Carpenter ") {
        Chat.log("§4" + player + " §fwith " + "§4" + uuid);
        FS.open("invalidPlayers.txt").append(player + "\r\n");
        FS.open("invalidUUIDs.txt").append(uuid + "\r\n");
    }
}
