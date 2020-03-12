// 操作本地数据
export default {
  getData(key) {
    // 获取本地数据
    return JSON.parse(window.localStorage.getItem(key))
  },
  saveData(key, data) {
    window.localStorage.setItem(key, JSON.stringify(data))
    return this
  },
  removeData(key) {
    window.localStorage.removeItem(key)
    return this
  }
}
