<template>
  <div class="public-page">
    <div class="table-search">
      <Form ref="formInline" :model="searchData" inline>
        <FormItem label="用户手机号">
          <Input type="text" v-model="searchData.cusPhone" placeholder="用户手机号"> </Input>
        </FormItem>
        <FormItem label="用户姓名">
          <Input type="text" v-model="searchData.cusName" placeholder="用户姓名"> </Input>
        </FormItem>
        <FormItem label="订单创建时间" class="order-time">
          <DatePicker
            type="date"
            format="yyyy-MM-dd"
            placeholder="订单开始时间"
            style="width: 200px"
            @on-change="orderStartTime"
          ></DatePicker>
          <span style="padding: 0 20px">至</span>
          <DatePicker
            type="date"
            placeholder="订单结束时间"
            style="width: 200px"
            @on-change="orderEndTime"
          ></DatePicker>
        </FormItem>
        <FormItem label="	支付方式" v-show="isMoreSearch">
          <Select v-model="searchData.orderPayMode" style="width:200px">
            <Option :value="0">账号支付</Option>
            <Option :value="1">微信小程序/H5支付</Option>
            <Option :value="2">微信APP支付</Option>
          </Select>
        </FormItem>
        <FormItem label="购买类型" v-show="isMoreSearch">
          <Select v-model="searchData.orderPayType" style="width:200px">
            <Option :value="0">vip购买</Option>
            <Option :value="1">推广购买</Option>
            <Option :value="2">刷新购买</Option>
            <Option :value="3">账号充值</Option>
            <Option :value="4">预定收车</Option>
            <Option :value="5">第三方保险查询</Option>
            <Option :value="6">第三方维修记录</Option>
            <Option :value="7">定金</Option>
            <Option :value="8">查询成交价</Option>
          </Select>
        </FormItem>
        <FormItem label="	订单状态" v-show="isMoreSearch">
          <Select v-model="searchData.orderStatus" style="width:200px">
            <Option :value="0">待支付</Option>
            <Option :value="1">已支付</Option>
            <Option :value="2">支付失败</Option>
            <Option :value="3">已退款</Option>
            <Option :value="4">退款失败</Option>
          </Select>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="getSearchList">搜索</Button>
          <Button type="default" style="margin-left: 10px;" v-show="isSearch" @click="cancelSearch">取消搜索</Button>
          <span v-if="!isMoreSearch" class="table-search-more-btn" @click="isMoreSearch = true">
            <Icon type="ios-arrow-down" size="20" /> 更多
          </span>
          <span v-if="isMoreSearch" class="table-search-more-btn" @click="isMoreSearch = false">
            <Icon type="ios-arrow-up" size="20" /> 收起
          </span>
        </FormItem>
      </Form>
    </div>
    <TableContainer
      @handleSelectAll="handleSelectAll"
      @handleChangePage="handleChangePage"
      @delOperation="delOperation"
      :selected-row="choiceArr"
      :table-total="tableTotal"
      :is-choice-show="false"
      :current-page="currentPage"
    >
      <Table
        ref="selection"
        class="kui-table-bd"
        :loading="loading"
        :columns="columns"
        :data="tableData"
        border
        @on-selection-change="getChoiceArr"
      >
        <template slot-scope="{ row }" slot="paymentMode">
          <Tag v-if="row.paymentMode === 1" color="success">{{ row.orderPayModeTitle }}</Tag>
          <Tag v-if="row.paymentMode === 0">{{ row.orderPayModeTitle }}</Tag>
          <Tag v-if="row.paymentMode === 2" color="success">{{ row.orderPayModeTitle }}</Tag>
        </template>
        <template slot-scope="{ row }" slot="orderStatus">
          <Tag v-if="row.orderStatus === 0" type="dot">等待支付</Tag>
          <Tag v-if="row.orderStatus === 1" type="dot" color="success">支付成功</Tag>
          <Tag v-if="row.orderStatus === 2" type="dot" color="error">支付失败</Tag>
          <Tag v-if="row.orderStatus === 3" type="dot" color="success">退款成功</Tag>
          <Tag v-if="row.orderStatus === 4" type="dot" color="error">退款失败</Tag>
        </template>
        <template slot-scope="{ row }" slot="action">
          <Button type="primary" size="small" @click="lookOrderInfo(row)">详细</Button>
        </template>
      </Table>
      <div slot="table-right"></div>
    </TableContainer>
    <Drawer title="订单详细" footer-hide v-model="drawerShow" width="600px">
      <div class="public-details-group drawer-container">
        <Row>
          <Col span="12">
            <div class="group-item" flex="main:left cross:top">
              <span>订单创建时间：</span>
              <p>{{ orderDetail.createTime || '' }}</p>
            </div>
          </Col>
          <Col span="12">
            <div class="group-item" flex="main:left cross:top">
              <span>用户昵称：</span>
              <p>{{ orderDetail.cusNick }}</p>
            </div>
          </Col>
          <Col span="12">
            <div class="group-item" flex="main:left cross:top">
              <span>用户手机号：</span>
              <p>{{ orderDetail.cusPhone }}</p>
            </div>
          </Col>
          <Col span="12">
            <div class="group-item" flex="main:left cross:top">
              <span>订单支付时间：</span>
              <p>{{ orderDetail.finishTime }}</p>
            </div>
          </Col>
          <Col span="12">
            <div class="group-item" flex="main:left cross:top">
              <span>订单总金额：</span>
              <p>{{ orderDetail.orderMoney }}</p>
            </div>
          </Col>
          <Col span="12">
            <div class="group-item" flex="main:left cross:top">
              <span>手续费：</span>
              <p>{{ orderDetail.serviceCharge }}</p>
            </div>
          </Col>
          <Col span="12">
            <div class="group-item" flex="main:left cross:top">
              <span>购买类型：</span>
              <p>{{ orderDetail.orderPayTypeTitle }}</p>
            </div>
          </Col>
          <Col span="12">
            <div class="group-item" flex="main:left cross:top">
              <span>支付方式：</span>
              <p>{{ orderDetail.orderPayModeTitle }}</p>
            </div>
          </Col>
          <Col span="12">
            <div class="group-item" flex="main:left cross:top">
              <span>订单状态：</span>
              <p>{{ orderDetail.orderStatusTitle }}</p>
            </div>
          </Col>
          <Col span="12">
            <div class="group-item" flex="main:left cross:top">
              <span>购买单价：</span>
              <p>{{ orderDetail.unitPrice }}</p>
            </div>
          </Col>
          <Col span="12">
            <div class="group-item" flex="main:left cross:top">
              <span>购买数量：</span>
              <p>{{ orderDetail.buyNum }}</p>
            </div>
          </Col>
          <Col span="12">
            <div class="group-item" flex="main:left cross:top">
              <span>订单备注：</span>
              <p>{{ orderDetail.orderRemark }}</p>
            </div>
          </Col>
          <Col span="12" v-if="orderDetail.orderStatus === 3 || orderDetail.orderStatus === 4">
            <div class="group-item" flex="main:left cross:top">
              <span>退款金额：</span>
              <p>{{ orderDetail.refundAmount }}</p>
            </div>
          </Col>
          <Col span="12" v-if="orderDetail.orderStatus === 3 || orderDetail.orderStatus === 4">
            <div class="group-item" flex="main:left cross:top">
              <span>退款时间：</span>
              <p>{{ orderDetail.refundTime }}</p>
            </div>
          </Col>
        </Row>
      </div>
    </Drawer>
  </div>
</template>

<script>
import TableContainer from '@comp/Table/TableContainer'
import { tableMixins } from '@/mixins'
import { orderList } from '@api/order'

export default {
  name: 'OrderList',
  components: { TableContainer },
  mixins: [tableMixins],
  data() {
    return {
      reqFn: orderList,
      orderDetail: {},
      drawerShow: false,
      isMoreSearch: false,
      columns: [
        {
          title: '订单编号',
          key: 'orderId',
          align: 'center',
          ellipsis: true,
          tooltip: true,
          sortable: true
        },
        {
          title: '用户姓名',
          key: 'cusNick',
          align: 'center',
          ellipsis: true
        },
        {
          title: '手机号',
          key: 'cusPhone',
          align: 'center',
          ellipsis: true
        },
        {
          title: '订单金额',
          key: 'orderMoney',
          align: 'center',
          ellipsis: true,
          sortable: true
        },
        {
          title: '手续费',
          key: 'serviceCharge',
          align: 'center',
          ellipsis: true,
          sortable: true,
          render: (h, params) => {
            return h('p', params.row.serviceCharge || '/')
          }
        },
        {
          title: '购买数量',
          key: 'buyNum',
          align: 'center',
          ellipsis: true,
          sortable: true
        },
        {
          title: '购买类型',
          key: 'orderPayTypeTitle',
          align: 'center'
        },
        {
          title: '支付方式',
          slot: 'paymentMode',
          align: 'center'
        },
        {
          title: '订单状态',
          slot: 'orderStatus',
          align: 'center'
        },
        {
          title: '创建时间',
          key: 'createTime',
          align: 'center',
          sortable: true
        },
        {
          title: '操作',
          slot: 'action',
          align: 'center'
        }
      ]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 查看订单详细
    lookOrderInfo(row) {
      this.drawerShow = true
      this.orderDetail = row
    },
    // 获取订单开始日期
    orderStartTime(date) {
      this.searchData.queryStart = date
    },
    // 获取订单结束日期
    orderEndTime(date) {
      this.searchData.queryEnd = date
    }
  }
}
</script>

<style scoped lang="less">
.table-search {
  /deep/.ivu-form {
    .ivu-form-item-content {
    }
  }
}
</style>
