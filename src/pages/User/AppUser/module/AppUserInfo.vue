<template>
  <div id="admin">
    <Form ref="adminInfo" :model="adminInfo" :rules="ruleInline" :label-width="100">
      <FormItem prop="address" label="请选择区域">
        <Cascader :data="cityData" v-model="actAddress" @on-change="addressChange" clearable filterable></Cascader>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('adminInfo')" :loading="loading">保存</Button>
        <Button style="margin-left: 10px" @click="cancelSubmit('adminInfo')">重置</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import cityData from '../../cityData'
export default {
  name: 'appUserInfo',
  props: {
    adminInfo: {
      type: Object,
      default: () => ({
        address: ''
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
      cityData,
      actAddress: [],
      ruleInline: {
        address: [{ required: true, message: '请选择区域', trigger: 'change' }]
      }
    }
  },
  created() {
    // 设置已经选中的地址
    // if (this.modalType === 'edit') {
    //   this.actAddress = this.adminInfo.addressCode.split(',')
    //  }
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
