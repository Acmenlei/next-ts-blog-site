import React, { memo } from 'react';

import { AppBackGroundWrapper } from "./style"

export default memo(function AppBackGround() {
  return (
    <AppBackGroundWrapper>
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
    </AppBackGroundWrapper>
  );
});
