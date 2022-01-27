import { Map } from "immutable";

import { ActionTypes } from "./constants"

// init state
const initialState = Map({
  counter: 0,
     
})
// home reducer
export function reducer(state = initialState, action: any) {
  switch (action.type) {
    case ActionTypes.INCREAMENT_COUNTER:
      return state.set("counter", state.get("counter") + action.data)
    default:
      return state;
  }
}