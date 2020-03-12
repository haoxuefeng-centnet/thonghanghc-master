<template>
  <div class="public-page">
    <div class="table-search">
      <Form ref="formInline" :model="searchData" inline>
        <FormItem label="用户昵称">
          <Input type="text" v-model="searchData.cusNick" placeholder="请输入用户昵称"> </Input>
        </FormItem>
        <FormItem label="联系电话">
          <Input type="text" v-model="searchData.cusPhone" placeholder="请输入联系电话"> </Input>
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
      </Table>
      <div slot="table-right"></div>
    </TableContainer>
  </div>
</template>

<script>
import TableContainer from '@comp/Table/TableContainer'
import { tableMixins } from '@/mixins'
import { feedbackList } from '@api/feedback'

export default {
  name: 'FeedBack',
  components: { TableContainer },
  mixins: [tableMixins],
  data() {
    return {
      reqFn: feedbackList,
      columns: [
        {
          title: '用户昵称',
          key: 'cusNick',
          align: 'center'
        },
        {
          title: '电话号码',
          key: 'cusPhone',
          align: 'center'
        },
        {
          title: '反馈内容',
          key: 'feedbackContent',
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
    this.getList()
  }
}
</script>

<style scoped></style>
