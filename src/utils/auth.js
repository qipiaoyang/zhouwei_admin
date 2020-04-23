import Cookies from 'js-cookie'

const TokenKey = 'panda_shop_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}





// import { TOKEN, USERINFO, PERMISSSION } from "./config.js";
// import localforage from "localforage";


// /**
//  * 获取用户信息
//  * @returns {Promise<any>}
//  */
// export async function getUserInfo() {
//   let user = await localforage.getItem(USERINFO);
//   if (user) {
//     return JSON.parse(user);
//   }
//   return user;
// }

// /**
//  *  设置用户信息
//  * @param data
//  * @returns {Promise<void>}
//  */
// export async function setUserInfo(data) {
//   await localforage.setItem(`${USERINFO}`, JSON.stringify(data));
// }

// /**
//  * 获取TOKEN
//  * @returns {Promise<any>}
//  */
// export async function getToken() {
//   return await localforage.getItem(TOKEN);
// }


// /**
//  * 设置TOKEN
//  * @returns {Promise<any>}
//  */
// export async function setToken(data) {
//   await localforage.setItem(`${TOKEN}`, data);
// }

// /**
//  * 获取权限列表
//  * @returns {Promise<any>}
//  */
// export async function getPermission() {
//   return await localforage.getItem(PERMISSSION);
// }


// /**
//  * 设置权限列表
//  * @returns {Promise<any>}
//  */
// export async function setPermission(data) {
//   await localforage.setItem(`${PERMISSSION}`, JSON.stringify(data));
// }


// /**
//  * 清除所有缓存
//  */
// export async function removeAll() {
//   await localforage.clear();
// }
