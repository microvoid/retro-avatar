import { useEffect, useState } from 'react'

const Size = [8, 12, 16, 24, 32, 64, 128, 256, 512, 1024].map((n) => {
  return {
    size: n,
    title: `${n}*${n}`
  }
})

export type SizeSelectProps = {
  defaultValue?: number
  onChange?: (size: number) => void
}

export function SizeSelect(props: SizeSelectProps) {
  const [selected, setSelected] = useState(props.defaultValue || 256)

  return (
    <select
      value={selected}
      onChange={(e) => {
        const value = Number(e.target.value) || 256

        setSelected(value)
        props.onChange?.(value)
      }}
      className='select select-sm bg-neutral/20 px-6 py-2 rounded-full appearance-none  border-none'
    >
      {Size.map((item) => {
        return (
          <option
            value={item.size}
            key={item.size}
            className='dark:text-white bg-neutral shadow-none'
          >
            size: {item.title}
          </option>
        )
      })}
    </select>
  )
}
