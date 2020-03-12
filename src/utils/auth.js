/**
 * @Description: 用户模块管理
 * @Author: Gyang18
 * @Create: 2019/5/19
 * @Version: 1.0.0
 */
// 保存token的字段
const TokenKey = 'token'
// 保存用户信息的字段
const UserKey = 'user'
import Locality from './locality'

// 获取用户token
export function getToken() {
  return Locality.getData(TokenKey) || null
}
//保存
export function saveToken(key) {
  Locality.saveData(TokenKey, key)
}
// 删除
export function removeToken() {
  Locality.removeData(TokenKey)
}

// 用户信息
export function getUserInfo() {
  return Locality.getData(UserKey) || null
}

// 保存用户信息
export function saveUserInfo(data) {
  Locality.saveData(UserKey, data)
}
// 删除用户信息

export function removeUser() {
  Locality.removeData(UserKey)
}
