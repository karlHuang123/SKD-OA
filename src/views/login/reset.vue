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
            <div class="">请设置您的新密码</div>
            <a-form-item>
              <a-input
                type="password"
                v-model:value="form.newPassword"
                placeholder="新密码"
              >
                <template v-slot:prefix>
                  <LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
                </template>
              </a-input>
            </a-form-item>
            <div class="">确认密码</div>
            <a-form-item>
              <a-input
                v-model:value="form.confirmPassword"
                placeholder="确认密码"
                type="password"
              >
                <template v-slot:prefix>
                  <LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
                </template>
              </a-input>
            </a-form-item>
            <a-form-item>
              <div class="btn-container">
                <div class="">
                  <a-button
                    type="primary"
                    html-type="submit"
                    :disabled="
                      form.newPassword === '' || form.confirmPassword === ''
                    "
                  >
                    下一步
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
  import { LockOutlined } from '@ant-design/icons-vue'
  import { message } from 'ant-design-vue'

  export default {
    name: 'Reset',
    components: {
      LockOutlined,
    },
    data() {
      return {
        form: {
          confirmPassword: '',
          newPassword: '',
        },
        redirect: undefined,
        dependencies: dependencies,
        devDependencies: devDependencies,
        codeImg: '',
        uuidForConfirmReset: '',
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
      const uuidForConfirm = this.$route.query.uuid
      if (uuidForConfirm && uuidForConfirm !== '') {
        // TO DO 处理邮箱点击进入的情况
        this.uuidForConfirmReset = uuidForConfirm
        this.initConfirmedResetPassword(uuidForConfirm)
      }
    },
    methods: {
      ...mapActions({
        resetPassword: 'user/resetPassword',
        confirmedResetPassword: 'user/confirmedResetPassword',
      }),
      handleRoute() {
        return this.redirect === '/404' || this.redirect === '/403'
          ? '/'
          : this.redirect
      },
      async handleSubmit() {
        if (this.form.newPassword === this.form.confirmPassword) {
          await this.resetPassword({
            uuid: this.uuidForConfirmReset,
            password: this.form.newPassword,
            callback: (res) => {
              if (res) {
                this.$router.push({ path: '/login' })
              }
            },
          })
        } else {
          message.error('密码不一致，请重新输入！')
        }
      },
      initConfirmedResetPassword(uuid) {
        this.confirmedResetPassword({
          uuid: uuid,
          callback: (res) => {
            console.log(res)
            message.success('请输入并确认新密码。')
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
  }
</style>
