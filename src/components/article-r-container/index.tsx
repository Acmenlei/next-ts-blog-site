import React, { memo } from 'react';
import { ArticleRightContainerWrapper } from "./style"

export default memo(function ArticleRightContainer(props: any) {
  const { children, title, icon, color } = props
  return (
    <ArticleRightContainerWrapper color={color}>
      <div className="container-title">
        <i className={icon}></i><p>{title}</p>
      </div>
      <div className='container-children'>
      {children}
      </div>
    </ArticleRightContainerWrapper>
  );
});
