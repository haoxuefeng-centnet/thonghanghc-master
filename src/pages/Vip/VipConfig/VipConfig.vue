<template>
  <div class="public-page">
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
        <template slot-scope="{ row }" slot="action">
          <Button type="warning" size="small" @click="openEditModal(row)">修改</Button>
          <Button type="primary" size="small" @click="lookPrivilege">查看特权</Button>
        </template>
        <template slot-scope="{ row }" slot="banner">
          <div flex="main:center cross:center">
            <div style="margin: 5px" class="look-bigimg">
              <img :src="row.imgUrl" alt="logo" width="60" height="60" />
              <div class="img-mask" @click="lookBigImg(row.imgUrl)">
                <Icon type="md-eye" color="#fff" size="16" />
              </div>
            </div>
          </div>
        </template>
      </Table>
      <div slot="table-right"></div>
    </TableContainer>
    <Modal v-model="editShow" title="修改配置" footer-hide>
      <ConfigForm :config-form="editDta" @formSubmit="putPostModal" />
    </Modal>
    <Modal v-model="modalShow" title="查看特权" footer-hide>
      <Alert show-icon>
        <h3>vip特权</h3>
        <template slot="desc">
          <p>1. 查看出价</p>
          <p>2. 查看车估价</p>
          <p>3. 查看车估价消息</p>
          <p>4. 查看求购消息</p>
        </template>
      </Alert>
    </Modal>
  </div>
</template>

<script>
import TableContainer from '@comp/Table/TableContainer'
import { tableMixins } from '@/mixins'
import { vipList, editVipConfig } from '@api/vip'
import ConfigForm from './module/ConfigForm'

export default {
  name: 'Vip',
  components: { TableContainer, ConfigForm },
  mixins: [tableMixins],
  data() {
    return {
      listFn: vipList,
      editFn: editVipConfig,
      editDta: {},
      modalShow: false,
      columns: [
        {
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '标题',
          key: 'vipTitle',
          align: 'center'
        },
        {
          title: '有效时间',
          key: 'vipDuration',
          align: 'center',
          render: (h, params) => {
            return h('p', `${params.row.vipDuration}月`)
          }
        },
        {
          title: '价格（元）',
          key: 'vipPrice',
          align: 'center'
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
    this.getAllList()
  },
  methods: {
    // 修改
    openEditModal(row) {
      this.editDta = { ...row }
      this.editShow = true
    },
    // 查看特权
    lookPrivilege() {
      this.modalShow = true
    }
  }
}
</script>

<style scoped></style>
