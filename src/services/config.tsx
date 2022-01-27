import axios from "axios";

const service = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
})

service.interceptors.request.use((config) => {
  console.log("请求拦截")
  return config;
})

// 解构data
service.interceptors.response.use((data) => {
  console.log("响应拦截")
  return data.data;
})

// get请求配置
export const get = (url: string, params: any = {}) => {
  return new Promise((resolve, reject) => {
    service.get(url, params).then(res => {
      resolve(res);
    }, err => {
      reject(err)
    })
  })
}
// post请求配置
export const post = (url: string, data: any = {}) => {
  return new Promise((resolve, reject) => {
    service.get(url, data).then(res => {
      resolve(res);
    }, err => {
      reject(err)
    })
  })
}