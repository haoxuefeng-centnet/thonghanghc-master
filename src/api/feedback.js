/**
 * @Description: 反馈意见
 * @author Gyang18
 * @date 2019-08-03
 */

import req from '@plug/axios'
export const feedbackList = params => req.reqGet('/feedback/page', { ...params })
