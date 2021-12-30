<template>
  <div class="login-container">
    <a-row>
      <!-- <a-col :xs="0" :md="0" :sm="12" :lg="14" :xl="16"></a-col> -->
      <a-col :xs="24" :sm="24" :md="12" :lg="10" :xl="6">
        <div class="login-container-form">
          <div class="login-container-logo-container">
            <img src="@/assets/static/skd-logo.png" alt="" />
          </div>
          <a-form :model="form" @submit="handleSubmit" @submit.prevent>
            <div class="">用户名</div>
            <a-form-item>
              <a-input v-model:value="form.username" placeholder="用户名">
                <template v-slot:prefix>
                  <UserOutlined style="color: rgba(0, 0, 0, 0.25)" />
                </template>
              </a-input>
            </a-form-item>
            <div class="">密码</div>
            <a-form-item>
              <a-input
                v-model:value="form.password"
                type="password"
                placeholder="密码"
              >
                <template v-slot:prefix>
                  <LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
                </template>
              </a-input>
            </a-form-item>
            <div class="">验证码</div>
            <a-form-item>
              <div class="code-container">
                <div class="code-input">
                  <a-input v-model:value="form.code" placeholder="验证码">
                    <template v-slot:prefix>
                      <SafetyOutlined style="color: rgba(0, 0, 0, 0.25)" />
                    </template>
                  </a-input>
                </div>
                <div class="code-img">
                  <img :src="codeImg" alt="" />
                  <SyncOutlined @click="refreshCode()" />
                </div>
              </div>
            </a-form-item>
            <a-form-item>
              <div class="btn-container">
                <div class="">
                  <a-button
                    type="primary"
                    html-type="submit"
                    :disabled="
                      form.username === '' ||
                      form.password === '' ||
                      form.code === ''
                    "
                  >
                    登录
                  </a-button>
                </div>
                <div class="btn-link" @click="goTo('/register')">注册</div>
                <div class="btn-link" @click="goTo('/find-password')">
                  忘记密码?
                </div>
                <!-- <div @click="testConfirm()">测试</div> -->
              </div>
            </a-form-item>
          </a-form>
        </div>
      </a-col>
    </a-row>
    <!-- <div class="login-container-tips">
      基于vue{{ dependencies['vue'] }}
      + ant-design-vue
      {{ dependencies['ant-design-vue'] }}开发
    </div> -->
  </div>
</template>
<script>
  import { dependencies, devDependencies } from '*/package.json'
  import { mapActions, mapGetters } from 'vuex'
  import {
    UserOutlined,
    LockOutlined,
    SafetyOutlined,
    SyncOutlined,
  } from '@ant-design/icons-vue'
  import { message } from 'ant-design-vue'

  export default {
    name: 'Login',
    components: {
      UserOutlined,
      LockOutlined,
      SafetyOutlined,
      SyncOutlined,
    },
    data() {
      return {
        form: {
          username: '',
          password: '',
          code: '',
          uuid: '',
        },
        redirect: undefined,
        dependencies: dependencies,
        devDependencies: devDependencies,
        codeImg: '',
      }
    },
    computed: {
      ...mapGetters({
        logo: 'settings/logo',
        title: 'settings/title',
      }),
    },
    watch: {
      $route: {
        handler(route) {
          this.redirect = (route.query && route.query.redirect) || '/'
        },
        immediate: true,
      },
    },
    mounted() {
      this.form.username = sessionStorage.getItem('username')
        ? sessionStorage.getItem('username')
        : ''
      // this.form.password = 'admin123'
      this.getAuthCode((res) => {
        this.codeImg = 'data:image/gif;base64,' + res.img
        this.form.uuid = res.uuid
      })
      const uuidForConfirm = this.$route.query.uuid
      if (uuidForConfirm && uuidForConfirm !== '') {
        // TO DO 处理邮箱点击进入的情况
        this.initConfirmedRegister(uuidForConfirm)
      }
      /*  setTimeout(() => {
        this.handleSubmit()
      }, 3000) */
    },
    methods: {
      ...mapActions({
        login: 'user/login',
        getAuthCode: 'user/getAuthCode',
        confirmedRegister: 'user/confirmedRegister',
      }),
      handleRoute() {
        return this.redirect === '/404' || this.redirect === '/403'
          ? '/'
          : this.redirect
      },
      async handleSubmit() {
        await this.login(this.form)
        await this.$router.push(this.handleRoute())
      },
      refreshCode() {
        this.getAuthCode((res) => {
          this.codeImg = 'data:image/gif;base64,' + res.img
          this.form.uuid = res.uuid
        })
      },
      goTo(url) {
        this.$router.push({ path: url })
      },
      initConfirmedRegister(uuid) {
        this.confirmedRegister({
          uuid: uuid,
          callback: (res) => {
            console.log(res)
            message.success('注册成功，请输入用户名和密码登录。')
          },
        })
      },
      testConfirm() {
        this.$router.replace({
          name: 'please-confirmed',
          params: {
            info: `为了您的账号安全，请前往${this.form.username}进行验证`,
          },
        })
      },
    },
  }
</script>
<style scoped lang="less">
  .login-container {
    width: 100%;
    height: 100vh;
    background-size: cover;
    &-form {
      width: calc(100% - 40px);
      padding: 4vh;
      margin-top: calc((100vh - 580px) / 2);
      margin-right: 20px;
      margin-left: 20px;
      background-size: 100% 100%;
      border-radius: 10px;
      box-shadow: 0 2px 8px 0 rgba(7, 17, 27, 0.06);
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
    .ant-input {
      height: 35px;
    }
    .ant-btn {
      width: 100%;
      height: 45px;
      border-radius: 99px;
    }
    .code-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      .code-input {
        width: 90%;
      }
      .code-img {
        margin-left: auto;
        display: flex;
        align-items: center;
        img {
          height: 32px;
          margin-right: 10px;
        }
      }
    }
    .btn-container {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr;
      .btn-link {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }
</style>
