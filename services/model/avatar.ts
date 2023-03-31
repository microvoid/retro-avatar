import { logger } from '@common/logger'
import { supabase } from '@common/supabase'

const log = logger.model.child({
  name: 'model.avatar'
})

export type Avatar = {
  id: string
  url: string
  theme?: string
  size?: number
  refer?: string
}

class AvatarModel {
  async record(options: Avatar, count = 1) {
    this.postAvatar(options)

    log.info(options.refer)

    const res = await supabase.from('avatar_record').insert({
      avatarId: options.id,
      url: options.url,
      theme: options.theme,
      size: options.size,
      refer: options.refer,
      count
    })

    log.info('record insert res: ' + res.statusText)
  }

  async postAvatar(options: Avatar) {
    const query = await supabase
      .from('avatar')
      .select()
      .limit(1)
      .eq('avatarId', options.id)

    if (query.status === 200 && query.data.length === 0) {
      const res = await supabase.from('avatar').insert({
        avatarId: options.id
      })

      log.info('postAvatar res: ' + res.statusText)
    }
  }
}

export const avatarModel = new AvatarModel()
