import React, { memo } from 'react';

import ArticleRContainer from '../article-r-container';
import { formatTime } from '@/utils/format';
import { ArticleRecentWrapper } from "./style"
import Link from 'next/link';

export default memo(function ArticleRecent(props: any) {
  const { recentList } = props
  return (
    <ArticleRContainer title="最近文章" icon="iconfont icon-zuijinlaifang" color="yellow">
      <ArticleRecentWrapper color="purple">
        {
          recentList.map((item: any) => {
            return (
              <Link href={`/article/detail/${item.ll_id}`}>
                <li key={item.ll_id}>
                  <span className='article-title text-one-line'>{item.ll_title}</span>
                  <span className='article-publish-time'>{formatTime(item.ll_updatedTime)}</span>
                </li>
              </Link>
            )
          })
        }
      </ArticleRecentWrapper>
    </ArticleRContainer>
  );
});
