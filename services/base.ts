import { Cache } from '@common/cache'
import { avatarModel } from './model'

export class Base {
  cache = {
    avatar: Cache.create('avatars')
  }

  model = {
    avatar: avatarModel
  }
}
