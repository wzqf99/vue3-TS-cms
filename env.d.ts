/*
 * @Author: yelan wzqf99@foxmail.com
 * @Date: 2024-10-17 09:39:33
 * @LastEditors: yelan wzqf99@foxmail.com
 * @LastEditTime: 2024-10-17 13:30:33
 * @FilePath: \vue3-ts-cms\env.d.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent
  export default component
}
