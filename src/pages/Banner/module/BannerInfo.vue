<template>
  <div id="admin">
    <Form ref="bannerInfo" :model="bannerInfo" :rules="ruleInline" :label-width="100">
      <FormItem prop="cusPhone" label="轮播图">
        <UploadPanel @getUploadImg="getUploadImg" />
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('bannerInfo')" :loading="loading">保存</Button>
        <Button style="margin-left: 10px" @click="cancelSubmit('bannerInfo')">重置</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import UploadPanel from '@comp/uploadPanel'
export default {
  name: 'bannerInfo',
  components: { UploadPanel },
  props: {
    bannerInfo: {
      type: Object,
      default: () => ({
        imgUrl: ''
      })
    },
    loading: {
      type: Boolean,
      default: () => false
    },
    modalType: {
      type: String,
      default: 'add'
    }
  },
  data() {
    return {
      ruleInline: {}
    }
  },
  created() {},
  methods: {
    // 表单提交
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          if (this.bannerInfo.imgUrl) {
            this.$emit('formSubmit', this.bannerInfo)
          } else {
            this.$Message.error('轮播图不能为空！')
          }
        } else {
          this.$Message.error('信息填写有误！')
        }
      })
    },
    // 取消表单提交
    cancelSubmit(name) {
      this.$refs[name].resetFields()
    },
    // 获取上传的图片地址
    getUploadImg(url) {
      this.bannerInfo.imgUrl = url
    }
  }
}
</script>

<style scoped lang="less"></style>
