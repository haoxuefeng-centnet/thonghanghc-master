/**
 * @Description: 图片上传相关操作
 * @author Gyang18
 * @date 2019-07-28
 */
export default {
  data() {
    return {
      actionUrl: process.env.VUE_APP_REQURL + '/upload/img'
    }
  },
  methods: {
    handleRemove(file) {
      // 从 upload 实例删除数据
      const fileList = this.$refs.upload.fileList
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1)
      this.$emit('remove')
    },
    handleFormatError(file) {
      // 文件格式验证
      this.$Notice.warning({
        title: '文件格式不正确',
        desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
      })
    },
    handleMaxSize(file) {
      // 文件大小验证
      this.$Notice.warning({
        title: '超出文件大小限制',
        desc: '文件 ' + file.name + ' 太大，不能超过 5M。'
      })
    }
  }
}
