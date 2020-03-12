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
        <FormItem label="区域">
          <Input type="text" v-model="searchData.city" placeholder="请输入所属市级"> </Input>
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
          <Button
            type="primary"
            size="small"
            style="margin-right: 5px"
            :loading="configLoading1"
            @click="openGyingModal(row)"
            v-if="userInfo.userType === 0"
            >赠送功能点</Button
          >
          <Button
            type="warning"
            size="small"
            :loading="configLoading2"
            style="margin-right: 5px"
            @click="openVipModal(row)"
            v-if="userInfo.userType === 0"
            >赠送vip</Button
          >
          <Button type="primary" size="small" @click="lookInfo(row)">用户详情</Button>
          <Button type="primary" size="small" @click="address(row)">添加地址</Button>
        </template>
        <template slot-scope="{ row }" slot="cusStatus">
          <Tag v-if="row.cusStatus === 0" type="dot" color="success">正常</Tag>
          <Tag v-if="row.cusStatus === 1" type="dot" color="error">禁用</Tag>
        </template>
        <template slot-scope="{ row }" slot="isVip">
          <Tag v-if="row.isVip" type="dot" color="warning">vip用户</Tag>
          <Tag v-if="!row.isVip" type="dot">普通用户</Tag>
        </template>
        <template slot-scope="{ row }" slot="address">
          <p>{{ row.cityName }}</p>
        </template>
        <template slot-scope="{ row }" slot="cusAvatar">
          <div flex="main:center cross:center">
            <div style="margin: 5px" class="look-bigimg">
              <img :src="row.cusAvatar" alt="logo" width="60" height="60" />
              <div class="img-mask" @click="lookBigImg(row.cusAvatar)">
                <Icon type="md-eye" color="#fff" size="16" />
              </div>
            </div>
          </div>
        </template>
      </Table>
      <div slot="table-right"></div>
    </TableContainer>
    <!-- 赠送功能点-->
    <Modal v-model="modalShow" title="赠送功能点" @on-ok="submitGying('gyForm', 0)">
      <Form ref="gyForm" :model="gyFormData" :rules="gyRuleInline" :label-width="100">
        <FormItem prop="sendNum" label="赠送次数">
          <Input type="text" number v-model="gyFormData.sendNum" placeholder="请输入赠送次数" />
          <div class="help-info">
            <p>注：一次即代表一{{ activeConfig.configUnit || '次' }}</p>
          </div>
        </FormItem>
        <FormItem prop="configId" label="赠送配置">
          <Select v-model="gyFormData.configId" @on-change="configChange" label-in-value style="width:100%">
            <Option v-for="item in configList" :value="item.configId" :key="item.configId">{{
              item.configName
            }}</Option>
          </Select>
        </FormItem>
      </Form>
    </Modal>
    <!-- 赠送vip-->
    <Modal v-model="modalShow2" title="赠送vip" @on-ok="submitGying('vipForm', 1)">
      <Form ref="vipForm" :model="vipFormData" :rules="vipInline" :label-width="140">
        <FormItem prop="vipId" label="选择vip套餐">
          <Select v-model="vipFormData.vipId" label-in-value style="width:100%">
            <Option v-for="item in vipList" :value="item.vipId" :key="item.vipId">{{ item.vipTitle }}</Option>
          </Select>
        </FormItem>
      </Form>
    </Modal>
    <!-- 修改用户 -->
    <Modal v-model="editShow" title="修改用户" footer-hide>
      <AppUserInfo v-if="editShow" modal-type="edit" :app-user-info="editData" @formSubmit="putPostModal" />
    </Modal>
    <Drawer title="用户详情" footer-hide v-model="drawerShow" width="600px">
      <div class="public-details-group drawer-container">
        <PageLoading :loading="spinShow" />
        <!--基本信息-->
        <Row>
          <h2 style="font-size: 16px">基本信息：</h2>
          <Col span="12">
            <div class="group-item" flex="main:left cross:top">
              <span>用户昵称：</span>
              <p>{{ userCus.cusNick }}</p>
            </div>
          </Col>
          <Col span="12">
            <div class="group-item" flex="main:left cross:top">
              <span>联系电话：</span>
              <p>{{ userCus.cusPhone }}</p>
            </div>
          </Col>
          <Col span="12">
            <div class="group-item" flex="main:left cross:top">
              <span>所在市级：</span>
              <p>{{ userCus.cityName }}</p>
            </div>
          </Col>
          <Col span="12">
            <div class="group-item" flex="main:left cross:top">
              <span>注册时间：</span>
              <p>{{ userCus.cusRegTime }}</p>
            </div>
          </Col>
          <Col span="12">
            <div class="group-item" flex="main:left cross:top">
              <span>用户状态：</span>
              <p v-if="userCus.cusStatus == 0">正常</p>
              <p v-if="userCus.cusStatus == 1">注销</p>
            </div>
          </Col>
        </Row>
        <Row>
          <h2 style="font-size: 16px">VIP：</h2>
          <Col span="12">
            <div class="group-item" flex="main:left cross:top">
              <span>VIP状态：</span>
              <p v-if="userVip.isVip == true">已开通</p>
            </div>
          </Col>
          <Col span="12">
            <div class="group-item" flex="main:left cross:top">
              <span>VIP失效时间：</span>
              <p>{{ userVip.failureTime }}</p>
            </div>
          </Col>
        </Row>
        <Row>
          <h2 style="font-size: 16px">保险记录：</h2>
          <Col span="12">
            <div class="group-item" flex="main:left cross:top">
              <span>总次数：</span>
              <p>{{ userCuscar.totalCount }}</p>
            </div>
          </Col>
          <Col span="12">
            <div class="group-item" flex="main:left cross:top">
              <span>购买次数：</span>
              <p>{{ userCuscar.buyCount }}</p>
            </div>
          </Col>
          <Col span="12">
            <div class="group-item" flex="main:left cross:top">
              <span>使用次数：</span>
              <p>{{ userCuscar.useCount }}</p>
            </div>
          </Col>
          <Col span="12">
            <div class="group-item" flex="main:left cross:top">
              <span>保险记录赠送次数：</span>
              <p>{{ userCuscar.sendCount }}</p>
            </div>
          </Col>
          <Col span="12">
            <div class="group-item" flex="main:left cross:top">
              <span>保险记录剩余次数：</span>
              <p>{{ userCuscar.surplusCount }}</p>
            </div>
          </Col>
        </Row>
        <Row>
          <h2 style="font-size: 16px">预订收车：</h2>
          <Col span="12">
            <div class="group-item" flex="main:left cross:top">
              <span>发布心愿单权限：</span>
              <p v-if="userReserve.isReserve == true">有</p>
              <p v-if="userReserve.isReserve == false">无</p>
            </div>
          </Col>
          <Col span="12">
            <div class="group-item" flex="main:left cross:top">
              <span>失效时间：</span>
              <p>{{ userReserve.expirationDate }}</p>
            </div>
          </Col>
        </Row>
        <Row>
          <h2 style="font-size: 16px">成交价：</h2>
          <Col span="12">
            <div class="group-item" flex="main:left cross:top">
              <span>成交价总次数：</span>
              <p>{{ userCusdeal.totalCount }}</p>
            </div>
          </Col>
          <Col span="12">
            <div class="group-item" flex="main:left cross:top">
              <span>成交价使用次数：</span>
              <p>{{ userCusdeal.useCount }}</p>
            </div>
          </Col>
          <Col span="12">
            <div class="group-item" flex="main:left cross:top">
              <span>成交价剩余次数：</span>
              <p>{{ userCusdeal.surplusCount }}</p>
            </div>
          </Col>
          <Col span="12">
            <div class="group-item" flex="main:left cross:top">
              <span>成交价购买次数：</span>
              <p>{{ userCusdeal.buyCount }}</p>
            </div>
          </Col>
          <Col span="12">
            <div class="group-item" flex="main:left cross:top">
              <span>成交价赠送次数：</span>
              <p>{{ userCusdeal.sendCount }}</p>
            </div>
          </Col>
        </Row>
        <Row>
          <h2 style="font-size: 16px">4S维修：</h2>
          <Col span="12">
            <div class="group-item" flex="main:left cross:top">
              <span>4S维修总次数：</span>
              <p>{{ userCus4s.totalCount }}</p>
            </div>
          </Col>
          <Col span="12">
            <div class="group-item" flex="main:left cross:top">
              <span>4S维修使用次数：</span>
              <p>{{ userCus4s.useCount }}</p>
            </div>
          </Col>
          <Col span="12">
            <div class="group-item" flex="main:left cross:top">
              <span>4S维修剩余次数：</span>
              <p>{{ userCus4s.surplusCount }}</p>
            </div>
          </Col>
          <Col span="12">
            <div class="group-item" flex="main:left cross:top">
              <span>4s维修购买次数：</span>
              <p>{{ userCus4s.buyCount }}</p>
            </div>
          </Col>
          <Col span="12">
            <div class="group-item" flex="main:left cross:top">
              <span>4s维修赠送次数：</span>
              <p>{{ userCus4s.sendCount }}</p>
            </div>
          </Col>
        </Row>
        <Row>
          <h2 style="font-size: 16px">推广：</h2>
          <Col span="12">
            <div class="group-item" flex="main:left cross:top">
              <span>推广总次数：</span>
              <p>{{ userCuspromotion.totalCount }}</p>
            </div>
          </Col>
          <Col span="12">
            <div class="group-item" flex="main:left cross:top">
              <span>推广使用次数：</span>
              <p>{{ userCuspromotion.useCount }}</p>
            </div>
          </Col>
          <Col span="12">
            <div class="group-item" flex="main:left cross:top">
              <span>推广剩余次数：</span>
              <p>{{ userCuspromotion.surplusCount }}</p>
            </div>
          </Col>
          <Col span="12">
            <div class="group-item" flex="main:left cross:top">
              <span>推广购买次数：</span>
              <p>{{ userCuspromotion.buyCount }}</p>
            </div>
          </Col>
          <Col span="12">
            <div class="group-item" flex="main:left cross:top">
              <span>推广赠送次数：</span>
              <p>{{ userCuspromotion.sendCount }}</p>
            </div>
          </Col>
        </Row>
        <Row>
          <h2 style="font-size: 16px">刷新：</h2>
          <Col span="12">
            <div class="group-item" flex="main:left cross:top">
              <span>刷新总次数：</span>
              <p>{{ userCusflush.totalCount }}</p>
            </div>
          </Col>
          <Col span="12">
            <div class="group-item" flex="main:left cross:top">
              <span>刷新使用次数：</span>
              <p>{{ userCusflush.useCount }}</p>
            </div>
          </Col>
          <Col span="12">
            <div class="group-item" flex="main:left cross:top">
              <span>刷新购买次数：</span>
              <p>{{ userCusflush.buyCount }}</p>
            </div>
          </Col>
          <Col span="12">
            <div class="group-item" flex="main:left cross:top">
              <span>刷新剩余次数：</span>
              <p>{{ userCusflush.surplusCount }}</p>
            </div>
          </Col>
          <Col span="12">
            <div class="group-item" flex="main:left cross:top">
              <span>刷新赠送次数：</span>
              <p>{{ userCusflush.sendCount }}</p>
            </div>
          </Col>
        </Row>
      </div>
    </Drawer>
  </div>
</template>

<script>
import { tableMixins } from '@/mixins'
import { userList, putUser, putinfo, putUpdata } from '@api/user'
import TableContainer from '@comp/Table/TableContainer'
import AppUserInfo from './module/AppUserInfo'
import { gyConfigList, addGying, vipGive } from '@api/gvConfig'
import { vipList } from '@api/vip'
import PageLoading from '@comp/PageLoading'

export default {
  name: 'User',
  components: { TableContainer, AppUserInfo, PageLoading },
  mixins: [tableMixins],
  computed: {
    userInfo() {
      return this.$store.state.user.userInfo || {}
    }
  },
  data() {
    return {
      reqFn: userList,
      editFn: putUser,
      addFn: putinfo,
      drawerShow: false,
      spinShow: false,
      modalShow: false,
      modalShow2: false,
      configLoading1: false,
      configLoading2: false,
      gyFormData: {},
      vipFormData: {},
      userCus: {},
      userCuscar: {},
      userReserve: {},
      userCusdeal: {},
      userCus4s: {},
      userVip: {},
      userCusflush: {},
      userCuspromotion: {},
      gyRuleInline: {
        sendNum: [{ required: true, type: 'number', message: '请输入正确的赠送次数', trigger: 'blur' }],
        configId: [{ required: true, type: 'number', message: '请选择赠送的功能', trigger: 'change' }]
      },
      vipInline: {
        vipId: [{ required: true, type: 'number', message: '请选择赠送的vip套餐', trigger: 'change' }]
      },
      editData: {},
      configList: [],
      vipList: [],
      activeConfig: {},
      cusId: '',
      id: '',
      columns: [
        // {
        //   title: '用户姓名',
        //   key: 'cusName',
        //   align: 'center',
        //   render: (h, params) => {
        //     return h('p', params.row.cusName || '/')
        //   }
        // },
        {
          title: '用户昵称',
          key: 'cusNick',
          align: 'center'
        },
        {
          title: '用户头像',
          slot: 'cusAvatar',
          align: 'center'
        },
        {
          title: '用户手机号',
          key: 'cusPhone',
          align: 'center'
        },
        {
          title: '用户状态',
          slot: 'cusStatus',
          align: 'center'
        },
        {
          title: '是否vip',
          slot: 'isVip',
          align: 'center'
        },
        {
          title: '所在区域',
          slot: 'address',
          align: 'center'
        },
        {
          title: '注册时间',
          key: 'cusRegTime',
          align: 'center'
        },
        {
          title: '操作',
          slot: 'action',
          align: 'center',
          width: 320
        }
      ]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 获取被选中的配置
    configChange(data) {
      if (!data || !data.value) {
        return false
      }
      const activeItem = this.configList.filter(item => item.configId === data.value)
      this.activeConfig = activeItem[0]
    },
    // 打开赠送功能点弹框
    openGyingModal(row) {
      // 获取配置列表
      this.configLoading1 = true
      gyConfigList()
        .then(res => {
          if (res.code === 200) {
            this.configList = res.data
            this.modalShow = true
          }
        })
        .finally(() => {
          this.configLoading1 = false
        })
      this.cusId = row.cusId
    },
    // 打开vip弹框
    openVipModal(row) {
      this.configLoading2 = true
      // 请求vip配置列表
      vipList()
        .then(res => {
          if (res.code === 200) {
            this.vipList = res.data
            this.modalShow2 = true
          }
        })
        .finally(() => {
          this.configLoading2 = false
        })
      this.cusId = row.cusId
    },
    // 发送赠送功能点信息给后台
    postGying(type) {
      this.$Modal.confirm({
        title: '提示',
        content: '确定赠送给此用户吗？',
        loading: true,
        onOk: () => {
          // type 0 赠送功能点 1 赠送vip
          if (type === 0) {
            addGying({ ...this.gyFormData, cusId: this.cusId }).then(res => {
              if (res.code === 200) {
                this.$refs.gyForm.resetFields('gyForm')
                this.$Message.success(res.msg)
              }
            })
          } else if (type === 1) {
            vipGive({ ...this.vipFormData, cusId: this.cusId }).then(res => {
              if (res.code === 200) {
                this.$refs.gyForm.resetFields('vipForm')
                this.$Message.success(res.msg)
              }
            })
          } else {
            return false
          }
          this.$Modal.remove()
          this.getList()
        }
      })
    },
    // 表单验证
    submitGying(name, type) {
      // type 0 赠送功能点 1 赠送vip
      this.$refs[name].validate(valid => {
        if (valid) {
          this.postGying(type)
        } else {
          this.$Message.error('请填写正确的信息')
        }
      })
    },
    // 查看详情
    lookInfo(row) {
      this.drawerShow = true
      this.spinShow = true
      putinfo({ cusId: row.cusId })
        .then(res => {
          if (res.code === 200) {
            this.userCus = res.data.cus
            this.userCuscar = res.data.cusCar
            this.userReserve = res.data.reserve
            this.userCusdeal = res.data.cusDeal
            this.userCus4s = res.data.cus4s
            this.userVip = res.data.vip
            this.userCusflush = res.data.cusFlush
            this.userCuspromotion = res.data.cusPromotion
          }
        })
        .finally(() => {
          this.spinShow = false
        })
    },
    // 删除用户
    deleteUser(row) {
      const reqParams = {
        params: {
          userId: row.userId
        }
      }
      this.delOperation(reqParams)
    },
    // 打开修改窗口
    openEditModal(row) {
      this.editData = { ...row }
      this.editData.address = `${row.provinceName}/${row.cityName}`
      this.editShow = true
    },
    //打开修改地址弹窗
    address(row) {
      this.id = row.cusId
      this.editShow = true
    },
    //  修改地区
    putPostModal(data) {
      console.log(data)
      putUpdata({ cusId: this.id, cityName: data.city }).then(res => {
        if (res.code == 200) {
          this.editShow = false
          this.$Message.success(res.msg)
          this.getList()
        }
      })
    }
  }
}
</script>

<style scoped>
.help-info {
  margin-top: 10px;
  font-size: 12px;
  line-height: 1.5;
  font-weight: 500;
  color: #f90;
}
</style>
