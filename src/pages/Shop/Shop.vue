<template>
  <div class="public-page">
    <div class="table-search">
      <Form ref="formInline" :model="searchData" inline>
        <FormItem label="微店名称">
          <Input type="text" v-model="searchData.keyword" placeholder="微店名称"> </Input>
        </FormItem>
        <FormItem label="所在市">
          <Input type="text" v-model="searchData.cityLocation" placeholder="请输入所在市"> </Input>
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
          <Button type="primary" size="small" @click="$router.push(`/shop/info?id=${row.storeId}`)">详情</Button>
          <Button type="primary" size="small" @click="loookBanner(row)">微店轮播图</Button>
        </template>
        <template slot-scope="{ row }" slot="storePhoto">
          <div flex="main:center cross:center">
            <div style="margin: 5px" class="look-bigimg">
              <img :src="row.storePhoto" alt="logo" width="60" height="60" />
              <div class="img-mask" @click="lookBigImg(row.storePhoto)">
                <Icon type="md-eye" color="#fff" size="16" />
              </div>
            </div>
          </div>
        </template>
      </Table>
      <div slot="table-right"></div>
    </TableContainer>
    <!--  微店轮播  -->
    <Modal v-model="modalShow" title="微店轮播" footer-hide>
      <Carousel v-model="bannerIndex" v-if="bannerList.length">
        <CarouselItem v-for="(item, index) in bannerList" :key="index">
          <div class="shop-banner">
            <img :src="item" alt="#" />
          </div>
        </CarouselItem>
      </Carousel>
    </Modal>
  </div>
</template>

<script>
import { tableMixins } from '@/mixins'
import { shopList } from '@api/shop'
import TableContainer from '@comp/Table/TableContainer'

export default {
  name: 'Shop',
  components: { TableContainer },
  mixins: [tableMixins],
  computed: {
    userInfo() {
      return this.$store.state.user.userInfo || {}
    }
  },
  data() {
    return {
      reqFn: shopList,
      modalShow: false,
      bannerIndex: 0,
      bannerList: [],
      columns: [
        {
          title: '微店名称',
          key: 'storeName',
          align: 'center'
        },
        {
          title: '微店头像',
          slot: 'storePhoto',
          align: 'center'
        },
        {
          title: '联系电话',
          key: 'storePhone',
          align: 'center'
        },
        {
          title: '地区',
          key: 'cityLocation',
          align: 'center'
        },
        {
          title: '创建时间',
          key: 'createTime',
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
    this.getList()
  },
  methods: {
    // 查看轮播图
    loookBanner(row) {
      this.bannerList = row.storeImgList
      this.modalShow = true
    }
  }
}
</script>

<style scoped lang="less">
/deep/.ivu-carousel-list {
  height: 300px;
}
.shop-banner {
  width: 100%;
  overflow: hidden;
  img {
    width: 100%;
    height: 280px;
    max-height: 100%;
    max-width: 100%;
  }
}
</style>
