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
            <div class="">邮箱</div>
            <a-form-item>
              <a-input v-model:value="form.email" placeholder="邮箱">
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
                      form.email === ''
                    "
                  >
                    注册
                  </a-button>
                </div>
              </div>
            </a-form-item>
          </a-form>
        </div>
      </a-col>
    </a-row>
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

  export default {
    name: 'Register',
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
          email: '',
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
      this.getAuthCode((res) => {
        this.codeImg = 'data:image/gif;base64,' + res.img
        this.form.uuid = res.uuid
      })
      if (window.history && window.history.pushState) {
        history.pushState(null, null, document.URL)
        window.addEventListener('popstate', this.goBack, false)
      }
    },
    unmounted() {
      window.removeEventListener('popstate', this.goBack, false)
    },
    methods: {
      ...mapActions({
        register: 'user/register',
        getAuthCode: 'user/getAuthCode',
      }),
      handleRoute() {
        return this.redirect === '/404' || this.redirect === '/403'
          ? '/'
          : this.redirect
      },
      goBack() {
        this.$router.go(-1)
      },
      async handleSubmit() {
        await this.register({
          userInfo: this.form,
          callback: (res) => {
            if (res.code === 200) {
              this.$router.replace({
                path: '/please-confirmed',
                params: {
                  info: `为了您的账号安全，请前往${this.form.email}进行验证`,
                },
              })
            }
          },
        })
      },
      refreshCode() {
        this.getAuthCode((res) => {
          this.codeImg = 'data:image/gif;base64,' + res.img
          this.form.uuid = res.uuid
        })
      },
    },
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
      width: 322px;
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
  }
</style>
