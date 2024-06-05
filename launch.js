FS.createFile("", "validPlayers.txt");
FS.createFile("", "validUUIDs.txt");

FS.createFile("", "invalidPlayers.txt");
FS.createFile("", "invalidUUIDs.txt");

FS.createFile("", "DEBUG.txt");

var onlinePlayers = World.getPlayers();

var javaEditionPlayers = [];
var hypixelNPCs = [];
var hypixelNickedPlayers = [];
var bedrockEditionPlayers = [];

for (var i = 0; i < onlinePlayers.length; i++) {
    var player = onlinePlayers[i].getName();
    var uuid = onlinePlayers[i].getUUID();
    var uuidVersion = uuid[14];

    // Use the "^[a-zA-Z0-9_]+$" regular expression to filter out bad usernames
    if (player !== "" && !player.startsWith("!") && !player.startsWith("§") && !player.startsWith(",")) {

        // Minecraft puts all Java Edition players under UUID version 4 (variant 1).
        if (uuidVersion === "4") {
            javaEditionPlayers.push(player);
            FS.open("validPlayers.txt").append(player + "\r\n");
            FS.open("validUUIDs.txt").append(uuid + "\r\n");
            FS.open("DEBUG.txt").append(player + " (Java Edition player) with " + uuid + " (UUID version 4)" + "\r\n");
        }

        // Servers like Hypixel puts all NPCs under UUID version 2.
        if (uuidVersion === "2") {
            if (player === "Carpenter ") {
                player = "Carpenter";
            }
            hypixelNPCs.push(player);
            FS.open("invalidPlayers.txt").append(player + "\r\n");
            FS.open("invalidUUIDs.txt").append(uuid + "\r\n");
            FS.open("DEBUG.txt").append(player + " (NPC) with " + uuid + " (UUID version 2)" + "\r\n");
        }

        // Servers like Hypixel puts all nicked players under UUID version 1.
        if (uuidVersion === "1") {
            hypixelNickedPlayers.push(player);
            FS.open("invalidPlayers.txt").append(player + "\r\n");
            FS.open("invalidUUIDs.txt").append(uuid + "\r\n");
            FS.open("DEBUG.txt").append(player + " (nicked player) with " + uuid + " (UUID version 1)" + "\r\n");
        }

        // Servers like WildNetwork puts all Bedrock Edition players under UUID version 0.
        if (uuidVersion === "0") {
            bedrockEditionPlayers.push(player);
            FS.open("invalidPlayers.txt").append(player + "\r\n");
            FS.open("invalidUUIDs.txt").append(uuid + "\r\n");
            FS.open("DEBUG.txt").append(player + " (Bedrock Edition player) with " + uuid + " (UUID version 0)" + "\r\n");
        }

    }
}

var javaEditionPlayerCount = javaEditionPlayers.length;
var hypixelNPCsCount = hypixelNPCs.length;
var hypixelNickedPlayerCount = hypixelNickedPlayers.length;
var bedrockEditionPlayerCount = bedrockEditionPlayers.length;

var totalPlayers = javaEditionPlayerCount + hypixelNickedPlayerCount + bedrockEditionPlayerCount;

var javaEditionPlayersInAlphabetical = javaEditionPlayers.sort();
var hypixelNPCsInAlphabetical = hypixelNPCs.sort();
var bedrockEditionPlayersInAlphabetical = bedrockEditionPlayers.sort();
var hypixelNickedPlayersInAlphabetical = hypixelNickedPlayers.sort();

if (totalPlayerCount > 0) {
    Chat.log("§dOnline players: " + totalPlayerCount);
    Chat.log("§aList of Java Edition players (" + javaEditionPlayerCount + "): " + javaEditionPlayersInAlphabetical.toString().replaceAll(",", "§f,§a ").replaceAll("§r", ""));
    if (hypixelNPCsCount > 0) {
        Chat.log("§8List of NPCs (" + hypixelNPCsCount + "): " + hypixelNPCsInAlphabetical.toString().replaceAll(",", "§f,§8 ").replaceAll("§r", ""));
    }
    if (hypixelNickedPlayerCount > 0) {
        Chat.log("§4List of nicked players (" + hypixelNickedPlayerCount + "): " + hypixelNickedPlayersInAlphabetical.toString().replaceAll(",", "§f,§4 ").replaceAll("§r", ""));
    }
    if (bedrockEditionPlayerCount > 0) {
        Chat.log("§eList of Bedrock Edition players (" + bedrockEditionPlayerCount + "): " + bedrockEditionPlayersInAlphabetical.toString().replaceAll(",", "§f,§e ").replaceAll("§r", ""));
    }
}
