import { logger } from '@common/logger'
import { supabase } from '@common/supabase'

const log = logger.model.child({
  name: 'avatar'
})

class AvatarModel {
  async record(options: {
    avatarId: string
    url: string
    increase: number
    theme?: string
    size?: number
  }) {
    this.postAvatar(options)

    const query = supabase
      .from('avatar_record')
      .select()
      .eq('avatarId', options.avatarId)
      .limit(1)

    if (options.theme) {
      query.eq('theme', options.theme)
    }

    if (options.size) {
      query.eq('size', options.size)
    }

    const isExistRes = await query

    if (isExistRes.status === 200 && isExistRes.data.length === 0) {
      const res = await supabase.from('avatar_record').insert({
        avatarId: options.avatarId,
        url: options.url,
        theme: options.theme,
        size: options.size,
        count: options.increase
      })

      if (res.status !== 200) {
        log.info('record insert res', res)
      }
    } else {
      const recordItem = isExistRes.data[0]
      await supabase
        .from('avatar_record')
        .update({
          count: (recordItem.count || 0) + options.increase
        })
        .eq('avatarId', options.avatarId)
    }
  }

  async postAvatar(options: { avatarId: string }) {
    const query = await supabase
      .from('avatar')
      .select()
      .limit(1)
      .eq('avatarId', options.avatarId)

    if (query.status === 200 && query.data.length === 0) {
      const res = await supabase.from('avatar').insert({
        avatarId: options.avatarId
      })

      log.info('postAvatar res', res)
    }
  }
}

export const avatarModel = new AvatarModel()
