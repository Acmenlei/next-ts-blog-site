import { getCurrentCardBackground, getCurrentFontColor } from "@/utils/theme"
import styled from "styled-components"

export const MessageBoardWrapper = styled.div`
  padding: 20px;
  height: 100%;
  border-radius: 8px;
  box-shadow: 0 0 1px #333;
  background-color: ${(props: any) => getCurrentCardBackground(props.theme)};
  transition: background-color .2s, color .2s;
  color: ${(props: any) => getCurrentFontColor(props.theme)};
  animation: transformXAnimation .5s;

  @keyframes transformXAnimation {
    from { transform: translateX(-100%) }
    to { transform: translateX(0) }
  }

  .emoji-container {
    position: absolute;
    z-index: 9;
    .emoji-icon {
      font-size: 30px;
      color:#999;
      margin: 10px 20px 0 0;
      cursor: pointer;

      &:hover {
        opacity: .9;
      }
  }
  }
  .publish-btn {
    margin-left: 50px;
  }
`