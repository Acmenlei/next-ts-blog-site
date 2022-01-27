// lib
import type { AppProps } from 'next/app'
import { memo, useCallback, useState } from 'react'
import { Provider } from "react-redux"
import "antd/dist/antd.css"
// local
import store from "@/store"
import "@/assets/css/reset.css"
import "@/assets/font/iconfont.css"
import { ThemeContext } from '@/common/context'
import { getReflectTheme } from '@/utils/theme'
// components
import AppHeader from '@/components/app-header'
import AppBackGround from '@/components/app-bg'

function MyApp({ Component, pageProps }: AppProps) {
  // redux hook
  const [theme, setTheme] = useState('light')
  // other logic
  const changeTheme = useCallback(() => {
    setTheme(getReflectTheme(theme))
  }, [theme])

  return (
    <ThemeContext.Provider value={theme}>
      <Provider store={store}>
        <AppHeader changeTheme={changeTheme} />
        <div className='container-wrap mt-20'>
          <Component {...pageProps} />
        </div>
        <AppBackGround />
      </Provider>
    </ThemeContext.Provider>
  )
}

export default memo(MyApp)
