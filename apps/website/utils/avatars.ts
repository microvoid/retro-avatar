import { theme } from 'retro-avatar'

const themes = Object.keys(theme) as (keyof typeof theme)[]

export function genAvatars(id: string) {
  return themes.map((t) => {
    return {
      url: `/api/avatar/${id}?t=${t}`,
      theme: t
    }
  })
}
