<template>
  <div class="layout">
    <Layout>
      <Sider
        ref="side1"
        breakpoint="xxl"
        hide-trigger
        collapsible
        :collapsed-width="78"
        width="256"
        v-model="isCollapsed"
      >
        <div class="logo">
          <img src="@assets/logo.png" width="40" />
          <span class="site-name" v-show="!isCollapsed" style="padding-left: 10px"> 同行好车</span>
        </div>
        <!-- 导航展开时的结构-->
        <Menu
          width="auto"
          :class="menuClasses"
          :active-name="activeMenu"
          theme="dark"
          :open-names="openMenus"
          @on-select="handleMenu"
          v-show="!isCollapsed"
        >
          <template v-for="(group, gdx) in menuList">
            <Submenu v-if="group.children" :key="group.path" :name="`s-${gdx}`">
              <template slot="title">
                <Icon :type="group.icon"></Icon>
                <span>{{ group.title }}</span>
                <!-- <span>{{ `s-${gdx}` }}</span>-->
              </template>
              <Menu-item v-for="item in group.children" :key="item.path" :name="item.path">
                <Icon :type="item.icon"></Icon>
                <span>{{ item.title }}</span>
              </Menu-item>
            </Submenu>
            <Menu-item v-else :key="group.path" :name="group.path">
              <Icon :type="group.icon"></Icon>
              <span>{{ group.title }}</span>
            </Menu-item>
          </template>
        </Menu>
        <!--收起时的结构-->
        <div class="menu-collapsed hy-select-dropdown" v-show="isCollapsed">
          <div v-for="items in menuList" :key="items.id" style="padding: 10px 0">
            <!--收起时有二级目录-->
            <Dropdown
              @on-click="handleMenu"
              transer
              hover
              placement="right-start"
              style="background: #00152A"
              v-if="items.children"
            >
              <a class="drop-menu-a" type="text">
                <Icon v-if="items.icon" class="icon iconfont" :class="items.icon"></Icon>
                <Icon v-if="items.icon" :type="items.icon"></Icon>
              </a>
              <DropdownMenu slot="list" v-for="childLists in items.children" :key="childLists.path">
                <DropdownItem :name="childLists.title">{{ childLists.title }}</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <!--收起时只有一级目录-->
            <Dropdown
              @on-click="handleMenu"
              transer
              hover
              placement="right-start"
              style="background: #00152A"
              v-if="!items.children"
            >
              <a class="drop-menu-a" type="text">
                <Icon v-if="items.icon" class="icon iconfont" :class="items.icon"></Icon>
                <Icon v-if="items.icon" :type="items.icon"></Icon>
              </a>
              <DropdownMenu slot="list">
                <DropdownItem :name="items.path">{{ items.title }}</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </Sider>
      <Layout>
        <Header :style="{ padding: 0 }" class="layout-header-bar">
          <Row type="flex" justify="space-between" align="middle" class="header-row" style="height: 64px">
            <Col span="12">
              <div flex="main:left cross:center">
                <Icon
                  @click.native="collapsedSider"
                  :class="rotateIcon"
                  :style="{ margin: '0 20px' }"
                  type="md-menu"
                  size="24"
                ></Icon>
              </div>
            </Col>
            <Col span="12">
              <div class="header-right" flex="main:right cross:center">
                <div class="item">
                  <Screenfull />
                </div>
                <div class="user-box">
                  <User />
                </div>
              </div>
            </Col>
          </Row>
        </Header>
        <Content :style="{ margin: '20px', minHeight: '260px' }">
          <transition name="fade-transform" mode="out-in">
            <router-view :key="key" />
          </transition>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>

<script>
import User from './module/User'
import Screenfull from '@comp/Screenfull'

export default {
  components: { User, Screenfull },
  data() {
    return {
      isCollapsed: false,
      openMenus: []
    }
  },
  computed: {
    key() {
      return this.$route.path
    },
    rotateIcon() {
      return ['menu-icon', this.isCollapsed ? 'rotate-icon' : '']
    },
    menuClasses: function() {
      return ['menu-item', this.isCollapsed ? 'collapsed-menu' : '']
    },
    activeMenu: function() {
      return this.$route.path
    },
    menuList: function() {
      return this.$store.state.user.sliderMenu || []
    }
  },
  methods: {
    collapsedSider() {
      this.$refs.side1.toggleCollapse()
    },
    // 路由跳转
    handleMenu(url) {
      this.$router.push(url)
    },
    // 找出需要打开的子菜单
    getActiveChild(list, index, path) {
      const childItem = list.filter(item => item.path === path)
      if (childItem.length) {
        this.openMenus.push(`s-${index}`)
      }
    }
  },
  created() {
    const route = this.$route
    // 当前侧边栏展开的菜单(暂时只适用于两级菜单，待优化)
    const openCurrentMenu = menu => {
      menu.forEach((item, index) => {
        if (item.children && item.children.length) {
          this.getActiveChild(item.children, index, route.path)
        }
      })
    }
    openCurrentMenu(this.menuList)
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
.layout {
  background: #f0f2f5;
  position: relative;
  border-radius: 4px;
  height: 100vh;
  overflow: hidden;
}
.ivu-layout {
  height: 100vh;
  overflow-y: auto;
}
.ivu-layout-sider,
.ivu-menu-dark,
/deep/.ivu-menu-dark.ivu-menu-vertical .ivu-menu-opened .ivu-menu-submenu-title {
  background: #001529 !important;
}
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
  background: #1482f0;
  color: #fff;
  &:hover {
    background: #1482f0;
    color: #fff;
  }
}
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-item:hover,
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-item-active:hover,
/deep/.ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title:hover {
  color: #fff !important;
  background: transparent;
}
/deep/.ivu-menu-dark.ivu-menu-vertical .ivu-menu-opened {
  background: #000c17 !important;
}
/deep/.ivu-menu-dark.ivu-menu-vertical .ivu-menu-child-item-active > .ivu-menu-submenu-title {
  color: rgba(255, 255, 255, 0.7) !important;
}
.ivu-layout-sider-collapsed {
  /deep/.ivu-menu-submenu .ivu-menu-item {
    /*font-size: 0;*/
  }
}
.layout-header-bar {
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}
.layout-logo-left {
  width: 90%;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  margin: 15px auto;
}
.menu-icon {
  transition: all 0.3s;
}
.rotate-icon {
  transform: rotate(-90deg);
}
.menu-item {
  i {
    transform: translateX(0px);
    transition: font-size 0.2s ease, transform 0.2s ease;
    vertical-align: middle;
  }
  i,
  span {
    font-size: 18px;
    vertical-align: middle;
  }
}
.collapsed-menu {
  span {
    width: 0;
    transition: width 0.2s ease;
    font-size: 20px;
  }
  i {
    transform: translateX(5px);
    transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
    vertical-align: middle;
    font-size: 22px;
  }
}
.header-row {
  padding: 0 20px;
}
/deep/.ivu-menu-submenu .menu-item span {
  display: inline-block;
  width: 100%;
}
</style>
