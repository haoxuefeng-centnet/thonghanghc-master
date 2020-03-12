<template>
  <div class="public-page">
    <div class="table-search">
      <Form ref="formInline" :model="searchData" inline>
        <FormItem label="车辆关键字">
          <Input type="text" v-model="searchData.keyword" placeholder="请输入车辆关键字"> </Input>
        </FormItem>
        <FormItem label="车辆所在城市">
          <Input type="text" v-model="searchData.cityLocation" placeholder="请输入车辆所在城市"> </Input>
        </FormItem>
        <FormItem label="车辆状态">
          <Select v-model="searchData.carStatus" style="width:200px">
            <Option :value="1">在售</Option>
            <Option :value="2">已售</Option>
            <Option :value="0">未上架</Option>
            <Option :value="3">其他</Option>
          </Select>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="getSearchList">搜索</Button>
          <Button type="default" style="margin-left: 10px;" v-show="isSearch" @click="cancelSearch">取消搜索</Button>
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
        <template slot-scope="{ row }" slot="action">
          <Button type="primary" size="small" @click="$router.push(`/carinfo?id=${row.carId}`)">详情</Button>
          <Button v-if="userInfo.userType === 0" type="primary" size="small" @click="lookBargain(row)">车辆成交</Button>
          <Button v-if="userInfo.userType === 0" type="error" size="small" @click="deleteCar(row)">删除</Button>
        </template>
        <template slot-scope="{ row }" slot="wholesalePrice">
          <p v-if="userInfo.userType === 1">/</p>
          <p v-if="userInfo.userType === 0">{{ row.wholesalePrice }}</p>
        </template>
        <template slot-scope="{ row }" slot="carStatus">
          <Tag color="default" v-if="row.carStatus === 0">未上架</Tag>
          <Tag color="success" v-if="row.carStatus === 1">在售</Tag>
          <Tag color="warning" v-if="row.carStatus === 2">已售</Tag>
          <Tag color="error" v-if="row.carStatus === 3">未同步</Tag>
        </template>
        <template slot-scope="{ row }" slot="microShop">
          <Tag color="warning" v-if="row.microShop === 2">未发布</Tag>
          <Tag color="success" v-if="row.microShop === 1">已发布</Tag>
        </template>
        <template slot-scope="{ row }" slot="platform">
          <Tag color="warning" v-if="row.platform === 2">未发布</Tag>
          <Tag color="success" v-if="row.platform === 1">已发布</Tag>
        </template>
        <template slot-scope="{ row }" slot="interPrice">
          <p v-if="row.interPrice">{{ row.interPrice }}</p>
          <p v-if="!row.interPrice">/</p>
        </template>
      </Table>
      <div slot="table-right"></div>
    </TableContainer>
    <Drawer title="车辆成交详情" footer-hide v-model="drawerShow" width="500px">
      <div class="drawer-container">
        <Spin fix v-show="spinShow"></Spin>
        <div>
          <p>成交名称：{{ BargainInfo.name }}</p>
          <p>
            成交类型：<span v-if="BargainInfo.dealType === 1">系统</span>
            <span v-if="BargainInfo.dealType === 2">人工</span>
          </p>
          <p>
            卖出类型：<span v-if="BargainInfo.sellType === 1">零售</span>
            <span v-if="BargainInfo.sellType === 2">批发</span>
            <span v-else>未卖出</span>
          </p>
          <p>车辆成交价：{{ BargainInfo.transactionPrice }}</p>
          <p>联系电话：{{ BargainInfo.phone }}</p>
        </div>
      </div>
    </Drawer>
  </div>
</template>

<script>
import TableContainer from '@comp/Table/TableContainer'
import { tableMixins } from '@/mixins'
import { carList, carDel } from '@api/cars'

export default {
  name: 'Vip',
  components: { TableContainer },
  mixins: [tableMixins],
  computed: {
    userInfo() {
      return this.$store.state.user.userInfo || {}
    }
  },
  data() {
    return {
      reqFn: carList,
      delFn: carDel,
      drawerShow: false,
      spinShow: false,
      BargainInfo: {},
      columns: [
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
          title: '车辆状态',
          slot: 'carStatus',
          align: 'center'
        },
        {
          title: '车辆所在地',
          key: 'cityLocation',
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
          slot: 'interPrice',
          align: 'center',
          sortable: true
        },
        {
          title: '批发价',
          slot: 'wholesalePrice',
          align: 'center',
          sortable: true
        },
        {
          title: '发布状态（微店）',
          slot: 'microShop',
          align: 'center'
        },
        {
          title: '发布状态（平台）',
          slot: 'platform',
          align: 'center'
        },
        {
          title: '上牌时间',
          key: 'carOldBoadTime',
          align: 'center'
        },
        {
          title: '操作',
          slot: 'action',
          align: 'center',
          width: 240
        }
      ]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 删除车辆
    deleteCar(row) {
      this.delOperation({ carId: row.carId })
    },
    // 查看成交
    lookBargain(row) {
      this.$router.push(`/querylist?id=${row.carId}`)
    }
  }
}
</script>

<style scoped></style>
