<template>
  <div class="test-container">
    <div class="info-style">
      <h2>学生基本信息</h2>
      <div class="info-input">
        <div class="section">
          <span>学生姓名：</span>
          <a-input v-model:value="studentInfo.studentName"></a-input>
        </div>
        <div class="section">
          <span>学生性别：</span>
          <a-select
            :default-value="studentInfo.gender"
            style="width: 120px"
            @change="handleGenderChange"
          >
            <a-select-option value="男">男</a-select-option>
            <a-select-option value="女">女</a-select-option>
          </a-select>
        </div>
        <div class="section">
          <span>联系方式(电话)：</span>
          <a-input v-model:value="studentInfo.contactPhone"></a-input>
        </div>
        <div class="section">
          <span>微信号：</span>
          <a-input v-model:value="studentInfo.wechatNum"></a-input>
        </div>
        <div class="section">
          <span>紧急联系人(电话)：</span>
          <a-input v-model:value="studentInfo.emrgencyContact"></a-input>
        </div>
      </div>
    </div>
    <div class="info-style">
      <h2>产品信息</h2>
      <div class="info-input">
        <div class="section">
          <span>产品类别：</span>
          <a-select
            :default-value="'请选择'"
            style="width: 120px"
            @change="handleProductTypeChange"
          >
            <a-select-option value="VIP">VIP</a-select-option>
            <a-select-option value="非VIP">非VIP</a-select-option>
          </a-select>
        </div>
        <div class="section">
          <span>产品级别：</span>
          <a-select
            :default-value="'请选择'"
            style="width: 150px"
            :disabled="!productLevelList"
            @change="handleProductLevelChange"
          >
            <a-select-option
              v-for="item in productLevelList"
              :key="item.value"
              :value="item.value"
            >
              {{ item.label }}
            </a-select-option>
          </a-select>
        </div>
        <div class="section">
          <span>申请专业：</span>
          <a-select
            :default-value="'请选择'"
            style="width: 150px"
            @change="handleApplyMajorChange"
          >
            <a-select-option
              v-for="item in applyMajorList"
              :key="item.value"
              :value="item.value"
            >
              {{ item.label }}
            </a-select-option>
          </a-select>
        </div>
        <div class="section">
          <span>申请学历：</span>
          <a-select
            :default-value="'请选择'"
            style="width: 150px"
            @change="handleApplyDegreeChange"
          >
            <a-select-option
              v-for="item in applyDegreeList"
              :key="item.value"
              :value="item.value"
            >
              {{ item.label }}
            </a-select-option>
          </a-select>
        </div>
        <div class="section">
          <span>主申国家：</span>
          <a-select
            :default-value="'请选择'"
            style="width: 150px"
            @change="handleMainCountryChange"
          >
            <a-select-option
              v-for="item in mainCountryList"
              :key="item.value"
              :value="item.value"
            >
              {{ item.label }}
            </a-select-option>
          </a-select>
        </div>
        <div class="section">
          <span>辅申国家：</span>
          <a-select
            :default-value="'请选择'"
            style="width: 150px"
            @change="handleSubCountryChange"
          >
            <a-select-option
              v-for="item in subCountryList"
              :key="item.value"
              :value="item.value"
            >
              {{ item.label }}
            </a-select-option>
          </a-select>
        </div>
        <div class="section">
          <span>入学年份：</span>
          <a-select
            :default-value="'请选择'"
            style="width: 150px"
            @change="handleEnterYearChange"
          >
            <a-select-option
              v-for="item in enterYearList"
              :key="item.value"
              :value="item.value"
            >
              {{ item.label }}
            </a-select-option>
          </a-select>
        </div>
        <div class="section">
          <span>合同签约日期：</span>
          <a-date-picker @change="contractSignChange" />
        </div>
        <div class="section">
          <span>合同截止日期：</span>
          <a-date-picker @change="contractEndChange" />
        </div>
        <div class="section">
          <span>顾问是否交接合同：</span>
          <a-radio-group
            name="radioGroup"
            :default-value="studentInfo.isContractHandover"
            @change="contractHandover"
          >
            <a-radio :value="'是'">是</a-radio>
            <a-radio :value="'否'">否</a-radio>
          </a-radio-group>
        </div>
        <div class="section">
          <span>合同附加协议：</span>
          <a-radio-group
            name="radioGroup"
            :default-value="studentInfo.additionalProtocol"
            @change="additionalProtocol"
          >
            <a-radio :value="'是'">是</a-radio>
            <a-radio :value="'否'">否</a-radio>
          </a-radio-group>
        </div>
      </div>
    </div>
    <div class="info-style">
      <h2>项目信息</h2>
      <a-button @click="addProject" type="primary" v-if="this.projectsList">
        添加项目
      </a-button>
      <div class="project-list" v-if="this.projectsList">
        <div class="list-ele" v-if="this.projectsList.productMajor.length > 0">
          <h3>作品集专业课</h3>
          <div class="list-ele-container">
            <div
              class="list-label"
              v-for="item in this.projectsList.productMajor"
              v-bind:key="item.projectKey"
            >
              {{ item.projectName }}
            </div>
          </div>
        </div>
        <div class="list-ele" v-if="this.projectsList.research.length > 0">
          <h3>教研服务</h3>
          <div class="list-ele-container">
            <div
              class="list-label"
              v-for="item in this.projectsList.research"
              v-bind:key="item.projectKey"
            >
              {{ item.projectName }}
            </div>
          </div>
        </div>
        <div class="list-ele" v-if="this.projectsList.apply.length > 0">
          <h3>申请服务</h3>
          <div class="list-ele-container">
            <div
              class="list-label"
              v-for="item in this.projectsList.apply"
              v-bind:key="item.projectKey"
            >
              {{ item.projectName }}
            </div>
          </div>
        </div>
        <div class="list-ele" v-if="this.projectsList.upgrade.length > 0">
          <h3>学员升级服务</h3>
          <div class="list-ele-container">
            <div
              class="list-label"
              v-for="item in this.projectsList.upgrade"
              v-bind:key="item.projectKey"
            >
              {{ item.projectName }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="info-style">
      <h2>服务信息</h2>
      <div class="info-input">
        <div class="section">
          <span>学员状态：</span>
          <a-select :default-value="'在读'" style="width: 150px" disabled>
            <a-select-option v-for="item in productLevelList" :key="item.value">
              {{ item.label }}
            </a-select-option>
          </a-select>
        </div>
        <div class="section">
          <span>学习校区：</span>
          <a-select
            :default-value="'请选择'"
            style="width: 150px"
            @change="handleSchoolAreaChange"
          >
            <a-select-option
              v-for="item in schoolAreaList"
              :key="item.value"
              :value="item.value"
            >
              {{ item.label }}
            </a-select-option>
          </a-select>
        </div>
      </div>
    </div>
    <div class="info-style">
      <h2>合同上传</h2>
      <div class="">
        <a-upload-dragger
          name="file"
          :multiple="true"
          :customRequest="uploadContract"
          @change="handleContractFileChange"
          accept=".pdf,.doc,.docx"
        >
          <p class="ant-upload-drag-icon">
            <a-icon type="inbox" />
          </p>
          <p class="ant-upload-text">点击或拖拽合同文件至此区域</p>
        </a-upload-dragger>
      </div>
    </div>
    <a-button type="primary" @click="submit">提交信息</a-button>
    <a-modal
      @cancel="closeAddProject"
      :visible="showAddProject"
      :title="'添加服务项目'"
      @ok="confirmAddProject"
    >
      <div style="margin-bottom: 10px">
        <label for="">服务名称：</label>
        <a-select
          :default-value="'请选择'"
          style="width: 150px"
          @change="handleServiceChange"
        >
          <a-select-option
            v-for="item in serviceList"
            :key="item.value"
            :value="item.value"
          >
            {{ item.label }}
          </a-select-option>
        </a-select>
      </div>
      <div>
        <label for="">项目名称：</label>
        <a-input v-model:value="tempProjectName"></a-input>
      </div>
    </a-modal>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import { inputInformation } from './static/inputInformation.js'

  let transferPinYin = require('js-pinyin')
  export default {
    name: 'ContractInput',
    data() {
      return {
        studentInfo: {
          studentName: null, // 学生姓名
          gender: '男', // 性别
          contactPhone: null, //联系电话
          wechatNum: null, // 微信号
          emrgencyContact: null, // 紧急联系人
          productType: null, // 产品类别
          productLevel: null, // 产品级别
          applyMajor: null, // 申请专业
          applyDegree: null, // 申请学历
          mainCountry: null, // 主申国家
          subCountry: null, // 辅申国家
          enterYear: null, // 入学年份
          contractSignTime: null, // 合同签约日期
          contractEndTime: null, // 合同截至日期
          isContractHandover: '是', // 是否交接合同
          additionalProtocol: '是', // 补充协议
          studentStatus: '在读', // 学生状态
          schoolArea: null, // 学习校区
          contractFilepath: null,
        },
        productLevelList: null,
        applyMajorList: inputInformation.applyMajorList,
        applyDegreeList: inputInformation.applyDegreeList,
        mainCountryList: inputInformation.mainCountryList,
        subCountryList: inputInformation.subCountryList,
        schoolAreaList: inputInformation.schoolAreaList,
        serviceList: inputInformation.serviceList,
        enterYearList: [],
        projectsList: null,
        tempProjectName: null,
        showAddProject: false,
        projectSection: '',
      }
    },
    methods: {
      ...mapActions({
        addStudent: 'contract/addStudent',
        uploadFile: 'contract/uploadFile',
      }),
      handleGenderChange(value) {
        this.studentInfo.gender = value
      },
      handleProductTypeChange(value) {
        this.studentInfo.productLevel = null
        this.studentInfo.productType = value
        if (value === 'VIP') {
          this.productLevelList = inputInformation.productLevelListVIP
        } else {
          this.productLevelList = inputInformation.productLevelListNoVIP
        }
      },
      handleProductLevelChange(value) {
        this.studentInfo.productLevel = value
        switch (value) {
          case '单作品集':
            this.projectsList = inputInformation.projectCombo.singleModule
            break
          case 'VIP1点校':
            this.projectsList = inputInformation.projectCombo.vipOne
            break
          case 'TOP3':
            this.projectsList = inputInformation.projectCombo.vipTopThree
            break
          case 'TOP5':
            this.projectsList = inputInformation.projectCombo.vipTopFive
            break
          case 'TOP8':
            this.projectsList = inputInformation.projectCombo.vipTopEight
            break
        }
      },
      handleApplyMajorChange(value) {
        this.studentInfo.applyMajor = value
      },
      handleApplyDegreeChange(value) {
        this.studentInfo.applyDegree = value
      },
      handleMainCountryChange(value) {
        this.studentInfo.mainCountry = value
      },
      handleSubCountryChange(value) {
        this.studentInfo.subCountry = value
      },
      handleEnterYearChange(value) {
        this.studentInfo.enterYear = value
      },
      handleSchoolAreaChange(value) {
        this.studentInfo.schoolArea = value
      },
      handleServiceChange(value) {
        this.projectSection = value
      },
      contractSignChange(date, dateString) {
        this.studentInfo.contractSignTime = dateString
      },
      contractEndChange(date, dateString) {
        this.studentInfo.contractEndTime = dateString
      },
      contractHandover(e) {
        this.studentInfo.isContractHandover = e.target.value
      },
      additionalProtocol(e) {
        this.studentInfo.additionalProtocol = e.target.value
      },
      handleContractFileChange(e) {
        console.log(e)
      },
      addProject() {
        this.showAddProject = true
      },
      closeAddProject() {
        this.projectSection = null
        this.tempProjectName = null
        this.showAddProject = false
      },
      confirmAddProject() {
        if (!this.tempProjectName || !this.projectSection) {
          this.$message.error('请完善项目信息')
        } else {
          let tempProject = {
            projectKey: transferPinYin.getFullChars(this.tempProjectName),
            projectName: this.tempProjectName,
            projectTeacherId: null,
            projectTeacherChinesename: null,
            projectPredictCost: '',
            projectPeriod: null,
            status: 0,
            type: this.projectSection,
          }
          switch (this.projectSection) {
            case 'projectMajor':
              this.projectsList.projectMajor.push(tempProject)
              break
            case 'research':
              this.projectsList.research.push(tempProject)
              break
            case 'apply':
              this.projectsList.apply.push(tempProject)
              break
            case 'upgrade':
              this.projectsList.upgrade.push(tempProject)
              break
          }
          this.showAddProject = false
        }
      },
      uploadContract(data) {
        const formData = new FormData()
        formData.append('file', data.file)
        this.saveFile(formData)
      },
      saveFile(formData) {
        this.uploadFile({
          data: formData,
          callback: (res) => {
            this.studentInfo.contractFilepath = res.data
            this.$message.success('合同文件上传成功！')
          },
        })
      },
      submit() {
        let nullEles = []
        let nullNames = []
        for (let key in this.studentInfo) {
          if (!this.studentInfo[key]) {
            nullEles.push(key)
          }
        }
        if (nullEles.length > 0) {
          const parameterMap = inputInformation.parameterMap
          parameterMap.forEach((item) => {
            for (let i = 0; i < nullEles.length; i++) {
              if (nullEles[i] === item.key) {
                nullNames.push(item.label)
              }
            }
          })
          alert(nullNames.join('，') + ', 以上信息不能为空。')
        } else {
          let para = {
            studentName: this.studentInfo.studentName,
            sex: this.studentInfo.gender,
            contact: this.studentInfo.contactPhone,
            wchart: this.studentInfo.wechatNum,
            urgentContact: this.studentInfo.emrgencyContact,
            productType: this.studentInfo.productType,
            productLevel: this.studentInfo.productLevel,
            applyMajor: this.studentInfo.applyMajor,
            applyEducation: this.studentInfo.applyDegree,
            applyMainCountry: this.studentInfo.mainCountry,
            applyBakCountry: this.studentInfo.subCountry,
            admissionYear: this.studentInfo.enterYear,
            contractSignDate: this.studentInfo.contractSignTime,
            contractEndDate: this.studentInfo.contractEndTime,
            advisorJoinContract: this.studentInfo.isContractHandover,
            contractAdditionalAgreement: this.studentInfo.additionalProtocol,
            deptId: this.studentInfo.schoolArea,
            status: this.studentInfo.studentStatus,
            projects: this.projectsList,
            contractFilepath: this.studentInfo.contractFilepath,
          }
          this.addStudent({
            data: para,
            callback: (res) => {
              if (res) {
                this.$message.success('合同信息录入成功！')
              } else {
                this.$message.error('添加失败，请稍后重试。')
              }
            },
          })
        }
      },
    },
    mounted() {
      const date = new Date()
      const year = date.getFullYear()
      for (let i = 1; i < 4; i++) {
        let ele = {
          label: year + i + ' Fall',
          value: year + i + ' Fall',
        }
        this.enterYearList.push(ele)
      }
    },
  }
</script>
<style lang="less" scoped>
  .top-container {
    height: 150px;
  }
  h3 {
    font-weight: bold;
  }
  .section {
    margin: 10px 0;
  }
  .info-style {
    box-shadow: 7px 5px 10px 5px lightgray;
    padding: 20px;
    margin: 20px 0;
  }
  .info-input {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  .ant-input {
    display: inline !important;
    width: 50% !important;
  }
  .list-ele {
    margin: 10px auto;
    .ant-btn {
      width: 120px !important;
    }
  }
  .list-ele-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  .list-label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
