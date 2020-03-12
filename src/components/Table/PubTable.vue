<!--
此组件包含了表格基本操作，翻页等功能
缺点：可定制性很低
-->
<template>
  <div id="public-table">
    <div v-if="isShow" flex="main:justify cross:center" style="margin-bottom: 20px">
      <div class="left-button" v-if="isChoiceShow">
        <Button class="kui-hd-btn" type="primary" @click="handleSelectAll(true)">
          全选
        </Button>
        <Button class="kui-hd-btn" style="margin-left:10px;" @click="handleSelectAll(false)">
          取消全选
        </Button>
        <Button v-if="choiceArr.length" class="kui-hd-btn" tyle="margin-left:10px;" type="error" @click="delOperation">
          删除所选数据
        </Button>
      </div>
      <div class="right-btn">
        <slot name="table-right"></slot>
      </div>
    </div>
    <Table
      ref="selection"
      class="kui-table-bd"
      :loading="loading"
      :columns="columns"
      :data="tableData"
      :boder="tableStyle.border"
      :width="tableStyle.width"
      :height="tableStyle.height"
      @on-selection-change="choiceRow"
    >
    </Table>
    <Page
      v-if="tableTotal"
      class="table-pages"
      flex="main:center"
      :page-size="size"
      :total="tableTotal"
      show-total
      @on-change="handleChangePage"
    ></Page>
  </div>
</template>

<script>
export default {
  props: {
    // 表格头
    columns: {
      type: Array,
      default: () => []
    },
    //表格数据
    tableData: {
      type: Array,
      default: () => []
    },
    // 表格样式配置
    tableStyle: {
      type: Object,
      default: () => {
        return {
          border: true
        }
      }
    },
    // 全选时选择的id
    choiceArr: {
      type: Array,
      default: () => []
    },
    // 数据加载动画
    loading: {
      type: Boolean,
      default: () => false
    },
    // 是否显示全选按钮
    isShow: {
      type: Boolean,
      default: () => true
    },
    // 是否显示全选按钮
    isChoiceShow: {
      type: Boolean,
      default: () => true
    },
    // 表格总条数
    tableTotal: {
      type: Number,
      default: () => 0
    },
    // 表格每页大小数
    size: {
      type: Number,
      default: () => 10
    }
  },
  data() {
    return {}
  },
  methods: {
    // 全选,取消全选
    handleSelectAll(status) {
      this.$refs.selection.selectAll(status)
    },
    // 表格多选
    choiceRow(selection) {
      this.$emit('getChoiceArr', selection)
    },
    delOperation() {
      this.$emit('delOperation')
    },
    // 翻页操作
    handleChangePage(page) {
      this.$emit('handleChangePage', page)
    }
  }
}
</script>

<style lang="less" scoped>
.kui-table-hd {
  margin-bottom: 20px;
}
.table-pages {
  margin: 20px 0;
}
</style>
