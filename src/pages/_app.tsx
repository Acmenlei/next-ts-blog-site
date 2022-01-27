// lib
import type { AppProps } from 'next/app'
import { memo } from 'react'
import Link from 'next/link'

// local
import '@/styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Link href="/article">文章</Link>
      <Link href="/article/detail/123">详情</Link>
      <Component {...pageProps} />
    </>
  )
}

export default memo(MyApp)
