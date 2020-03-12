<template>
  <div class="hy-login" @keydown.enter="handleSubmit">
    <div class="hy-login-con">
      <div class="title-con">
        <h2>同行好车后台管理系统</h2>
        <p>v1.0</p>
      </div>
      <div class="hy-form-con">
        <Form :rules="rules" :model="form" ref="loginForm">
          <FormItem prop="loginName">
            <Input v-model="form.loginName" size="large" placeholder="请输入用户名">
              <span slot="prepend"> <Icon :size="28" type="md-person"></Icon></span>
            </Input>
          </FormItem>
          <FormItem prop="password">
            <Input type="password" size="large" v-model="form.password" placeholder="请输入密码">
              <span slot="prepend"><Icon :size="28" type="md-lock"></Icon></span>
            </Input>
          </FormItem>
          <FormItem prop="code" v-if="isShowCode" class="hy-login-content">
            <Input type="text" :maxlength="6" size="large" v-model="form.code" placeholder="请输入验证码">
              <span slot="prepend"><Icon class="icon iconfont icon-yanzhengma" :size="16"></Icon></span>
              <div @click="changeCode()" slot="append" class="code-img">
                <img :src="codeImg" alt="" />
              </div>
            </Input>
          </FormItem>
          <FormItem>
            <!--<Button @click="handleSubmit" type="primary" long>登录</Button>-->
            <Button type="primary" size="large" class="login-btn" :loading="loading" @click="handleSubmit" long
              >登录</Button
            >
          </FormItem>
        </Form>
        <!--<p class="login-tip">输入任意用户名和密码即可</p>-->
      </div>
    </div>
  </div>
</template>
<script>
import { userLogin } from '@api/admin'
export default {
  name: 'Login',
  data() {
    return {
      form: {
        loginName: '',
        password: '',
        code: ''
      },
      isShowCode: false,
      loading: false,
      codeImg: '' + 'seller/login/code?v=' + new Date().getTime(),
      rules: {
        loginName: [{ required: true, message: '账号不能为空', trigger: 'change' }],
        password: [{ required: true, message: '密码不能为空', trigger: 'change' }]
      }
    }
  },
  methods: {
    /**
     * 提交登录信息
     */
    handleSubmit: function() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          userLogin(this.form)
            .then(res => {
              const router = this.$route
              if (res.code === 200) {
                this.$store.dispatch('saveUserInfo', res.data).then(result => {
                  if (result.success) {
                    router.query.key ? this.$router.push(router.query.key) : this.$router.push('/')
                  }
                })
              }
              this.loading = false
            })
            .catch(err => {
              console.error(err)
              this.loading = false
            })
        }
      })
    },
    /**
     * 更换验证码
     */
    changeCode: function() {
      this.codeImg = process.env.BASE_API_URL + 'login/code?v=' + new Date().getTime()
    }
  }
}
</script>
