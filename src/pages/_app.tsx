import type { AppProps } from 'next/app'
import { memo, useCallback, useEffect, useState } from 'react'
import { Provider } from "react-redux"
import "antd/dist/antd.css"

import "@/assets/css/reset.css"
import "@/assets/font/iconfont.css"
import { ThemeContext } from '@/common/context'
import { getReflectTheme } from '@/utils/theme'
import store from "@/store"

import AppHeader from '@/components/app-header'
import AppBackGround from '@/components/app-background'
import AppLoading from '@/components/app-loading'
import Router from 'next/router'
import { isLoginStatus } from '@/services/modules/login'
import { userLoginAction } from '@/store/modules/login/actionCreators'

// Router.events.on("routeChangeStart", () => {
//   const state: any = store.getState()
//   if (!state.getIn(["login", "userInfo"])) {
//     console.log("qingqiu...")
//     isLoginStatus().then(({ data }: any) => {
//       store.dispatch(userLoginAction(data))
//     })
//   }
// })

const App = memo(function ({ Component, pageProps }: AppProps) {
  // other hook
  const [theme, setTheme] = useState('light')
  // other logic
  const changeTheme = useCallback(() => {
    setTheme(getReflectTheme(theme))
  }, [theme])

  // 判断是否已登录 已登录则获取登录信息 
  useEffect(() => {
    const state: any = store.getState()
    if (!state.getIn(["login", "userInfo"])) {
      console.log("qingqiu...")
      isLoginStatus().then(({ data }: any) => {
        store.dispatch(userLoginAction(data))
      })
    }
  }, [store])

  return (

    <ThemeContext.Provider value={theme}>
      <Provider store={store}>
        <AppHeader changeTheme={changeTheme} />
        <div className='container-wrap mt-20'>
          <Component {...pageProps} />
        </div>
        <AppBackGround />
        <AppLoading />
      </Provider>
    </ThemeContext.Provider>
  )
})

export default App
