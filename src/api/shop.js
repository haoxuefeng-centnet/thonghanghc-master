/**
 * @Description: 微店管理接口
 * @author author
 * @date 2019-07-31
 */
import req from '@plug/axios'
// 微店列表
export const shopList = params => req.reqGet('/store/list', { ...params })
// 微店详情
export const shopInfo = params => req.reqGet('/store/info', { ...params })
