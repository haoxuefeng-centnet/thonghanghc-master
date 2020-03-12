<template>
  <div id="admin">
    <Form ref="adminInfo" :model="adminInfo" :rules="ruleInline" :label-width="100">
      <FormItem prop="loginName" label="登陆名称">
        <Input type="text" v-model="adminInfo.loginName" placeholder="请填写登陆名称" />
      </FormItem>
      <FormItem label="用户密码">
        <Input type="text" disabled placeholder="系统默认密码为 000000" />
      </FormItem>
      <FormItem prop="userName" label="真实姓名">
        <Input type="text" v-model="adminInfo.userName" placeholder="请填写真实姓名" />
      </FormItem>
      <FormItem prop="userPhone" label="联系电话">
        <Input type="text" v-model="adminInfo.userPhone" placeholder="请填写联系电话" />
      </FormItem>
      <FormItem prop="address" label="请选择区域">
        <Cascader :data="cityData" v-model="actAddress" @on-change="addressChange" clearable filterable></Cascader>
      </FormItem>
      <FormItem prop="userPhone" label="用户头像">
        <UploadPanel :default-img="adminInfo.userHeadImg" @getUploadImg="getUploadImg" />
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('adminInfo')" :loading="loading">保存</Button>
        <Button style="margin-left: 10px" @click="cancelSubmit('adminInfo')">重置</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import UploadPanel from '@comp/uploadPanel'
import Regex from '@utils/regex'
import cityData from '../../cityData'
export default {
  name: 'AdminInfo',
  components: { UploadPanel },
  props: {
    adminInfo: {
      type: Object,
      default: () => ({
        loginName: '',
        userName: '',
        userPhone: '',
        province: '',
        city: '',
        address: '',
        userHeadImg: ''
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
    const validateLoginName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请填写登录名'))
      } else {
        if (Regex.regexTest('REGEX_NEGATIVE_Name', value)) {
          callback()
        } else {
          callback(new Error('登录名只能有英文和数字'))
        }
      }
    }
    const validatePhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请填写联系电话'))
      } else {
        if (typeof Number(value) === 'number' && value.length === 11 && !isNaN(value)) {
          callback()
        } else {
          callback(new Error('请填写正确的联系电话'))
        }
      }
    }
    return {
      cityData,
      actAddress: [],
      ruleInline: {
        loginName: [{ required: true, validator: validateLoginName, trigger: 'blur' }],
        userName: [
          { required: true, message: '请填写真实姓名', trigger: 'blur' },
          { max: 10, message: '姓名字数不能大于10', trigger: 'blur' }
        ],
        userPhone: [{ required: true, validator: validatePhone, trigger: 'blur' }],
        address: [{ required: true, message: '请选择区域', trigger: 'change' }]
      }
    }
  },
  created() {
    // 设置已经选中的地址
    if (this.modalType === 'edit') {
      this.actAddress = this.adminInfo.addressCode.split(',')
    }
  },
  methods: {
    // 表单提交
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$emit('formSubmit', this.adminInfo)
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
      this.adminInfo.userHeadImg = url
    },
    // 选择区域
    addressChange(value, selectedData) {
      const re = /\s+/g // 去除空格
      const actAddress = selectedData[selectedData.length - 1].__label.split('/')
      this.adminInfo.address = `${actAddress[0].replace(re, '')}/${actAddress[1].replace(re, '')}`
      // 一级地区
      this.adminInfo.province = actAddress[0].replace(re, '')
      // 二级地区
      this.adminInfo.city = actAddress[1].replace(re, '')
      this.adminInfo.addressCode = value.join(',')
    }
  }
}
</script>

<style scoped lang="less"></style>
