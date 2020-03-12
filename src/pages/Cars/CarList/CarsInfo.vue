<template>
  <div class="page-info">
    <Breadcrumb style="margin-bottom: 30px" v-if="!isFromOrder">
      <BreadcrumbItem to="/carlist">车辆列表</BreadcrumbItem>
      <BreadcrumbItem>车辆详情</BreadcrumbItem>
    </Breadcrumb>
    <Breadcrumb style="margin-bottom: 30px" v-if="isFromOrder">
      <BreadcrumbItem to="/money/list">定金列表</BreadcrumbItem>
      <BreadcrumbItem>车辆详情</BreadcrumbItem>
    </Breadcrumb>
    <PageLoading :loading="spinShow" />
    <div class="public-details-group">
      <h3>车辆基本信息</h3>
      <Row>
        <Col span="8">
          <div class="group-item" flex="main:left cross:top">
            <span>品牌车型：</span>
            <p>{{ carsInfo.brandSeries }}</p>
          </div>
        </Col>
        <Col span="8">
          <div class="group-item" flex="main:left cross:top">
            <span>车辆类型：</span>
            <p>{{ carsInfo.carType }}</p>
          </div>
        </Col>
        <Col span="8">
          <div class="group-item" flex="main:left cross:top">
            <span>变速箱：</span>
            <p>{{ carsInfo.carGearbox }}</p>
          </div>
        </Col>
        <Col span="8">
          <div class="group-item" flex="main:left cross:top">
            <span>车牌号：</span>
            <p>{{ carsInfo.carLicense }}</p>
          </div>
        </Col>
        <Col span="8">
          <div class="group-item" flex="main:left cross:top">
            <span>车辆颜色：</span>
            <p>{{ carsInfo.carColor }}</p>
          </div>
        </Col>
        <Col span="8">
          <div class="group-item" flex="main:left cross:top">
            <span>车辆描述：</span>
            <p>{{ carsInfo.carDescribe }}</p>
          </div>
        </Col>
        <Col span="8">
          <div class="group-item" flex="main:left cross:top">
            <span>排放标准：</span>
            <p>{{ carsInfo.carDischarge }}</p>
          </div>
        </Col>
        <Col span="8">
          <div class="group-item" flex="main:left cross:top">
            <span>使用性质：</span>
            <p>{{ carsInfo.carNature }}</p>
          </div>
        </Col>
        <Col span="8">
          <div class="group-item" flex="main:left cross:top">
            <span>初次上牌时间：</span>
            <p>{{ carsInfo.carOldBoadTime }}</p>
          </div>
        </Col>
        <Col span="8">
          <div class="group-item" flex="main:left cross:top">
            <span>车辆状态：</span>
            <p v-if="carsInfo.carStatus === 1">在售</p>
            <p v-if="carsInfo.carStatus === 2">已售</p>
            <p v-if="carsInfo.carStatus === 3">其他</p>
          </div>
        </Col>
        <Col span="8">
          <div class="group-item" flex="main:left cross:top">
            <span>出厂日期：</span>
            <p>{{ carsInfo.carFactoryTime }}</p>
          </div>
        </Col>
        <Col span="8">
          <div class="group-item" flex="main:left cross:top">
            <span>车辆里程：</span>
            <p>{{ carsInfo.carMileage }}Km</p>
          </div>
        </Col>
        <Col span="8">
          <div class="group-item" flex="main:left cross:top">
            <span>车检到期日期：</span>
            <p>{{ carsInfo.carMaturityTime }}</p>
          </div>
        </Col>
        <Col span="8">
          <div class="group-item" flex="main:left cross:top">
            <span>车辆归属市：</span>
            <p>{{ carsInfo.cityAttribution }}</p>
          </div>
        </Col>
        <Col span="8">
          <div class="group-item" flex="main:left cross:top">
            <span>车辆所在市：</span>
            <p>{{ carsInfo.cityLocation }}</p>
          </div>
        </Col>
        <Col span="8">
          <div class="group-item" flex="main:left cross:top">
            <span>车辆成本价：</span>
            <p>{{ carsInfo.costPrice }}万元</p>
          </div>
        </Col>
        <Col span="8">
          <div class="group-item" flex="main:left cross:top">
            <span>网络标价：</span>
            <p v-if="carsInfo.interPrice">{{ carsInfo.interPrice }}万元</p>
            <p v-if="!carsInfo.interPrice"></p>
          </div>
        </Col>
        <Col span="8">
          <div class="group-item" flex="main:left cross:top">
            <span>是否推广：</span>
            <p v-if="carsInfo.isPromotion === 1">是</p>
            <p v-if="carsInfo.isPromotion === 2">否</p>
          </div>
        </Col>
        <Col span="8">
          <div class="group-item" flex="main:left cross:top">
            <span> 车钥匙数量：</span>
            <p>{{ carsInfo.keySum }}</p>
          </div>
        </Col>
        <Col span="8">
          <div class="group-item" flex="main:left cross:top">
            <span>批发价格：</span>
            <p v-if="loginguserInfo.userType === 0">{{ carsInfo.wholesalePrice }}万元</p>
            <p v-if="loginguserInfo.userType === 1">/</p>
          </div>
        </Col>
        <Col span="8">
          <div class="group-item" flex="main:left cross:top">
            <span>燃油类型：</span>
            <p>{{ carsInfo.fuelType }}</p>
          </div>
        </Col>
      </Row>
    </div>
    <Divider />
    <div class="public-details-group">
      <h3>车辆保险、证件等信息</h3>
      <Row>
        <Col span="8">
          <div class="group-item" flex="main:left cross:top">
            <span>车牌照：</span>
            <p v-if="carsInfo.oldCarLicense === 1">有</p>
            <p v-if="carsInfo.oldCarLicense === 2">无</p>
          </div>
        </Col>
        <Col span="8">
          <div class="group-item" flex="main:left cross:top">
            <span>原车主身份证：</span>
            <p v-if="carsInfo.oldIdcard === 1">有</p>
            <p v-if="carsInfo.oldIdcard === 2">无</p>
          </div>
        </Col>
        <Col span="8">
          <div class="group-item" flex="main:left cross:top">
            <span>登记证：</span>
            <p v-if="carsInfo.regCertificate === 1">有</p>
            <p v-if="carsInfo.regCertificate === 2">无</p>
          </div>
        </Col>
        <Col span="8">
          <div class="group-item" flex="main:left cross:top">
            <span>行驶证：</span>
            <p v-if="carsInfo.carDrlicense === 1">有</p>
            <p v-if="carsInfo.carDrlicense === 2">无</p>
          </div>
        </Col>
        <Col span="8">
          <div class="group-item" flex="main:left cross:top">
            <span>商业险：</span>
            <p v-if="carsInfo.calInsurance === 1">有</p>
            <p v-if="carsInfo.calInsurance === 2">无</p>
          </div>
        </Col>
        <Col span="8">
          <div class="group-item" flex="main:left cross:top">
            <span>交强险：</span>
            <p v-if="carsInfo.nciManual === 1">有</p>
            <p v-if="carsInfo.nciManual === 2">无</p>
          </div>
        </Col>
        <Col span="8">
          <div class="group-item" flex="main:left cross:top">
            <span>购置税：</span>
            <p v-if="carsInfo.purchaseTax === 1">有</p>
            <p v-if="carsInfo.purchaseTax === 2">无</p>
          </div>
        </Col>
        <Col span="8">
          <div class="group-item" flex="main:left cross:top">
            <span>新车发票：</span>
            <p v-if="carsInfo.ncInvoice === 1">有</p>
            <p v-if="carsInfo.ncInvoice === 2">无</p>
          </div>
        </Col>
        <Col span="8">
          <div class="group-item" flex="main:left cross:top">
            <span>车船税证：</span>
            <p v-if="carsInfo.cbTax === 1">有</p>
            <p v-if="carsInfo.cbTax === 2">无</p>
          </div>
        </Col>
      </Row>
    </div>
    <Divider />
    <div class="public-details-group">
      <h3>推广信息</h3>
      <Row>
        <Col span="8">
          <div class="group-item" flex="main:left cross:top">
            <span>类型：</span>
            <p v-if="extension.type == 0">已推广</p>
            <p v-if="extension.type == 1">已刷新</p>
            <p v-if="extension.type == 2">无</p>
          </div>
        </Col>
        <Col span="8">
          <div class="group-item" flex="main:left cross:top">
            <span>失效时间：</span>
            <p>{{ extension.expirationDate || '' }}</p>
          </div>
        </Col>
      </Row>
    </div>
    <Divider />
    <div class="public-details-group">
      <h3>车辆图片</h3>
      <Row>
        <Col span="8">
          <div class="group-item" flex="main:left cross:top">
            <span>图一：</span>
            <div flex="main:center cross:center">
              <div style="margin: 5px" class="look-bigimg">
                <img :src="carsInfo.carImg1" alt="logo" width="60" height="60" />
                <div class="img-mask" @click="lookBigImg(carsInfo.carImg1)">
                  <Icon type="md-eye" color="#fff" size="16" />
                </div>
              </div>
            </div>
          </div>
        </Col>
        <Col span="8">
          <div class="group-item" flex="main:left cross:top">
            <span>图二：</span>
            <div flex="main:center cross:center">
              <div style="margin: 5px" class="look-bigimg">
                <img :src="carsInfo.carImg2" alt="logo" width="60" height="60" />
                <div class="img-mask" @click="lookBigImg(carsInfo.carImg2)">
                  <Icon type="md-eye" color="#fff" size="16" />
                </div>
              </div>
            </div>
          </div>
        </Col>
        <Col span="8">
          <div class="group-item" flex="main:left cross:top">
            <span>图三：</span>
            <div flex="main:center cross:center">
              <div style="margin: 5px" class="look-bigimg">
                <img :src="carsInfo.carImg3" alt="logo" width="60" height="60" />
                <div class="img-mask" @click="lookBigImg(carsInfo.carImg3)">
                  <Icon type="md-eye" color="#fff" size="16" />
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
    <Divider />
    <div class="public-details-group">
      <h3>其他信息</h3>
      <Row>
        <Col span="8">
          <div class="group-item" flex="main:left cross:top">
            <span>创建时间：</span>
            <p>{{ carsInfo.createTime }}</p>
          </div>
        </Col>
        <Col span="8">
          <div class="group-item" flex="main:left cross:top">
            <span>创建人：</span>
            <p>{{ userInfo.cusNick }}</p>
          </div>
        </Col>
        <Col span="8">
          <div class="group-item" flex="main:left cross:top">
            <span>联系电话：</span>
            <p>{{ userInfo.cusPhone }}</p>
          </div>
        </Col>
        <Col span="8">
          <div class="group-item" flex="main:left cross:top">
            <span>平台：</span>
            <p v-if="carsInfo.platform === 1">已发布</p>
            <p v-if="carsInfo.platform === 2">未发布</p>
          </div>
        </Col>
        <Col span="8">
          <div class="group-item" flex="main:left cross:top">
            <span>微店：</span>
            <p v-if="carsInfo.microShop === 1">已发布</p>
            <p v-if="carsInfo.microShop === 2">未发布</p>
          </div>
        </Col>
        <Col span="8">
          <div class="group-item" flex="main:left cross:top">
            <span>刷新时间：</span>
            <p>{{ carsInfo.updateTime }}</p>
          </div>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
import { carInfo } from '@api/cars'
import PageLoading from '@comp/PageLoading'

export default {
  name: 'CarsInfo',
  components: { PageLoading },
  computed: {
    loginguserInfo() {
      return this.$store.state.user.userInfo || {}
    }
  },
  data() {
    return {
      carsInfo: {},
      userInfo: {},
      extension: {},
      spinShow: true,
      isFromOrder: false
    }
  },
  created() {
    const route = this.$route.query
    this.isFromOrder = route.type && route.type === 'order' ? true : false
    // 获取车辆详情
    carInfo({ carId: route.id })
      .then(res => {
        if (res.code === 200) {
          this.carsInfo = res.data.car
          this.userInfo = res.data.creator
          this.extension = res.data.extension
        }
      })
      .finally(() => {
        this.spinShow = false
      })
  }
}
</script>

<style scoped></style>
