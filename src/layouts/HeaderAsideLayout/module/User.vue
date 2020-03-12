<template>
  <div class="user-avator-dropdown hy-header-user-bar-list left">
    <Dropdown @on-click="handleClick">
      <Avatar :src="userInfo.userHeadImg" v-if="userInfo.userHeadImg" />
      <Avatar v-else src="'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" />
      <span style="margin: 0 3px;">{{ userInfo.loginName || '暂无名称' }}</span>
      <Icon type="md-arrow-dropdown" size="20" />
      <DropdownMenu slot="list">
        <DropdownItem name="logout"
          ><Icon type="md-exit" size="20" /><span style="padding-left: 5px;">退出登录</span></DropdownItem
        >
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
import { userLogout } from '@api/admin'
export default {
  name: 'User',
  computed: {
    userInfo() {
      return (this.$store.state.user && this.$store.state.user.userInfo) || {}
    }
  },
  methods: {
    /**
     * 下拉列表点击选项触发的事件
     * @param name 与<DropdownItem name="logout">对应
     */
    handleClick: function(name) {
      switch (name) {
        case 'logout':
          this.checkOut()
          break
        case 'password':
          this.passwordShow()
          break
      }
    },
    passwordShow: function() {
      this.$router.push('/login') //跳转到登录页
    },
    /**
     * 退出登录
     */
    checkOut: function() {
      userLogout().then(res => {
        if (res.code === 200) {
          this.$Message.success(res.msg)
          this.$store.dispatch('clearUserInfo')
          this.$router.push('/login') //跳转到登录页
        }
      })
    }
  },
  mounted: function() {}
}
</script>
