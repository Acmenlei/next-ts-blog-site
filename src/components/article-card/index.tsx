import { COLORS } from '@/common/colors';
import { ThemeContext } from '@/common/context';
import { formatCategory, formatTime } from '@/utils/format';
import { Tag } from 'antd';
import React, { memo, useContext } from 'react';
import { ArticleCardWrapper } from "./style"

export default memo(function ArticleCard(props: any) {
  const theme = useContext(ThemeContext)
  const {
    ll_title,
    ll_introduce,
    ll_category,
    ll_tags,
    ll_createdTime,
    ll_cover } = props

  return (
    <ArticleCardWrapper theme={theme}>
      <div className="card-item-left">
        <img src={ll_cover} height={300} width={400} />
      </div>
      <div className="card-item-right">
        <h2>{ll_title}</h2>
        <p className='card-item-introduce'>{ll_introduce}</p>
        <p>{formatTime(ll_createdTime)}</p>
        <p className='card-item-tags'>
          <strong>标签：</strong>
          {
            ll_tags.split(",").map((item: any, index: number) => {
              return <Tag key={index} color={COLORS[index]}>{item}</Tag>
            })
          }
        </p>
        <p>
          <strong>文章类别：</strong>
          <Tag color="#2db7f5">{formatCategory(ll_category)}</Tag>
        </p>
      </div>
      {/* 三个彩球 */}
      <div className='three-colors-ball'>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </ArticleCardWrapper>
  );
});
