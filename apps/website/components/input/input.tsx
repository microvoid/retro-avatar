import React, { useEffect, useState } from 'react'
import cn from 'classnames'

interface Props {
  onChange?: (value: string) => void
  defaultValue?: string
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>

export type InputProps = Props & NativeAttrs

export const Input: React.FC<InputProps> = ({
  onChange,
  className,
  defaultValue
}) => {
  const [value, setValue] = useState(defaultValue || '')

  useEffect(() => {
    onChange?.(value)
  }, [value, onChange])

  return (
    <div
      className={cn(
        'flex items-center justify-between bg-neutral/20 backdrop-blur md:w-[420px] w-[320px] h-10 font-mono md:text-sm text-xs px-6 py-2 rounded-full text-black',
        className
      )}
    >
      <input
        autoFocus
        onChange={(e) => setValue(e.target.value)}
        value={value}
        className='block h-[35px] w-full appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] dark:text-white outline-none bg-transparent focus-within:shadow-none focus-visible:shadow-none'
      />
    </div>
  )
}
