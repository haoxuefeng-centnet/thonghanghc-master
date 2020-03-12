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
        <Button type="primary" icon="md-add-circle" @click="addShow = true">新增轮播</Button>
      </div>
    </TableContainer>
    <Modal v-model="addShow" title="新增轮播" footer-hide>
      <bannerInfo :loading="addBtnLoading" @formSubmit="addPostModal" />
    </Modal>
  </div>
</template>

<script>
import { tableMixins } from '@/mixins'
import { bannerList, addBanner, delBanner } from '@api/banner'
import TableContainer from '@comp/Table/TableContainer'
import bannerInfo from './module/BannerInfo'

export default {
  name: 'Banner',
  components: { TableContainer, bannerInfo },
  mixins: [tableMixins],
  data() {
    return {
      listFn: bannerList,
      addFn: addBanner,
      delFn: delBanner,
      addBtnLoading: false,
      columns: [
        {
          type: 'index',
          align: 'center'
        },
        {
          title: '轮播图',
          slot: 'banner',
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
    // 新增轮播
    addPostModal(data) {
      this.addBtnLoading = true
      this.addPostData(data, 'addBtnLoading', () => {
        this.getAllList()
      })
    },
    // 删除轮播
    deleteBanner(row) {
      const reqParams = {
        bannerId: row.bannerId
      }
      this.delOperation(reqParams)
    }
  }
}
</script>

<style scoped></style>
