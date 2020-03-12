<template>
  <div id="admin">
    <Form ref="configForm" :model="configForm" :rules="ruleInline" :label-width="100">
      <FormItem prop="configPrice" label="购买单价">
        <Input v-model="configForm.configPrice" placeholder="请输入购买单价" />
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
        configPrice: [{ required: true, validator: validatePrice, trigger: 'blur' }]
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
