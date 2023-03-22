import React from 'react'
import * as AspectRatio from '@radix-ui/react-aspect-ratio'

import Style from './styles.module.css'

export const AspectRatioImage = (props: { src: string }) => (
  <div className={Style.Container}>
    <AspectRatio.Root>
      <img
        className={Style.Image}
        src={props.src}
        alt='Landscape photograph by Tobias Tullius'
      />
    </AspectRatio.Root>
  </div>
)
