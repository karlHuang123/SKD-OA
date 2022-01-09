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
      <a-table :columns="columns" :data="listData"></a-table>
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
      <div class="user-campus section">
        <div>校区</div>
        <a-select
          :default-value="userCampus"
          style="width: 120px"
          @change="handleCampusChange"
        >
          <a-select-option v-for="item in campus" :key="item.key">
            {{ item.value }}
          </a-select-option>
        </a-select>
      </div>
      <div class="user-deparment section">
        <span>所属部门</span>
      </div>
      <p>Some contents...</p>
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
        positionListJson: null,
        listData: [],
        showAddUserModal: false,
        modalTitle: '',
        form: {
          userEmail: '',
          department: '',
          position: '',
          userFeature: [],
        },
        campus: allInformation.campus,
        userCampus: '请选择',
        columns: [
          {
            title: '用户名',
            dataIndex: 'name',
            key: 'name',
            filters: [],
          },
          {
            title: '部门',
            dataIndex: 'department',
            key: 'department',
          },
          {
            title: '职位',
            dataIndex: 'position',
            key: 'position',
            filters: [],
          },
          {
            title: '员工类型',
            dataIndex: 'positionType',
            key: 'positionType',
          },
          {
            title: '所属分公司',
            dataIndex: 'subCompany',
            key: 'subCompany',
          },
          {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            scopedSlots: { customRender: 'operation' },
          },
        ],
      }
    },
    methods: {
      ...mapActions({
        getPositionList: 'position/getPositionList',
        getPositionDetail: 'position/getPositionDetail',
      }),
      searchPosition(positionId) {
        this.getPositionDetail({
          positionId: positionId,
          callback: (res) => {
            console.log(res)
          },
        })
      },
      handleCampusChange(value) {
        this.userCampus = value
      },
      openAddUser(title) {
        this.modalTitle = title
        this.showAddUserModal = true
      },
      submitUser() {
        this.closeAddUser()
      },
      closeAddUser() {
        this.showAddUserModal = false
      },
    },
    mounted() {
      this.getPositionList((res) => {
        if (res.code === 200 && res.data) {
          this.positionListJson = JSON.stringify(res.data)
        } else {
          this.$message.error('请求错误，请稍后重试或联系维护认员。')
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
</style>
