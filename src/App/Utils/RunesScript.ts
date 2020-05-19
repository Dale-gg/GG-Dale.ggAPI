import { LolApi } from '@jlenon7/zedjs'
import { getRepository } from 'typeorm'
import Rune from '../Models/Rune'
import Tree from '../Models/Tree'

const api = new LolApi()

class RunesScript {
  public async createRunes(): Promise<Rune[]> {
    const data: any = await api.DataDragon.getRunesReforged()
    const runeRepo = getRepository(Rune)
    const treeRepo = getRepository(Tree)

    for (const tree in data) {
      const treeObj = data[tree]

      const newTree = treeRepo.create({
        id_api: treeObj.id,
        key: treeObj.key,
        icon: treeObj.icon,
        name: treeObj.name,
      })

      await treeRepo.save(newTree)

      const slots = treeObj.slots
      for (const slot in slots) {
        for (const runeObj of slots[slot].runes) {
          const newRune = runeRepo.create({
            id_api: runeObj.id,
            key: runeObj.key,
            name: runeObj.name,
            icon: runeObj.icon,
            longDesc: runeObj.longDesc,
            shortDesc: runeObj.shortDesc,
            tree: newTree,
          })

          await runeRepo.save(newRune)
        }
      }
    }

    const runes = await runeRepo.find({ relations: ['tree'] })

    return runes
  }

  public async updateRunes(): Promise<Rune[] | object> {
    const data: any = await api.DataDragon.getRunesReforged()
    const runeRepo = getRepository(Rune)
    const treeRepo = getRepository(Tree)

    for (const tree in data) {
      const treeObj = data[tree]

      const oldTree = await treeRepo.findOne({
        where: {
          key: treeObj.key,
        },
      })

      if (oldTree) {
        oldTree.name = treeObj.name
        oldTree.key = treeObj.key
        oldTree.icon = treeObj.icon

        await treeRepo.save(oldTree)
      } else {
        return treeObj
      }

      const slots = treeObj.slots
      for (const slot in slots) {
        for (const runeObj of slots[slot].runes) {
          const oldRune = await runeRepo.findOne({
            where: {
              key: runeObj.key,
            },
          })

          if (oldRune && oldTree) {
            oldRune.name = runeObj.name
            oldRune.key = runeObj.key
            oldRune.icon = runeObj.icon
            oldRune.longDesc = runeObj.longDesc
            oldRune.shortDesc = runeObj.shortDesc
            oldRune.tree = oldTree

            await runeRepo.save(oldRune)
          } else {
            return runeObj
          }
        }
      }
    }

    const runes = await runeRepo.find({ relations: ['tree'] })

    return runes
  }
}

export default RunesScript
