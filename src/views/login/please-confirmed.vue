<template>
  <div class="login-container">
    <a-row>
      <!-- <a-col :xs="0" :md="0" :sm="12" :lg="14" :xl="16"></a-col> -->
      <a-col :xs="24" :sm="24" :md="12" :lg="10" :xl="6">
        <div class="login-container-form">
          <div class="login-container-logo-container">
            <img src="@/assets/static/skd-logo.png" alt="" />
          </div>
        </div>
      </a-col>
    </a-row>
    <div class="info">{{ text }}</div>
  </div>
</template>
<script>
  export default {
    name: 'Confirmed',
    components: {},
    data() {
      return {
        text: ''
      }
    },
    mounted() {
      if (this.$route.params.info) {
        this.text = this.$route.params.info
      }
    },
    methods: {}
  }
</script>
<style scoped lang="less">
  .login-container {
    width: 100%;
    height: 100vh;
    // background: url('~@/assets/login_images/login_background.png');
    background-size: cover;
    &-form {
      width: calc(100% - 40px);
      padding: 4vh;
      margin-top: calc((100vh - 580px) / 2);
      margin-right: 20px;
      margin-left: 20px;
      background-size: 100% 100%;
    }
    &-hello {
      font-size: 32px;
      color: #fff;
    }
    &-title {
      margin-bottom: 30px;
      font-size: 20px;
      color: #fff;
    }
    &-tips {
      position: fixed;
      bottom: @vab-margin;
      width: 100%;
      height: 40px;
      color: rgba(255, 255, 255, 0.856);
      text-align: center;
    }
    &-logo-container {
      // width: 322px;
      height: 84px;
      margin-bottom: 77px;
      img {
        width: 100%;
      }
    }
    .ant-row {
      justify-content: center;
    }
    .ant-col {
      width: 100%;
      padding: 0 10px 0 10px;
    }
    .info {
      text-align: center;
      font-size: 24px;
    }
  }
</style>
