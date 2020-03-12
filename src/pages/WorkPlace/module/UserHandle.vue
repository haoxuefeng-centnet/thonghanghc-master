<template>
  <div class="user-handle">
    <!--    <Button type="text" long @click="modelShow = true">修改头像</Button>-->
    <Button type="text" long @click="modelPsdShow = true">修改登陆密码</Button>
    <!-- 修改资料弹框 -->
    <!--    <Modal v-model="modelShow" title="修改资料" :loading="loading">-->
    <!--      <uploadPanel :default-img="userInfo.userHeadImg" />-->
    <!--    </Modal>-->
    <!-- 修改密码 -->
    <Modal v-model="modelPsdShow" footer-hide title="修改密码">
      <Form ref="formInline" :model="formInline" :rules="ruleInline" label-position="left" :label-width="80">
        <FormItem prop="oldPassword" label="旧密码">
          <Input type="password" v-model="formInline.oldPassword" placeholder="请输入旧密码" />
        </FormItem>
        <FormItem prop="newPassword" label="新密码">
          <Input type="password" v-model="formInline.newPassword" placeholder="请输入新密码" />
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formInline')" :loading="btnLoading">确定修改</Button>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
// import uploadPanel from '@comp/uploadPanel'
import { modifyPassword } from '@api/admin'

export default {
  name: 'UserHandle',
  // components: { uploadPanel },
  props: {
    userInfo: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    // 自定义校验新密码方法
    const validateNewPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'))
      } else if (value === this.formInline.oldPassword) {
        callback(new Error('旧密码和新密码不能一样'))
      } else if (value.length < 6) {
        callback(new Error('密码必须大于6位'))
      } else {
        callback()
      }
    }
    return {
      modelPsdShow: false,
      loading: false,
      btnLoading: false,
      formInline: {},
      ruleInline: {
        oldPassword: [
          { required: true, message: '请输入旧密码', trigger: 'blur' },
          { min: 6, message: '密码必须大于6位', trigger: 'blur' }
        ],
        newPassword: [{ required: true, validator: validateNewPassword, trigger: 'blur' }]
      }
    }
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.btnLoading = true
          modifyPassword(this.formInline)
            .then(res => {
              if (res.code === 200) {
                this.modelPsdShow = false
                this.$Message.success(res.msg)
              }
            })
            .finally(() => {
              this.btnLoading = false
            })
        } else {
          this.$Message.error('填写信息有误！')
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.user-handle {
  .ivu-btn-text {
    color: #2d8cf0;
    display: block;
    &:active {
      background: transparent;
      outline: none;
    }
    &:focus {
      box-shadow: none;
      outline: none;
    }
  }
}
</style>
