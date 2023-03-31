import { systemConstants } from '@common/constants'
import { Low } from 'lowdb'
// @ts-ignore
import { JSONFile } from 'lowdb/node'

export const lowdb = new Low<Record<string, any[]>>(
  new JSONFile(systemConstants.CACHE_LOWDB_PATH)
)

type CacheOptions<T> = {
  key: string
  getDefaultValue: () => T[]
}

export class Cache<T> {
  private _queue: T[] = []
  private _queueResolver: Promise<void>

  constructor(public options: CacheOptions<T>) {}

  async get(): Promise<T[]> {
    await lowdb.read()

    if (!lowdb.data || !lowdb.data[this.options.key]) {
      await this.reset()
    }

    return lowdb.data[this.options.key]
  }

  push(item: T) {
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

  async reset() {
    lowdb.data ||= {}
    lowdb.data[this.options.key] = this.options.getDefaultValue()

    await lowdb.write()
  }

  static create<T>(options: CacheOptions<T>) {
    return new Cache(options)
  }
}
