import styled from "styled-components"

export const ArticleRightContainerWrapper = styled.div`
    background-color: rgba(50, 50, 50, .7);
    padding: 10px 0;
    margin-bottom: 20px;
    
    .container-title {
      border-bottom: 3px solid ${(props: any) => props.color};

      i {
        margin:0 10px;
        color: ${(props: any) => props.color};
        font-size: 20px;
      }

      p {
        color: #f9f9f9;
        display: inline-block;
      }
    }
    
    .container-children {
      padding: 15px 10px;
    }
    
` 