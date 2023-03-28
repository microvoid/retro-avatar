import nextra from 'nextra'

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx'
})

/** @type {import('next').NextConfig} */
export default withNextra({
  reactStrictMode: true,
  transpilePackages: ['retro-avatar', 'canvas'],
  async redirects() {
    return [
      {
        source: '/docs',
        destination: '/docs/getting-started',
        permanent: false
      }
    ]
  }
})
