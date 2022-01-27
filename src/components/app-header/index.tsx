import Link from 'next/link';
import React, { memo, useContext } from 'react';
import routes from "@/router"
import Image from 'next/image';

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
                <div key={index} className='nav-item'>
                  <i className={`iconfont ${item.icon}`}></i>
                  <Link key={index} href={item.path}>{item.name}</Link>
                </div>
              )
            })
          }
          <div className='nav-item'>
            <i className={`iconfont icon-github-fill`}></i>
            <a href="https://github.com/Acmenlei">Github</a>
          </div>
          <div className='nav-item'>
            <i className={`iconfont icon-denglu`}></i>
            <Link href="/login">登录</Link>
          </div>
        </AppHeaderCenterWrapper>
        {/* <AppHeaderRightWrapper>
          <i className='iconfont icon-liebiao'></i>
        </AppHeaderRightWrapper> */}
      </div>
    </AppHeaderWrapper>
  );
});

export default AppHeader