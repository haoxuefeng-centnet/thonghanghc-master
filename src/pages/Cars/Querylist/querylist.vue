<template>
  <div class="public-page">
    <Breadcrumb style="margin-bottom: 30px">
      <BreadcrumbItem to="/carlist">车辆列表</BreadcrumbItem>
      <BreadcrumbItem>成交价列表</BreadcrumbItem>
    </Breadcrumb>
    <div class="table-search"></div>
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
        <template slot-scope="{ row }" slot="sellType">
          <p v-if="row.sellType === 1">零售</p>
          <p v-if="row.sellType === 2">批发</p>
        </template>
        <template slot-scope="{ row }" slot="dealType">
          <p v-if="row.dealType === 1">系统</p>
          <p v-if="row.dealType === 2">人工</p>
        </template>
      </Table>
      <div slot="table-right">
        <Button type="primary" @click="addShow = true">新增成交价</Button>
      </div>
    </TableContainer>
    <Modal v-model="addShow" title="新增成交价" footer-hide>
      <Queryinfo v-if="addShow" ref="queryinfo" @formSubmit="addPostModal" :loading="addBtnLoading" />
    </Modal>
  </div>
</template>

<script>
import Queryinfo from './module/queryinfo'
import TableContainer from '@comp/Table/TableContainer'
import { tableMixins } from '@/mixins'
import { querylist, saveDeal } from '@api/cars'

export default {
  name: 'QueryList',
  components: { Queryinfo, TableContainer },
  mixins: [tableMixins],
  data() {
    return {
      route: '',
      addBtnLoading: false,
      listFn: querylist,
      addFn: saveDeal,
      columns: [
        {
          title: '名称',
          key: 'name',
          align: 'center'
        },
        {
          title: '手机号',
          key: 'phone',
          align: 'center'
        },
        {
          title: '车辆成交价',
          key: 'transactionPrice',
          align: 'center',
          ellipsis: true,
          tooltip: true
        },
        {
          title: '成交类型',
          slot: 'dealType',
          align: 'center',
          ellipsis: true,
          tooltip: true
        },
        {
          title: '卖出类型',
          slot: 'sellType',
          align: 'center',
          ellipsis: true,
          tooltip: true
        },
        {
          title: '创建时间',
          key: 'createTime',
          align: 'center'
        }
      ]
    }
  },
  created() {
    this.route = this.$route.query
    this.getAllList({ carId: this.route.id })
  },
  methods: {
    addPostModal(data) {
      this.$set(data, 'carId', this.route.id)
      this.addBtnLoading = true
      this.addPostData(data, 'addBtnLoading', () => {
        this.$refs.queryinfo.cancelSubmit('queryinfo')
        this.getAllList({ carId: this.route.id })
      })
    }
  }
}
</script>

<style scoped></style>
