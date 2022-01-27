import { increamentAction } from "@/store/modules/home/actionCreators"
import type { Dispatch } from "redux"

export const fetchHomeCounter = (params: any) => {
  console.log("data fetch ...")
  return (dispatch: Dispatch) => {
    // 得到一个action 触发dispatch
    dispatch(increamentAction(params))
  }
}