// 解决第三方库使用document或者window的问题
import dynamic from 'next/dynamic';
const Picker = dynamic(() => import("emoji-picker-react"), { ssr: false })
const { SKIN_TONE_MEDIUM_DARK }: any = dynamic(() => import("emoji-picker-react"), { ssr: false })

import React, { memo, useCallback, useState } from 'react';
import { SmileOutlined } from '@ant-design/icons';

import CommentEmojiModuleCSS from "./style.module.css"

export default memo(function CommentEmojiCpn(props: any) {
  const [pickerStatus, setPickerStatus] = useState(false)
  // 切换emoji的选择
  const triggerPicker = useCallback(() => {
    setPickerStatus(!pickerStatus)
  }, [pickerStatus])
  return (
    <>
      <SmileOutlined className={CommentEmojiModuleCSS.emojiIcon} onClick={triggerPicker} />
      {
        pickerStatus && <Picker onEmojiClick={props.onEmojiClick}
          disableAutoFocus={true}
          skinTone={SKIN_TONE_MEDIUM_DARK}
          groupNames={{ smileys_people: 'PEOPLE' }}
          native />
      }
    </>
  )
});
