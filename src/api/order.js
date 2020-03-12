/**
 * @Description: 订单相关接口
 * @author author
 * @date 2019-08-02
 */
import req from '@plug/axios'
// 订单列表
export const orderList = params => req.reqGet('/order/page', { ...params })
// 订金列表
export const MoneyList = params => req.reqGet('/deposit/page', { ...params })
// 定金详情
export const MoneyInfo = params => req.reqGet('/deposit/info', { ...params })
// 退款
export const reFund = params => req.reqPut('/deposit/refund', { ...params })
// 定金配置详情
export const configInfo = params => req.reqGet('/deposit/config/info', { ...params })
// 定金配置修改
export const configUpdate = params => req.reqPut('/deposit/config/update', { ...params })
