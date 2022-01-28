import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { memo, useContext } from 'react';
import routes from "@/router"
import Image from 'next/image';
import { CSSTransition, SwitchTransition } from "react-transition-group"
import { Tooltip } from 'antd';

import {
  AppHeaderWrapper,
  AppHeaderLeftWrapper,
  AppHeaderCenterWrapper,
  AppHeaderRightWrapper
} from "./style"
import { ThemeContext } from '@/common/context';
import { getCurrentTheme } from '@/utils/theme';
import logo from "@/assets/svg/logo.svg"


const AppHeader = memo((props: any) => {
  // other hooks
  const theme = useContext(ThemeContext)
  const router = useRouter()
  // render...
  return (
    <AppHeaderWrapper theme={getCurrentTheme(theme)}>
      <div className='container-wrap nav'>
        <AppHeaderLeftWrapper>
          <Image width={50} height={50} src={logo} />
          <span className='logo-desc'>CODERLEI</span>
        </AppHeaderLeftWrapper>
        <AppHeaderCenterWrapper>
          {
            routes.map((item, index) => {
              return (
                <div onClick={() => router.push(item.path)} key={index} className='nav-item'>
                  <i className={`iconfont ${item.icon}`}></i>
                  <span>{item.name}</span>
                </div>
              )
            })
          }
          <a href="https://github.com/Acmenlei" className='nav-item'>
            <i className={`iconfont icon-github-fill`}></i>
            <span>Github</span>
          </a>
          <div className='nav-item' onClick={() => router.push('/login')}>
            <i className={`iconfont icon-denglu`}></i>
            <span>登录</span>
          </div>
        </AppHeaderCenterWrapper>

        <AppHeaderRightWrapper>
          <SwitchTransition>
            <CSSTransition
              classNames="theme"
              key={theme === 'light' ? 'sunshine' : 'moon'}
              timeout={300} >
              <Tooltip placement="right" title={theme === 'light' ? '切换夜间模式' : '切换白天模式'}>
                <Image
                  onClick={props.changeTheme}
                  src={require(`@/assets/svg/${theme === 'light' ? 'sunshine' : 'moon'}.svg`)}
                  width={40}
                  height={40} />
              </Tooltip>
            </CSSTransition>
          </SwitchTransition>
        </AppHeaderRightWrapper>
      </div>
    </AppHeaderWrapper>
  );
});

export default AppHeader