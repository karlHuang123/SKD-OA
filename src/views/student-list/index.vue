<template>
  <a-spin :spinning="spinning" tip="文件下载中，请稍后...">
    <div class="test-container">
      <div class="list-container">
        <div class="module-change">
          <span>添加模块：</span>
          <a-select
            :default-value="'请选择'"
            style="width: 120px"
            @change="handleAddModule"
          >
            <a-select-option
              v-for="item in addableList"
              v-bind:key="item.key"
              :value="item.title"
            >
              {{ item.title }}
            </a-select-option>
          </a-select>
          <span style="margin-left: 20px">删除模块：</span>
          <a-select
            :default-value="'请选择'"
            style="width: 120px"
            @change="handleDeleteModule"
          >
            <a-select-option
              v-for="item in listColumns"
              v-bind:key="item.key"
              :value="item.title"
              :disabled="item.title === '更多操作'"
            >
              {{ item.title }}
            </a-select-option>
          </a-select>
          <!-- <a-input-search
            style="margin-left: 20px"
            v-model:value="studentName"
            placeholder="搜索学生姓名"
            @search="onSearch"
          /> -->
        </div>
        <div class="search-area">
          <a-input-search
            placeholder="请输入学生名"
            style="width: 200px"
            @search="searchStudent"
            v-model:value="listPara.studentName"
          />
          <a-button style="margin-left: 15px" @click="checkAll" type="primary">
            查看全部学生
          </a-button>
          <a-button
            style="margin-left: 15px"
            @click="openExport"
            type="primary"
          >
            导出学生信息
          </a-button>
        </div>
        <a-table
          :columns="listColumns"
          :pagination="pagination"
          @change="handleStudentListChange"
          :scroll="{ x: 1600 }"
          :loading="loading"
          :row-key="
            (r) => {
              return r.userId
            }
          "
          :data-source="studentListJson"
        >
          <template #applyEducation="{ record }">
            <div class="editable-row-operations">
              {{ applyDegreeMap[record.applyEducation] }}
            </div>
          </template>
          <template #productLevel="{ record }">
            <div class="editable-row-operations">
              {{ productLevelMap[record.productLevel] }}
            </div>
          </template>
          <template #operation="{ record }">
            <div class="editable-row-operations">
              <a-dropdown :trigger="['click']">
                <span class="edit">
                  <a-button class="ant-dropdown-link" @click.prevent>
                    信息管理
                  </a-button>
                </span>
                <template #overlay>
                  <a-menu>
                    <a-menu-item key="0">
                      <span class="edit inside-btn">
                        <a-button
                          type="primary"
                          v-if="
                            role === 'admin' ||
                            role === 'educationalManager' ||
                            role === 'educationalTeacher'
                          "
                          @click="() => getStudentFuc(record.studentId)"
                        >
                          导师分配
                        </a-button>
                      </span>
                    </a-menu-item>
                    <a-menu-item key="1">
                      <span class="edit inside-btn">
                        <a-button
                          type="ghost"
                          v-if="
                            role === 'admin' ||
                            role === 'educationalManager' ||
                            role === 'educationalTeacher'
                          "
                          @click="goToContract('edit', record.studentName)"
                        >
                          合同编辑
                        </a-button>
                      </span>
                    </a-menu-item>
                    <a-menu-item key="3">
                      <span class="edit inside-btn">
                        <a-button
                          type="primary"
                          @click="goToContract('readOnly', record.studentName)"
                        >
                          合同查看
                        </a-button>
                      </span>
                    </a-menu-item>
                    <a-menu-item key="3">
                      <span class="edit inside-btn">
                        <a-button @click="goToHistory(record.studentName)">
                          课堂记录
                        </a-button>
                      </span>
                    </a-menu-item>
                    <a-menu-item key="3">
                      <span class="edit inside-btn">
                        <a-button @click="goToCourseInfo(record.studentName)">
                          课堂反馈
                        </a-button>
                      </span>
                    </a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
              <span>
                <a-button
                  type="primary"
                  v-if="
                    role === 'admin' ||
                    role === 'educationalManager' ||
                    role === 'educationalTeacher'
                  "
                  @click="
                    () =>
                      openDownload(record.studentId, record.contractFilepath)
                  "
                >
                  下载合同
                </a-button>
              </span>
              <span
                v-if="role === 'admin'"
                style="margin-top: 5px; display: inline-block"
              >
                <a-popconfirm
                  title="确定删除该学生的合同吗？"
                  @confirm="() => deleteStudentFuc(record.studentName)"
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
      <a-modal
        @cancel="closeDownload"
        :visible="download"
        :title="'合同文件下载'"
        @ok="closeDownload"
        width="40%"
      >
        <a-list item-layout="horizontal" :data-source="contractFileList">
          <template #renderItem="{ item, index }">
            <a-list-item>
              <div class="flex">
                <div>{{ item.name }}</div>
                <div class="right">
                  <a-button
                    type="primary"
                    size="small"
                    :loading="item.spinning"
                    @click="downloadContractFun(item.file, index)"
                  >
                    下载
                  </a-button>
                </div>
              </div>
            </a-list-item>
          </template>
        </a-list>
      </a-modal>
      <a-modal
        @cancel="closeExport"
        :visible="showExport"
        :title="'导出学生信息'"
        @ok="exportDataToExcel"
        width="50%"
      >
        <div>
          <h2>字段选择</h2>
          <div style="margin-bottom: 20px">
            <div :style="{ borderBottom: '1px solid #E9E9E9' }">
              <a-checkbox
                :indeterminate="indeterminate"
                :checked="checkAllKey"
                @change="onCheckAllChange"
              >
                全选
              </a-checkbox>
            </div>
            <br />
            <a-checkbox-group
              v-model:value="exportList"
              :options="plainOptions"
              @change="onChange"
            />
          </div>
          <h2>导出选项</h2>
          <a-radio-group v-model:value="exportOption" @change="onExportChange">
            <a-radio :value="'current'">导出当前页</a-radio>
            <a-radio :value="'all'">全量导出</a-radio>
          </a-radio-group>
        </div>
        <template #footer>
          <a-button @click="closeExport">取消</a-button>
          <a-button
            type="primary"
            :loading="exporting"
            @click="exportDataToExcel"
          >
            导出
          </a-button>
        </template>
      </a-modal>
    </div>
  </a-spin>
</template>

<script>
  import { mapActions } from 'vuex'
  import { listParameters } from './static/list-parameters.js'
  import EditStudent from './components/edit-student'
  import { message } from 'ant-design-vue'
  import { downloadContract } from '@/api/contract'
  import { exportJsonToExcel } from '../../utils/Export2Excel'
  import store from '@/store'
  export default {
    name: 'StudentList',
    components: { EditStudent },
    props: ['filters', 'specialCall'],
    data() {
      return {
        listColumns: listParameters.listColumns,
        allList: listParameters.allList,
        applyDegreeMap: listParameters.applyDegreeMap,
        productLevelMap: listParameters.productLevelMap,
        addableList: [],
        pagination: {
          total: 0,
          current: 1,
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          pageSizeOptions: ['10', '20', '50', '100'],
          showTotal: (total) => `共${total}条`
        },
        studentListJson: null,
        listPara: {
          pageNum: 1,
          pageSize: 10,
          admissionYear: '',
          applyMainCountry: '',
          applyMajor: '',
          productLevel: '',
          studentName: '',
          applyEducation: ''
        },
        studentInfo: null,
        showEditStudentModal: false,
        spinning: false,
        exportList: ['studentName', 'applyMajor', 'applyMainCountry'],
        plainOptions: [],
        indeterminate: true,
        checkAllKey: false,
        showExport: false,
        exporting: false,
        exportOption: 'current',
        role: null,
        contractFileList: [],
        download: false,
        loading: false
      }
    },
    watch: {
      filters: {
        handler(newVal) {
          this.getStudentListFuc(1, 10, '', newVal)
        },
        deep: true,
        immediate: true
      },
      specialCall: {
        handler(newVal) {
          if (newVal) {
            if (newVal === 'unSchedule') {
              this.getUnScheduleStudentListFun(1, 10)
            } else if (newVal === 'unVisit') {
              this.getUnVisitStudentListFun(1, 10)
            }
          }
        },
        deep: true,
        immediate: true
      }
    },
    methods: {
      ...mapActions({
        getStudentList: 'contract/getStudentList',
        deleteStudent: 'contract/deleteStudent',
        getStudent: 'contract/getStudent',
        editStudent: 'contract/editStudent',
        addVisitedRoute: 'tagsBar/addVisitedRoute',
        getUnScheduleStudentList: 'user/getUnScheduleStudentList',
        getUnVisitStudentList: 'user/getUnVisitStudentList'
        // downloadContract: 'contract/downloadContract'
      }),
      onChange() {
        this.indeterminate =
          !!this.exportList.length &&
          this.exportList.length < this.plainOptions.length
        this.checkAllKey = this.exportList.length === this.plainOptions.length
      },
      onCheckAllChange(e) {
        let all = []
        this.plainOptions.forEach((item) => {
          all.push(item.value)
        })
        Object.assign(this, {
          exportList: e.target.checked ? all : [],
          indeterminate: false,
          checkAllKey: e.target.checked
        })
      },
      onExportChange(e) {
        this.exportOption = e.target.value
      },
      getStudentListFuc(
        pageNum = 1,
        pageSize = 10,
        studentName = '',
        filters = {}
      ) {
        this.listPara = JSON.parse(JSON.stringify(filters))
        this.listPara.pageNum = pageNum
        this.listPara.pageSize = pageSize
        this.listPara.studentName = studentName
        this.loading = true
        this.getStudentList({
          listPara: this.listPara,
          callback: (res) => {
            this.studentListJson = res.rows
            this.pagination.total = res.total
            this.loading = false
            this.$emit('changeCall')
          }
        })
      },
      getStudentFuc(studentId) {
        this.getStudent({
          studentId: studentId,
          callback: (res) => {
            this.studentInfo = res.data
            this.showEditStudentModal = true
          }
        })
      },
      getUnScheduleStudentListFun(pageNum = 1, pageSize = 10) {
        this.loading = true
        this.listPara.pageNum = pageNum
        this.listPara.pageSize = pageSize
        this.getUnScheduleStudentList({
          listPara: this.listPara,
          callback: (res) => {
            if (res.code === 200) {
              this.studentListJson = res.rows
              this.pagination.total = res.total
              this.loading = false
            }
          }
        })
      },
      getUnVisitStudentListFun(pageNum = 1, pageSize = 10) {
        this.loading = true
        this.listPara.pageNum = pageNum
        this.listPara.pageSize = pageSize
        this.getUnVisitStudentList({
          listPara: this.listPara,
          callback: (res) => {
            if (res.code === 200) {
              this.studentListJson = res.rows
              this.pagination.total = res.total
              this.loading = false
            }
          }
        })
      },
      openDownload(id, filePath) {
        if (filePath) {
          const temp = filePath.split(',')
          temp.forEach((item) => {
            let ele = {
              name: item.split('_')[0],
              file: item,
              spinning: false,
              studentId: id
            }
            this.contractFileList.push(ele)
          })
          this.download = true
        } else {
          message.error('尚未上传合同文件！')
        }
      },
      closeDownload() {
        this.contractFileList = []
        this.download = false
      },
      async downloadContractFun(fileName, index) {
        this.contractFileList[index].spinning = true
        await downloadContract(
          this.contractFileList[index].studentId,
          fileName
        ).then((res) => {
          console.log(res)
          if (!res.headers['content-disposition']) {
            message.error(`合同文件${fileName}不存在，请联系教务重新上传`)
          } else {
            let blob = res.data
            const finalFileName = decodeURI(
              res.headers['content-disposition'].split(';')[1].split('=')[1]
            )
            let downloadElement = document.createElement('a')
            let href = window.URL.createObjectURL(blob) //创建下载的链接
            downloadElement.href = href
            downloadElement.setAttribute('download', finalFileName)
            document.body.appendChild(downloadElement)
            downloadElement.click() //点击下载
            document.body.removeChild(downloadElement) //下载完成移除元素
            window.URL.revokeObjectURL(href) //释放掉blob对象
          }
        })
        this.contractFileList[index].spinning = false
      },
      checkAll() {
        this.getStudentListFuc()
        this.$emit('clear')
      },
      closeEditStudent() {
        this.studentInfo = null
        this.showEditStudentModal = false
      },
      openExport() {
        this.exportList = ['studentName', 'applyMajor', 'applyMainCountry']
        this.exportOption = 'current'
        this.showExport = true
      },
      closeExport() {
        this.showExport = false
      },
      submitStudent() {
        this.studentInfo.managerPostCodes = ['educationalManager']
        this.editStudent({
          studentInfo: this.studentInfo,
          callback: (res) => {
            if (res) {
              this.showEditStudentModal = false
              message.success('编辑成功。')
            }
          }
        })
      },
      searchStudent() {
        this.getStudentListFuc(
          this.listPara.pageNum,
          this.listPara.pageSize,
          this.listPara.studentName,
          this.filters
        )
      },
      deleteStudentFuc(studentName) {
        this.deleteStudent({
          studentIds: studentName,
          callback: () => {
            message.success('删除成功！')
            this.getStudentListFuc(this.pagination.current)
          }
        })
      },
      handleStudentListChange({ current, pageSize }) {
        this.pagination.current = current
        this.pagination.pageSize = pageSize
        if (!this.specialCall) {
          this.getStudentListFuc(
            current,
            pageSize,
            this.listPara.studentName,
            this.filters
          )
        } else if (this.specialCall === 'unSchedule') {
          this.getUnScheduleStudentListFun(1, 10)
        } else {
          this.getUnScheduleStudentListFun(1, 10)
        }
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
      handleAddModule(value) {
        const ele = this.allList.find((item) => {
          return item.title === value
        })
        this.addableList = this.addableList.filter((item) => {
          return item.title !== value
        })
        this.listColumns.splice(this.listColumns.length - 2, 0, ele)
      },
      handleDeleteModule(value) {
        this.listColumns = this.listColumns.filter((item) => {
          return item.title !== value
        })
        this.checkAddable()
      },
      onSearch() {
        this.getStudentListFuc(1, 10, this.studentName, this.filters)
      },
      checkAddable() {
        this.addableList = []
        for (var i = 0; i < this.allList.length; i++) {
          var obj = this.allList[i]
          var num = obj.key
          var flag = false
          for (var j = 0; j < this.listColumns.length; j++) {
            var aj = this.listColumns[j]
            var n = aj.key
            if (n == num) {
              flag = true
              break
            }
          }
          if (!flag) {
            this.addableList.push(obj)
          }
        }
      },
      exportDataToExcel() {
        this.exporting = true
        if (this.exportOption === 'current') {
          let list = this.studentListJson // 把要导出的数据tableData存到list
          list.forEach((item) => {
            item.productLevel = this.productLevelMap[item.productLevel]
            item.applyEducation = this.applyDegreeMap[item.applyEducation]
          })
          this.generalExport(list)
        } else {
          let listPara = JSON.parse(JSON.stringify(this.filters))
          listPara.pageNum = 1
          listPara.pageSize = this.pagination.total
          listPara.studentName = ''
          this.getStudentList({
            listPara: listPara,
            callback: (res) => {
              let list = res.rows // 把要导出的数据tableData存到list
              list.forEach((item) => {
                item.productLevel = this.productLevelMap[item.productLevel]
                item.applyEducation = this.applyDegreeMap[item.applyEducation]
              })
              this.generalExport(list)
            }
          })
        }
      },
      generalExport(exportList) {
        if (exportList.length > 0) {
          let tHeader = [] // 列头名称
          this.exportList.forEach((item) => {
            const header = this.plainOptions.filter((ele) => {
              return ele.value === item
            })[0].label
            tHeader.push(header)
          })
          const filterVal = this.exportList // 列头字段
          const data = this.formatJson(filterVal, exportList)
          exportJsonToExcel(tHeader, data, '学生信息excel') // 定义导出的excle名字
          this.exporting = false
          this.closeExport()
        } else {
          this.$Message('请先选择数据')
        }
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map((v) => filterVal.map((j) => v[j]))
      },
      goToContract(str, name) {
        this.$router.push({
          path: '/educational-info/contract-input',
          query: {
            studentName: name,
            type: str
          }
        })
      },
      goToHistory(name) {
        this.$router.push({
          path: '/course-history/course-history',
          query: {
            studentName: name
          }
        })
      },
      goToCourseInfo(name) {
        this.$router.push({
          path: '/student-form/student-form',
          query: {
            studentName: name
          }
        })
      }
    },
    mounted() {
      this.role = store.getters['acl/role'][0]
      console.log('hey', this.role)
      this.checkAddable()
      this.plainOptions.push({
        label: '姓名',
        value: 'studentName'
      })
      this.allList.forEach((item) => {
        if (
          item.title !== '电话' &&
          item.title !== '紧急联系人' &&
          item.title !== '微信号'
        ) {
          const ele = {
            label: item.title,
            value: item.key
          }
          this.plainOptions.push(ele)
        }
      })
      const studentName = this.$store.getters['contract/studentName']
      if (studentName) {
        this.getStudentListFuc()
        const filterInterval = setInterval(() => {
          if (
            this.studentListJson &&
            typeof this.studentListJson.length === 'number'
          ) {
            this.studentListJson = this.studentListJson.filter((item) => {
              return item.studentName === studentName
            })
            clearInterval(filterInterval)
          }
        }, 5)
      } else {
        this.getStudentListFuc()
      }
    },
    destoryed() {
      this.$store.commit('contract/setStudentName', null)
    }
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
  .search-area {
    text-align: right;
    margin-bottom: 20px;
  }
  .inside-btn {
    width: 120px;
    text-align: center;
  }
  .flex {
    display: grid;
    font-size: 20px;
    grid-template-columns: 1fr 1fr;
    margin-bottom: 10px;
    .right {
      text-align: right;
      i {
        cursor: pointer;
      }
    }
  }
  .contract-file-list {
    margin-bottom: 15px;
  }
</style>
