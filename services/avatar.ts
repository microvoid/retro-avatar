import { Base } from './base'

class AvatarService extends Base {
  async record(options: {
    avatarId: string
    url: string
    theme?: string
    size?: number
  }) {
    const query = this.supabase
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
      await this.supabase.from('avatar_record').insert({
        ...options,
        count: 1
      })
    } else {
      const recordItem = isExistRes.data[0]

      const res = await this.supabase
        .from('avatar_record')
        .update({
          count: (recordItem.count || 0) + 1
        })
        .eq('avatarId', options.avatarId)
    }
  }

  async postAvatar(options: { avatarId: string }) {
    const res = await this.supabase
      .from('avatar')
      .select()
      .limit(1)
      .eq('avatarId', options.avatarId)

    if (res.status === 200 && res.data.length === 0) {
      await this.supabase.from('avatar').insert({
        avatarId: options.avatarId
      })
    }
  }
}

export const avatarService = new AvatarService()
