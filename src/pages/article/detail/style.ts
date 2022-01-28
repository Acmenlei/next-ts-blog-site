import { getCurrentCardBackground, getCurrentFontColor } from "@/utils/theme"
import styled from "styled-components"

export const ArticleDescWrapper = styled.div`
    color: ${(props: any) => getCurrentFontColor(props.theme)};
    text-align: center;
    padding: 50px 0;
    
    h2 {
      color: inherit;
    }
`

export const ArticleDetailWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  background-color: ${(props: any) => getCurrentCardBackground(props.theme)};
  transition: background-color .2s;
`

export const ArticleDetailContent = styled.div`
    flex: 1;
    padding: 10px;
    border-right: 1px solid ${(props: any) => props.theme == 'dark' ? '#666' : '#ccc'};
    color: ${(props: any) => getCurrentFontColor(props.theme)};
    
    .hljs {
      position: relative;
      padding:30px 10px 10px 10px;
      font-size: 16px;
      border-radius: 10px;

      &::after, &::before {
        position: absolute;
        top: 10px;
        display: block;
        width: 12px;
        height: 12px;
        border-radius: 50%;
      }
      &::after {
        content: "";
        left: 8px;
        background-color: #eb4d4b;
      }
      &::before {
        content: "";
        left: 28px;
        background-color: yellow;
      }
      code {
        &::before {
          position: absolute;
          top: 10px;
          display: block;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          content: "";
          left: 48px;
          background-color: #4cd137;
        }
      }
    }

    p {
      line-height: 26px;
      font-size: 16px;
      
      code {
        color: #eb4d4b;
        margin: 0 3px;
        text-shadow: 0 0 5px ${(props: any) => props.theme == 'dark' ? 'gray' : 'pink'};
      }
    }
    
    strong {
      margin: 0 3px;
    }
    h1, h2, h3, h4, h5, h6 {
      color: inherit;
    }
    h1 {
      font-size: 35px;
      margin-bottom: 20px;
    }
    h2 {
      font-size: 28px;
      margin-bottom: 15px;
      border-bottom: 2px solid #eb4d4b;
    }
    h3 {
      font-size: 20px;
    }

    img {
      width: 80%;
    }
`

export const ArticleDetailOutLine = styled.div`
    width: 300px;
    color: ${(props: any) => getCurrentFontColor(props.theme)};
    padding: 10px;
    border-bottom-right-radius: 10px;
    border-top-right-radius: 10px;
    height: 100%;

    .markdown-navigation  {
      font-size: 20px;

      .title-anchor {
        display: block;
        transition: all 0.2s;
        margin: 0.8em 0;
        font-weight: lighter;
        line-height: 1.2em;
        padding-right: 1.8em;
        cursor: pointer;

        &:hover, &.active {
          
          text-decoration: inherit;
        }

        &.active {
          color: #eb4d4b;
          text-shadow: 0 0 2px pink;
        }

        small {
          margin: 0 0.8em;
        }
      }

    .title-level1 {
      color: green;
      font-size: 1.2em;
      padding-left: 1em;
      font-weight: normal;
    }

     .title-level2 {
      font-size: 1em;
      padding-left: 1em;
      font-weight: normal;
    }

     .title-level3 {
      font-size: 0.8em;
      padding-left: 3em;
      font-weight: normal;
    }

     .title-level4 {
      font-size: 0.72em;
      padding-left: 5em;
    }

     .title-level5 {
      font-size: 0.72em;
      padding-left: 7em;
    }

    .title-level6 {
      font-size: 0.72em;
      padding-left: 9em;
    }
    }
`
