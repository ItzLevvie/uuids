let playersInTabList = World.getPlayers();

FS.createFile("", "validPlayers.txt");
FS.createFile("", "validUUIDs.txt");

FS.createFile("", "invalidPlayers.txt");
FS.createFile("", "invalidUUIDs.txt");

FS.createFile("", "DEBUG.txt");

for (let i = 0; i < playersInTabList.length; i++) {
    let players = playersInTabList[i].getName();
    let uuids = playersInTabList[i].getUUID();

    if (players !== "" && !players.startsWith("!") && players !== "Carpenter ") {

        // Minecraft puts all players under UUID version 4.
        if (uuids[14] === "4") {
            Chat.log("§a" + players + " §fwith " + "§a" + uuids);
            FS.open("validPlayers.txt").append(players + "\r\n");
            FS.open("validUUIDs.txt").append(uuids + "\r\n");
            FS.open("DEBUG.txt").append(players + " (player) with " + uuids + " (UUID version 4) " + "\r\n");
        }

        // Hypixel puts all NPCs under UUID version 2.
        if (uuids[14] === "2") {
            Chat.log("§4" + players + " §fwith " + "§4" + uuids);
            FS.open("invalidPlayers.txt").append(players + "\r\n");
            FS.open("invalidUUIDs.txt").append(uuids + "\r\n");
            FS.open("DEBUG.txt").append(players + " (NPC) with " + uuids + " (UUID version 2) " + "\r\n");
        }

        // Hypixel puts all nicked players under UUID version 1.
        if (uuids[14] === "1") {
            Chat.log("§4" + players + " §fwith " + "§4" + uuids);
            FS.open("invalidPlayers.txt").append(players + "\r\n");
            FS.open("invalidUUIDs.txt").append(uuids + "\r\n");
            FS.open("DEBUG.txt").append(players + " (nicked player) with " + uuids + " (UUID version 1) " + "\r\n");
        }
    }
}
