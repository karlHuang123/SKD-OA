<template>
  <div class="test-container" v-if="studentName">
    <h2>{{ this.studentName }}课堂反馈</h2>
    <div class="line"></div>
    <div class="">
      <a-table
        :columns="listColumns"
        :pagination="false"
        :data-source="couresInfoList"
        :row-key="
          (r) => {
            return r.userId
          }
        "
        :scroll="{ x: 1600, y: 800 }"
      >
        <template #operation="{ record }">
          <span>
            <a-button @click="preview(record)">预览</a-button>
          </span>
        </template>
      </a-table>
    </div>
    <a-modal
      @cancel="closePreview"
      :visible="previewOpen"
      :title="'课堂反馈表预览'"
      width="60%"
    >
      <div style="width: 100%; height: 100%; padding: 20px" ref="codeRef">
        <h2 style="text-align: center">课堂反馈记录表</h2>
        <div
          style="width: 100%; height: 100%; text-align: center; margin: 0 auto"
        >
          <div
            style="
              display: flex;
              align-items: center;
              margin: 15px auto;
              border-bottom: 1px solid black;
            "
          >
            <strong style="width: 100px; text-align: left">学生姓名：</strong>
            <div>{{ tempCourse.studentName }}</div>
          </div>
          <div
            style="
              display: flex;
              align-items: center;
              margin: 15px auto;
              border-bottom: 1px solid black;
            "
          >
            <strong style="width: 100px; text-align: left">专业：</strong>
            <div>{{ tempCourse.applyMajor }}</div>
          </div>
          <div
            style="
              display: grid;
              grid-template-columns: 1fr 1fr;
              margin: 10px auto;
            "
          >
            <div style="display: flex; padding-right: 5px">
              <strong>申请国家：</strong>
              <div>{{ tempCourse.applyMainCountry }}</div>
            </div>
            <div style="display: flex; padding-left: 5px">
              <strong>日期：</strong>
              <div>{{ tempCourse.recordDate }}</div>
            </div>
          </div>
          <div
            style="
              display: grid;
              grid-template-columns: 1fr 1fr;
              margin: 15px auto;
              border-bottom: 1px solid black;
            "
          >
            <div style="display: flex; padding-right: 5px">
              <strong>上课时间：</strong>
              <div>{{ tempCourse.checkInTime }}</div>
            </div>
            <div style="display: flex; padding-left: 5px">
              <strong>下课时间：</strong>
              <div>{{ tempCourse.checkOutTime }}</div>
            </div>
          </div>
          <div
            style="
              margin: 15px auto;
              border-bottom: 1px solid black;
              text-align: left;
            "
          >
            <strong>分析学生调研内容</strong>
            <div>{{ tempCourse.analysisContent }}</div>
          </div>
          <div
            style="
              margin: 15px auto;
              border-bottom: 1px solid black;
              text-align: left;
            "
          >
            <strong>课后作业：</strong>
            <div>{{ tempCourse.homework }}</div>
          </div>
          <div
            style="
              display: flex;
              align-items: center;
              margin: 15px auto;
              border-bottom: 1px solid black;
            "
          >
            <strong style="text-align: left; width: 130px">
              课后作业完成情况：
            </strong>
            <div>{{ tempCourse.homeworkSituation }}</div>
          </div>
          <div
            style="
              display: grid;
              grid-template-columns: 1fr 1fr;
              margin: 15px auto;
              border-bottom: 1px solid black;
            "
          >
            <div style="display: flex; padding-right: 5px">
              <strong>Foundation：</strong>
              <div>{{ tempCourse.foundationProgress }}%</div>
            </div>
            <div style="display: flex; padding-left: 5px">
              <strong>Project1：</strong>
              <div>{{ tempCourse.projectOneProgress }}%</div>
            </div>
            <div style="display: flex; padding-right: 5px">
              <strong>Project2：</strong>
              <div>{{ tempCourse.projectTwoProgress }}%</div>
            </div>
            <div style="display: flex; padding-left: 5px">
              <strong>Project3：</strong>
              <div>{{ tempCourse.projectThreeProgress }}%</div>
            </div>
            <div style="display: flex; padding-right: 5px">
              <strong>Project4：</strong>
              <div>{{ tempCourse.projectFourProgress }}%</div>
            </div>
          </div>
          <div
            style="
              display: grid;
              grid-template-columns: 1fr 1fr;
              margin: 15px auto;
            "
          >
            <div style="padding-right: 5px">
              <div>学生签名</div>
              <img
                style="width: 100%"
                :src="tempCourse.studentSignature"
                alt=""
              />
            </div>
            <div style="padding-left: 5px">
              <div>老师签名</div>
              <img
                style="width: 100%"
                :src="tempCourse.teacherSignature"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <template #footer>
        <a-button @click="exportForm">导出反馈表</a-button>
        <a-button @click="closePreview">关闭</a-button>
      </template>
    </a-modal>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import { formData } from './static/formData.js'
  import html2canvas from 'html2canvas'
  export default {
    name: 'CourseHistory',
    components: {},
    data() {
      return {
        studentName: null,
        couresInfoList: [],
        listColumns: formData.listColumns,
        tempCourse: {
          studentName: null,
          analysisContent: null,
          applyMainCountry: null,
          applyMajor: null,
          checkInTime: null,
          checkOutTime: null,
          courseId: null,
          homework: null,
          homeworkSituation: null,
          projectOneProgress: null,
          projectTwoProgress: null,
          projectThreeProgress: null,
          projectFourProgress: null,
          recordDate: '',
          foundationProgress: null,
          studentSignature: '',
          teacherSignature: ''
        },
        previewOpen: false,
        formLink: null
      }
    },
    methods: {
      ...mapActions({
        getCourseRecordingByStuName: 'calendar/getCourseRecordingByStuName'
      }),
      getCourseRecordingByStuNameFun() {
        this.getCourseRecordingByStuName({
          data: { studentName: this.studentName },
          callback: (res) => {
            if (res && res.code === 200) {
              this.couresInfoList = res.data
            }
          }
        })
      },
      preview(obj) {
        this.tempCourse = obj
        this.previewOpen = true
      },
      closePreview() {
        console.log('hey')
        this.previewOpen = false
      },
      exportForm() {
        html2canvas(this.$refs.codeRef).then((canvas) => {
          const base64 = canvas.toDataURL('image/png')
          this.formLink = base64
          const link = document.createElement('a')
          link.href = this.formLink
          link.setAttribute('download', this.studentName + '反馈表')
          link.click()
          this.previewOpen = false
        })
      }
    },
    mounted() {
      if (this.$route.query.studentName) {
        this.studentName = this.$route.query.studentName
        this.getCourseRecordingByStuNameFun()
      }
    }
  }
</script>
<style lang="less" scope></style>
