import { Comment, Modal, Tooltip } from 'antd';
import React, { memo, useCallback, useState } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import { formatTime, formatTimeFromNow } from '@/utils/format';
import { CommentWrapper } from './style';
import TextArea from 'antd/lib/input/TextArea';

export default memo(function BoardComment(props: any) {
  // redux hook
  const { commentsList } = props
  const [modal, contextHolder] = Modal.useModal();
  const [replyContent, setReplyContent] = useState((""))
  const [pId, setPid] = useState(-1)
  const [pUsername, setPusername] = useState("")
  const [nickName, setNickName] = useState("")
  const [isModalVisible, setIsModalVisible] = useState(false);

  // 删除modal
  const isRemoveComment = useCallback((cb) => {
    modal.confirm({
      title: "提示",
      content: (<span>确定要删除该留言吗？</span>),
      cancelText: "取消",
      okText: "确认",
      onOk: cb
    })
  }, [])
  // 回复modal
  const isReplyComment = useCallback((nickname: string, pid: number, pUsername: string) => {
    setReplyContent("@" + nickname + "：")
    setPusername(pUsername)
    setNickName(nickname)
    setPid(pid)
    setIsModalVisible(true)
  }, [])
  // 回复逻辑
  const replyComment = useCallback(() => {
    // 切割正确的内容
    props.reply(pId, pUsername, nickName, replyContent.slice(replyContent.indexOf("：") + 1))
    // 重置内容
    setReplyContent(replyContent.slice(0, replyContent.indexOf("：") + 1))
  }, [props.reply, replyContent, pId, pUsername, nickName])
  // 取消回复
  const cancelReply = useCallback(() => {
    setPusername("")
    setNickName("")
    setPid(-1)
    setReplyContent("")
    setIsModalVisible(false)
  }, [])
  return (
    <CommentWrapper>
      <TransitionGroup>
        {
          commentsList && commentsList.map((item: any, idx: number) => {
            const { children, ll_level, ll_nick_name, ll_username, ll_avatar, ll_createdTime, ll_content, ll_id } = item
            // 必须添加唯一的key 因为在删除item的时候需要对item做移除动画
            return (
              <CSSTransition
                timeout={300}
                unmountOnExit
                classNames="comment-item"
                key={ll_id}>
                <Comment
                  style={{ borderBottom: '1px solid #eee' }}
                  key={ll_id}
                  actions={[
                    <span onClick={() => isRemoveComment(() => props.removeComment(ll_id, idx, ll_level))}>删除</span>,
                    <span onClick={() => isReplyComment(ll_nick_name, ll_id, ll_username)}>回复</span>
                  ]}
                  author={<a href='/#'>{ll_nick_name}</a>}
                  avatar={ll_avatar}
                  content={ll_content}
                  datetime={
                    <Tooltip
                      placement="top"
                      title={formatTime(ll_createdTime)}>
                      {formatTimeFromNow(ll_createdTime)}
                    </Tooltip>}>
                  {
                    children && children.map((citem: any, cidx: number) => {
                      return (
                        
                        <Comment
                          key={citem.ll_id}
                          actions={[
                            <span onClick={() => isRemoveComment(() => props.removeComment(citem.ll_id, cidx, citem.ll_level, idx))}>删除</span>,
                            // 所有回复二级留言的都处于唯一的父节点中 除nickname不同
                            <span onClick={() => isReplyComment(citem.ll_nick_name, ll_id, ll_username)}>回复</span>
                          ]}
                          author={<a href='/#'>{citem.ll_nick_name}</a>}
                          avatar={citem.ll_avatar}
                          // 二级留言内容 前缀@
                          content={<>
                            <a href='javascript:;'>
                              @{citem.ll_p_nick_name}：
                            </a>
                            {citem.ll_content}
                          </>}
                          datetime={
                            <Tooltip
                              placement="top"
                              title={formatTime(citem.ll_createdTime)}>
                              {formatTimeFromNow(citem.ll_createdTime)}
                            </Tooltip>} />
                      )
                    })
                  }
                </Comment>
              </CSSTransition>
            )

          })
        }
      </TransitionGroup>
      {contextHolder}
      <Modal
        title="回复输入框"
        visible={isModalVisible}
        cancelText="取消"
        okText="回复"
        onCancel={cancelReply}
        onOk={replyComment}>
        <TextArea
          value={replyContent}
          rows={5}
          showCount
          maxLength={200}
          onChange={e => setReplyContent(e.target.value)} />
      </Modal>
    </CommentWrapper>
  );
});
