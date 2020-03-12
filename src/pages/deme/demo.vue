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
          <Button type="error" size="small" @click="deleteBanner(row)">删除</Button>
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
        <Button type="primary" icon="md-add-circle" @click="addShow = true">新增配置</Button>
      </div>
    </TableContainer>
  </div>
</template>

<script>
import TableContainer from '@comp/Table/TableContainer'
import { tableMixins } from '@/mixins'
export default {
  name: 'Vip',
  components: { TableContainer },
  mixins: [tableMixins],
  data() {
    return {
      columns: []
    }
  }
}
</script>

<style scoped></style>
