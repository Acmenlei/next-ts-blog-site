import React, { memo, useCallback, useState } from 'react';
import { NextPage } from 'next';
import { useDispatch } from 'react-redux';
import { SwitchTransition, CSSTransition } from "react-transition-group"

import { OutContainerWrapper, ContainerWrapper, LoginWrapper, RegisterWrapper } from "./style";
import { userLoginVerify, userRegister } from '@/services/modules/login';
import { userLoginAction } from '@/store/modules/login/actionCreators';
import { errorMessage, successMessage, warningMessage } from '@/common/message';
import { useRouter } from 'next/router';

const Login: NextPage = memo(() => {
  // redux hooks
  const dispatch = useDispatch()
  // other hooks
  const [isLogin, setIsLogin] = useState(true)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const changeUsername = useCallback((value: string) => {
    setUsername(value)
  }, [])
  const changePassword = useCallback((value: string) => {
    setPassword(value)
  }, [])
  const changeLogin = useCallback(() => {
    setUsername("")
    setPassword("")
    setIsLogin(!isLogin)
  }, [isLogin])
  const router = useRouter()
  // 登录逻辑
  const onFinishLogin = useCallback(() => {
    // redux-thunk 莫名不起效果 暂时这么写。
    userLoginVerify({ ll_username: username, ll_password: password })
      .then(({ data, code, msg }: any) => {
        if (code != 200) {
          warningMessage(msg)
        } else {
          dispatch(userLoginAction(data))
          successMessage(msg)
          router.reload()
        }
      })
  }, [username, password, dispatch])
  // 注册框逻辑
  const onFinishRegister = useCallback(() => {
    userRegister({ ll_username: username, ll_password: password })
      .then(({ code, msg }: any) => {
        if (code === 200) {
          successMessage(msg);
        } else if (code == -96) {
          warningMessage(msg);
        } else {
          errorMessage(msg);
        }
      })
  }, [username, password])

  return (
    <OutContainerWrapper>
      <ContainerWrapper>
        <SwitchTransition>
          <CSSTransition classNames="login" timeout={300} key={isLogin}>
            {isLogin ?
              <LoginWrapper>
                <h2>登录</h2>
                <input placeholder='请输入用户名' id='username' type="text" onChange={e => changeUsername(e.target.value)} />
                <input placeholder='请输入密码' id='password' type="password" onChange={e => changePassword(e.target.value)} />
                <div>
                  <button onClick={onFinishLogin}>登录</button>
                  <button onClick={changeLogin}>去注册</button>
                </div>

              </LoginWrapper> :
              <RegisterWrapper>
                <h2>注册</h2>
                <input placeholder='请输入用户名' id='username' type="text" onChange={e => changeUsername(e.target.value)} />
                <input placeholder='请输入密码' id='password' type="password" onChange={e => changePassword(e.target.value)} />
                <div>
                  <button onClick={onFinishRegister}>注册</button>
                  <button onClick={changeLogin}>去登录</button>
                </div>
              </RegisterWrapper>
            }
          </CSSTransition>
        </SwitchTransition>
      </ContainerWrapper>
    </OutContainerWrapper>
  );
});

export default Login