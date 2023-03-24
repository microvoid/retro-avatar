import type { DocumentContext } from 'next/document'
import React, { Children } from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { SkipNavLink } from 'nextra-theme-docs'
import { options } from '@common/gtag'
import Script from 'next/script'

import { fonts } from './_app'

const MyDocument = () => {
  return (
    <Html lang='en'>
      <Head />
      <body>
        <SkipNavLink styled />
        <Main />
        <NextScript />

        {gaEl}
      </body>
    </Html>
  )
}

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const initialProps = await Document.getInitialProps(ctx)

  const fontStyles = (
    <style
      dangerouslySetInnerHTML={{
        __html: `:root { --font-sans: ${fonts.sans}; }`
      }}
      key='next-font'
      id='next-font'
    />
  )

  return {
    ...initialProps,
    styles: Children.toArray([initialProps.styles, fontStyles])
  }
}

const ga = options()
const gaEl = ga ? (
  <>
    <Script strategy='afterInteractive' src={ga.url} />

    <script
      dangerouslySetInnerHTML={{
        __html: ga.html
      }}
    />
  </>
) : null

export default MyDocument
