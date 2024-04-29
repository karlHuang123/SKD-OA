<template>
  <div class="test-container">
    <div class="search-bar">
      <span>查询学生信息：</span>
      <a-input-search
        placeholder="请输入学生名"
        style="width: 200px; margin-right: 10px"
        @search="searchStudent"
        v-model:value="searchName"
      ></a-input-search>
      <a-button type="primary" @click="reset">重置</a-button>
      <span
        class="ml-20"
        v-if="role === 'admin' || role === 'educationalManager'"
      >
        必填限制：
      </span>
      <a-switch
        v-if="role === 'educationalManager'"
        v-model:checked="openList[campusIndex].saveLimit"
        @change="saveOpenLimit"
        checked-children="开"
        un-checked-children="关"
      />
      <a-button
        v-if="role === 'admin'"
        type="primary"
        @click="() => (showAddLimit = true)"
      >
        校区列表
      </a-button>
    </div>
    <div class="info-style">
      <h2>学生基本信息</h2>
      <div class="info-input">
        <div class="section">
          <span>学生姓名：</span>
          <a-input
            v-model:value="studentInfo.studentName"
            :disabled="viewType === 'readOnly'"
          ></a-input>
        </div>
        <div class="section">
          <span>学生性别：</span>
          <a-select
            v-model:value="studentInfo.gender"
            style="width: 120px"
            @change="handleGenderChange"
            :disabled="viewType === 'readOnly'"
          >
            <a-select-option value="男">男</a-select-option>
            <a-select-option value="女">女</a-select-option>
          </a-select>
        </div>
        <div class="section">
          <span>联系方式(电话)：</span>
          <a-input
            v-model:value="studentInfo.contactPhone"
            :disabled="viewType === 'readOnly'"
          ></a-input>
        </div>
        <div class="section">
          <span>微信号：</span>
          <a-input
            v-model:value="studentInfo.wechatNum"
            :disabled="viewType === 'readOnly'"
          ></a-input>
        </div>
        <div class="section">
          <span>紧急联系人(电话)：</span>
          <a-input
            v-model:value="studentInfo.emrgencyContact"
            :disabled="viewType === 'readOnly'"
          ></a-input>
        </div>
        <div class="section">
          <span>在读学校：</span>
          <a-input
            v-model:value="studentInfo.studySchool"
            :disabled="viewType === 'readOnly'"
          ></a-input>
        </div>
      </div>
    </div>
    <div class="info-style">
      <h2>产品信息</h2>
      <div class="info-input">
        <div class="section">
          <span>申请专业：</span>
          <a-select
            :default-value="'请选择'"
            v-model:value="studentInfo.applyMajor"
            style="width: 150px"
            @change="handleApplyMajorChange"
            :disabled="viewType === 'readOnly'"
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
          <span>主申国家：</span>
          <a-select
            :default-value="'请选择'"
            style="width: 150px"
            v-model:value="studentInfo.mainCountry"
            @change="handleMainCountryChange"
            :disabled="viewType === 'readOnly'"
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
            v-model:value="studentInfo.subCountry"
            @change="handleSubCountryChange"
            :disabled="viewType === 'readOnly'"
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
            v-model:value="studentInfo.enterYear"
            @change="handleEnterYearChange"
            :disabled="viewType === 'readOnly'"
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
          <span>产品类型：</span>
          <a-select
            :default-value="'请选择'"
            style="width: 200px"
            @change="handleApplyDegreeChange"
            :disabled="viewType === 'readOnly' || disableMainCountry"
            v-model:value="studentInfo.applyDegree"
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
        <!-- <div class="section">
          <span>产品类别：</span>
          <a-select
            :default-value="'请选择'"
            style="width: 120px"
            @change="handleProductTypeChange"
          >
            <a-select-option value="VIP">VIP</a-select-option>
            <a-select-option value="非VIP">非VIP</a-select-option>
          </a-select>
        </div> -->
        <div class="section">
          <span>产品级别：</span>
          <a-select
            :default-value="'请选择'"
            style="width: 150px"
            v-model:value="studentInfo.productLevel"
            :disabled="
              studentInfo.applyDegree === '请选择' ||
              studentInfo.productLevel === 'NotVipFlexibleCombo' ||
              studentInfo.productLevel === 'NotVipCombo' ||
              viewType === 'readOnly'
            "
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
          <span class="hint">注：变更级别后请确认服务内容</span>
        </div>
        <div class="section">
          <span>合同签约日期：</span>
          <a-date-picker
            @change="contractSignChange"
            v-model:value="studentInfo.contractSignTime"
            :disabled="viewType === 'readOnly'"
          />
        </div>
        <div class="section">
          <span>合同截止日期：</span>
          <a-date-picker
            @change="contractEndChange"
            v-model:value="studentInfo.contractEndTime"
            :disabled="viewType === 'readOnly'"
          />
        </div>
        <div class="section">
          <span>顾问是否交接合同：</span>
          <a-radio-group
            name="radioGroup"
            v-model:value="studentInfo.isContractHandover"
            @change="contractHandover"
            :disabled="viewType === 'readOnly'"
          >
            <a-radio :value="'是'">是</a-radio>
            <a-radio :value="'否'">否</a-radio>
          </a-radio-group>
        </div>
        <div class="section">
          <span>合同附加协议：</span>
          <a-radio-group
            name="radioGroup"
            v-model:value="studentInfo.additionalProtocol"
            @change="additionalProtocol"
            :disabled="viewType === 'readOnly'"
          >
            <a-radio :value="'是'">是</a-radio>
            <a-radio :value="'否'">否</a-radio>
          </a-radio-group>
        </div>
        <div class="section"></div>
        <div class="section flex">
          <span>合同附加协议说明：</span>
          <a-textarea
            style="width: 95%"
            v-model:value="studentInfo.contractComment"
            :disabled="
              viewType === 'readOnly' || studentInfo.additionalProtocol === '否'
            "
            :rows="2"
          ></a-textarea>
        </div>
      </div>
    </div>
    <div class="info-style">
      <h2>项目信息</h2>
      <a-button
        @click="addProject"
        type="primary"
        v-if="this.projectsList"
        :disabled="viewType === 'readOnly'"
      >
        添加项目
      </a-button>
      <div class="project-list" v-if="this.projectsList">
        <div
          class="list-ele"
          v-if="this.projectsList.basicCourse.length > 0"
          :disabled="viewType === 'readOnly'"
        >
          <h2>基础课</h2>
          <div class="list-ele-container">
            <div
              class="list-label"
              v-for="item in this.projectsList.basicCourse"
              v-bind:key="item.projectKey"
            >
              <div class="flex">
                {{ item.projectName }}
                <i
                  @click="deleteProject('basicCourse', item)"
                  class="ri-close-line close-icon"
                ></i>
              </div>
              <span v-if="viewType === 'edit' || viewType === 'readOnly'">
                项目状态：
              </span>
              <a-select
                :default-value="'未完成'"
                style="width: 90px"
                v-model:value="item.status"
                v-if="viewType === 'edit' || viewType === 'readOnly'"
                :disabled="viewType === 'readOnly'"
              >
                <a-select-option value="0">未完成</a-select-option>
                <a-select-option value="1">已完成</a-select-option>
              </a-select>
              <strong class="ml-20" v-if="item.projectTeacherChinesename">
                授课老师：{{ item.projectTeacherChinesename }}
              </strong>
              <div
                class="course-info"
                v-if="viewType === 'edit' || viewType === 'readOnly'"
              >
                <span>安排课时：</span>
                <a-input-number
                  :disabled="viewType === 'readOnly'"
                  style="width: 72px"
                  v-model:value="item.projectPeriod"
                ></a-input-number>
                <span class="ml-5">实际课时：</span>
                <a-input-number
                  :disabled="viewType === 'readOnly'"
                  style="width: 72px"
                  v-model:value="item.projectPredictionCost"
                ></a-input-number>
              </div>
            </div>
          </div>
        </div>
        <div
          class="list-ele"
          v-if="this.projectsList.professionalCourse.length > 0"
        >
          <h2>专业课</h2>
          <div class="list-ele-container">
            <div
              class="list-label"
              v-for="item in this.projectsList.professionalCourse"
              v-bind:key="item.projectKey"
            >
              <div class="flex">
                {{ item.projectName }}
                <i
                  class="ri-close-line close-icon"
                  @click="deleteProject('professionalCourse', item)"
                ></i>
              </div>
              <span v-if="viewType === 'edit' || viewType === 'readOnly'">
                项目状态：
              </span>
              <a-select
                :default-value="'未完成'"
                style="width: 90px"
                v-model:value="item.status"
                :disabled="viewType === 'readOnly'"
                v-if="viewType === 'edit' || viewType === 'readOnly'"
              >
                <a-select-option value="0">未完成</a-select-option>
                <a-select-option value="1">已完成</a-select-option>
              </a-select>
              <strong class="ml-20" v-if="item.projectTeacherChinesename">
                授课老师：{{ item.projectTeacherChinesename }}
              </strong>
              <div
                class="course-info"
                v-if="viewType === 'edit' || viewType === 'readOnly'"
              >
                <span>安排课时：</span>
                <a-input-number
                  :disabled="viewType === 'readOnly'"
                  style="width: 72px"
                  v-model:value="item.projectPeriod"
                ></a-input-number>
                <span class="ml-5">实际课时：</span>
                <a-input-number
                  :disabled="viewType === 'readOnly'"
                  style="width: 72px"
                  v-model:value="item.projectPredictionCost"
                ></a-input-number>
              </div>
            </div>
          </div>
        </div>
        <div class="list-ele" v-if="this.projectsList.subjectCamp.length > 0">
          <h2>跨学科营地</h2>
          <div class="list-ele-container">
            <div
              class="list-label"
              v-for="item in this.projectsList.subjectCamp"
              v-bind:key="item.projectKey"
            >
              <div class="flex">
                {{ item.projectName }}
                <i
                  @click="deleteProject('subjectCamp', item)"
                  class="ri-close-line close-icon"
                ></i>
              </div>
              <span v-if="viewType === 'edit' || viewType === 'readOnly'">
                项目状态：
              </span>
              <a-select
                :default-value="'未完成'"
                style="width: 90px"
                v-model:value="item.status"
                :disabled="viewType === 'readOnly'"
                v-if="viewType === 'edit' || viewType === 'readOnly'"
              >
                <a-select-option value="0">未完成</a-select-option>
                <a-select-option value="1">已完成</a-select-option>
              </a-select>
              <strong class="ml-20" v-if="item.projectTeacherChinesename">
                授课老师：{{ item.projectTeacherChinesename }}
              </strong>
              <div
                class="course-info"
                v-if="viewType === 'edit' || viewType === 'readOnly'"
              >
                <span>安排课时：</span>
                <a-input-number
                  :disabled="viewType === 'readOnly'"
                  style="width: 72px"
                  v-model:value="item.projectPeriod"
                ></a-input-number>
                <span class="ml-5">实际课时：</span>
                <a-input-number
                  :disabled="viewType === 'readOnly'"
                  style="width: 72px"
                  v-model:value="item.projectPredictionCost"
                ></a-input-number>
              </div>
            </div>
          </div>
        </div>
        <div class="list-ele" v-if="this.projectsList.overseaMentor.length > 0">
          <h2>海外名师授课</h2>
          <div class="list-ele-container">
            <div
              class="list-label"
              v-for="item in this.projectsList.overseaMentor"
              v-bind:key="item.projectKey"
            >
              <div class="flex">
                {{ item.projectName }}
                <i
                  @click="deleteProject('overseaMentor', item)"
                  class="ri-close-line close-icon"
                ></i>
              </div>
              <span v-if="viewType === 'edit' || viewType === 'readOnly'">
                项目状态：
              </span>
              <a-select
                :default-value="'未完成'"
                style="width: 90px"
                v-model:value="item.status"
                :disabled="viewType === 'readOnly'"
                v-if="viewType === 'edit' || viewType === 'readOnly'"
              >
                <a-select-option value="0">未完成</a-select-option>
                <a-select-option value="1">已完成</a-select-option>
              </a-select>
              <strong class="ml-20" v-if="item.projectTeacherChinesename">
                授课老师：{{ item.projectTeacherChinesename }}
              </strong>
              <div
                class="course-info"
                v-if="viewType === 'edit' || viewType === 'readOnly'"
              >
                <span>安排课时：</span>
                <a-input-number
                  :disabled="viewType === 'readOnly'"
                  style="width: 72px"
                  v-model:value="item.projectPeriod"
                ></a-input-number>
                <span class="ml-5">实际课时：</span>
                <a-input-number
                  :disabled="viewType === 'readOnly'"
                  style="width: 72px"
                  v-model:value="item.projectPredictionCost"
                ></a-input-number>
              </div>
            </div>
          </div>
        </div>
        <div
          class="list-ele"
          v-if="this.projectsList.additionalService.length > 0"
        >
          <h2>教学教研增值服务</h2>
          <div class="list-ele-container">
            <div
              class="list-label"
              v-for="item in this.projectsList.additionalService"
              v-bind:key="item.projectKey"
            >
              <div class="flex">
                {{ item.projectName }}
                <i
                  @click="deleteProject('additionalService', item)"
                  class="ri-close-line close-icon"
                ></i>
              </div>
              <span v-if="viewType === 'edit' || viewType === 'readOnly'">
                项目状态：
              </span>
              <a-select
                :default-value="'未完成'"
                style="width: 90px"
                v-model:value="item.status"
                :disabled="viewType === 'readOnly'"
                v-if="viewType === 'edit' || viewType === 'readOnly'"
              >
                <a-select-option value="0">未完成</a-select-option>
                <a-select-option value="1">已完成</a-select-option>
              </a-select>
              <strong class="ml-20" v-if="item.projectTeacherChinesename">
                授课老师：{{ item.projectTeacherChinesename }}
              </strong>
              <div
                class="course-info"
                v-if="viewType === 'edit' || viewType === 'readOnly'"
              >
                <span>安排课时：</span>
                <a-input-number
                  :disabled="viewType === 'readOnly'"
                  style="width: 72px"
                  v-model:value="item.projectPeriod"
                ></a-input-number>
                <span class="ml-5">实际课时：</span>
                <a-input-number
                  :disabled="viewType === 'readOnly'"
                  style="width: 72px"
                  v-model:value="item.projectPredictionCost"
                ></a-input-number>
              </div>
            </div>
          </div>
        </div>
        <div class="list-ele" v-if="this.projectsList.applyService.length > 0">
          <h2>后期申请增值服务</h2>
          <div class="list-ele-container">
            <div
              class="list-label"
              v-for="item in this.projectsList.applyService"
              v-bind:key="item.projectKey"
            >
              <div class="flex">
                {{ item.projectName }}
                <i
                  @click="deleteProject('applyService', item)"
                  class="ri-close-line close-icon"
                ></i>
              </div>
              <span v-if="viewType === 'edit' || viewType === 'readOnly'">
                项目状态：
              </span>
              <a-select
                :default-value="'未完成'"
                style="width: 90px"
                v-model:value="item.status"
                :disabled="viewType === 'readOnly'"
                v-if="viewType === 'edit' || viewType === 'readOnly'"
              >
                <a-select-option value="0">未完成</a-select-option>
                <a-select-option value="1">已完成</a-select-option>
              </a-select>
              <strong class="ml-20" v-if="item.projectTeacherChinesename">
                授课老师：{{ item.projectTeacherChinesename }}
              </strong>
              <div
                class="course-info"
                v-if="viewType === 'edit' || viewType === 'readOnly'"
              >
                <span>安排课时：</span>
                <a-input-number
                  :disabled="viewType === 'readOnly'"
                  style="width: 72px"
                  v-model:value="item.projectPeriod"
                ></a-input-number>
                <span class="ml-5">实际课时：</span>
                <a-input-number
                  :disabled="viewType === 'readOnly'"
                  style="width: 72px"
                  v-model:value="item.projectPredictionCost"
                ></a-input-number>
              </div>
            </div>
          </div>
        </div>
        <div
          class="list-ele"
          v-if="this.projectsList.backgroundUpgrade.length > 0"
        >
          <h2>学术背景提升服务</h2>
          <div class="list-ele-container">
            <div
              class="list-label"
              v-for="item in this.projectsList.backgroundUpgrade"
              v-bind:key="item.projectKey"
            >
              <div class="flex">
                {{ item.projectName }}
                <i
                  @click="deleteProject('backgroundUpgrade', item)"
                  class="ri-close-line close-icon"
                ></i>
              </div>
              <span v-if="viewType === 'edit' || viewType === 'readOnly'">
                项目状态：
              </span>
              <a-select
                :default-value="'未完成'"
                style="width: 90px"
                v-model:value="item.status"
                :disabled="viewType === 'readOnly'"
                v-if="viewType === 'edit' || viewType === 'readOnly'"
              >
                <a-select-option value="0">未完成</a-select-option>
                <a-select-option value="1">已完成</a-select-option>
              </a-select>
              <strong class="ml-20" v-if="item.projectTeacherChinesename">
                授课老师：{{ item.projectTeacherChinesename }}
              </strong>
              <div
                class="course-info"
                v-if="viewType === 'edit' || viewType === 'readOnly'"
              >
                <span>安排课时：</span>
                <a-input-number
                  :disabled="viewType === 'readOnly'"
                  style="width: 72px"
                  v-model:value="item.projectPeriod"
                ></a-input-number>
                <span class="ml-5">实际课时：</span>
                <a-input-number
                  :disabled="viewType === 'readOnly'"
                  style="width: 72px"
                  v-model:value="item.projectPredictionCost"
                ></a-input-number>
              </div>
            </div>
          </div>
        </div>
        <div
          class="list-ele"
          v-if="
            this.projectsList.OneOnOne && this.projectsList.OneOnOne.length > 0
          "
        >
          <h2>一对一服务</h2>
          <div class="list-ele-container">
            <div
              class="list-label"
              v-for="item in this.projectsList.OneOnOne"
              v-bind:key="item.projectKey"
            >
              <div class="flex">
                {{ item.projectName }}
                <i
                  @click="deleteProject('OneOnOne', item)"
                  class="ri-close-line close-icon"
                ></i>
              </div>
              <span v-if="viewType === 'edit' || viewType === 'readOnly'">
                项目状态：
              </span>
              <a-select
                :default-value="'未完成'"
                style="width: 90px"
                v-model:value="item.status"
                :disabled="viewType === 'readOnly'"
                v-if="viewType === 'edit' || viewType === 'readOnly'"
              >
                <a-select-option value="0">未完成</a-select-option>
                <a-select-option value="1">已完成</a-select-option>
              </a-select>
              <strong class="ml-20" v-if="item.projectTeacherChinesename">
                授课老师：{{ item.projectTeacherChinesename }}
              </strong>
              <div
                class="course-info"
                v-if="viewType === 'edit' || viewType === 'readOnly'"
              >
                <span>安排课时：</span>
                <a-input-number
                  :disabled="viewType === 'readOnly'"
                  style="width: 72px"
                  v-model:value="item.projectPeriod"
                ></a-input-number>
                <span class="ml-5">实际课时：</span>
                <a-input-number
                  :disabled="viewType === 'readOnly'"
                  style="width: 72px"
                  v-model:value="item.projectPredictionCost"
                ></a-input-number>
              </div>
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
          <a-select
            :default-value="'在读'"
            style="width: 150px"
            v-model:value="studentInfo.studentStatus"
            :disabled="!this.tempStudentId || viewType === 'readOnly'"
          >
            <a-select-option
              v-for="item in studentStatus"
              :key="item.value"
              @change="handleStatusChange"
            >
              {{ item.label }}
            </a-select-option>
          </a-select>
        </div>
        <div class="section">
          <span>学习校区：</span>
          <a-select
            :default-value="'请选择'"
            style="width: 150px"
            v-model:value="studentInfo.schoolArea"
            @change="handleSchoolAreaChange"
            :disabled="viewType === 'readOnly'"
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
        <div class="section">
          <span>负责顾问：</span>
          <a-input
            v-model:value="studentInfo.consultantName"
            style="width: 150px !important"
            :disabled="viewType === 'readOnly'"
          ></a-input>
        </div>
        <div class="section" v-if="studentInfo.studentName">
          <span>负责教务：</span>
          <a-input
            v-model:value="studentInfo.createBy"
            style="width: 150px !important"
            :disabled="viewType === 'readOnly'"
          ></a-input>
        </div>
        <div class="section">
          <span>负责文案：</span>
          <a-input
            v-model:value="studentInfo.managerAbstract"
            style="width: 150px !important"
            :disabled="viewType === 'readOnly'"
          ></a-input>
        </div>
      </div>
    </div>
    <div class="info-style">
      <h2>合同上传</h2>
      <div class="" style="width: 650px">
        <a-upload-dragger
          :disabled="viewType === 'readOnly' || uploading"
          name="file"
          :multiple="false"
          :fileList="fileList"
          :customRequest="uploadContract"
          @change="handleContractFileChange"
          :remove="handleRemove"
          :beforeUpload="checkFileSize"
          accept=".pdf,.doc,.docx"
        >
          <p class="ant-upload-drag-icon">
            <a-icon type="inbox" />
          </p>
          <p class="ant-upload-text">点击或拖拽合同文件至此区域</p>
        </a-upload-dragger>
      </div>
    </div>
    <a-button
      type="primary"
      v-if="
        role === 'admin' ||
        role === 'educationalManager' ||
        role === 'educationalTeacher'
      "
      @click="submit"
    >
      提交信息
    </a-button>
    <!-- <a-button type="primary" @click="batchSubmit">批量提交</a-button> -->
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
    <a-modal
      @cancel="closeAddLimit"
      :visible="showAddLimit"
      :title="'校区填写限制列表'"
      @ok="confirmAddLimit"
    >
      <div style="margin-bottom: 10px">
        <campus-card
          :openList="openList"
          @changeSaveLimit="handleChangeLimit"
        ></campus-card>
      </div>
    </a-modal>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import { message } from 'ant-design-vue'
  import { inputInformation } from './static/inputInformation.js'
  import moment from 'moment'
  import store from '@/store'
  import CampusCard from './components/campusCard.vue'
  import { deleteContract } from '@/api/contract'

  let transferPinYin = require('js-pinyin')
  const oldData = require('./static/oldVersion.json')
  export default {
    name: 'ContractInput',
    components: { CampusCard },
    data() {
      return {
        studentInfo: {
          studentName: null, // 学生姓名
          gender: '男', // 性别
          contactPhone: null, //联系电话
          wechatNum: null, // 微信号
          emrgencyContact: null, // 紧急联系人
          productLevel: '请选择', // 产品级别
          applyDegree: '请选择', // 产品类型
          applyMajor: '请选择',
          mainCountry: '请选择', // 主申国家
          subCountry: '请选择', // 辅申国家
          enterYear: '请选择', // 入学年份
          contractSignTime: null, // 合同签约日期
          contractEndTime: null, // 合同截至日期
          isContractHandover: '是', // 是否交接合同
          additionalProtocol: '是', // 补充协议
          contractComment: '', // 补充协议备注
          studentStatus: '在读', // 学生状态
          schoolArea: '请选择', // 学习校区
          contractFilepath: '',
          consultantName: '', // 顾问名
          createBy: '', // 教务名
          managerAbstract: '', // 文案名
          studySchool: null // 在读学校
        },
        searchName: '',
        productLevelList: null,
        applyDegreeList: inputInformation.applyDegreeList,
        applyMajorList: inputInformation.applyMajorList,
        mainCountryList: inputInformation.mainCountryList,
        subCountryList: inputInformation.subCountryList,
        schoolAreaList: inputInformation.schoolAreaList,
        serviceList: inputInformation.serviceList,
        studentStatus: inputInformation.studentStatus,
        enterYearList: [],
        projectsList: null,
        tempProjectName: null,
        showAddProject: false,
        showAddLimit: false,
        projectSection: '',
        fileList: [],
        tempStudentId: null,
        textData: null,
        viewType: 'edit',
        role: null,
        userParentId: null,
        uploading: false,
        campusIndex: 0, // 开放校区角标
        openList: null, // 开放校区列表
        disableMainCountry: false,
        tempDelete: [], // 临时删除列表
        noComboCountry: [
          '澳洲',
          '德国',
          '加拿大',
          '韩国',
          '马来西亚',
          '新加坡',
          '中国澳门',
          '中国香港',
          '中国大陆',
          '荷兰',
          '芬兰',
          '丹麦',
          '北欧',
          '新西兰'
        ] // 暂无产品级别国家
      }
    },
    methods: {
      ...mapActions({
        getStaff: 'position/getStaff',
        addStudent: 'contract/addStudent',
        editStudent: 'contract/editStudent',
        uploadFile: 'contract/uploadFile',
        getStudentByName: 'contract/getStudentByName',
        batchAddStudent: 'contract/batchAddStudent',
        deleteStudent: 'contract/deleteStudent',
        updateRefundStatus: 'contract/updateRefundStatus',
        updateGraduateStatus: 'contract/updateGraduateStatus',
        updateStudyStatus: 'contract/updateStudyStatus',
        addSaveLimits: 'contract/addSaveLimits',
        getSaveLimits: 'contract/getSaveLimits'
      }),
      handleGenderChange(value) {
        this.studentInfo.gender = value
      },
      // handleProductTypeChange(value) {
      //   this.studentInfo.productLevel = null
      //   this.studentInfo.productType = value
      //   if (value === 'VIP') {
      //     this.productLevelList = inputInformation.productLevelListVIP
      //   } else {
      //     this.productLevelList = inputInformation.productLevelListNoVIP
      //   }
      // },
      handleChangeLimit(value) {
        this.openList = value
      },
      handleProductLevelChange(value) {
        this.studentInfo.productLevel = value
        this.projectsList =
          inputInformation.projectCombo[this.studentInfo.applyDegree][
            this.studentInfo.productLevel
          ]
      },
      handleStatusChange(value) {
        this.studentInfo.studentStatus = value
      },
      deleteStudentFuc() {
        this.deleteStudent({
          studentIds: this.tempStudentId
        })
      },
      handleApplyMajorChange(value) {
        this.studentInfo.applyMajor = value
      },
      handleApplyDegreeChange(value) {
        this.studentInfo.applyDegree = value
        this.productLevelList = []
        inputInformation.productLevelListVIP.forEach((item) => {
          for (let i in inputInformation.projectCombo[
            this.studentInfo.applyDegree
          ]) {
            if (item.value === i) {
              this.productLevelList.push(item)
            }
          }
        })
        this.studentInfo.productLevel = '请选择'
        if (value === 'NotVip') {
          this.studentInfo.productLevel = 'NotVipCombo'
          this.projectsList =
            inputInformation.projectCombo[this.studentInfo.applyDegree][
              this.studentInfo.productLevel
            ]
        }
        if (value === 'NotVipFlexible') {
          this.studentInfo.productLevel = 'NotVipFlexibleCombo'
          this.projectsList =
            inputInformation.projectCombo[this.studentInfo.applyDegree][
              this.studentInfo.productLevel
            ]
        }
      },
      reset() {
        this.studentInfo = {
          studentName: null, // 学生姓名
          gender: '男', // 性别
          contactPhone: null, //联系电话
          wechatNum: null, // 微信号
          emrgencyContact: null, // 紧急联系人
          productLevel: '请选择', // 产品级别
          applyDegree: '请选择', // 产品类型
          mainCountry: '请选择', // 主申国家
          subCountry: '请选择', // 辅申国家
          enterYear: '请选择', // 入学年份
          contractSignTime: null, // 合同签约日期
          contractEndTime: null, // 合同截至日期
          isContractHandover: '是', // 是否交接合同
          additionalProtocol: '是', // 补充协议
          studentStatus: '在读', // 学生状态
          schoolArea: '请选择', // 学习校区
          contractFilepath: '',
          consultantName: '',
          createBy: '',
          managerAbstract: '',
          contractComment: '',
          studySchool: null // 在读学校
        }
        this.projectsList = null
        this.tempStudentId = null
        this.fileList = []
        this.tempDelete = []
        this.searchName = ''
        this.viewType = null
        this.$router.push({
          path: '/educational-info/contract-input'
        })
      },
      handleMainCountryChange(value) {
        this.studentInfo.mainCountry = value
        const index = this.noComboCountry.findIndex((item) => {
          return item === value
        })
        if (index !== -1) {
          const noVip = [
            '中国澳门',
            '新西兰',
            '加拿大',
            '德国',
            '意大利',
            '韩国',
            '中国香港',
            '荷兰'
          ]
          if (noVip.indexOf(value) !== -1) {
            this.disableMainCountry = false
            this.applyDegreeList = [
              {
                label: '英研常规',
                value: 'EnglandMasterRegular'
              },
              {
                label: '非VIP单作品集(多个项目)',
                value: 'NotVip'
              },
              {
                label: '非VIP单作品集(灵活组合)',
                value: 'NotVipFlexible'
              }
            ]
            this.studentInfo.applyDegree = '请选择'
            this.productLevelList = []
          } else {
            this.applyDegreeList = inputInformation.applyDegreeList
            this.studentInfo.applyDegree = 'EnglandMasterRegular'
            this.disableMainCountry = true
            this.productLevelList = []
            inputInformation.productLevelListVIP.forEach((item) => {
              for (let i in inputInformation.projectCombo[
                this.studentInfo.applyDegree
              ]) {
                if (item.value === i) {
                  this.productLevelList.push(item)
                }
              }
            })
          }
        } else {
          this.applyDegreeList = inputInformation.applyDegreeList
          this.disableMainCountry = false
          this.studentInfo.applyDegree = '请选择'
          this.productLevelList = []
        }
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
        if (value === 'OneOnOne') {
          this.tempProjectName = '课时：'
        } else {
          this.tempProjectName = ''
        }
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
        if (this.studentInfo.additionalProtocol === '否') {
          this.studentInfo.contractComment = '无'
        }
      },
      handleRemove(e) {
        message.success('删除成功。')
        this.tempDelete.push(e.name)
        console.log(this.tempDelete)
        // await deleteContract(this.tempStudentId, e.name).then((res) => {
        //   if (res.code === 200) {
        //     message.success('删除成功。')
        //   } else {
        //     message.error(res.msg)
        //   }
        // })
      },
      handleContractFileChange(e) {
        if (this.fileList.length > e.fileList.length) {
          this.fileList = e.fileList
          let temp = []
          this.fileList.forEach((item) => {
            temp.push(item.name)
          })
          this.studentInfo.contractFilepath = temp.join()
        } else {
          this.fileList = e.fileList
        }
      },
      addProject() {
        this.showAddProject = true
      },
      deleteProject(sectionName, project) {
        this.projectsList[sectionName] = this.projectsList[sectionName].filter(
          (item) => {
            return JSON.stringify(project) !== JSON.stringify(item)
          }
        )
      },
      closeAddProject() {
        this.projectSection = null
        this.tempProjectName = null
        this.showAddProject = false
      },
      confirmAddLimit() {
        this.addSaveLimits({
          data: this.openList
        })
        this.showAddLimit = false
      },
      closeAddLimit() {
        this.openList = store.getters['contract/openList']
        this.showAddLimit = false
      },
      confirmAddProject() {
        if (!this.tempProjectName || !this.projectSection) {
          message.error('请完善项目信息')
        } else {
          let tempProject = {
            projectKey: transferPinYin.getFullChars(this.tempProjectName),
            projectName: this.tempProjectName,
            projectTeacherId: null,
            projectTeacherChinesename: null,
            projectPredictCost: '',
            projectPeriod: null,
            status: 0,
            type: this.projectSection
          }
          if (this.projectSection === 'OneOnOne')
            this.projectsList.OneOnOne = []
          this.projectsList[this.projectSection].push(tempProject)
          this.showAddProject = false
        }
      },
      uploadContract(data) {
        const formData = new FormData()
        formData.append('file', data.file)
        this.saveFile(formData)
      },
      checkFileSize(file) {
        return new Promise((resolve, reject) => {
          // 使用promise不会进入upload的change事件
          const isLt10M = file.size / 1024 / 1024 < 10
          if (!isLt10M) {
            message.error('合同文件大小不能超过10M。')
            return reject(false)
          }
          return resolve(true)
        })
      },
      saveFile(formData) {
        this.uploading = true
        this.uploadFile({
          data: formData,
          callback: (res) => {
            if (this.studentInfo.contractFilepath === '') {
              this.studentInfo.contractFilepath = res.data
            } else {
              this.studentInfo.contractFilepath =
                this.studentInfo.contractFilepath + ',' + res.data
            }
            message.success('合同文件上传成功！')
            this.fileList[this.fileList.length - 1].status = 'done'
            this.uploading = false
          }
        })
      },
      searchStudent() {
        if (this.searchName) {
          this.getStudentByName({
            name: this.searchName,
            callback: (res) => {
              this.studentInfo = {
                studentName: res.data.studentName, // 学生姓名
                gender: res.data.sex, // 性别
                contactPhone: res.data.contact, //联系电话
                wechatNum: res.data.wchart, // 微信号
                emrgencyContact: res.data.urgentContact, // 紧急联系人
                productLevel: res.data.productLevel, // 产品级别
                applyDegree: res.data.applyEducation, // 产品类型
                applyMajor: res.data.applyMajor,
                mainCountry: res.data.applyMainCountry, // 主申国家
                subCountry: res.data.applyBakCountry, // 辅申国家
                enterYear: res.data.admissionYear, // 入学年份
                consultantName: res.data.consultantName, // 顾问名
                createBy: res.data.createBy,
                managerAbstract: res.data.managerAbstract,
                contractSignTime: res.data.contractSignDate
                  ? moment(res.data.contractSignDate, 'YYYY-MM-DD')
                  : null, // 合同签约日期
                contractEndTime: res.data.contractEndDate
                  ? moment(res.data.contractEndDate, 'YYYY-MM-DD') // for safari, 日期格式需要制定一下
                  : null, // 合同截至日期
                isContractHandover: res.data.advisorJoinContract, // 是否交接合同
                additionalProtocol: res.data.contractAdditionalAgreement, // 补充协议
                studentStatus: res.data.status, // 学生状态
                schoolArea: res.data.deptId, // 学习校区
                contractComment: res.data.contractComment,
                contractFilepath: res.data.contractFilepath,
                studySchool: res.data.studySchool // 在读学校
              }
              this.fileList = []
              if (this.studentInfo.contractFilepath) {
                const temp = this.studentInfo.contractFilepath.split(',')
                temp.forEach((item) => {
                  this.fileList.push({
                    name: item
                  })
                })
              }
              this.tempStudentId = res.data.studentId
              this.productLevelList = []
              inputInformation.productLevelListVIP.forEach((item) => {
                for (let i in inputInformation.projectCombo[
                  this.studentInfo.applyDegree
                ]) {
                  if (item.value === i) {
                    this.productLevelList.push(item)
                  }
                }
              })
              if (this.studentInfo.applyDegree === 'NotVip') {
                this.studentInfo.productLevel = 'NotVipCombo'
                this.projectsList =
                  inputInformation.projectCombo[this.studentInfo.applyDegree][
                    this.studentInfo.productLevel
                  ]
              }
              this.projectsList = res.data.projects
            }
          })
        } else {
          this.reset()
        }
      },
      batchSubmit() {
        this.batchAddStudent({
          data: this.textData,
          callback: (res) => {
            console.log(res)
          }
        })
      },
      getSaveLimitsFun() {
        this.getSaveLimits({
          callback: (res) => {
            this.openList = res.data
            if (this.userParentId) {
              const campus = this.schoolAreaList.filter((item) => {
                return item.value === this.userParentId
              })[0].label
              this.campusIndex = this.openList.findIndex((item) => {
                return item.deptName === campus
              })
            }
          }
        })
      },
      saveOpenLimit(value) {
        this.openList[this.campusIndex].saveLimit = value
        this.addSaveLimits({
          data: this.openList,
          callback: (res) => {
            if (res && res.code === 200) {
              const campus = this.openList[this.campusIndex].deptName
              message.success(
                this.openList[this.campusIndex].saveLimit
                  ? `${campus}学生已开启填写限制`
                  : `${campus}学生已关闭填写限制`
              )
            }
          }
        })
      },
      async submit() {
        let nullEles = []
        let nullNames = []
        for (let key in this.studentInfo) {
          if (!this.studentInfo[key] || this.studentInfo[key] === '请选择') {
            nullEles.push(key)
          }
        }
        const studentCampus = this.schoolAreaList.filter((item) => {
          return item.value === this.studentInfo.schoolArea
        })[0].label
        const isLimited = this.openList.filter((item) => {
          return item.deptName === studentCampus
        })[0].saveLimit
        if (nullEles.length > 0 && isLimited) {
          const parameterMap = inputInformation.parameterMap
          parameterMap.forEach((item) => {
            for (let i = 0; i < nullEles.length; i++) {
              if (nullEles[i] === item.key) {
                nullNames.push(item.label)
              }
            }
          })
          alert(
            (nullNames.length > 1 ? nullNames.join('，') : nullNames[0]) +
              ', 以上信息不能为空。'
          )
        } else {
          let para = {
            studentName: this.studentInfo.studentName,
            sex: this.studentInfo.gender,
            contact: this.studentInfo.contactPhone,
            wchart: this.studentInfo.wechatNum,
            urgentContact: this.studentInfo.emrgencyContact,
            productLevel: this.studentInfo.productLevel,
            applyEducation: this.studentInfo.applyDegree,
            applyMajor: this.studentInfo.applyMajor,
            applyMainCountry: this.studentInfo.mainCountry,
            applyBakCountry: this.studentInfo.subCountry,
            admissionYear: this.studentInfo.enterYear,
            contractSignDate: moment(this.studentInfo.contractSignTime).format(
              'YYYY.MM.DD'
            ),
            contractEndDate: moment(this.studentInfo.contractEndTime).format(
              'YYYY.MM.DD'
            ),
            consultantName: this.studentInfo.consultantName,
            createBy: this.studentInfo.createBy,
            managerAbstract: this.studentInfo.managerAbstract,
            advisorJoinContract: this.studentInfo.isContractHandover,
            contractAdditionalAgreement: this.studentInfo.additionalProtocol,
            deptId: this.studentInfo.schoolArea,
            status: this.studentInfo.studentStatus,
            projects: this.projectsList,
            contractFilepath: this.studentInfo.contractFilepath,
            studySchool: this.studentInfo.studySchool,
            managerPostCodes: []
          }
          if (
            para.projects.basicCourse.length !== 0 ||
            para.projects.professionalCourse.length !== 0 ||
            para.projects.subjectCamp.length !== 0 ||
            para.projects.overseaMentor.length !== 0
          )
            para.managerPostCodes.push('teacherManager')
          if (
            para.projects.additionalService.length !== 0 ||
            para.projects.applyService.length !== 0 ||
            para.projects.backgroundUpgrade.length !== 0
          )
            para.managerPostCodes.push('applyManager')
          if (this.tempStudentId) {
            para['studentId'] = this.tempStudentId
            if (this.tempDelete.length !== 0) {
              const deleteString = this.tempDelete.join(',')
              await deleteContract(this.tempStudentId, deleteString).then(
                (res) => {
                  this.tempDelete = []
                  if (res.code !== 200) {
                    message.error('删除文件出错,' + res.msg)
                  }
                }
              )
            }
            this.editStudent({
              studentInfo: para,
              callback: (res) => {
                if (res) {
                  if (this.studentInfo.studentStatus === '毕业') {
                    this.updateGraduateStatus({
                      studentId: this.tempStudentId,
                      callback: (res) => {
                        console.log(res)
                      }
                    })
                  } else if (this.studentInfo.studentStatus === '退费') {
                    this.updateRefundStatus({
                      studentId: this.tempStudentId,
                      callback: (res) => {
                        console.log(res)
                      }
                    })
                  } else if (this.studentInfo.studentStatus === '在读') {
                    this.updateStudyStatus({
                      studentId: this.tempStudentId,
                      callback: (res) => {
                        console.log(res)
                      }
                    })
                  }
                  this.showEditStudentModal = false
                  message.success('编辑成功。')
                }
              }
            })
          } else {
            if (this.tempDelete.length !== 0) {
              const deleteString = this.tempDelete.join(',')
              await deleteContract(this.tempStudentId, deleteString).then(
                (res) => {
                  this.tempDelete = []
                  if (res.code !== 200) {
                    message.error('删除文件出错,' + res.msg)
                  }
                }
              )
            }
            this.addStudent({
              data: para,
              callback: (res) => {
                if (res) {
                  message.success('合同信息录入成功！')
                } else {
                  message.error('添加失败，请稍后重试。')
                }
              }
            })
          }
        }
      }
    },
    mounted() {
      let data = oldData.filter((item) => {
        return item.REAL_NAME && !item.REAL_NAME.includes('试听')
      })
      this.role = store.getters['acl/role'][0]
      let beijingData = []
      data.forEach((item) => {
        if (item.CAMPUSNAME === 'SKD成都校区') {
          let JwName = item.JWNAME
          let studentName = item.REAL_NAME
          // const fireNames = [
          //   '陈娟',
          //   '王甜',
          //   '杨文娟',
          //   '及美茹',
          //   '尹雁翩',
          //   '李媛媛',
          //   '毛艳宁',
          //   '张慧玲',
          //   '姜翠萍',
          //   '张雯',
          //   '刘楠',
          //   '杨雯雯',
          //   '尚孝天'
          // ]
          if (item.JWNAME === '李美慧') {
            JwName = 'LMH'
          }
          if (item.JWNAME === '袁美琳') {
            JwName = 'yuanmeilin'
          }
          const ele = {
            studentName: studentName,
            sex: item.SEX === 0 ? '女' : '男',
            contact: item.TEL ? item.TEL : 0,
            wchart: item.WECHAT ? item.WECHAT : 0,
            urgentContact: item.FATHERTEL ? item.FATHERTEL : 0,
            productLevel: '请选择',
            applyEducation: '请选择',
            applyMajor: item.GRADUATEMAJOR,
            applyMainCountry: item.APPLYCOUNTRY,
            applyBakCountry: '无',
            admissionYear: item.APPLYYEAR ? item.APPLYYEAR : '请选择',
            contractSignDate: null,
            contractEndDate: null,
            advisorJoinContract: '是',
            contractAdditionalAgreement: '是',
            contractComment: '',
            deptId: 219, // 记得改校区！
            status: '在读',
            projects: {
              basicCourse: [],
              professionalCourse: [],
              subjectCamp: [],
              overseaMentor: []
            },
            contractFilepath: '',
            studySchool: item.GRADUATESCHOOL ? item.GRADUATESCHOOL : '',
            managerPostCodes: [],
            createBy: JwName,
            consultantName: item.KCGWNAME
          }
          beijingData.push(ele)
        }
      })
      console.log(beijingData)
      this.textData = beijingData
      const date = new Date()
      const year = date.getFullYear()
      for (let i = -2; i < 1; i++) {
        let ele = {
          label: year + i + ' Fall',
          value: year + i + ' Fall'
        }
        this.enterYearList.push(ele)
      }
      for (let i = 1; i < 6; i++) {
        let ele = {
          label: year + i + ' Fall',
          value: year + i + ' Fall'
        }
        this.enterYearList.push(ele)
      }
      this.enterYearList.push({
        label: '不申请',
        value: '不申请'
      })
      this.viewType = this.$route.query.type
      if (this.$route.query.studentName) {
        this.searchName = this.$route.query.studentName
        this.searchStudent()
      }
      if (this.role === 'admin' || this.role === 'educationalManager') {
        if (store.getters['user/userId']) {
          this.getStaff({
            staffId: store.getters['user/userId'],
            callback: (res) => {
              if (res && res.user) {
                this.userParentId = res.user.parentDept
              }
              this.getSaveLimitsFun()
            }
          })
        }
      } else {
        this.getSaveLimitsFun()
      }
    }
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
    .list-label {
      .flex {
        font-weight: bolder;
        font-size: 18px;
      }
    }
  }
  .list-ele-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    color: rgba(0, 0, 0, 0.6);
  }
  .list-label {
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .flex {
    display: flex;
  }
  .ml-5 {
    margin-left: 7px;
  }
  .ml-20 {
    margin-left: 20px;
  }
  .close-icon {
    font-size: 22px;
    cursor: pointer;
    margin-left: 12px;
    margin-top: 0.5px;
    color: red;
    margin-top: -2px;
  }
  .hint {
    margin-left: 12px;
    color: red;
  }
  .course-info {
    margin-top: 6px;
    margin-bottom: 20px;
  }
</style>
