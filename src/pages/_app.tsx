import type { AppProps } from 'next/app'
import { memo, useCallback, useState } from 'react'
import { Provider } from "react-redux"

import "antd/dist/antd.css"

import store from "@/store"
import "@/assets/css/reset.css"
import "@/assets/font/iconfont.css"
import { ThemeContext } from '@/common/context'
import { getReflectTheme } from '@/utils/theme'

import AppHeader from '@/components/app-header'
import AppBackGround from '@/components/app-background'
import AppLoading from '@/components/app-loading'

function MyApp({ Component, pageProps }: AppProps) {
  // other hook
  const [theme, setTheme] = useState('light')
  // other logic
  const changeTheme = useCallback(() => {
    setTheme(getReflectTheme(theme))
  }, [theme])

  return (
    <Provider store={store}>
      <ThemeContext.Provider value={theme}>
        <AppHeader changeTheme={changeTheme} />
        <div className='container-wrap mt-20'>
          <Component {...pageProps} />
        </div>
        <AppBackGround/>
        <AppLoading />
      </ThemeContext.Provider>
    </Provider>
  )
}

export default memo(MyApp)
