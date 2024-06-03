let playersInTabList = World.getPlayers();

FS.createFile("", "validPlayers.txt");
FS.createFile("", "validUUIDs.txt");

FS.createFile("", "invalidPlayers.txt");
FS.createFile("", "invalidUUIDs.txt");

FS.createFile("", "DEBUG.txt");

let players = [];
let NPCs = [];
let nickedPlayers = [];
let bedrockPlayers = [];

for (let i = 0; i < playersInTabList.length; i++) {
    let player = playersInTabList[i].getName();
    let uuid = playersInTabList[i].getUUID();
    let uuidVersion = uuid[14];

    // Use "^[a-zA-Z0-9_]+$" for better filters
    if (player !== "" && !player.startsWith("!") && !player.startsWith("§")) {
        // Minecraft puts all players under UUID version 4 (variant 1).
        if (uuidVersion === "4") {
            players.push(player);
            FS.open("validPlayers.txt").append(player + "\r\n");
            FS.open("validUUIDs.txt").append(uuid + "\r\n");
            FS.open("DEBUG.txt").append(player + " (player) with " + uuid + " (UUID version 4)" + "\r\n");
        }

        // Servers like Hypixel puts all NPCs under UUID version 2.
        if (uuidVersion === "2") {
            if (player === "Carpenter ") {
                player = "Carpenter";
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

        // Servers like Wild Network puts all bedrock players under UUID version 0.
        if (uuidVersion === "0") {
            bedrockPlayers.push(player);
            FS.open("invalidPlayers.txt").append(player + "\r\n");
            FS.open("invalidUUIDs.txt").append(uuid + "\r\n");
            FS.open("DEBUG.txt").append(player + " (bedrock player) with " + uuid + " (UUID version 0)" + "\r\n");
        }
    }
}

let totalPlayers = players.length + nickedPlayers.length + bedrockPlayers.length;
if (totalPlayers > 0) {
    Chat.log("§dOnline players: " + totalPlayers);
}

let sortedPlayers = players.sort();
if (players.length > 0) {
    Chat.log("§aList of players (" + players.length + "): " + sortedPlayers.toString().replaceAll(",", ", ").replaceAll("§r", ""));
}

let sortedBedrockPlayers = bedrockPlayers.sort();
if (sortedBedrockPlayers.length > 0) {
    Chat.log("§eList of bedrock players (" + bedrockPlayers.length + "): " + bedrockPlayers.toString().replaceAll(",", ", ").replaceAll("§r", ""));
}

let sortedNPCs = NPCs.sort();
if (NPCs.length > 0) {
    Chat.log("§8List of NPCs (" + NPCs.length + "): " + sortedNPCs.toString().replaceAll(",", ", ").replaceAll("§r", ""));
}

let sortedNickedPlayers = nickedPlayers.sort();
if (nickedPlayers.length > 0) {
    Chat.log("§4List of nicked players (" + nickedPlayers.length + "): " + sortedNickedPlayers.toString().replaceAll(",", ", ").replaceAll("§r", ""));
}
