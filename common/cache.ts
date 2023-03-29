import { systemConstants } from '@common/constants'
import { Low } from 'lowdb'
// @ts-ignore
import { JSONFile } from 'lowdb/node'

export type AvatarCache = {
  id: string
  url: string
  theme?: string
  size?: number
}

type LowDBData = {
  avatars: AvatarCache[]
}

const getDefaultValue: () => LowDBData = () => ({
  avatars: []
})

export const lowdb = new Low<LowDBData>(
  new JSONFile(systemConstants.CACHE_LOWDB_PATH)
)

export class Cache<T extends keyof LowDBData> {
  private _queue: LowDBData[T] = []
  private _queueResolver: Promise<void>

  constructor(public key: T) {}

  async get(): Promise<LowDBData[T]> {
    await lowdb.read()

    if (!lowdb.data) {
      lowdb.data = getDefaultValue()
      await lowdb.write()
    }

    if (!lowdb.data[this.key]) {
      lowdb.data[this.key] = getDefaultValue()[this.key]
      await lowdb.write()
    }

    return lowdb.data[this.key]
  }

  push(item: LowDBData[T][number]) {
    this._queue.push(item)

    if (this._queueResolver) {
      return this._queueResolver
    }

    this._queueResolver = this.get().then(async (data) => {
      data.push(...this._queue)

      this._queue = []

      await lowdb.write()

      this._queueResolver = null
    })

    return this._queueResolver
  }

  async clean() {
    const data = await this.get()

    data.length = 0

    await lowdb.write()
  }

  static create<T extends keyof LowDBData>(key: T) {
    return new Cache(key)
  }
}
