import { LolApi } from '@jlenon7/zedjs'
import { getRepository } from 'typeorm'
import Rune from '../Models/Rune'
import Tree from '../Models/Tree'
import { RunesReforgedDTO } from '@jlenon7/zedjs/dist/models-dto/data-dragon/runes-reforged.dto'

const api = new LolApi()

interface IRune extends RunesReforgedDTO {
  name?: string
}

class RunesScript {
  public async createRunes(): Promise<Rune[]> {
    const data: IRune[] = await api.DataDragon.getRunesReforged()
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

      const slots: any = treeObj.slots
      slots.map(async (slot: any) => {
        slot.runes.map(async (rune: any) => {
          const newRune = runeRepo.create({
            id_api: rune.id,
            key: rune.key,
            name: rune.name,
            icon: rune.icon,
            longDesc: rune.longDesc,
            shortDesc: rune.shortDesc,
            tree: newTree,
          })

          await runeRepo.save(newRune)
        })
      })
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

      await treeRepo.save(oldTree)

      const slots: any = treeObj.slots
      slots.map(async (slot: any) => {
        slot.runes.map(async (rune: any) => {
          const oldRune = await runeRepo.findOne({
            where: {
              key: rune.key,
            },
          })

          if (oldRune && oldTree) {
            oldRune.name = rune.name
            oldRune.key = rune.key
            oldRune.icon = rune.icon
            oldRune.longDesc = rune.longDesc
            oldRune.shortDesc = rune.shortDesc
            oldRune.tree = oldTree

            await runeRepo.save(oldRune)
          } else {
            return rune
          }
        })
      })
    }

    const runes = await runeRepo.find({ relations: ['tree'] })

    return runes
  }
}

export default RunesScript
