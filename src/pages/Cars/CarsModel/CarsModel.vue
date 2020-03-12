<template>
  <div class="public-page">
    <PageLoading :loading="spinLoading" />
    <Card style="width:100%" :dis-hover="true" :padding="20">
      <h2 slot="title">车型介绍</h2>
      <div class="crad-container">
        <Tree :data="modelList" :load-data="loadChildData" empty-text="暂无车型数据"></Tree>
      </div>
    </Card>
  </div>
</template>

<script>
import PageLoading from '@comp/PageLoading'
import { carModelList } from '@api/cars'

export default {
  name: 'CarsModel',
  components: { PageLoading },
  data() {
    return {
      modelList: [],
      spinLoading: true
    }
  },
  created() {
    this.getCarModel(0, 0)
  },
  methods: {
    // 获取车型列表
    getCarModel(tier, pid, callback = null) {
      carModelList({ type: tier, parentId: pid })
        .then(res => {
          if (res.code === 200) {
            this.modelList = this.resetList(res.data)
            callback && callback()
          }
        })
        .finally(() => {
          this.spinLoading = false
        })
    },
    // 重组列表数据
    resetList(data) {
      let arr = []
      if (data.length) {
        data.forEach(item => {
          let temp = {
            title: '',
            loading: false,
            children: []
          }
          temp.title = item.brandAcronym ? `${item.brandName}(${item.brandAcronym})` : `${item.brandName}`
          temp.brandId = item.brandId
          console.log(item)
          temp.level = item.level
          arr.push(temp)
        })
      }
      return arr
    },
    // 加载更多数据
    async loadChildData(child, callbackFn) {
      carModelList({ type: child.level, parentId: child.brandId }).then(res => {
        if (res.code === 200) {
          const data = this.resetList(res.data)
          data.length ? callbackFn(data) : this.$message.warn('没有更多车型数据了～～')
        }
      })
    }
  }
}
</script>

<style scoped></style>
