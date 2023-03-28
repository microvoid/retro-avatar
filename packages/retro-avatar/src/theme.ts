export type RetroTheme = {
  bgColor?: number | string
  imagePadding?: number
  maxFill?: number
  minFill?: number
  pixelColor?: number | string
  pixelPadding?: number
  pixelSize?: number
  tiles?: number
}

export const defaultTheme: RetroTheme = {
  pixelSize: 10,
  bgColor: null,
  pixelPadding: 0,
  imagePadding: 0,
  tiles: 5,
  minFill: 0.3,
  maxFill: 0.9,
  pixelColor: 0
}

export const theme: Record<
  'github' | 'gravatar' | 'mono' | 'mosaic' | 'mini' | 'window',
  RetroTheme
> = {
  github: {
    pixelSize: 70,
    bgColor: '#F0F0F0',
    pixelPadding: -1,
    imagePadding: 35,
    tiles: 5
  },
  gravatar: {
    bgColor: 1,
    tiles: 8
  },
  mono: {
    bgColor: '#F0F0F0',
    pixelColor: '#000000',
    tiles: 6,
    pixelSize: 12,
    pixelPadding: -1,
    imagePadding: 6
  },
  mosaic: {
    imagePadding: 2,
    pixelPadding: 1,
    pixelSize: 16,
    bgColor: '#F0F0F0'
  },
  mini: {
    pixelSize: 10,
    pixelPadding: 1,
    tiles: 3,
    bgColor: 0,
    pixelColor: 1
  },
  window: {
    pixelColor: null,
    bgColor: 0,
    imagePadding: 20,
    pixelPadding: 1,
    pixelSize: 16
  }
}
