import React, { memo, useState } from 'react';
import type { NextPage } from "next"
import { Pagination } from "antd"

import { ArticleWrapper } from "./style"
import { fetchArticleCategoryList, fetchArticleList, fetchArticleRecentList } from '@/services/modules/article';

import ArticleCard from "@/components/article-card"
import ArticleMusic from '@/components/article-music';
import ArticleCategory from '@/components/article-category';
import ArticleRecent from '@/components/article-recent';

const Article: NextPage = memo((props: any) => {
  const [pageNum, setPageNum] = useState(1)
  const [pageSize] = useState(4)
  console.log(props)
  const { articleList, articleTotal, categoryList, categoryCounts, recentList } = props // 获取数据
  return (
    <ArticleWrapper>
      <div className="article-left">
        {
          articleList.map((item: any) => {
            return <ArticleCard
              key={item.ll_id}
              ll_title={item.ll_title}
              ll_introduce={item.ll_introduce}
              ll_cover={item.ll_cover}
              ll_createdTime={item.ll_createdTime}
              ll_tags={item.ll_tags}
              ll_category={item.ll_category} />
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
        <ArticleCategory
          categoryCounts={categoryCounts}
          categoryList={categoryList} />
        <ArticleRecent recentList={recentList}/>
      </div>
    </ArticleWrapper>
  )
})

Article.getInitialProps = async () => {
  // get data...
  const articleData: any = await fetchArticleList({ pageNum: 1, pageSize: 4 })
  const categoryData: any = await fetchArticleCategoryList()
  const recentData: any = await fetchArticleRecentList()

  return {
    articleList: articleData.data,
    ArticleTotal: articleData.total,
    categoryList: categoryData.data,
    categoryCounts: categoryData.counts,
    recentList: recentData.data
  }
}

export default Article;
