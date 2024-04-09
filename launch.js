let playersInTabList = World.getPlayers();

for (let i = 0; i < playersInTabList.length; i++) {
    let players = playersInTabList[i].getName();
    let uuids = playersInTabList[i].getUUID();
    Chat.log("§a" + players + " §fwith " + "§a" + uuids);

    FS.createFile("", "players.txt");
    let playersFile = FS.open("players.txt");
    playersFile.append(players + "\r\n")

    FS.createFile("", "uuids.txt");
    let uuidsFile = FS.open("uuids.txt");
    uuidsFile.append(uuids + "\r\n")
}
