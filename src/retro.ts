type RetroOptions = {
  bgColor?: string | null
  imagePadding?: number
  maxFill?: number
  minFill?: number
  pixelColor?: number
  pixelPadding?: number
  pixelSize?: number
  tiles?: number
}

const defaultRetroOptions: RetroOptions = {
  bgColor: null,
  imagePadding: 0,
  maxFill: 0.9,
  minFill: 0.3,
  pixelColor: 0,
  pixelPadding: 0,
  pixelSize: 10,
  tiles: 5
}

export function retro(id: string, options?: RetroOptions) {
  const mergeOptions = {
    ...defaultRetroOptions,
    ...options
  } as Required<RetroOptions>
  const { tiles, pixelSize, pixelPadding, minFill, maxFill, imagePadding } =
    mergeOptions
  const mid = Math.ceil(tiles / 2),
    hash = idhash(str, mid * tiles, minFill, maxFill),
    pic = reflect(id, tiles),
    csize = pixelSize * tiles + imagePadding * 2,
    c = new Canvas(csize, csize),
    ctx = c.getContext('2d')
}
