/**
 * @Description: 全局过滤器
 * @author Gyang18
 * @date 2019-07-31
 */

export default {
  // 处理空数据过滤器
  disposeNonData(value, str = '/') {
    if (!value) {
      return str
    }
  }
}
