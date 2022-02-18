<template>
  <div class="test-container">
    <div class="list-container">
      <a-table
        :columns="listColumns"
        :pagination="pagination"
        @change="handleStudentListChange"
        :scroll="{ x: 1600 }"
        :row-key="
          (r) => {
            return r.userId
          }
        "
        :data-source="studentListJson"
      >
        <template #operation="{ record }">
          <div class="editable-row-operations">
            <span class="edit">
              <a-button
                type="primary"
                @click="() => getStudentFuc(record.studentId)"
              >
                编辑
              </a-button>
            </span>
            <span>
              <a-popconfirm
                title="确定删除该学生信息吗？"
                @confirm="() => deleteStudentFuc(record.studentId)"
              >
                <a-button type="danger">删除</a-button>
              </a-popconfirm>
            </span>
          </div>
        </template>
      </a-table>
    </div>
    <a-modal
      @cancel="closeEditStudent"
      :visible="showEditStudentModal"
      :title="'编辑学生信息'"
      @ok="submitStudent"
      width="80%"
    >
      <edit-student
        :studentInfo="studentInfo"
        @studentInfoChanged="handleStudentInfoChange"
      ></edit-student>
    </a-modal>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import { listParameters } from './static/list-parameters.js'
  import EditStudent from './components/edit-student'
  export default {
    name: 'StudentList',
    components: { EditStudent },
    data() {
      return {
        listColumns: listParameters.listColumns,
        pagination: {
          total: 0,
          current: 1,
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          pageSizeOptions: ['10', '20', '50', '100'],
          showTotal: (total) => `共${total}条`,
        },
        studentListJson: null,
        listPara: {
          pageNum: 1,
          pageSize: 10,
        },
        studentInfo: null,
        showEditStudentModal: false,
      }
    },
    methods: {
      ...mapActions({
        getStudentList: 'contract/getStudentList',
        deleteStudent: 'contract/deleteStudent',
        getStudent: 'contract/getStudent',
        editStudent: 'contract/editStudent',
      }),
      getStudentListFuc(pageNum = 1, pageSize = 10, searchVal = '') {
        this.listPara.pageNum = pageNum
        this.listPara.pageSize = pageSize
        console.log(searchVal)
        // this.listPara.searchVal = searchVal
        this.getStudentList({
          listPara: this.listPara,
          callback: (res) => {
            this.studentListJson = res.rows
            this.pagination.total = res.total
          },
        })
      },
      getStudentFuc(studentId) {
        this.getStudent({
          studentId: studentId,
          callback: (res) => {
            this.studentInfo = res.data
            this.showEditStudentModal = true
          },
        })
      },
      closeEditStudent() {
        this.studentInfo = null
        this.showEditStudentModal = false
      },
      submitStudent() {
        this.editStudent({
          studentInfo: this.studentInfo,
          callback: (res) => {
            if (res) {
              this.showEditStudentModal = false
              this.$message.success('编辑成功。')
            }
          },
        })
      },
      deleteStudentFuc(studentIds) {
        let studentPara
        if (typeof studentIds.length === 'number' && studentIds.length !== 0) {
          studentPara = studentIds.join(',')
        } else {
          studentPara = studentIds
        }
        this.deleteStudent({
          studentIds: studentPara,
          callback: () => {
            this.$message.success('删除成功！')
            this.getStudentListFuc(this.pagination.current)
          },
        })
      },
      handleStudentListChange({ current, pageSize }) {
        this.pagination.current = current
        this.pagination.pageSize = pageSize
        this.getStaffListFuc(current, pageSize, this.listPara.searchVal)
      },
      handleStudentInfoChange(e) {
        let temp = JSON.parse(JSON.stringify(e))
        delete temp.contractEndDate
        delete temp.contractSignDate
        delete temp.createTime
        delete temp.createBy
        delete temp.updateBy
        delete temp.updateTime
        this.studentInfo = temp
      },
    },
    mounted() {
      this.getStudentListFuc()
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
</style>
