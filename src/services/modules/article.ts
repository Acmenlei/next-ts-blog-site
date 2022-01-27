import { get, post } from "../config"

export const fetchArticleList = (data?: any) => {
  // 发送网络请求
  return post("/reception/article/list", data)
}

export const fetchArticleCategoryList = (params?: any) => {
  return get('/reception/article/getAndCountCategory', params)
}

export const fetchArticleRecentList = (params?: any) => {
  return get("/reception/article/getRecentArticle", params)
}