import { Cache } from '@common/cache'
import { Avatar, avatarModel } from './model'

export class Base {
  cache = {
    avatar: Cache.create<Avatar>({
      key: 'avatars',
      getDefaultValue: () => []
    })
  }

  model = {
    avatar: avatarModel
  }
}
