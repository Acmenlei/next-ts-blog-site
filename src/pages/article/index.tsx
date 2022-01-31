import React, { memo, useState } from 'react';
import type { NextPage } from "next"
import { Pagination } from "antd"

import { ArticleWrapper } from "./style"
import {
  fetchArticleCategoryList,
  fetchArticleList,
  fetchArticleRecentList,
  fetchArticleTagList
} from '@/services/modules/article';

import ArticleCard from "@/components/article-card"
import ArticleMusic from '@/components/article-music';
import ArticleCategory from '@/components/article-category';
import ArticleRecent from '@/components/article-recent';
import ArticleTagWall from '@/components/article-tag-wall';
import ArticleProfile from '@/components/article-profile';
import { useRouter } from 'next/router';

const Article: NextPage = memo((props: any) => {
  const [pageNum, setPageNum] = useState(1)
  const [pageSize] = useState(4)
  const router = useRouter()

  const routerJump = (id: string) => {
    router.push(`/article/detail/${id}`)
  }

  const {
    articleList,
    articleTotal,
    categoryList,
    categoryCounts,
    recentList,
    tagList
  } = props // 获取数据

  return (
    <ArticleWrapper>
      <div className="article-left">
        {
          articleList && articleList.map((item: any) => {
            return (
              <div key={item.ll_id} onClick={() => routerJump(item.ll_id)}>
                <ArticleCard
                  ll_title={item.ll_title}
                  ll_introduce={item.ll_introduce}
                  ll_cover={item.ll_cover}
                  ll_createdTime={item.ll_createdTime}
                  ll_tags={item.ll_tags}
                  ll_category={item.ll_category} />
              </div>
            )
          })
        }
        <Pagination
          onChange={(num) => setPageNum(num)}
          defaultCurrent={pageNum}
          pageSize={pageSize}
          total={articleTotal} />
      </div>
      <div className="article-right">
        <ArticleMusic />
        <ArticleCategory categoryCounts={categoryCounts} categoryList={categoryList} />
        <ArticleRecent recentList={recentList} />
        <ArticleTagWall tagList={tagList} />
        <ArticleProfile />
      </div>
    </ArticleWrapper>
  )
})

Article.getInitialProps = async () => {
  // get data...
  const articleData: any = await fetchArticleList({ pageNum: 1, pageSize: 4 })
  const categoryData: any = await fetchArticleCategoryList()
  const recentData: any = await fetchArticleRecentList()
  const tagData: any = await fetchArticleTagList()

  return {
    articleList: articleData.data,
    ArticleTotal: articleData.total,
    categoryList: categoryData.data,
    categoryCounts: categoryData.counts,
    recentList: recentData.data,
    tagList: tagData.data
  }
}

export default Article;
