import styled from "styled-components"

export const ArticleCardWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(50, 50, 50, .7);
  margin-bottom: 20px;
  position: relative;
  cursor: pointer;

  .card-item-left {
    width: 400px;
  overflow: hidden;

    img {
      transition: transform .3s;
      cursor: pointer;
      &:hover {
        transform: scale(1.1);
      }
    }
  }

  .card-item-right {
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
    padding: 10px 20px;
    color: #cccccc;
    
    .card-item-introduce {
      text-align: left;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 4;
      overflow: hidden;
    }

    h2 {
      color: #cccccc;
    }
  }

  .three-colors-ball {
    position: absolute;
    top: 10px;
    right: 10px;
    span {
    display: inline-block;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      margin: 5px;

      &:nth-child(1) {
        background-color: red;
      }
      &:nth-child(2) {
        background-color: yellow;
      }
      &:nth-child(3) {
        background-color: green;
      }
    }
  }
`