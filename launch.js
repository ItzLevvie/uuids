let playersInTabList = World.getPlayers();

FS.createFile("", "validPlayers.txt");
FS.createFile("", "validUUIDs.txt");

FS.createFile("", "invalidPlayers.txt");
FS.createFile("", "invalidUUIDs.txt");

for (let i = 0; i < playersInTabList.length; i++) {
    let players = playersInTabList[i].getName();
    let uuids = playersInTabList[i].getUUID();

    if (uuids[14] === "4" && players !== null) {
        Chat.log("§a" + players + " §fwith " + "§a" + uuids);
        FS.open("validPlayers.txt").append(players + "\r\n");
        FS.open("validUUIDs.txt").append(uuids + "\r\n");
    }

    if (uuids[14] !== "4" && players !== null && players !== "Carpenter ") {
        Chat.log("§4" + players + " §fwith " + "§4" + uuids);
        FS.open("invalidPlayers.txt").append(players + "\r\n");
        FS.open("invalidUUIDs.txt").append(uuids + "\r\n");
    }
}
