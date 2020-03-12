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
        <FormItem label="订单编号">
          <Input type="text" v-model="searchData.orderId" placeholder="订单编号"> </Input>
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
            <Option :value="1">微信小程序</Option>
            <Option :value="2">APP支付</Option>
          </Select>
        </FormItem>
        <FormItem label="	订单状态" v-show="isMoreSearch">
          <Select v-model="searchData.orderStatus" style="width:200px">
            <Option :value="0">待支付</Option>
            <Option :value="1">已支付</Option>
            <Option :value="2">支付失败</Option>
            <Option :value="3">已退款</Option>
            <Option :value="4">退款失败</Option>
            <Option :value="5">取消交易</Option>
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
          <Tag v-if="row.paymentMode === 0">账号支付</Tag>
          <Tag v-if="row.paymentMode === 1" color="success">微信小程序</Tag>
          <Tag v-if="row.paymentMode === 2" color="success">微信app</Tag>
        </template>
        <template slot-scope="{ row }" slot="dealStatus">
          <Tag v-if="row.dealStatus === 0" color="primary">正在交易</Tag>
          <Tag v-if="row.dealStatus === 1" color="success">确认交易</Tag>
          <Tag v-if="row.dealStatus === 2" color="error">交易异常</Tag>
          <Tag v-if="row.dealStatus === 3" color="warning">未支付</Tag>
          <Tag v-if="row.dealStatus === 4" color="warning">等待卖家支付</Tag>
          <Tag v-if="row.dealStatus === 5" color="warning">已退款</Tag>
          <Tag v-if="row.dealStatus === 6" color="primary">交易完成</Tag>
          <Tag v-if="row.dealStatus === 7" color="error">交易关闭</Tag>
        </template>
        <template slot-scope="{ row }" slot="orderStatus">
          <Tag v-if="row.orderStatus === 0" type="dot">等待支付</Tag>
          <Tag v-if="row.orderStatus === 1" type="dot" color="success">支付成功</Tag>
          <Tag v-if="row.orderStatus === 2" type="dot" color="error">支付失败</Tag>
          <Tag v-if="row.orderStatus === 3" type="dot" color="success">退款成功</Tag>
          <Tag v-if="row.orderStatus === 4" type="dot" color="error">退款失败</Tag>
          <Tag v-if="row.orderStatus === 5" type="dot" color="error">取消交易</Tag>
        </template>
        <template slot-scope="{ row }" slot="action">
          <Button type="primary" size="small" @click="lookOrderInfo(row)">交易详细</Button>
          <Button type="primary" size="small" @click="$router.push(`/carinfo?id=${row.carId}&type=order`)"
            >车辆信息</Button
          >
        </template>
      </Table>
      <div slot="table-right" v-if="userInfo.userType === 0">
        <Button type="primary" @click="popup">定金配置修改</Button>
      </div>
    </TableContainer>
    <!--定金配置-->
    <Modal v-model="editShow" title="定金配置修改" @on-ok="submitGying('depositForm')">
      <Form ref="depositForm" :model="detailsDataL" :rules="deposInline" :label-width="120">
        <FormItem prop="abnormalRefund" label="违约方服务费">
          <Input type="text" number v-model="detailsDataL.abnormalRefund" placeholder="请输入" />
        </FormItem>
        <FormItem prop="refundMoney" label="正常服务费">
          <Input type="text" number v-model="detailsDataL.refundMoney" placeholder="请输入" />
        </FormItem>
        <FormItem prop="collectMoney" label="定金金额">
          <Input type="text" number v-model="detailsDataL.collectMoney" placeholder="请输入" />
        </FormItem>
      </Form>
    </Modal>
    <!-- 退款输入-->
    <Modal v-model="refundShow" title="退款" @on-ok="refundchange">
      <Form :model="refund" :rules="refundInline" :label-width="120">
        <FormItem prop="buyerPrice" label="买家退款金额">
          <Input type="text" number v-model="refund.buyerPrice" placeholder="请输入" />
        </FormItem>
        <FormItem prop="sellerPrice" label="卖家退款金额">
          <Input type="text" number v-model="refund.sellerPrice" placeholder="请输入" />
        </FormItem>
      </Form>
    </Modal>
    <Drawer title="交易信息" footer-hide v-model="drawerShow" width="600px">
      <div class="public-details-group drawer-container">
        <PageLoading :loading="spinShow" />
        <!--买家-->
        <Row>
          <h2 style="font-size: 16px">买家相关：</h2>
          <Col span="12">
            <div class="group-item" flex="main:left cross:top">
              <span>订单编号：</span>
              <p>{{ buyerDeposit.orderId || '' }}</p>
            </div>
          </Col>
          <Col span="12">
            <div class="group-item" flex="main:left cross:top">
              <span>下单时间：</span>
              <p>{{ buyerDeposit.createTime || '' }}</p>
            </div>
          </Col>
          <Col span="12">
            <div class="group-item" flex="main:left cross:top">
              <span>用户昵称：</span>
              <p>{{ buyerDeposit.cusNick }}</p>
            </div>
          </Col>
          <Col span="12">
            <div class="group-item" flex="main:left cross:top">
              <span>用户手机号：</span>
              <p>{{ buyerDeposit.cusPhone }}</p>
            </div>
          </Col>
          <Col span="12">
            <div class="group-item" flex="main:left cross:top">
              <span>手续费：</span>
              <p>{{ buyerDeposit.serviceCharge }}</p>
            </div>
          </Col>
          <Col span="12">
            <div class="group-item" flex="main:left cross:top">
              <span>支付方式：</span>
              <p v-if="buyerDeposit.paymentMode === 0">账号支付</p>
              <p v-if="buyerDeposit.paymentMode === 1">微信小程序</p>
              <p v-if="buyerDeposit.paymentMode === 2">微信app</p>
            </div>
          </Col>
          <Col span="12">
            <div class="group-item" flex="main:left cross:top">
              <span>订单状态：</span>
              <p v-if="buyerDeposit.orderStatus === 0">等待支付</p>
              <p v-if="buyerDeposit.orderStatus === 1">支付成功</p>
              <p v-if="buyerDeposit.orderStatus === 2">支付失败</p>
              <p v-if="buyerDeposit.orderStatus === 3">退款成功</p>
              <p v-if="buyerDeposit.orderStatus === 4">退款失败</p>
              <p v-if="buyerDeposit.orderStatus === 5">取消交易</p>
            </div>
          </Col>
          <Col span="12">
            <div class="group-item" flex="main:left cross:top">
              <span>订金金额：</span>
              <p>{{ buyerDeposit.orderMoney }}</p>
            </div>
          </Col>
          <Col span="12">
            <div class="group-item" flex="main:left cross:top">
              <span>交易状态：</span>
              <p>{{ buyerDeposit.dealStatusStr }}</p>
            </div>
          </Col>
          <Col span="12">
            <div class="group-item" flex="main:left cross:top">
              <span>订单备注：</span>
              <p>{{ buyerDeposit.orderRemark }}</p>
            </div>
          </Col>
          <Col span="12">
            <div class="group-item" flex="main:left cross:top">
              <span>退款金额：</span>
              <p>{{ buyerDeposit.refundAmount }}</p>
            </div>
          </Col>
          <Col span="12">
            <div class="group-item" flex="main:left cross:top">
              <span>退款时间：</span>
              <p>{{ buyerDeposit.refundTime }}</p>
            </div>
          </Col>
        </Row>
        <!--卖家-->
        <Row>
          <h2 style="font-size: 16px">卖家相关：</h2>
          <Col span="12">
            <div class="group-item" flex="main:left cross:top">
              <span>订单编号：</span>
              <p>{{ sellerDeposit.orderId || '' }}</p>
            </div>
          </Col>
          <Col span="12">
            <div class="group-item" flex="main:left cross:top">
              <span>下单时间：</span>
              <p>{{ sellerDeposit.createTime || '' }}</p>
            </div>
          </Col>
          <Col span="12">
            <div class="group-item" flex="main:left cross:top">
              <span>用户昵称：</span>
              <p>{{ sellerDeposit.cusNick }}</p>
            </div>
          </Col>
          <Col span="12">
            <div class="group-item" flex="main:left cross:top">
              <span>用户手机号：</span>
              <p>{{ sellerDeposit.cusPhone }}</p>
            </div>
          </Col>
          <Col span="12">
            <div class="group-item" flex="main:left cross:top">
              <span>手续费：</span>
              <p>{{ sellerDeposit.serviceCharge }}</p>
            </div>
          </Col>
          <Col span="12">
            <div class="group-item" flex="main:left cross:top">
              <span>支付方式：</span>
              <p v-if="sellerDeposit.paymentMode === 0">账号支付</p>
              <p v-if="sellerDeposit.paymentMode === 1">微信小程序</p>
              <p v-if="sellerDeposit.paymentMode === 2">微信app</p>
            </div>
          </Col>
          <Col span="12">
            <div class="group-item" flex="main:left cross:top">
              <span>订单状态：</span>
              <p v-if="sellerDeposit.orderStatus === 0">等待支付</p>
              <p v-if="sellerDeposit.orderStatus === 1">支付成功</p>
              <p v-if="sellerDeposit.orderStatus === 2">支付失败</p>
              <p v-if="sellerDeposit.orderStatus === 3">退款成功</p>
              <p v-if="sellerDeposit.orderStatus === 4">退款失败</p>
              <p v-if="sellerDeposit.orderStatus === 5">取消交易</p>
            </div>
          </Col>
          <Col span="12">
            <div class="group-item" flex="main:left cross:top">
              <span>订金金额：</span>
              <p>{{ sellerDeposit.orderMoney }}</p>
            </div>
          </Col>
          <Col span="12">
            <div class="group-item" flex="main:left cross:top">
              <span>交易状态：</span>
              <p>{{ sellerDeposit.dealStatusStr }}</p>
            </div>
          </Col>
          <Col span="12">
            <div class="group-item" flex="main:left cross:top">
              <span>订单备注：</span>
              <p>{{ sellerDeposit.orderRemark }}</p>
            </div>
          </Col>
          <Col span="12">
            <div class="group-item" flex="main:left cross:top">
              <span>退款金额：</span>
              <p>{{ sellerDeposit.refundAmount }}</p>
            </div>
          </Col>
          <Col span="12">
            <div class="group-item" flex="main:left cross:top">
              <span>退款时间：</span>
              <p>{{ sellerDeposit.refundTime }}</p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button type="warning" v-show="isRefund" @click="refundShow = true">退款</Button>
          </Col>
        </Row>
      </div>
    </Drawer>
  </div>
</template>

<script>
import TableContainer from '@comp/Table/TableContainer'
import { tableMixins } from '@/mixins'
import { MoneyList, MoneyInfo, reFund, configInfo, configUpdate } from '@api/order'
import PageLoading from '@comp/PageLoading'

export default {
  name: 'MoneyList',
  components: { PageLoading, TableContainer },
  mixins: [tableMixins],
  computed: {
    userInfo() {
      return this.$store.state.user.userInfo || {}
    }
  },
  data() {
    const validatePrice = (rule, value, callback) => {
      console.log(1)
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
    //买家最高金额校验
    const refundPrice = (rule, value, callback) => {
      console.log(value)
      if (value === '') {
        console.log(1)
        callback(new Error('请输入退款价格'))
      } else {
        if (typeof Number(value) === 'number' && !isNaN(value)) {
          if (Number(value) % 1 !== 0) {
            callback(new Error('单价必须为整数'))
          } else if (value > this.buyerDeposit.orderMoney) {
            callback(new Error('金额不能大于买家最高退款金额'))
          } else {
            callback()
          }
        } else {
          callback(new Error('请填写正确的购买价格'))
        }
      }
    }
    //卖家最高金额校验
    const sellerPrice = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入退款价格'))
      } else {
        if (typeof Number(value) === 'number' && !isNaN(value)) {
          if (Number(value) % 1 !== 0) {
            callback(new Error('单价必须为整数'))
          } else if (value > this.sellerDeposit.orderMoney) {
            callback(new Error('金额不能大于卖家最高退款金额'))
          } else {
            callback()
          }
        } else {
          callback(new Error('请填写正确的购买价格'))
        }
      }
    }
    return {
      reqFn: MoneyList,
      editFn: reFund,
      // 卖家信息
      sellerDeposit: {},
      // 买家信息
      buyerDeposit: {},
      editData: {},
      drawerShow: false,
      isMoreSearch: false,
      spinShow: false,
      editShow: false,
      isRefund: false, // 是否能退款
      depositData: {}, //定金修改
      detailsDataL: {}, //定金详情
      refund: {}, //退款
      refundShow: false,
      deposInline: {
        abnormalRefund: [{ required: true, validator: validatePrice, trigger: 'blur' }],
        refundMoney: [{ required: true, validator: validatePrice, trigger: 'blur' }],
        collectMoney: [{ required: true, validator: validatePrice, trigger: 'blur' }]
      },
      refundInline: {
        buyerPrice: [{ required: true, validator: refundPrice, trigger: 'blur' }],
        sellerPrice: [{ required: true, validator: sellerPrice, trigger: 'blur' }]
      },
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
          ellipsis: true,
          tooltip: true
        },
        {
          title: '手机号',
          key: 'cusPhone',
          align: 'center',
          ellipsis: true,
          tooltip: true
        },

        {
          title: '金额',
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
          title: '支付方式',
          slot: 'paymentMode',
          align: 'center'
        },
        {
          title: '交易状态',
          slot: 'dealStatus',
          align: 'center'
        },
        {
          title: '订单状态',
          slot: 'orderStatus',
          align: 'center'
        },
        {
          title: '下单时间',
          key: 'createTime',
          align: 'center',
          sortable: true
        },
        {
          title: '操作',
          slot: 'action',
          align: 'center',
          width: 200
        }
      ]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    //定金详情
    popup() {
      this.editShow = true
      configInfo().then(res => {
        this.detailsDataL = res.data
      })
    },
    //定金修改
    submitGying(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          configUpdate({ ...this.detailsDataL }).then(res => {
            if (res.code == 200) {
              this.$Message.success('修改成功！')
            }
          })
        } else {
          this.$Message.error('信息填写有误！')
        }
      })
    },
    //退款
    refundchange() {
      const app = this
      let formData = {
        buyerPrice: this.refund.buyerPrice,
        sellerPrice: this.refund.sellerPrice,
        buyerOrderId: app.buyerDeposit.orderId
      }
      app.$Modal.confirm({
        title: '提示',
        content: '请确定当前操作',
        loading: true,
        onOk: () => {
          if (app.editFn && typeof app.editFn === 'function') {
            app
              .editFn(formData)
              .then(res => {
                if (res.code === 200) {
                  app.$Message.success(res.msg)
                  app.drawerShow = false
                  app.isRefund = false
                  app.getList()
                }
              })
              .finally(() => {
                app.$Modal.remove()
              })
          } else {
            throw Error('requset fuction Error !')
          }
        }
      })
    },
    // 查看订单详细
    lookOrderInfo(row) {
      this.spinShow = true
      this.drawerShow = true
      MoneyInfo({ orderId: row.orderId })
        .then(res => {
          if (res.code === 200) {
            this.sellerDeposit = res.data.sellerDeposit
            this.buyerDeposit = res.data.buyerDeposit
            this.isRefund = res.data.isRefund
          }
        })
        .finally(() => {
          this.spinShow = false
        })
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
