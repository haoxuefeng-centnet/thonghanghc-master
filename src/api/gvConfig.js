/**
 * @Description: 赠送配置相关接口
 * @author Gyang18
 * @date 2019-07-31
 */
import req from '@plug/axios'
// 获取配置列表
export const gyConfigList = params => req.reqGet('/config/send/list', { ...params })
// 赠送功能点
export const addGying = params => req.reqPost('/customer/send', { ...params })
// 赠送vip
export const vipGive = params => req.reqPost('/vip/give', { ...params })
// 更新配置
export const updateGying = params => req.reqPut('/config/send/update', { ...params })
