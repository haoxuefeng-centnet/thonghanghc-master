<template>
  <div class="public-page">
    <div class="table-search">
      <Form ref="formInline" :model="searchData" inline>
        <FormItem label="登录名">
          <Input type="text" v-model="searchData.loginName" placeholder="请输入登陆名"> </Input>
        </FormItem>
        <FormItem label="联系电话">
          <Input type="text" v-model="searchData.userPhone" placeholder="请输入联系电话"> </Input>
        </FormItem>
        <FormItem label="真实姓名">
          <Input type="text" v-model="searchData.userName" placeholder="请输入真实姓名"> </Input>
        </FormItem>
        <!--        <FormItem label="用户类型">-->
        <!--        <Select v-model="searchData.userType" style="width:200px">-->
        <!--          <Option :value="0">超级管理员</Option>-->
        <!--          <Option :value="1">区域管理员</Option>-->
        <!--        </Select>-->
        <!--      </FormItem>-->
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
      :currentPage="currentPage"
      :is-choice-show="false"
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
          <!--    <Button type="primary" size="small" style="margin-right: 5px" @click="lookInfo(row)">详情</Button>-->
          <Button type="warning" size="small" style="margin-right: 5px" @click="openEditModal(row)">修改</Button>
          <Button type="error" size="small" @click="deleteUser(row)">删除</Button>
        </template>
        <template slot-scope="{ row }" slot="userStatus">
          <Tag v-if="row.userStatus === 0" type="dot" color="success">正常</Tag>
          <Tag v-if="row.userStatus === 1" type="dot" color="error">已注销</Tag>
        </template>
        <template slot-scope="{ row }" slot="userType">
          <Tag v-if="row.userType === 0" type="dot" color="primary">超级管理员</Tag>
          <Tag v-if="row.userType === 1" type="dot" color="warning">区域管理员</Tag>
        </template>
        <template slot-scope="{ row }" slot="userHeadImg">
          <div flex="main:center cross:center">
            <div style="margin: 5px" class="look-bigimg">
              <img :src="row.userHeadImg" alt="logo" width="60" height="60" />
              <div class="img-mask" @click="lookBigImg(row.userHeadImg)">
                <Icon type="md-eye" color="#fff" size="16" />
              </div>
            </div>
          </div>
        </template>
      </Table>
      <div slot="table-right">
        <Button type="primary" icon="md-add-circle" @click="addShow = true">新增区域管理员</Button>
      </div>
    </TableContainer>
    <!--    用户详情 -->
    <Drawer title="管理员详情" footer-hide v-model="drawerShow" width="400">
      <div class="drawer-container">
        <Row>
          <Col span="4">
            <p>登陆名称：</p>
          </Col>
          <Col span="18">
            <p>{{ userDetails.loginName }}</p>
          </Col>
          <Col span="4">
            <p>真实姓名：</p>
          </Col>
          <Col span="18">
            <p>{{ userDetails.userName }}</p>
          </Col>
          <Col span="4">
            <p>联系电话：</p>
          </Col>
          <Col span="18">
            <p>{{ userDetails.userPhone }}</p>
          </Col>
          <Col span="4">
            <p>用户状态：</p>
          </Col>
          <Col span="18">
            <p>{{ userDetails.userStatus }}</p>
          </Col>
          <Col span="4">
            <p>用户类型：</p>
          </Col>
          <Col span="18">
            <p>{{ userDetails.userType }}</p>
          </Col>
        </Row>
      </div>
    </Drawer>
    <Modal v-model="addShow" title="新增管理员" footer-hide>
      <AdminInfo v-if="addShow" ref="adminInfo" @formSubmit="addPostModal" :loading="addBtnLoading" />
    </Modal>
    <!-- 修改用户 -->
    <Modal v-model="editShow" title="修改管理员信息" footer-hide>
      <AdminInfo
        v-if="editShow"
        ref="adminInfo"
        modal-type="edit"
        :admin-info="editData"
        @formSubmit="putPostModal"
        :loading="addBtnLoading"
      />
    </Modal>
  </div>
</template>

<script>
import { tableMixins } from '@/mixins'
import { adminList, deleteAdmin, addAdmin, putAdmin } from '@api/admin'
import TableContainer from '@comp/Table/TableContainer'
import AdminInfo from './module/AdminInfo'
export default {
  name: 'User',
  components: { AdminInfo, TableContainer },
  mixins: [tableMixins],
  data() {
    return {
      reqFn: adminList,
      delFn: deleteAdmin,
      addFn: addAdmin,
      editFn: putAdmin,
      drawerShow: false,
      addBtnLoading: false,
      editData: {},
      userDetails: {},
      columns: [
        // {
        //   type: 'selection',
        //   width: 60,
        //   align: 'center'
        // },
        {
          title: '登录名',
          key: 'loginName',
          align: 'center'
        },
        {
          title: '真实姓名',
          key: 'userName',
          align: 'center'
        },
        {
          title: '头像',
          slot: 'userHeadImg',
          align: 'center'
        },
        {
          title: '拥有区域',
          key: 'province',
          align: 'center',
          render: (h, params) => {
            if (params.row.province === 'all') {
              return h('p', '所有地区')
            }
            return h('p', params.row.province + '/' + params.row.city)
          }
        },
        {
          title: '联系电话',
          key: 'userPhone',
          align: 'center'
        },
        {
          title: '状态',
          slot: 'userStatus',
          align: 'center'
        },
        {
          title: '用户类型',
          slot: 'userType',
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
    // 查看详情
    lookInfo(row) {
      this.userDetails = { ...row }
      this.drawerShow = true
    },
    // 删除用户
    deleteUser(row) {
      const reqParams = {
        userId: row.userId
      }
      this.delOperation(reqParams)
    },
    // 新增用户
    addPostModal(data) {
      console.log(data)
      this.addBtnLoading = true
      this.addPostData(data, 'addBtnLoading', () => {
        this.getList()
        this.$refs.adminInfo.cancelSubmit('adminInfo')
      })
    },
    // 打开修改窗口
    openEditModal(row) {
      this.editData = { ...row }
      this.editData.address = `${this.editData.province}/${this.editData.city}`
      this.editShow = true
    }
  }
}
</script>

<style scoped></style>
