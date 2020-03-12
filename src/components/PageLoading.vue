<template>
  <Spin fix v-show="loading">
    <div class="spin-loader">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  </Spin>
</template>

<script>
export default {
  name: 'PageLoading',
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped></style>
