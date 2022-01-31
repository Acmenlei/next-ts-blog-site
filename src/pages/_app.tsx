import type { AppProps } from 'next/app'
import { memo, useCallback, useEffect, useState } from 'react'
import { Provider } from "react-redux"
import "antd/dist/antd.css"
import 'moment/locale/zh-cn'

import "@/assets/css/reset.css"
import "@/assets/font/iconfont.css"
import { ThemeContext } from '@/common/context'
import { getReflectTheme } from '@/utils/theme'
import store from "@/store"

import AppHeader from '@/components/app-header'
import AppBackGround from '@/components/app-background'
import AppLoading from '@/components/app-loading'
import { useRouter } from 'next/router'
import { isLoginStatus } from '@/services/modules/login'
import { userLoginAction } from '@/store/modules/login/actionCreators'
import { BackTop, Tooltip } from 'antd'

const App = memo(function ({ Component, pageProps }: AppProps) {
  // other hook
  const [theme, setTheme] = useState('light')
  // other logic
  const changeTheme = useCallback(() => {
    setTheme(getReflectTheme(theme))
  }, [theme])
  // const router = useRouter()
  // 判断是否已登录 已登录则获取登录信息 
  useEffect(() => {
    const state: any = store.getState()
    const userInfo = state.getIn(["login", "userInfo"])
    if (!userInfo) {
      isLoginStatus().then(({ data }: any) => {
        store.dispatch(userLoginAction(data))
      })
    }
    // 路由控制
    // const routerEvents = router.events
    // routerEvents.on("routeChangeStart", (path) => {
    //   console.log(path)
    // })
    // return () => {
    //   routerEvents.off("routeChangeStart", (route) => {
    //     console.log("销毁", route)
    //   })
    // }
  }, [store])

  return (

    <ThemeContext.Provider value={theme}>
      <Provider store={store}>
        <AppHeader changeTheme={changeTheme} />
        <div className='container-wrap mt-20 pb-20'>
          <Component {...pageProps} />
        </div>
        <AppBackGround />
        <AppLoading />
      </Provider>
      <Tooltip title="返回顶部"><BackTop /></Tooltip>
    </ThemeContext.Provider>
  )
})

export default App
