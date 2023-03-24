import { systemConstants } from '@common/constants'

interface LogoProps {
  size?: number
  className?: string
}

export function Logo(props: LogoProps) {
  return (
    <img
      {...props}
      src={`/api/avatar/${systemConstants.name}?s=${props.size || ''}&t=window`}
    />
  )
}
