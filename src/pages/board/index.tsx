import { Button } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { NextPage } from 'next';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { successMessage, warningMessage } from '@/common/message';
import { MessageBoardWrapper } from "./style"

import BoardComment from '@/components/board-comment';
import { delComment, publishComment, queryComments, replyComment } from '@/services/modules/comment';
import { requestCommentListAction } from '@/store/modules/board/actionCreators';

const MessageBoard: NextPage = memo(() => {
  // redux hooks
  const dispatch = useDispatch()
  const { userInfo, commentsList, total } = useSelector((state: any) => {
    return {
      userInfo: state.getIn(["login", "userInfo"]),
      commentsList: state.getIn(["board", "commentsList"]),
      total: state.getIn(["board", "total"]),
    }
  }, shallowEqual)

  const [content, setContent] = useState("")
  const [pageNum, setPageNum] = useState(1)

  useEffect(() => {
    queryComments({ pageNum, pageSize: 10 }).then(({ data, total }: any) => {
      console.log(data)
      dispatch(requestCommentListAction({ data, total }))
    })
  }, [])

  // 发表留言
  const publishMessage = async () => {
    // 判断是否登录
    if (!userInfo) {
      // 未登录
      return warningMessage("先登录再来留言吧～")
    }
    if (!content) {
      return warningMessage("内容不能为空～")
    }
    // 1. dispatch request...
    const { ll_username, ll_nick_name, ll_avatar } = userInfo
    const { code, msg }: any = await publishComment({ ll_username, ll_avatar, ll_nick_name, ll_content: content })
    if (code == 200) {
      successMessage(msg)
      // 输入框置空
      setContent("")
    }
    // 本应该抽俩出去 但是redux-thunk 不起效 暂时先这么写
    const { data, total }: any = await queryComments({ pageNum, pageSize: 10 })
    dispatch(requestCommentListAction({ data, total }))
  }
  // 删除留言(level1/level2)（没登录的情况下不开放显示）如果是一级留言 那么它的子集都要被删除
  const removeComment = useCallback(async (ll_id: number, idx: number, ll_level: number, pidx: number) => {
    const { code, msg }: any = await delComment({ ll_id, ll_level })
    // console.log(code, "执行删除")
    if (code === 200) {
      successMessage(msg)
      const data = [...commentsList]
      pidx ? data[pidx].children.splice(idx, 1) : data.splice(idx, 1) // 删除当前留言
      dispatch(requestCommentListAction({ data })) // 重新修改redux
    }
  }, [dispatch, commentsList])
  // 回复留言
  const reply = useCallback(async (id, username, nickName, content) => {
    if(!userInfo) {
      warningMessage("你还没有登录 先去登录吧～")
      return
    }
    const { ll_nick_name, ll_avatar, ll_username } = userInfo
    const { code, msg }: any = await replyComment({
      ll_username,
      ll_p_username: username,
      ll_pid: id,
      ll_content: content,
      ll_nick_name,
      ll_avatar,
      ll_p_nick_name: nickName
    })
    if(code === 200) {
      successMessage(msg)
    }
  }, [userInfo])
  return (
    <MessageBoardWrapper>
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
        onClick={publishMessage}>发表</Button>
      {/* 留言板内容 */}
      <BoardComment
        commentsList={commentsList}
        removeComment={removeComment}
        reply={reply} />
      {/* 分页 */}
    </MessageBoardWrapper>
  );
});

export default MessageBoard
