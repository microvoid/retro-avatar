export function Footer() {
  return (
    <div>
      © {new Date().getFullYear()} Built by{' '}
      <a
        target='_blank'
        rel='noopener noreferrer'
        title='vercel.com homepage'
        href='https://github.com/youking-lib'
      >
        youking
      </a>{' '}
      The source code is available on{' '}
      <a
        target='_blank'
        rel='noopener noreferrer'
        title='vercel.com homepage'
        href='https://github.com/youking-lib/next-avatar'
      >
        Github
      </a>
      .
    </div>
  )
}
