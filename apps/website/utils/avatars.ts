import { theme } from 'retro-avatar'

const themes = Object.keys(theme) as (keyof typeof theme)[]

type GenAvatarsOptions = {
  id: string
  size?: number
}

export function genAvatars({ id, size }: GenAvatarsOptions) {
  if (!id) {
    return []
  }

  return themes.map((t) => {
    const params = new URLSearchParams()

    params.append('t', t)

    if (size && size !== 256) {
      params.append('s', String(size))
    }

    return {
      url: `/api/avatar/${id}?${params.toString()}`,
      theme: t
    }
  })
}
