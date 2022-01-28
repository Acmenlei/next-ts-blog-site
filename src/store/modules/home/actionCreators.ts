import { ActionExtenal } from "@/common/interface/action"
import { ActionTypes } from "./constants"

// counter test
export const increamentAction = (data?: any): ActionExtenal => {
  return {
    type: ActionTypes.INCREAMENT_COUNTER,
    data
  }
}
// 显示加载
export const hideLoadingAction = (): ActionExtenal => {
  return {
    type: ActionTypes.HIDE_LOADING
  }
}
// 隐藏加载
export const showLoadingAction = (): ActionExtenal => {
  return {
    type: ActionTypes.SHOW_LOADING
  }
}