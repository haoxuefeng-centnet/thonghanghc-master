/**
 * @Description: 轮播相关接口
 * @author Gyang18
 * @date 2019-07-30
 */
import req from '@plug/axios'
// 获取轮播
export const bannerList = params => req.reqGet('/banner/list', { ...params })
// 新增轮播
export const addBanner = params => req.reqPost('/banner', { ...params })
// 删除轮播
export const delBanner = params => req.reqDelete('/banner/del', { ...params })
