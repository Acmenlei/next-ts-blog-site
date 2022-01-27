import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { memo } from 'react';

const ArticleDetail: NextPage = memo((props) => {
  const router = useRouter()
  const { id } = router.query
  console.log(props)
  return (
    <>
      <h3>detail page: {id}</h3>
    </>
  );
});
// 获取初始化
ArticleDetail.getInitialProps = async (ctx) => {
  return {
    id: ctx.query.id
  }
}

export default ArticleDetail