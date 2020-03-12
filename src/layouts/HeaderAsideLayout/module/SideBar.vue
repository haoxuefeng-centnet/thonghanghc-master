<template>
  <scroll-bar>
    <div class="logo">
      <img src="https://img.alicdn.com/tfs/TB13UQpnYGYBuNjy0FoXXciBFXa-242-134.png" width="40" />
      <span class="site-name" v-show="!isCollapse">cms master</span>
    </div>
    <Sider ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
      <Menu active-name="1-2" theme="dark" width="auto" :class="menuitemClasses">
        <MenuItem name="1-1">
          <Icon type="ios-navigate"></Icon>
          <span>Option 1</span>
        </MenuItem>
        <MenuItem name="1-2">
          <Icon type="ios-search"></Icon>
          <span>Option 2</span>
        </MenuItem>
        <MenuItem name="1-3">
          <Icon type="ios-settings"></Icon>
          <span>Option 3</span>
        </MenuItem>
      </Menu>
    </Sider>
  </scroll-bar>
</template>

<script>
import ScrollBar from './ScrollBar'
export default {
  name: 'SideBar',
  components: { ScrollBar },
  props: {
    isCollapse: {
      type: Boolean,
      default: () => false
    }
  },
  computed: {
    menuitemClasses() {
      return ['menu-item', this.isCollapsed ? 'collapsed-menu' : '']
    }
  }
}
</script>

<style scoped lang="less">
.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 64px;
  line-height: 64px;
  background: #002140;
  color: #fff;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  overflow: hidden;
}
</style>
