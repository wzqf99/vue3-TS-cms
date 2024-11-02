/*
 * @Author: yelan wzqf99@foxmail.com
 * @Date: 2024-10-21 10:18:44
 * @LastEditors: yelan wzqf99@foxmail.com
 * @LastEditTime: 2024-10-22 08:57:54
 * @FilePath: \vue3-ts-cms\src\service\config\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 1.区分开发环境和生产环境
// export const BASE_URL = 'http://coderwhy.dev:8000'
// export const BASE_URL = 'http://codercba.prod:8000'

// 2.代码逻辑判断, 判断当前环境
// vite默认提供的环境变量
// console.log(import.meta.env.MODE)
console.log(import.meta.env.DEV) // 是否开发环境
console.log(import.meta.env.PROD) // 是否生产环境
console.log(import.meta.env.SSR) // 是否是服务器端渲染(server side render)

let BASE_URL = ''
if (import.meta.env.PROD) {
  BASE_URL = 'http://codercba.com:5000'
} else {
  BASE_URL = 'http://codercba.com:5000'
}

console.log(BASE_URL)

// 3.通过创建.env文件直接创建变量
console.log(import.meta.env.VITE_URL)

export const TIME_OUT = 10000
export { BASE_URL }
