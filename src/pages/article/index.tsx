import React, { memo } from 'react';
import type { NextPage } from "next"

import { ArticleWrapper } from "./style"
import { get } from '@/services/config';

const Article: NextPage = memo((props) => {
  
  const { users }: any = props

  return (
    <ArticleWrapper>
      {
        users.map((item: any) => {
          return (
            <p key={item.id}>
              {JSON.stringify(item)}
            </p>
          )
        })
      }
    </ArticleWrapper>
  )
})

// memo 正常需要使用
Article.getInitialProps = async () => {
  // 获取数据 这里使用dispatch发送action请求数据
  const data = await get('/users')
  return {
    users: data
  }
}

export default Article;
