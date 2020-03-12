/**
 * @Description: 全局公共函数 mixins
 * @author Gyang18
 * @date 2019-07-29
 */
export default {
  methods: {
    // 查看大图
    lookBigImg(url) {
      this.$Modal.info({
        title: '查看大图',
        render: h => {
          return h('img', {
            attrs: {
              src: url
            },
            style: {
              width: '100%',
              height: 'auto'
            }
          })
        }
      })
    }
  }
}
