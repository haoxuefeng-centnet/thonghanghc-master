/**
 * @Description: 车辆相关接口
 * @author Gyang18
 * @date 2019-08-01
 */
import req from '@plug/axios'
// 车辆列表
export const carList = params => req.reqGet('/car/page', { ...params })
// 车辆详情
export const carInfo = params => req.reqGet('/car/info', { ...params })
// 车辆成交价
export const querylist = params => req.reqGet('/car/deal-list', { ...params })
// 删除车辆
export const carDel = params => req.reqDelete('/car/delete', { ...params })
// 车型列表
export const carModelList = params => req.reqGet('/brand/list', { ...params })
// 成交价新增
export const saveDeal = params => req.reqPost('/car/save-deal', { ...params })
