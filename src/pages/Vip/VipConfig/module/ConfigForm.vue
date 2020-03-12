<template>
  <div id="config">
    <Form ref="configForm" :model="configForm" :rules="ruleInline" :label-width="100">
      <FormItem prop="vipTitle" label="标题">
        <Input v-model="configForm.vipTitle" placeholder="请输入标题" />
      </FormItem>
      <FormItem prop="vipPrice" label="vip价格">
        <Input v-model="configForm.vipPrice" placeholder="请输入购买单价" />
      </FormItem>
      <FormItem prop="vipDuration" label="有效时间">
        <Input number v-model="configForm.vipDuration" placeholder="请输入有效时间">
          <span slot="append">月</span>
        </Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('configForm')" :loading="loading">保存</Button>
        <Button style="margin-left: 10px" @click="cancelSubmit('configForm')">重置</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
export default {
  name: 'ConfigForm',
  props: {
    configForm: {
      type: Object,
      default: () => ({})
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
    const validatePrice = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请填写购买价格'))
      } else {
        if (typeof Number(value) === 'number' && !isNaN(value)) {
          if (Number(value) % 1 !== 0) {
            callback(new Error('单价必须为整数'))
          } else {
            callback()
          }
        } else {
          callback(new Error('请填写正确的购买价格'))
        }
      }
    }
    return {
      ruleInline: {
        vipPrice: [{ required: true, validator: validatePrice, trigger: 'blur' }],
        vipTitle: [{ required: true, message: '请输入vip标题', trigger: 'blur' }],
        vipDuration: [{ required: true, type: 'number', message: '请输入正确的有效时间', trigger: 'blur' }]
      }
    }
  },
  created() {},
  methods: {
    // 表单提交
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$emit('formSubmit', this.configForm)
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
