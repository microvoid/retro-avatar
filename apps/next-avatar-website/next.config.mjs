import nextra from 'nextra'

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  staticImage: true,
  flexsearch: {
    codeblocks: false
  },
  defaultShowCopyCode: true
})

/** @type {import('next').NextConfig} */
export default withNextra({
  reactStrictMode: true
})
