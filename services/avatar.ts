import { logger } from '@common/logger'
import lodash from 'lodash'
import { Base } from './base'
import { Avatar } from './model'

const log = logger.service.child({
  name: 'avatar'
})

class AvatarService extends Base {
  async record(options: Avatar) {
    await this.cache.avatar.push(options)

    this.fromCacheToDB()
  }

  fromCacheToDB = lodash.throttle(
    async () => {
      const values = await this.cache.avatar.get()

      await this.cache.avatar.reset()

      if (values.length === 0) {
        return
      }

      log.info(`fromCacheToDB value length: ${values.length}`)

      const grouped = lodash.groupBy(
        values,
        (value) => value.url + (value.refer || '')
      )

      Object.values(grouped).forEach((group: typeof values) => {
        const avatar = group[0]

        this.model.avatar.record(avatar, group.length)
      })
    },
    1000,
    {
      trailing: true
    }
  )
}

export const avatarService = new AvatarService()
