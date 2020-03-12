/**
 * @Description: 页面表格相关操作方法
 * @author Gyang19
 * @date 2019-07-28
 */
export default {
  data() {
    return {
      // 公共表格列表数据
      tableData: [],
      // 表格多选数据
      choiceArr: [],
      // 表格加载动画
      loading: false,
      // 修改页面数据
      modifyData: {},
      // 当前页码
      currentPage: 1,
      // 分页数据
      tableTotal: 0,
      pageSize: 20,
      // 控制新增modal
      addShow: false,
      // 控制修改modal
      editShow: false,
      // 列表请求方法（有分页）
      reqFn: null,
      // 无分页列表请求
      listFn: null,
      // 请求方法
      addFn: null,
      // 删除方法
      delFn: null,
      // 修改方法
      editFn: null,
      // 搜索查询
      searchData: {},
      // 初始搜索条件
      params: {},
      isSearch: false
    }
  },
  methods: {
    // 获取列表数据(有分页)
    async getList(page = 1, callback = null) {
      const app = this
      if (!app.reqFn) {
        return false
      }
      app.loading = true
      const res = await app.reqFn({
        pageNumKey: page,
        pageSizeKey: this.pageSize,
        ...this.searchData,
        ...this.params
      })
      if (res.code === 200) {
        const { data } = res
        app.tableData = data.list
        app.tableTotal = data.total
        callback && callback()
      }
      app.loading = false
    },
    // 获取列表数据(无分页)
    async getAllList(params = {}, callback = null) {
      const app = this
      if (!app.listFn) {
        return false
      }
      app.loading = true
      const res = await app.listFn({
        ...this.searchData,
        ...params
      })
      if (res.code === 200) {
        const { data } = res
        app.tableData = data
        callback && callback()
      }
      app.loading = false
    },
    // 刷新表格数据
    refreshTable() {
      // 需要判断一下执行哪一个列表方法
      if (this.reqFn && this.tableTotal > 0) {
        // 拥有分页的表格
        this.currentPage = 1
        this.getList(this.currentPage)
      } else if (this.listFn && this.tableTotal === 0) {
        // 没有分页的表格
        this.getAllList()
      } else {
        this.currentPage = 1
        this.getList(this.currentPage)
      }
    },
    // 公共列表查询
    getSearchList() {
      this.isSearch = true
      this.refreshTable()
    },
    // 取消查询
    cancelSearch() {
      this.isSearch = false
      this.searchData = {}
      this.refreshTable()
    },
    // 全选,取消全选
    handleSelectAll(status) {
      this.$refs.selection.selectAll(status)
    },
    // 翻页操作
    handleChangePage(page) {
      this.currentPage = page
      this.getList(this.currentPage)
    },
    // 多选，拿到已选择数据
    getChoiceArr(selection) {
      const app = this
      app.choiceArr = selection.map(item => {
        if (item.id) {
          return item.id
        } else if (item.userId) {
          return item.userId
        } else {
          return []
        }
      })
    },
    // 新增数据方法
    addPostData(params, btnLoading, callback = null) {
      if (!this.addFn) {
        console.error('缺少addfn方法')
        return false
      }
      this.addFn(params)
        .then(res => {
          if (res.code === 200) {
            this.$Message.success(res.msg)
            callback ? callback() : this.refreshTable()
            this.addShow = false
          }
        })
        .finally(() => {
          btnLoading && (this[btnLoading] = false)
        })
    },
    // 接收子组件提交的修改信息
    putPostModal(data) {
      this.putData(data, () => {
        this.editShow && (this.editShow = false)
        this.refreshTable()
      })
    },
    // 修改数据提交公共方法
    putData(params = {}, callback) {
      const app = this
      app.$Modal.confirm({
        title: '提示',
        content: '即将更新数据，是否继续？',
        loading: true,
        onOk: () => {
          if (app.editFn && typeof app.editFn === 'function') {
            app
              .editFn(params)
              .then(res => {
                if (res.code === 200) {
                  app.$Message.success(res.msg)
                  callback && callback()
                }
              })
              .finally(() => {
                app.$Modal.remove()
              })
          } else {
            throw Error('requset fuction Error !')
          }
        }
      })
    },
    // 删除选中数据
    delOperation(params = null, callback = null) {
      const app = this
      app.$Modal.confirm({
        title: '提示',
        content: '你正在删除所选数据，是否继续？',
        loading: true,
        onOk: () => {
          app.delDatas(params, callback)
        }
      })
    },
    // 删除提交数据
    delDatas(param = {}, callback) {
      const app = this
      if (app.delFn && typeof app.delFn === 'function') {
        app
          .delFn(param)
          .then(res => {
            if (res.code === 200) {
              app.$Message.success(res.msg)
              app.choiceArr = []
              callback ? callback() : app.refreshTable()
            }
          })
          .finally(() => {
            app.$Modal.remove()
          })
      } else {
        throw Error('requset fuction Error !')
      }
    }
  }
}
