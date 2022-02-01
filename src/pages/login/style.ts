import styled from "styled-components"

export const OutContainerWrapper = styled.div`
    height: calc(100vh - 190px);
`

export const ContainerWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  // height: 100vh;
  overflow: hidden;
  background: #FFFFFF;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2), 0 0 0 0 rgba(0, 0, 0, 0.24) inset;
  text-align: center;

  .login-enter {
    transform: translateY(-100%);
  }
  .login-enter-active {
    transform: translateY(0);
    transition: transform 300ms;
  }
  .login-enter-done {
    transform: translateY(0);
    transition: transform 300ms;
  }
  .login-exit {
    transform: translateY(0);
  }
  .login-exit-active {
    transform: translateY(100%);
    transition: transform 300ms;
  }
  .login-exit-done {
    transform: translateY(100%);
    transition: transform 300ms;
  }
`

const commonStyles = styled.div`
  background: white;
  width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 20px;

  h2 {
    width: 60%;
    color: #333;
  }

  input {
    width: 60%;
    outline: none;
    border: none;
    background: #f2f2f2;
    margin: 0 0 15px;
    padding: 15px;
    box-sizing: border-box;
    font-size: 14px;
    border-radius: 5px;
  }

  div {
    text-align: center;
    width: 100%;

    button {
    font-family: "Roboto", sans-serif;
    text-transform: uppercase;
    outline: none;
    background: #4CAF50;
    width: 60%;
    border: none;
    padding: 15px;
    color: #FFFFFF;
    font-size: 14px;
    cursor: pointer;
    margin-top: 10px;
    border-radius: 5px;

    &:hover {
      opacity: .8;
    }
  }
  }
`

export const LoginWrapper = styled(commonStyles)`
  
`

export const RegisterWrapper = styled(commonStyles)`

`