import axios from "axios";
import store from "@/store"
import { hideLoadingAction, showLoadingAction } from "@/store/modules/home/actionCreators";

const service = axios.create({
  baseURL: 'http://localhost:9001',
  timeout: 5000,
  withCredentials: true
})

service.interceptors.request.use((config) => {
  store.dispatch(showLoadingAction())
  return config;
})

// 解构data
service.interceptors.response.use((data) => {
  store.dispatch(hideLoadingAction())
  return data.data;
})

// get请求配置
export const get = (url: string, params: any = {}) => {
  return new Promise((resolve, reject) => {
    service.get(url, params).then(res => {
      resolve(res);
    }, err => {
      reject(err)
      store.dispatch(hideLoadingAction())
    })
  })
}
// post请求配置
export const post = (url: string, data: any = {}) => {
  return new Promise((resolve, reject) => {
    service.post(url, data).then(res => {
      resolve(res);
    }, err => {
      reject(err)
      store.dispatch(hideLoadingAction())
    })
  })
}