// import type { NextRouter, Router } from "next/router";
// import { isLoginStatus } from "./services/modules/login";

// export default function PremissionControl(router: NextRouter, userInfo: any) {
//   router.beforePopState(({ url }) => {
//     console.log("路由发生改变", url)
//     if (url === '/login') {
//       // 判断是已登录
//       if (userInfo) {
//         return false
//       }
//     }
//     return true
//   })
// }