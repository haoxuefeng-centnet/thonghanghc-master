/**
 * @Description: vip相关配置
 * @author  Gyang18
 * @date 2019-08-01
 */
import req from '@plug/axios'
// 获取vip配置列表
export const vipList = params => req.reqGet('/vip/list', { ...params })
// 获取推广配置列表
export const generalizeList = params => req.reqGet('/extension/list', { ...params })
// 修改vip配置
export const editVipConfig = params => req.reqPut('/vip/update', { ...params })
// 修改推广配置
export const addVipConfig = params => req.reqPut('/extension/update', { ...params })
