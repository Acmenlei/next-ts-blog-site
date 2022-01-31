import { NextPage } from 'next';
import React, { createRef, memo, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Affix, Button } from "antd"
import "highlight.js/styles/github-dark.css"
import MarkdownNavbar from 'markdown-navbar';

import {
  ArticleDescWrapper,
  ArticleDetailWrapper,
  ArticleDetailContent,
  ArticleDetailOutLine
} from "./style"
import { fetchArticleById } from '@/services/modules/article';
import { articleCommentPublish, articleCommentReply, deleteArticleCommentById, fetchAllArticleCommentList } from "@/services/modules/articleComment"
import { ThemeContext } from '@/common/context';
import { formatTime } from '@/utils/format';
import TextArea from 'antd/lib/input/TextArea';
import { useDispatch, useSelector } from 'react-redux';
import { successMessage, warningMessage } from '@/common/message';
import { useRouter } from 'next/router';

import BoardComment from '@/components/board-comment';

const ArticleDetail: NextPage = memo((props: any) => {
  // redux hook
  const dispatch = useDispatch()
  const { userInfo } = useSelector((state: any) => {
    return {
      userInfo: state.getIn(["login", "userInfo"])
    }
  })
  const { articleDetail, articleComments, total } = props
  const theme = useContext(ThemeContext)
  useEffect(() => {
    (codeRef.current as HTMLElement).innerHTML = articleDetail.ll_content_html
  }, [articleDetail])
  // console.log(userInfo, "相等")
  const codeRef = createRef()
  const [content, setContent] = useState("")
  const router = useRouter()
  const articleId = useMemo(() => router.query.id, [router])

  // 发表文章评论逻辑
  const publishArticleComment = useCallback(async () => {
    if (!userInfo) {
      return warningMessage("请先登录再来评论～")
    }
    if (!content) {
      return warningMessage("评论内容不能为空～")
    }
    const { ll_username, ll_nick_name, ll_avatar } = userInfo
    // 提交
    const { code, msg }: any = await articleCommentPublish({
      ll_username,
      ll_avatar,
      ll_nick_name,
      ll_content: content,
      ll_article_id: articleId
    })
    if (code == 200) {
      successMessage(msg)
      // articleCommentPublish()
    }
    setContent("")
  }, [userInfo, content, articleId])
  // 删除文章评论逻辑
  const removeComment = useCallback(async ({ id, level, username }) => {
    const { code, msg }: any = await deleteArticleCommentById({
      ll_id: id,
      ll_level: level,
      ll_username: username,
      ll_article_id: articleId
    })
    if(code === 200) {
      successMessage(msg)
      // 后续
    }
  }, [articleId])
  // 回复文章评论逻辑
  const reply = useCallback(async (id, username, nickName, content) => {
    if (!userInfo) {
      return warningMessage("你还没有登录 先去登录吧～")
    }
    const { ll_nick_name, ll_avatar, ll_username } = userInfo
    const { code, msg }: any = await articleCommentReply({
      ll_username,
      ll_p_username: username,
      ll_pid: id,
      ll_content: content,
      ll_nick_name,
      ll_avatar,
      ll_p_nick_name: nickName,
      ll_article_id: articleId
    })
    if(code == 200) {
      successMessage(msg)
    }
  }, [userInfo, articleId])
  return (
    <>
      <ArticleDescWrapper theme={theme}>
        <h2>{articleDetail.ll_title}</h2>
        <p>最后编辑时间：{formatTime(articleDetail.ll_updatedTime)}</p>
      </ArticleDescWrapper>
      <ArticleDetailWrapper theme={theme}>
        <div className='content-container'>
          <ArticleDetailContent ref={codeRef} theme={theme}>
          </ArticleDetailContent>
          <p>评论区</p>
          <TextArea
            value={content}
            placeholder='你想对我说什么？'
            rows={5}
            showCount
            maxLength={200}
            onChange={e => setContent(e.target.value)} />
          <Button
            className='mt-15'
            type="primary"
            onClick={publishArticleComment}>发表</Button>
          <BoardComment
            removeComment={removeComment}
            reply={reply}
            commentsList={articleComments} />
        </div>
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
  const articleComments: any = await fetchAllArticleCommentList({ ll_id: ctx.query.id })
  // console.log(articleComments)
  return {
    articleDetail: articleDetail.data,
    articleComments: articleComments.data,
    total: articleComments.total
  }
}

export default ArticleDetail