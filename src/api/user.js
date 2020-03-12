/*
 * app用户管理接口
 * */
import req from '@plug/axios'
// 获取用户列表
export const userList = params => req.reqGet('/cus/list', { ...params })
// 修改用户
export const putUser = params => req.reqPut('/cus/update', { ...params })
// 用户详情
export const putinfo = params => req.reqGet('/cus/info', { ...params })
// 用户详情
export const putUpdata = params => req.reqPut('/cus/update-location', { ...params })
