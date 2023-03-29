import { logger } from '@common/logger'
import lodash from 'lodash'
import { Base } from './base'

const log = logger.service.child({
  name: 'avatar'
})

class AvatarService extends Base {
  async record(options: {
    avatarId: string
    url: string
    theme?: string
    size?: number
  }) {
    await this.cache.avatar.push({
      id: options.avatarId,
      url: options.url,
      theme: options.theme,
      size: options.size
    })

    this.fromCacheToDB()
  }

  fromCacheToDB = lodash.throttle(
    async () => {
      const values = await this.cache.avatar.get()

      await this.cache.avatar.clean()

      if (values.length === 0) {
        return
      }

      log.info(`fromCacheToDB value length: ${values.length}`)

      const grouped = lodash.groupBy(values, (value) => value.url)

      Object.values(grouped).forEach((group: typeof values) => {
        const avatar = group[0]

        this.model.avatar.record({
          avatarId: avatar.id,
          url: avatar.url,
          increase: group.length,
          theme: avatar.theme,
          size: avatar.size
        })
      })
    },
    1000,
    {
      trailing: true
    }
  )
}

export const avatarService = new AvatarService()
