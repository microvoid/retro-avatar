import React from 'react'
import { useRouter } from 'next/router'
import { DocsThemeConfig, useConfig } from 'nextra-theme-docs'
import { tvs, Logo } from '@components'
import { systemConstants } from './common'

// get the package version from package.json
const version = '0.0.1'

const config: DocsThemeConfig = {
  darkMode: true,
  nextThemes: {
    defaultTheme: 'dark'
  },
  logo: (
    <div className='flex items-center'>
      <Logo size={30} />
      <b className='ml-1.5 font-semibold hidden sm:block text-sm sm:text-base'>
        {systemConstants.site.title}
      </b>
      <span className={tvs.badge({ class: 'hidden sm:flex' })}>v{version}</span>
    </div>
  ),
  head: function useHead() {
    const config = useConfig()
    const description =
      config.frontMatter.description || systemConstants.site.description

    return (
      <>
        {/* Favicons, meta */}
        {/* <link
          href='/favicon/apple-touch-icon.png'
          rel='apple-touch-icon'
          sizes='180x180'
        />
        <link
          href='/favicon/favicon-32x32.png'
          rel='icon'
          sizes='32x32'
          type='image/png'
        />
        <link
          href='/favicon/favicon-16x16.png'
          rel='icon'
          sizes='16x16'
          type='image/png'
        />
        <link href='/favicon/site.webmanifest' rel='manifest' />
        <link
          color='#000000'
          href='/favicon/safari-pinned-tab.svg'
          rel='mask-icon'
        /> */}
        <meta content='#ffffff' name='msapplication-TileColor' />
        <meta content='en' httpEquiv='Content-Language' />
        <meta content={description} name='description' />
        <meta content={description} name='og:description' />
        <meta content='summary_large_image' name='twitter:card' />
        <meta content='@nextui-org' name='twitter:site' />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, user-scalable=0'
        />
        {/* <meta content={image} name='twitter:image' /> */}
        <meta
          content={`${config.title} – ${systemConstants.site.title}`}
          name='og:title'
        />
        {/* <meta content={image} name='og:image' /> */}
        <meta
          content={systemConstants.site.title}
          name='apple-mobile-web-app-title'
        />
      </>
    )
  },
  useNextSeoProps: function SEO() {
    const router = useRouter()
    const { frontMatter } = useConfig()

    const defaultTitle = frontMatter.overrideTitle || systemConstants.site.title

    return {
      description: frontMatter.description,
      defaultTitle,
      titleTemplate: router.pathname !== '/' ? `%s – ${defaultTitle}` : ''
    }
  },
  project: {
    link: systemConstants.repo
  },
  // chat: {
  //   link: 'https://discord.gg'
  // },
  docsRepositoryBase: systemConstants.repo,
  gitTimestamp: '',
  sidebar: {
    defaultMenuCollapseLevel: 1
  },
  footer: {
    text: (
      <div className='flex w-full flex-col items-center sm:items-start'>
        <div>
          <span className='mr-1'>Built by</span>
          <a
            className='gap-1 text-current underline'
            href='https://github.com/youking-lib'
            rel='noopener noreferrer'
            target='_blank'
            title={systemConstants.site.title}
          >
            youking
          </a>
        </div>
        <p className='mt-6 text-xs'>
          MIT {new Date().getFullYear()} The {systemConstants.site.title}{' '}
          Project.
        </p>
      </div>
    )
  }
}

export default config
