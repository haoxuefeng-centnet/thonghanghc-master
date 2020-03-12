<!--
公共表格容器组件
包含了表头基本操作按钮，分页组件
可自定义各种配置
-->
<template>
  <div id="public-table">
    <div v-if="isToolBar" flex="main:justify cross:center" style="margin-bottom: 20px">
      <div class="left-button">
        <div v-if="isChoiceShow">
          <Button class="kui-hd-btn" type="primary" @click="handleSelectAll(true)">
            全选
          </Button>
          <Button class="kui-hd-btn" style="margin-left:10px;" @click="handleSelectAll(false)">
            取消全选
          </Button>
          <Button
            v-if="selectedRow.length"
            class="kui-hd-btn"
            tyle="margin-left:10px;"
            type="error"
            @click="delOperation"
          >
            删除所选数据
          </Button>
        </div>
      </div>
      <div class="right-btn">
        <slot name="table-right"></slot>
      </div>
    </div>
    <slot>
      请传入表格组件
    </slot>
    <Page
      v-if="tableTotal"
      class="table-pages"
      flex="main:center"
      :current="currentPage"
      :page-size="size"
      :total="tableTotal"
      show-total
      @on-change="tableChangePage"
    ></Page>
    <div v-if="!tableTotal">
      <slot name="table-page"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 选中的数据
    selectedRow: {
      type: Array,
      default: () => []
    },
    // 是否显示工具条
    isToolBar: {
      type: Boolean,
      default: () => true
    },
    // 是否显示全选按钮
    isChoiceShow: {
      type: Boolean,
      default: () => true
    },
    // 当前页码
    currentPage: {
      type: Number,
      default: () => 1
    },
    // 表格总条数
    tableTotal: {
      type: Number,
      default: () => 0
    },
    // 表格每页大小数
    size: {
      type: Number,
      default: () => 20
    }
  },
  data() {
    return {}
  },
  methods: {
    // // 全选,取消全选
    handleSelectAll(status) {
      this.$emit('handleSelectAll', status)
    },
    delOperation() {
      this.$emit('delOperation')
    },
    // 翻页操作
    tableChangePage(page) {
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
