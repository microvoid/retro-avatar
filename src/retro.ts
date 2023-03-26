import NodeCanvas from 'canvas'
import lodash from 'lodash'
import { hash } from './hash'
import { reflect } from './utils'
import { theme, RetroTheme, defaultTheme } from './theme'

const { Canvas } = NodeCanvas
const { isNull, isNumber, isString, isUndefined } = lodash

type RetroOptions = {
  theme?: RetroTheme
  size?: number
}

const defaultOptions: Required<RetroOptions> = {
  theme: theme.github,
  size: 512
}

export function retro(id: string, options = defaultOptions) {
  const { size } = {
    ...defaultOptions,
    ...options
  }

  const theme = {
    ...defaultTheme,
    ...options.theme
  } as Required<RetroTheme>

  let {
    tiles,
    pixelSize,
    pixelPadding,
    bgColor,
    minFill,
    maxFill,
    pixelColor,
    imagePadding
  } = theme

  const ratio = size / (pixelSize * tiles + imagePadding * 2)

  pixelSize = pixelSize * ratio
  imagePadding = imagePadding * ratio

  const mid = Math.ceil(tiles / 2)
  const { colors, pixels } = hash(id, mid * tiles, minFill, maxFill)
  const pic = reflect(pixels, tiles)

  const canvas = new Canvas(size, size)
  const ctx = canvas.getContext('2d')

  if (isString(bgColor)) {
    ctx.fillStyle = bgColor
  } else if (isNumber(bgColor)) {
    ctx.fillStyle = '#' + colors[bgColor]
  }

  if (!isNull(bgColor)) ctx.fillRect(0, 0, size, size)

  var drawOp = ctx.fillRect.bind(ctx)

  if (isString(pixelColor)) {
    ctx.fillStyle = pixelColor
  } else if (isNumber(pixelColor)) {
    ctx.fillStyle = '#' + colors[pixelColor]
  } else {
    drawOp = ctx.clearRect.bind(ctx)
  }

  for (let x = 0; x < tiles; x++)
    for (let y = 0; y < tiles; y++)
      if (pic[y][x])
        drawOp(
          x * pixelSize + pixelPadding + imagePadding,
          y * pixelSize + pixelPadding + imagePadding,
          pixelSize - pixelPadding * 2,
          pixelSize - pixelPadding * 2
        )

  return canvas
}
