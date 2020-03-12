<template>
  <div class="page-info">
    <Breadcrumb style="margin-bottom: 30px">
      <BreadcrumbItem to="/shop/index">微店列表</BreadcrumbItem>
      <BreadcrumbItem>微店详情</BreadcrumbItem>
    </Breadcrumb>
    <PageLoading :loading="spinShow" />
    <div class="public-details-group">
      <h3>基本信息</h3>
      <Row>
        <Col span="8">
          <div class="group-item" flex="main:left cross:top">
            <span>微店名称：</span>
            <p>{{ shopDetails.storeName }}</p>
          </div>
        </Col>
        <Col span="8">
          <div class="group-item" flex="main:left cross:top">
            <span>联系电话：</span>
            <p>{{ shopDetails.storePhone }}</p>
          </div>
        </Col>
        <Col span="8">
          <div class="group-item" flex="main:left cross:top">
            <span>微店头像：</span>
            <p><Avatar :src="shopDetails.storePhoto" /></p>
          </div>
        </Col>
        <Col span="8">
          <div class="group-item" flex="main:left cross:top">
            <span>微店公告：</span>
            <p>{{ shopDetails.storeNotice }}</p>
          </div>
        </Col>
        <Col span="8">
          <div class="group-item" flex="main:left cross:top">
            <span>微店地址：</span>
            <p>{{ shopDetails.cityLocation }}{{ shopDetails.countyLocation }}{{ shopDetails.doorNumber }}</p>
          </div>
        </Col>
      </Row>
    </div>
    <Divider />
    <div class="public-details-group">
      <h3>员工信息</h3>
      <div style="margin-top: 15px">
        <Table :columns="columns" :data="shopMan">
          <template slot-scope="{ row }" slot="cusStatus">
            <Tag v-if="row.cusStatus === 0" type="dot" color="success">正常</Tag>
            <Tag v-if="row.cusStatus === 1" type="dot" color="error">禁用</Tag>
          </template>
          <template slot-scope="{ row }" slot="cusType">
            <Tag v-if="row.cusType === 0" type="dot" color="warning">店长</Tag>
            <Tag v-if="row.cusType === 1" type="dot" color="primary">店员</Tag>
          </template>
          <template slot-scope="{ row }" slot="cusAvatar">
            <div flex="main:center cross:center">
              <div style="margin: 5px" class="look-bigimg">
                <img :src="row.cusAvatar" alt="logo" width="60" height="60" />
                <div class="img-mask" @click="lookBigImg(row.cusAvatar)">
                  <Icon type="md-eye" color="#fff" size="16" />
                </div>
              </div>
            </div>
          </template>
        </Table>
      </div>
    </div>
    <div class="public-details-group" style="margin-top: 30px">
      <h3>车辆信息</h3>
      <div style="margin-top: 15px">
        <Table :columns="columns2" :data="carList"></Table>
      </div>
    </div>
  </div>
</template>

<script>
import { shopInfo } from '@api/shop'
import PageLoading from '@comp/PageLoading'

export default {
  name: 'ShopInfo',
  components: { PageLoading },
  data() {
    return {
      spinShow: true,
      shopDetails: {},
      shopMan: [],
      carList: [],
      columns: [
        {
          title: '用户昵称',
          key: 'cusNick',
          align: 'center'
        },
        {
          title: '用户头像',
          slot: 'cusAvatar',
          align: 'center'
        },
        {
          title: '联系电话',
          key: 'cusPhone',
          align: 'center'
        },
        {
          title: '用户状态',
          slot: 'cusStatus',
          align: 'center'
        },
        {
          title: '员工类型',
          slot: 'cusType',
          align: 'center'
        },
        {
          title: '注册时间',
          key: 'cusRegTime',
          align: 'center'
        }
      ],
      columns2: [
        {
          title: '品牌车型',
          key: 'brandSeries',
          align: 'center',
          ellipsis: true,
          tooltip: true
        },
        {
          title: '车辆类型',
          key: 'carType',
          align: 'center'
        },
        {
          title: '车辆成本价',
          key: 'costPrice',
          align: 'center',
          sortable: true
        },
        {
          title: '网络标价',
          key: 'interPrice',
          align: 'center',
          sortable: true,
          render: (h, params) => {
            return h('p', params.row.interPrice || '/')
          }
        },
        {
          title: '批发价',
          key: 'wholesalePrice',
          align: 'center',
          sortable: true
        },
        {
          title: '上牌时间',
          key: 'carOldBoadTime',
          align: 'center'
        }
      ]
    }
  },
  created() {
    const id = this.$route.query.id
    shopInfo({ storeId: id }).then(res => {
      if (res.code === 200) {
        this.spinShow = false
        this.shopDetails = res.data
        this.shopMan = res.data.cusList
        this.carList = res.data.carList
      }
    })
  }
}
</script>

<style scoped lang="less"></style>
