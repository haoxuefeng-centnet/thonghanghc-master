<template>
  <div id="error">
    <div id="mountNode" v-if="$route.params.status == 403">
      <div class="not-permission">
        <div
          class="container-block "
          style="background-color: rgb(255, 255, 255); border-radius: 6px; padding: 20px; margin-bottom: 20px;"
        >
          <div class="exception-content" style="display: flex; justify-content: center; align-items: center;">
            <img src="@assets/403.png" class="imgException" alt="prmission" />
            <div>
              <h3 class="title" style="color: rgb(51, 51, 51);">抱歉，您无权限～</h3>
              <p class="description" style="color: rgb(102, 102, 102);">抱歉，您暂无权限，请看看其他页面</p>
              <router-link to="/" class="exception__return-home">返回首页</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="mountNode2" v-if="$route.params.status == 500">
      <div class="not-permission">
        <div
          class="container-block "
          style="background-color: rgb(255, 255, 255); border-radius: 6px; padding: 20px; margin-bottom: 20px;"
        >
          <div class="exception-content" style="display: flex; justify-content: center; align-items: center;">
            <img src="@assets/403.png" class="imgException" alt="prmission" />
            <div>
              <h3 class="title" style="color: rgb(51, 51, 51);">抱歉，～服务器错误了</h3>
              <p>服务器出错了，请重新刷新页面或<router-link to="/">返回首页</router-link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ErrorPage'
}
</script>

<style scoped lang="less">
.exception-content {
  min-height: 500px;
  .imgException {
    max-width: 260px;
    margin-right: 50px;
  }
  .title {
    font-size: 24px;
    margin: 20px 0;
    font-weight: 500;
  }
  .description {
    font-size: 16px;
  }
}
</style>
