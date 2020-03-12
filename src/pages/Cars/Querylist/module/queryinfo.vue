<template>
  <div id="admin">
    <Form ref="queryinfo" :model="queryinfo" :rules="ruleInline" :label-width="100">
      <FormItem prop="phone" label="用户手机号">
        <Input type="text" v-model="queryinfo.phone" placeholder="请输入" />
      </FormItem>
      <FormItem prop="name" label="用户名称">
        <Input type="text" v-model="queryinfo.name" placeholder="请输入" />
      </FormItem>
      <FormItem prop="sellType" label="赠送配置">
        <Select v-model="queryinfo.sellType">
          <Option :value="1">零售</Option>
          <Option :value="2">批发</Option>
        </Select>
      </FormItem>
      <FormItem prop="transactionPrice" label="车辆成交价">
        <Input type="text" v-model="queryinfo.transactionPrice" placeholder="请输入" />
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('queryinfo')" :loading="loading">保存</Button>
        <Button style="margin-left: 10px" @click="cancelSubmit('queryinfo')">重置</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
export default {
  name: 'Queryinfo',
  props: {
    queryinfo: {
      type: Object,
      default: () => ({
        phone: '',
        name: '',
        sellType: 1,
        transactionPrice: ''
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
      actAddress: [],
      ruleInline: {
        phone: [{ required: true, validator: validatePhone, trigger: 'blur' }],
        name: [{ required: true, message: '请输入名字', trigger: 'blur' }],
        sellType: [{ required: true, type: 'number', message: '请选择', trigger: 'blur' }],
        transactionPrice: [{ required: true, message: '请输入成交价', trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 表单提交
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        console.log(valid)
        if (valid) {
          this.$emit('formSubmit', this.queryinfo)
        } else {
          this.$Message.error('信息填写有误！')
        }
      })
    },
    // 取消表单提交
    cancelSubmit(name) {
      this.$refs[name].resetFields()
    }
  }
}
</script>

<style scoped lang="less"></style>
