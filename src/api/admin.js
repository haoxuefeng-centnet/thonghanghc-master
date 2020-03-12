/**
 * 管理用户相关接口
 * @author
 * @date 2019/4/8
 */
import req from '@plug/axios'
// 用户登录
export const userLogin = params => req.reqPost('/user/login', { ...params })
// 用户退出
export const userLogout = params => req.reqPost('/user/login-out', { ...params })
// 获取用户信息
export const UserInfo = params => req.reqGet('/user/info', { ...params })
// 修改登陆密码
export const modifyPassword = params => req.reqPut('/user/modify-password', { ...params })
// 管理用户列表
export const adminList = params => req.reqGet('/user/page', { ...params })
// 删除管理用户
export const deleteAdmin = params => req.reqDelete('/user/del', { ...params })
// 添加管理员
export const addAdmin = params => req.reqPost('/user', { ...params })
// 修改用户
export const putAdmin = params => req.reqPut('/user/update', { ...params })
