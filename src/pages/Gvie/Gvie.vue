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
      <div slot="table-right">
        <!--        <Button type="primary" icon="md-add-circle" @click="addShow = true">新增配置</Button>-->
      </div>
    </TableContainer>
    <Modal v-model="editShow" title="修改配置" footer-hide>
      <ConfigForm ref="editConfig" :config-form="editData" :loading="editBtnLoading" @formSubmit="putPostModal" />
    </Modal>
  </div>
</template>

<script>
import { tableMixins } from '@/mixins'
import { gyConfigList, updateGying } from '@api/gvConfig'
import TableContainer from '@comp/Table/TableContainer'
import ConfigForm from './module/ConfigForm'

export default {
  name: 'Gvie',
  components: { TableContainer, ConfigForm },
  mixins: [tableMixins],
  data() {
    return {
      listFn: gyConfigList,
      editFn: updateGying,
      editBtnLoading: false,
      editData: {},
      columns: [
        {
          title: '配置名称',
          key: 'configName',
          align: 'center'
        },
        {
          title: '购买价格（单价）',
          key: 'configPrice',
          align: 'center'
        },
        {
          title: '赠送单位',
          key: 'configUnit',
          align: 'center',
          render: (h, params) => {
            return h('span', `1/${params.row.configUnit}`)
          }
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
    // 打开修改弹框
    openEditModal(row) {
      this.editShow = true
      this.editData = { ...row }
    }
  }
}
</script>

<style scoped></style>
