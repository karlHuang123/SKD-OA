<template>
  <div id="sign">
    <h2 style="text-align: center">课堂反馈记录表</h2>
    <!-- 做使用el-dialog做签字的弹框 -->
    <a-modal
      title="签字"
      @cancel="closeSign"
      :visible="dialogVisibleTeacher"
      width="90%"
      height="300px"
      append-to-body
    >
      <!-- 使用这个签名组件 -->
      <vue-esign
        ref="esign"
        class="mySign"
        :height="300"
        :isCrop="isCrop"
        :lineWidth="lineWidth"
        :lineColor="lineColor"
        :bgColor="bgColor"
      />
      <template #footer>
        <a-button @click="handleGenerate" type="primary">确认</a-button>
        <a-button @click="handleReset">重签</a-button>
        <a-button @click="closeSign">取消</a-button>
      </template>
    </a-modal>
    <a-modal
      title="签字"
      @cancel="closeSignStudent"
      :visible="dialogVisibleStudent"
      width="90%"
      height="300px"
      append-to-body
    >
      <!-- 使用这个签名组件 -->
      <vue-esign
        ref="esignStudent"
        class="mySign"
        :height="300"
        :isCrop="isCrop"
        :lineWidth="lineWidth"
        :lineColor="lineColor"
        :bgColor="bgColor"
      />
      <template #footer>
        <a-button @click="handleGenerateStudent" type="primary">确认</a-button>
        <a-button @click="handleReset">重签</a-button>
        <a-button @click="closeSignStudent">取消</a-button>
      </template>
    </a-modal>
    <!-- 审查人点击确认签字按钮触发签字 -->
    <div class="checkMan">
      <div class="name-input">
        <label for="">学生姓名：</label>
        <div>{{ formData.studentName }}</div>
      </div>
      <div class="name-input flex">
        <label for="">专业：</label>
        <div>{{ formData.applyMajor }}</div>
      </div>
      <div class="grid-input">
        <div class="flex" style="padding-right: 5px">
          <label for="">申请国家：</label>
          <div>{{ formData.applyMainCountry }}</div>
        </div>
        <div class="flex" style="padding-left: 5px">
          <label for="">日期：</label>
          <div>{{ formData.recordDate }}</div>
        </div>
      </div>
      <div class="grid-input">
        <div class="flex" style="padding-right: 5px">
          <label for="">上课时间：</label>
          <div>{{ formData.checkInTime }}</div>
        </div>
        <div class="flex" style="padding-left: 5px">
          <label for="">下课时间：</label>
          <div>{{ formData.checkOutTime }}</div>
        </div>
      </div>
      <div class="textarea-container">
        <label for="">分析学生调研内容</label>
        <a-textarea
          v-model:value="formData.analysisContent"
          :rows="3"
        ></a-textarea>
      </div>
      <div class="textarea-container">
        <label for="">课后作业：</label>
        <a-textarea v-model:value="formData.homework" :rows="3"></a-textarea>
      </div>
      <div class="name-input">
        <label style="width: 130px" for="">课后作业完成情况：</label>
        <a-select
          v-model:value="formData.homeworkSituation"
          @change="homeworkSituationChanged"
          style="flex: 1"
        >
          <a-select-option value="100%">100%</a-select-option>
          <a-select-option value="80%">80%</a-select-option>
          <a-select-option value="60%">60%</a-select-option>
          <a-select-option value="Unfinished">Unfinished</a-select-option>
        </a-select>
      </div>
      <div class="grid-input">
        <div style="padding-right: 5px">
          <label for="">Foundation：</label>
          <a-input v-model:value="formData.foundationProgress">
            <template #suffix>
              <span>%</span>
            </template>
          </a-input>
        </div>
        <div style="padding-left: 5px">
          <label for="">Project1：</label>
          <a-input v-model:value="formData.projectOneProgress">
            <template #suffix>
              <span>%</span>
            </template>
          </a-input>
        </div>
        <div style="padding-right: 5px">
          <label for="">Project2：</label>
          <a-input v-model:value="formData.projectTwoProgress">
            <template #suffix>
              <span>%</span>
            </template>
          </a-input>
        </div>
        <div style="padding-left: 5px">
          <label for="">Project3：</label>
          <a-input v-model:value="formData.projectThreeProgress">
            <template #suffix>
              <span>%</span>
            </template>
          </a-input>
        </div>
        <div style="padding-right: 5px">
          <label for="">Project4：</label>
          <a-input v-model:value="formData.projectFourProgress">
            <template #suffix>
              <span>%</span>
            </template>
          </a-input>
        </div>
      </div>
      <div class="grid-input">
        <div style="padding-right: 5px">
          <a-button
            plain
            @click="
              () => {
                anchor = 'student'
                dialogVisibleStudent = true
              }
            "
            type="primary"
          >
            学生签名
          </a-button>
          <img :src="formData.studentSignature" alt="" />
        </div>
        <div style="padding-left: 5px">
          <a-button
            plain
            @click="
              () => {
                anchor = 'teacher'
                dialogVisibleTeacher = true
              }
            "
            type="primary"
          >
            老师签名
          </a-button>
          <img :src="formData.teacherSignature" alt="" />
        </div>
      </div>
      <a-button @click="submit">提交</a-button>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import { message } from 'ant-design-vue'
  export default {
    name: 'Sign',
    data() {
      return {
        dialogVisibleTeacher: false, // 弹框是否开启
        dialogVisibleStudent: false,
        lineWidth: 6, // 画笔的线条粗细
        lineColor: '#000000', // 画笔的颜色
        bgColor: '', // 画布的背景颜色
        resultImg: '', // 最终画布生成的base64图片
        isCrop: false, // 是否裁剪，在画布设定尺寸基础上裁掉四周空白部分
        formData: {
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
        anchor: null
      }
    },
    mounted() {
      const getDataFromUrl = window.location.href.split('?')[1]
      console.log(getDataFromUrl.split('&'))
      const arr = getDataFromUrl.split('&')
      this.formData.studentName = decodeURI(arr[0])
      this.formData.courseId = arr[3]
      this.formData.applyMajor = decodeURI(arr[2])
      this.formData.applyMainCountry = decodeURI(arr[1])
      console.log(decodeURI(arr[4]).split(' '))
      this.formData.recordDate = decodeURI(arr[4]).split(' ')[0]
      this.formData.checkInTime = decodeURI(arr[4]).split(' ')[1]
      this.formData.checkOutTime = decodeURI(arr[5]).split(' ')[1]
      this.getCourseInfoFun()
    },
    methods: {
      ...mapActions({
        getCourseInfo: 'calendar/getCourseInfo',
        addCourseInfo: 'calendar/addCourseInfo'
      }),
      // 清空画板
      handleReset() {
        if (this.anchor === 'teacher') {
          this.$refs.esign.reset()
        } else {
          this.$refs.esignStudent.reset()
        }
      },
      // 生成签字图
      handleGenerate() {
        this.$refs.esign
          .generate() // 使用生成器调用把签字的图片转换成为base64图片格式
          .then((res) => {
            this.formData.teacherSignature = res
          })
          .catch(() => {
            // 画布没有签字时会执行这里提示一下
            this.$message({
              type: 'warning',
              message: '请签名后再生成签字图片'
            })
          })

        // 在这里向后端发请求把转换后的base64文件传给后端，后端接收以后再转换成图片做静态图片存储
        // 当然也可以把base64转成流文件blob格式的，类似上传给后端这样，具体哪种方式看后端要求
        setTimeout(() => {
          // 这里要使用定时器稍微延后以后就能取到base64数据了，当然也可以再加一个确认按钮，如：确认使用这张base64签名图片
          // 点击确认以后，在其回调函数中，再把base64的签名图片传给后端用于存储
          console.log('我是签字后的base64图片', this.resultImg)
        }, 200)
        this.anchor = null
        this.dialogVisibleTeacher = false
      },
      handleGenerateStudent() {
        this.$refs.esignStudent
          .generate() // 使用生成器调用把签字的图片转换成为base64图片格式
          .then((res) => {
            this.formData.studentSignature = res
          })
          .catch(() => {
            // 画布没有签字时会执行这里提示一下
            this.$message({
              type: 'warning',
              message: '请签名后再生成签字图片'
            })
          })

        // 在这里向后端发请求把转换后的base64文件传给后端，后端接收以后再转换成图片做静态图片存储
        // 当然也可以把base64转成流文件blob格式的，类似上传给后端这样，具体哪种方式看后端要求
        setTimeout(() => {
          // 这里要使用定时器稍微延后以后就能取到base64数据了，当然也可以再加一个确认按钮，如：确认使用这张base64签名图片
          // 点击确认以后，在其回调函数中，再把base64的签名图片传给后端用于存储
          console.log('我是签字后的base64图片', this.resultImg)
        }, 200)
        this.anchor = null
        this.dialogVisibleStudent = false
      },
      closeSign() {
        this.handleReset()
        this.dialogVisibleTeacher = false
      },
      closeSignStudent() {
        this.handleReset()
        this.dialogVisibleStudent = false
      },
      getCourseInfoFun() {
        this.getCourseInfo({
          courseId: this.formData.courseId,
          callback: (res) => {
            if (res && res.code === 200 && res.data) {
              this.formData = res.data
            }
          }
        })
      },
      homeworkSituationChanged(value) {
        this.formData.homeworkSituation = value
      },
      submit() {
        this.addCourseInfo({
          data: this.formData,
          callback: (res) => {
            if (res && res.code === 200) {
              message.success('提交成功')
            }
          }
        })
      }
    }
  }
</script>

<style lang="less" scope>
  #sign {
    width: 100%;
    height: 100%;
    padding: 20px;
    .name-input {
      display: flex;
      align-items: center;
      margin: 10px auto;
      label {
        width: 100px;
        text-align: left;
      }
    }
    .grid-input {
      display: grid;
      grid-template-columns: 1fr 1fr;
      margin: 10px auto;
      div {
        text-align: left;
      }
    }
    .textarea-container {
      margin: 10px auto;
      text-align: left;
    }
    .checkMan {
      width: 100%;
      text-align: center;
      margin: 0 auto;
      //   border: 1px solid #e9e9e9;
      h2 {
        margin-bottom: 20px;
      }
      .a-button {
        margin-bottom: 20px;
      }
    }
  }
  .ant-modal-body {
    padding: 0 !important;
  }
  img {
    width: 100%;
  }
  .flex {
    display: flex;
  }
</style>
