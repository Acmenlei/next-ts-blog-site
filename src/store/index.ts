import { createStore, applyMiddleware } from "redux"
import reduxThunk from "redux-thunk"
import { combineReducers } from "redux-immutable"

import { reducer as home } from "./modules/home"
import { reducer as article } from "./modules/article"

const store = createStore(combineReducers({ home,article }), applyMiddleware(reduxThunk))

export default store