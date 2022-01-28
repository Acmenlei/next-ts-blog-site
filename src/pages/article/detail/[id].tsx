import { NextPage } from 'next';
import React, { createRef, memo, useContext, useEffect } from 'react';
import { Affix } from "antd"
import "highlight.js/styles/github-dark.css"
import MarkdownNavbar from 'markdown-navbar';

import {
  ArticleDescWrapper,
  ArticleDetailWrapper,
  ArticleDetailContent,
  ArticleDetailOutLine
} from "./style"
import { fetchArticleById } from '@/services/modules/article';
import { ThemeContext } from '@/common/context';
import { formatTime } from '@/utils/format';

const ArticleDetail: NextPage = memo((props: any) => {
  const { articleDetail } = props
  const theme = useContext(ThemeContext)
  useEffect(() => {
    (codeRef.current as HTMLElement).innerHTML = articleDetail.ll_content_html
  }, [articleDetail])

  const codeRef = createRef()

  return (
    <>
      <ArticleDescWrapper theme={theme}>
        <h2>{articleDetail.ll_title}</h2>
        <p>最后编辑时间：{formatTime(articleDetail.ll_updatedTime)}</p>
      </ArticleDescWrapper>
      <ArticleDetailWrapper theme={theme}>
        <ArticleDetailContent ref={codeRef} theme={theme}>
        </ArticleDetailContent>
        <Affix offsetTop={55}>
          <ArticleDetailOutLine theme={theme}>
            <MarkdownNavbar
              ordered={false}
              headingTopOffset={0}
              source={articleDetail.ll_content} />
          </ArticleDetailOutLine>
        </Affix>
      </ArticleDetailWrapper>
    </>
  );
});
// 获取初始化
ArticleDetail.getInitialProps = async (ctx) => {
  const articleDetail: any = await fetchArticleById({ ll_id: ctx.query.id })
  return {
    articleDetail: articleDetail.data
  }
}

export default ArticleDetail