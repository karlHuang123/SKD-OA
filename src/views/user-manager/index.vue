<template>
  <div class="test-container">
    <div class="top-container"></div>
    <div class="list-container">
      <div class="table-operations">
        <a-button @click="setAgeSort">全部</a-button>
        <a-button @click="clearFilters">标签一</a-button>
        <a-button @click="clearAll">标签二</a-button>
        <div class="search-input">
          <a-input-search
            placeholder="请输入关键字"
            style="width: 200px"
            @search="searchPosition"
            v-model:value="listPara.searchVal"
          />
          <a-button
            style="margin-left: 30px"
            type="primary"
            @click="openAddUser('添加新员工')"
          >
            添加新员工
          </a-button>
        </div>
      </div>
      <a-table
        :columns="columns"
        :pagination="pagination"
        @change="handleStaffListChange"
        :row-key="
          (r) => {
            return r.userId
          }
        "
        :data-source="staffListJson"
      >
        <template #operation="{ record }">
          <div class="editable-row-operations">
            <span class="edit">
              <a-button type="primary" @click="() => editStaff(record.userId)">
                编辑
              </a-button>
            </span>
            <span>
              <a-popconfirm
                title="确定删除该员工吗？"
                @confirm="() => deleteStaffFuc(record.userId)"
              >
                <a-button type="danger">删除</a-button>
              </a-popconfirm>
            </span>
          </div>
        </template>
      </a-table>
    </div>
    <a-modal
      @cancel="closeAddUser"
      :visible="showAddUserModal"
      :title="modalTitle"
      @ok="submitUser"
    >
      <div class="user-email section">
        <span>员工邮箱</span>
        <a-input placeholder="请输入员工邮箱" v-model="form.email" />
      </div>
      <div class="feature-container">
        <div class="left-feature">
          <div class="user-campus section" v-if="campus">
            <div>校区</div>
            <a-select
              :default-value="userCampus"
              style="width: 120px"
              @change="handleCampusChange"
            >
              <a-select-option v-for="item in campus" :key="item.id">
                {{ item.label }}
              </a-select-option>
            </a-select>
          </div>
          <div class="user-deparment section">
            <span>所属部门</span>
          </div>
          <a-select
            :default-value="userDeparment"
            style="width: 120px"
            @change="handleDeparmentChange"
          >
            <a-select-option v-for="item in deparment" :key="item.id">
              {{ item.label }}
            </a-select-option>
          </a-select>
          <div class="user-deparment section">
            <span>岗位</span>
          </div>
          <a-select
            :default-value="userPosition"
            style="width: 120px"
            @change="handlePositionChange"
          >
            <a-select-option v-for="item in positions" :key="item.id">
              {{ item.label }}
            </a-select-option>
          </a-select>
        </div>
        <div class="right-container">
          <div class="user-deparment section">
            <span>用户权限</span>
            <div class="check-group"></div>
          </div>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import { allInformation } from './static/information.js'
  export default {
    name: 'UserManager',
    data() {
      return {
        staffListJson: null,
        showAddUserModal: false,
        modalTitle: '',
        listPara: {
          pageNum: 1,
          pageSize: 10,
          searchVal: '',
        },
        form: {
          userEmail: '',
          department: '',
          position: '',
          userFeature: [],
        },
        campus: null,
        deparment: null,
        userCampus: '请选择',
        userDeparment: '请选择',
        userPosition: '请选择',
        columns: allInformation.columns,
        pagination: {
          total: 0,
          current: 1,
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          pageSizeOptions: ['10', '20', '50', '100'],
          showTotal: (total) => `共${total}条`,
        },
        staffAbilitiesList: null,
        positions: [], // 根据部门查找到的岗位信息
      }
    },
    methods: {
      ...mapActions({
        getDeptTree: 'position/getDeptTree',
        getPositionDetail: 'position/getPositionDetail',
        getStaffList: 'position/getStaffList',
        deleteStaff: 'position/deleteStaff',
        getStaffAbilitiesList: 'position/getStaffAbilitiesList',
        getListByDeptName: 'position/getListByDeptName',
      }),
      searchPosition() {
        this.getStaffListFuc(
          this.listPara.pageNum,
          this.listPara.pageSize,
          this.listPara.searchVal,
        )
      },
      getStaffListFuc(pageNum = 1, pageSize = 10, searchVal = '') {
        this.listPara.pageNum = pageNum
        this.listPara.pageSize = pageSize
        this.listPara.searchVal = searchVal
        this.getStaffList({
          listPara: this.listPara,
          callback: (res) => {
            this.staffListJson = res.rows
            this.pagination.total = res.total
          },
        })
      },
      getStaffAbilitiesListFuc() {
        this.getStaffAbilitiesList({
          callback: (res) => {
            console.log(res)
            this.staffAbilitiesList = res.data
          },
        })
      },
      getListByDeptNameFuc(deptName) {
        this.getListByDeptName({
          deptName: deptName,
          callback: (res) => {
            console.log('positions', res)
            res.rows.forEach((item) => {
              const ele = {
                label: item.postName,
                value: item.postCode,
              }
              this.positions.push(ele)
            })
          },
        })
      },
      handleCampusChange(value) {
        this.userCampus = value
        this.deparment = this.campus.find((item) => {
          return item.id === this.userCampus
        }).children
      },
      handleDeparmentChange(value) {
        this.userDeparment = this.deparment.find((item) => {
          return item.id === value
        }).label
        this.getListByDeptNameFuc(this.userDeparment)
      },
      handlePositionChange(value) {
        this.form.position = value
      },
      openAddUser(title) {
        this.modalTitle = title
        this.showAddUserModal = true
      },
      submitUser() {
        this.closeAddUser()
      },
      editStaff(staffId) {
        console.log(staffId)
      },
      handleStaffListChange({ current, pageSize }) {
        this.pagination.current = current
        this.pagination.pageSize = pageSize
        this.getStaffListFuc(current, pageSize, this.listPara.searchVal)
      },
      deleteStaffFuc(staffId) {
        this.deleteStaff({
          staffId: staffId,
          callback: (res) => {
            if (res) {
              this.$message.success('删除成功')
              this.getStaffListFuc(this.pagination.current)
            }
          },
          errCallback: (err) => {
            if (err) {
              this.$message.success(err)
            }
          },
        })
      },
      closeAddUser() {
        this.showAddUserModal = false
        this.userCampus = '请选择'
        this.userDeparment = '请选择'
        this.userPosition = '请选择'
        this.positions = []
        if (this.campus) {
          this.deparment = null
        }
      },
    },
    mounted() {
      this.getStaffListFuc()
      const abilitiesList = this.$store.getters['position/abilitiesList']
      if (abilitiesList) {
        this.staffAbilitiesList = this.abilitiesList
      } else {
        this.getStaffAbilitiesListFuc()
      }
      console.log(this.staffAbilitiesList)
      this.getDeptTree((res) => {
        if (res.data[0].label === 'SKD科技') {
          this.campus = res.data[0].children
        } else {
          this.deparment = res.data[0].children
        }
      })
    },
  }
</script>
<style lang="less" scoped>
  .top-container {
    height: 150px;
  }
  .list-container {
    .table-operations {
      margin-bottom: 16px;
      display: flex;
      .search-input {
        margin-left: auto;
      }
    }
    .table-operations > button {
      margin-right: 8px;
    }
    .edit {
      margin-right: 20px;
    }
  }
  .version-information {
    margin-top: @vab-margin;
    &-table {
      width: 100%;
      overflow: scroll;
      table {
        width: 100%;
        color: #666;
        border-collapse: collapse;
        background-color: #fff;

        td {
          position: relative;
          padding: 9px 15px;
          font-size: 14px;
          line-height: 20px;
          border: 1px solid #e6e6e6;

          &:nth-child(odd) {
            width: 20%;
            text-align: right;
            background-color: #f7f7f7;
          }
        }
      }
    }
  }
  .section {
    margin: 10px auto;
  }
  .feature-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
</style>
