let playersInTabList = World.getPlayers();

FS.createFile("", "validPlayers.txt");
FS.createFile("", "validUUIDs.txt");

FS.createFile("", "invalidPlayers.txt");
FS.createFile("", "invalidUUIDs.txt");

FS.createFile("", "DEBUG.txt");

let players = [];
let NPCs = [];
let nickedPlayers = [];

for (let i = 0; i < playersInTabList.length; i++) {
    let player = playersInTabList[i].getName();
    let uuid = playersInTabList[i].getUUID();
    let uuidVersion = uuid[14];

    if (player !== "" && !player.startsWith("!")) {
        // Minecraft puts all players under UUID version 4 (variant 1).
        if (uuidVersion === "4") {
            players.push(player);
            FS.open("validPlayers.txt").append(player + "\r\n");
            FS.open("validUUIDs.txt").append(uuid + "\r\n");
            FS.open("DEBUG.txt").append(player + " (player) with " + uuid + " (UUID version 4)" + "\r\n");
        }

        // Servers like Hypixel puts all NPCs under UUID version 2.
        if (uuidVersion === "2") {
            if (players === "Carpenter ") {
                players = "Carpenter";
            }
            NPCs.push(player);
            FS.open("invalidPlayers.txt").append(player + "\r\n");
            FS.open("invalidUUIDs.txt").append(uuid + "\r\n");
            FS.open("DEBUG.txt").append(player + " (NPC) with " + uuid + " (UUID version 2)" + "\r\n");
        }

        // Servers like Hypixel puts all nicked players under UUID version 1.
        if (uuidVersion === "1") {
            nickedPlayers.push(player);
            FS.open("invalidPlayers.txt").append(player + "\r\n");
            FS.open("invalidUUIDs.txt").append(uuid + "\r\n");
            FS.open("DEBUG.txt").append(player + " (nicked player) with " + uuid + " (UUID version 1)" + "\r\n");
        }
    }
}

let totalPlayers = players.length + nickedPlayers.length;
Chat.log("§dOnline players: " + totalPlayers);
if (players.length > 0) {
    Chat.log("§aList of players (" + players.length + "): " + players.sort().join(", "));
}

if (NPCs.length > 0) {
    Chat.log("§8List of NPCs (" + NPCs.length + "): " + NPCs.sort().join(", "));
}

if (nickedPlayers.length > 0) {
    Chat.log("§4List of nicked players (" + nickedPlayers.length + "): " + nickedPlayers.sort().join(", "));
}
