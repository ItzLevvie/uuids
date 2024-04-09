let playersInTabList = World.getPlayers();

for (let i = 0; i < playersInTabList.length; i++) {
    let players = playersInTabList[i].getName();
    let uuids = playersInTabList[i].getUUID();

    if (uuids[14] === "4") {
        Chat.log("§a" + players + " §fwith " + "§a" + uuids);
    } else {
        Chat.log("§4" + players + " §fwith " + "§4" + uuids);
    }

    FS.createFile("", "players.txt");
    let playersFile = FS.open("players.txt");
    playersFile.append(players + "\r\n");

    FS.createFile("", "uuids.txt");
    let uuidsFile = FS.open("uuids.txt");
    uuidsFile.append(uuids + "\r\n");
}
