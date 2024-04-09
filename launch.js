let playersInTabList = World.getPlayers();

for (let i = 0; i < playersInTabList.length; i++) {
    let players = playersInTabList[i].getName();
    let uuids = playersInTabList[i].getUUID();

    if (uuids[14] === 4) {
        Chat.log("§a" + players + " §fwith " + "§a" + uuids);
        FS.open("validPlayers.txt").append(players + "\r\n");
        FS.open("validUUIDs.txt").append(uuids + "\r\n");
    }

    if (uuids[14] !== 4) {
        Chat.log("§4" + players + " §fwith " + "§4" + uuids);
        FS.open("invalidPlayers.txt").append(players + "\r\n");
        FS.open("invalidUUIDs.txt").append(uuids + "\r\n");
    }
}
