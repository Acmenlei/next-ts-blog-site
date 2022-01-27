import styled from "styled-components"

export const AppHeaderWrapper = styled.div`
    position: sticky;
    top: 0;
    z-index: 99;
    background-color: ${(props: any) => props.theme};
    /* padding: 5px 0; */
  .nav {
    display: flex;
    justify-content: space-around;
    align-items: center;
    text-align: center;
  }
`

export const AppHeaderLeftWrapper = styled.div`
  flex: 1;
  display: flex;
  align-content: center;
  justify-content: center;
  
  span.logo-desc {
      color: #f8f8f8;
      margin: 20px 0 0 10px;
  }
`

export const AppHeaderCenterWrapper = styled.div`
  flex: 3;
  display: flex;
  justify-content: center;

  a , .nav-item{
    color: #f8f8f8;
  }
  .nav-item {
    padding: 15px 20px;
    cursor: pointer;

    i {
      margin-right: 5px;
    }

    &:hover {
      opacity: .8;
      background-color: #333;
    }
  }
  
`

export const AppHeaderRightWrapper = styled.div`
  flex: 0.5;
  color: #f8f8f8;
  cursor: pointer;
  i {
    font-size: 20px;
  }
`