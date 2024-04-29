<template>
  <alert-message :userName="username" />
  <div class="vab-avatar">
    <a-dropdown>
      <span class="ant-dropdown-link">
        <a-avatar :src="avatar" />
        {{ username ? username : '请重新登陆' }}
        <DownOutlined />
      </span>
      <template v-slot:overlay>
        <a-menu>
          <a-menu-item @click="logout">退出登录</a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<script>
  import { recordRoute } from '@/config'
  import { DownOutlined } from '@ant-design/icons-vue'

  import { useStore } from 'vuex'
  import { computed } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import AlertMessage from './components/alert-message'
  export default {
    name: 'VabAvatar',
    components: { DownOutlined, AlertMessage },
    setup() {
      const store = useStore()
      const router = useRouter()
      const route = useRoute()

      const logout = async () => {
        await store.dispatch('user/logout')
        if (recordRoute) {
          const fullPath = route.fullPath
          router.push(`/login?redirect=${fullPath}`)
        } else {
          router.push('/login')
        }
      }

      const buy = () => {
        window.open('http://vue-admin-beautiful.com/authorization/')
      }

      return {
        avatar: computed(() => store.getters['user/avatar']),
        username: computed(() => store.getters['user/username']),
        logout,
        buy
      }
    }
  }
</script>
<style lang="less">
  .vab-avatar {
    .ant-dropdown-link {
      display: block;
      min-height: 64px;
      cursor: pointer;
    }
  }
  .ant-dropdown-placement-bottomCenter {
    top: 50px !important;
    width: 200px;
  }
  .message-alert {
    font-size: 22px;
    margin-right: 10px;
    cursor: pointer;
    position: relative;
    .message-number {
      position: absolute;
      width: 15px;
      height: 15px;
      color: white;
      top: 16px;
      right: -1px;
      background-color: red;
      border-radius: 50%;
      div {
        height: 100%;
        position: absolute;
        top: -25px;
        left: 6px;
        font-size: 12px;
      }
    }
  }
  .message-container {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .check-read {
    color: lightgray;
  }
</style>
