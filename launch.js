var playersInTabList = World.getPlayers();

FS.createFile("", "validPlayers.txt");
FS.createFile("", "validUUIDs.txt");

FS.createFile("", "invalidPlayers.txt");
FS.createFile("", "invalidUUIDs.txt");

FS.createFile("", "DEBUG.txt");

var players = [];
var NPCs = [];
var nickedPlayers = [];
var bedrockPlayers = [];

for (var i = 0; i < playersInTabList.length; i++) {
    var player = playersInTabList[i].getName();
    var uuid = playersInTabList[i].getUUID();
    var uuidVersion = uuid[14];

    // Use the "^[a-zA-Z0-9_]+$" regular expression to filter out bad usernames
    if (player !== "" && !player.startsWith("!") && !player.startsWith("§") && !player.startsWith(",")) {

        // Minecraft puts all Java Edition players under UUID version 4 (variant 1).
        if (uuidVersion === "4") {
            players.push(player);
            FS.open("validPlayers.txt").append(player + "\r\n");
            FS.open("validUUIDs.txt").append(uuid + "\r\n");
            FS.open("DEBUG.txt").append(player + " (Java Edition player) with " + uuid + " (UUID version 4)" + "\r\n");
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

        // Servers like WildNetwork puts all Bedrock Edition players under UUID version 0.
        if (uuidVersion === "0") {
            bedrockPlayers.push(player);
            FS.open("invalidPlayers.txt").append(player + "\r\n");
            FS.open("invalidUUIDs.txt").append(uuid + "\r\n");
            FS.open("DEBUG.txt").append(player + " (Bedrock Edition player) with " + uuid + " (UUID version 0)" + "\r\n");
        }
    }
}

var totalPlayers = players.length + nickedPlayers.length + bedrockPlayers.length;
if (totalPlayers > 0) {
    Chat.log("§dOnline players: " + totalPlayers);
}

var sortedPlayers = players.sort();
if (players.length > 0) {
    Chat.log("§aList of Java Edition players (" + players.length + "): " + sortedPlayers.toString().replaceAll(",", "§f,§a ").replaceAll("§r", ""));
}

var sortedBedrockPlayers = bedrockPlayers.sort();
if (sortedBedrockPlayers.length > 0) {
    Chat.log("§eList of Bedrock Edition players (" + bedrockPlayers.length + "): " + bedrockPlayers.toString().replaceAll(",", "§f,§e ").replaceAll("§r", ""));
}

var sortedNPCs = NPCs.sort();
if (NPCs.length > 0) {
    Chat.log("§8List of NPCs (" + NPCs.length + "): " + sortedNPCs.toString().replaceAll(",", "§f,§8 ").replaceAll("§r", ""));
}

var sortedNickedPlayers = nickedPlayers.sort();
if (nickedPlayers.length > 0) {
    Chat.log("§4List of nicked players (" + nickedPlayers.length + "): " + sortedNickedPlayers.toString().replaceAll(",", "§f,§4 ").replaceAll("§r", ""));
}
