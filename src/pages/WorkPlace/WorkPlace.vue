<template>
  <div class="public-page">
    <Spin v-show="loading" fix></Spin>
    <Card :dis-hover="true" :shadow="true">
      <div class="user-card" flex="main:justify cross:center">
        <div class="user-container" flex="main:left cross:top">
          <div class="user-img">
            <Avatar :src="userInfo.userHeadImg" size="large" v-if="userInfo.userHeadImg" />
            <Avatar v-else src="'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" />
          </div>
          <div class="user-info">
            <div class="title" flex="main:left cross:center">
              <h4>{{ userInfo.loginName || '—' }}</h4>
              <Tag type="dot" color="primary" v-if="userInfo.userType === 0">超级管理员</Tag>
              <Tag type="dot" color="warning" v-if="userInfo.userType === 1">区域管理员</Tag>
            </div>
            <div class="info">
              <p>真实姓名：{{ userInfo.userName || '暂无姓名' }}</p>
              <p>电话号码：{{ userInfo.userPhone || '暂无电话' }}</p>
              <p v-if="userInfo.userType === 1">代理区域：{{ userInfo.city }}</p>
            </div>
          </div>
        </div>
        <div class="user">
          <UserHandle :user-info="userInfo"></UserHandle>
        </div>
      </div>
    </Card>
    <div class="statistical-group">
      <Row class-name="statistical-row">
        <Col span="8">
          <Card>
            <h4 slot="title">注册用户</h4>
            <div slot="extra">
              <Tooltip content="平台、当月注册用户数统计">
                <Icon type="md-alert" size="22" />
              </Tooltip>
            </div>
            <div class="card-content">
              <div class="item moves" flex="main:justify cross:center" @click="$router.push(`/appUser`)">
                <p class="label">注册用户总数（平台）</p>
                <h3 class="value">
                  <CountTo
                    style="color: #2d8cf0"
                    ref="CountTo1"
                    :autoplay="autoplay"
                    :startVal="0"
                    :endVal="workPlaceData.cusTotalNum"
                  /><small>人</small>
                </h3>
              </div>
              <div class="item moves" flex="main:justify cross:center" @click="$router.push(`/appUser`)">
                <p class="label">本月用户注册总数</p>
                <h3 class="value">
                  <CountTo
                    style="color:#2d8cf0;"
                    ref="CountTo2"
                    :autoplay="autoplay"
                    :startVal="0"
                    :endVal="workPlaceData.cusMonthNum"
                  /><small>人</small>
                </h3>
              </div>
            </div>
          </Card>
        </Col>
        <Col span="8">
          <Card>
            <h4 slot="title">车辆统计</h4>
            <div slot="extra">
              <Tooltip content="车辆相关信息统计">
                <Icon type="md-alert" size="22" />
              </Tooltip>
            </div>
            <div class="card-content">
              <div class="item" flex="main:justify cross:center">
                <p class="label">车辆发布总数（平台）</p>
                <h3 class="value">
                  <CountTo
                    ref="CountTo3"
                    :startVal="0"
                    :autoplay="autoplay"
                    :endVal="workPlaceData.carPlatformTotalNum"
                  /><small>辆</small>
                </h3>
              </div>
              <div class="item" flex="main:justify cross:center">
                <p class="label">本月车辆发布总数</p>
                <h3 class="value">
                  <CountTo
                    ref="CountTo4"
                    :startVal="0"
                    :autoplay="autoplay"
                    :endVal="workPlaceData.carPlatformMonthNum"
                  /><small>辆</small>
                </h3>
              </div>
            </div>
          </Card>
        </Col>
        <Col span="8">
          <Card>
            <h4 slot="title">车辆成交</h4>
            <div slot="extra">
              <Tooltip content="车辆成交相关统计">
                <Icon type="md-alert" size="22" />
              </Tooltip>
            </div>
            <div class="card-content">
              <div class="item" flex="main:justify cross:center">
                <p class="label">车辆成交总数</p>
                <h3 class="value">
                  <CountTo
                    :startVal="0"
                    ref="CountTo5"
                    :autoplay="autoplay"
                    :endVal="workPlaceData.dealTotalNum"
                  /><small>辆</small>
                </h3>
              </div>
              <div class="item" flex="main:justify cross:center">
                <p class="label">本月车辆成交数</p>
                <h3 class="value">
                  <CountTo
                    :startVal="0"
                    ref="CountTo6"
                    :autoplay="autoplay"
                    :endVal="workPlaceData.dealMonthNum"
                  /><small>辆</small>
                </h3>
              </div>
              <div class="item" flex="main:justify cross:center">
                <p class="label">定金本月金额</p>
                <h3 class="value">
                  <CountTo
                    :startVal="0"
                    :autoplay="autoplay"
                    ref="CountTo7"
                    :endVal="workPlaceData.monthDepositMoney"
                  /><small>元</small>
                </h3>
              </div>
              <div class="item" flex="main:justify cross:center">
                <p class="label">定金总金额</p>
                <h3 class="value">
                  <CountTo
                    :startVal="0"
                    ref="CountTo8"
                    :autoplay="autoplay"
                    :endVal="workPlaceData.totalDepositMoney"
                  /><small>元</small>
                </h3>
              </div>
            </div>
          </Card>
        </Col>
        <Col span="8">
          <Card>
            <h4 slot="title">vip套餐</h4>
            <div slot="extra">
              <Tooltip content="购买vip套餐人数统计">
                <Icon type="md-alert" size="22" />
              </Tooltip>
            </div>
            <div class="card-content">
              <div class="item" flex="main:justify cross:center">
                <p class="label">vip购买总人数</p>
                <h3 class="value">
                  <CountTo
                    :startVal="0"
                    :autoplay="autoplay"
                    ref="CountTo9"
                    :endVal="workPlaceData.vipTotalNum"
                  /><small>人</small>
                </h3>
              </div>
              <div class="item" flex="main:justify cross:center">
                <p class="label">vip本月购买人数</p>
                <h3 class="value">
                  <CountTo
                    :startVal="0"
                    :autoplay="autoplay"
                    ref="CountTo10"
                    :endVal="workPlaceData.vipMonthNum"
                  /><small>人</small>
                </h3>
              </div>
              <div class="item" flex="main:justify cross:center">
                <p class="label">本月VIP充值总金额</p>
                <h3 class="value">
                  <CountTo
                    :startVal="0"
                    :autoplay="autoplay"
                    ref="CountTo11"
                    :endVal="workPlaceData.monthVipMoney"
                  /><small>元</small>
                </h3>
              </div>
              <div class="item" flex="main:justify cross:center">
                <p class="label">VIP充值总金额</p>
                <h3 class="value">
                  <CountTo
                    :startVal="0"
                    :autoplay="autoplay"
                    ref="CountTo12"
                    :endVal="workPlaceData.totalVipMoney"
                  /><small>元</small>
                </h3>
              </div>
            </div>
          </Card>
        </Col>
        <Col span="8">
          <Card>
            <h4 slot="title">成交价</h4>
            <div slot="extra">
              <Tooltip content="查询成交价">
                <Icon type="md-alert" size="22" />
              </Tooltip>
            </div>
            <div class="card-content">
              <div class="item" flex="main:justify cross:center">
                <p class="label">本月购买查询成交价的金额</p>
                <h3 class="value">
                  <CountTo
                    :startVal="0"
                    :autoplay="autoplay"
                    ref="CountTo13"
                    :endVal="workPlaceData.monthDealMoney"
                  /><small>元</small>
                </h3>
              </div>
              <div class="item" flex="main:justify cross:center">
                <p class="label">购买查询成交价的总金额</p>
                <h3 class="value">
                  <CountTo
                    :startVal="0"
                    :autoplay="autoplay"
                    ref="CountTo14"
                    :endVal="workPlaceData.totalDealMoney"
                  /><small>元</small>
                </h3>
              </div>
            </div>
          </Card>
        </Col>
        <Col span="8">
          <Card>
            <h4 slot="title">推广和刷新</h4>
            <div slot="extra">
              <Tooltip content="推广和刷新">
                <Icon type="md-alert" size="22" />
              </Tooltip>
            </div>
            <div class="card-content">
              <div class="item" flex="main:justify cross:center">
                <p class="label">本月购买推广的金额</p>
                <h3 class="value">
                  <CountTo
                    :startVal="0"
                    :autoplay="autoplay"
                    ref="CountTo15"
                    :endVal="workPlaceData.monthExtensionMoney"
                  /><small>元</small>
                </h3>
              </div>
              <div class="item" flex="main:justify cross:center">
                <p class="label">购买推广的总金额</p>
                <h3 class="value">
                  <CountTo
                    :startVal="0"
                    :autoplay="autoplay"
                    ref="CountTo16"
                    :endVal="workPlaceData.totalExtensionMoney"
                  /><small>元</small>
                </h3>
              </div>
              <div class="item" flex="main:justify cross:center">
                <p class="label">本月购买刷新的金额</p>
                <h3 class="value">
                  <CountTo
                    :startVal="0"
                    :autoplay="autoplay"
                    ref="CountTo17"
                    :endVal="workPlaceData.monthFlushMoney"
                  /><small>元</small>
                </h3>
              </div>
              <div class="item" flex="main:justify cross:center">
                <p class="label">刷新购买总金额</p>
                <h3 class="value">
                  <CountTo
                    :startVal="0"
                    :autoplay="autoplay"
                    ref="CountTo18"
                    :endVal="workPlaceData.totalFlushMoney"
                  /><small>元</small>
                </h3>
              </div>
            </div>
          </Card>
        </Col>
        <Col span="8">
          <Card>
            <h4 slot="title">预定收车</h4>
            <div slot="extra">
              <Tooltip content="预定收车统计">
                <Icon type="md-alert" size="22" />
              </Tooltip>
            </div>
            <div class="card-content">
              <div class="item" flex="main:justify cross:center">
                <p class="label">本月购买预定收车的金额</p>
                <h3 class="value">
                  <CountTo
                    :startVal="0"
                    :autoplay="autoplay"
                    ref="CountTo19"
                    :endVal="workPlaceData.monthCollectCarMoney"
                  /><small>元</small>
                </h3>
              </div>
              <div class="item" flex="main:justify cross:center">
                <p class="label">购买预定收车的总金额</p>
                <h3 class="value">
                  <CountTo
                    :startVal="0"
                    :autoplay="autoplay"
                    ref="CountTo20"
                    :endVal="workPlaceData.totalCollectCarMoney"
                  /><small>元</small>
                </h3>
              </div>
            </div>
          </Card>
        </Col>
        <Col span="8">
          <Card>
            <h4 slot="title">统计</h4>
            <div slot="extra">
              <Tooltip content="统计">
                <Icon type="md-alert" size="22" />
              </Tooltip>
            </div>
            <div class="card-content">
              <div class="item" flex="main:justify cross:center">
                <p class="label">本月成交价、推广、刷新、预定收车、充值金额</p>
                <h3 class="value">
                  <CountTo
                    :startVal="0"
                    :autoplay="autoplay"
                    ref="CountTo21"
                    :endVal="workPlaceData.otherOrderMonthMoney"
                  /><small>元</small>
                </h3>
              </div>
              <div class="item" flex="main:justify cross:center">
                <p class="label">购买成交价、推广、刷新、预定收车、充值总金额</p>
                <h3 class="value">
                  <CountTo
                    :startVal="0"
                    :autoplay="autoplay"
                    ref="CountTo22"
                    :endVal="workPlaceData.otherOrderTotalMoney"
                  /><small>元</small>
                </h3>
              </div>
              <div class="item" flex="main:justify cross:center">
                <p class="label">本月充值的金额</p>
                <h3 class="value">
                  <CountTo
                    :startVal="0"
                    :autoplay="autoplay"
                    ref="CountTo23"
                    :endVal="workPlaceData.monthTopupMoney"
                  /><small>元</small>
                </h3>
              </div>
              <div class="item" flex="main:justify cross:center">
                <p class="label">充值总金额</p>
                <h3 class="value">
                  <CountTo
                    :startVal="0"
                    :autoplay="autoplay"
                    ref="CountTo24"
                    :endVal="workPlaceData.totalTopupMoney"
                  /><small>元</small>
                </h3>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
/**
 * @Description: 工作台业务逻辑处理
 * @author
 * @date 2019-07-23
 */
// 数字滚动
import CountTo from 'vue-count-to'
import UserHandle from './module/UserHandle'
import { workPlaceInfo } from '@api/workPlace'

export default {
  name: 'WorkPlace',
  components: { UserHandle, CountTo },
  computed: {
    userInfo() {
      return this.$store.state.user.userInfo || {}
    }
  },
  data() {
    return {
      workPlaceData: {},
      tempData: {},
      loading: false,
      autoplay: false
    }
  },
  methods: {
    loadingNumber() {
      // 处理多个数字加载动画
      for (let i = 0; i <= 25; i++) {
        this.$refs[`CountTo${i + 1}`] && this.$refs[`CountTo${i + 1}`].start()
      }
    }
  },
  created() {
    // 工作台数据获取
    workPlaceInfo()
      .then(res => {
        this.loading = true
        if (res.code === 200) {
          this.workPlaceData = res.data
          console.log(this.workPlaceData)
          // 执行数字加载动画
          this.loadingNumber()
        }
      })
      .finally(() => {
        this.loading = false
      })
  }
}
</script>

<style scoped lang="less">
.user-card {
  .user-container {
    .user-img {
      margin-right: 20px;
      /deep/.ivu-avatar-large {
        width: 80px;
        height: 80px;
      }
    }
    .user-info {
      h4 {
        font-size: 18px;
        margin-right: 10px;
      }
      .info {
        p {
          font-size: 12px;
          color: #999;
        }
      }
    }
  }
}
.statistical-group {
  width: 100%;
  /*overflow: hidden;*/
}
.statistical-row {
  padding: 0;
  margin-left: -10px;
  margin-right: -10px;
  /deep/.ivu-col {
    margin-top: 20px;
    padding: 0 10px;
  }
}
.card-content {
  height: 200px;
  color: #2d8cf0;
  .item {
    margin-bottom: 5px;
    .label {
      color: #999;
      font-size: 12px;
    }
    .value {
      font-size: 28px;
      font-weight: 500;
      padding-left: 5px;
      small {
        font-size: 12px;
        color: #666;
        padding-left: 5px;
      }
    }
  }
}
.moves {
  cursor: pointer;
}
.statistical-group {
  padding-bottom: 30px;
}
</style>
