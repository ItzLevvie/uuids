let playersInTabList = World.getPlayers()

for (let i = 0; i < playersInTabList.length; i++) {
    let players = playersInTabList[i].getName()
    let uuids = playersInTabList[i].getUUID()
    Chat.log(players + " = " + uuids)

    FS.createFile("", "players.txt")
    FS.createFile("", "uuids.txt")
}
