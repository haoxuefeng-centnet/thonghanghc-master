<template>
  <Layout>
    <Header :style="{ padding: 0 }" class="layout-header-bar">
      <Icon
        @click.native="collapsedSider"
        :class="rotateIcon"
        :style="{ margin: '0 20px' }"
        type="md-menu"
        size="24"
      ></Icon>
    </Header>
    <Content :style="{ margin: '20px', background: '#fff', minHeight: '260px' }">
      Content
    </Content>
  </Layout>
</template>

<script>
export default {
  name: 'NavBar',
  props: {
    isCollapsed: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    rotateIcon() {
      return ['menu-icon', this.isCollapsed ? 'rotate-icon' : '']
    }
  },
  methods: {
    collapsedSider() {
      this.$emit('toggleCollapse')
    }
  }
}
</script>

<style scoped lang="less"></style>
