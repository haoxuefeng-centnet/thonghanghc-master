/**
 * 工作台相关接口
 * @author Gyang18
 * @date 2019/4/8
 */
import req from '@plug/axios'
export const workPlaceInfo = param => req.reqGet('/console/statistic', { param })
