<template>
  <a-dropdown
    :trigger="['click']"
    overlayClassName="drop-down"
    placement="bottomCenter"
  >
    <div class="message-alert" @click="(e) => e.preventDefault()">
      <BellOutlined />
      <div class="message-number">
        <div class="">!</div>
      </div>
    </div>
    <template #overlay>
      <a-menu>
        <a-menu-item key="0">
          <div class="message-container">学生卡尔被分配了新的教师</div>
        </a-menu-item>
        <a-menu-item key="1">
          <div class="message-container">学生Kei被分配了新的教师</div>
        </a-menu-item>
        <a-menu-divider />
        <a-menu-item key="3">
          <div class="check-read" @click="goToMessageList">查看全部消息</div>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
  <div class="vab-avatar">
    <a-dropdown>
      <span class="ant-dropdown-link">
        <a-avatar :src="avatar" />
        {{ username }}
        <DownOutlined />
      </span>
      <template v-slot:overlay>
        <a-menu>
          <!-- <a-menu-item @click="buy">付费版购买</a-menu-item> -->
          <a-menu-item @click="logout">退出登录</a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<script>
  import { recordRoute } from '@/config'
  import { DownOutlined, BellOutlined } from '@ant-design/icons-vue'

  import { useStore } from 'vuex'
  import { computed } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  export default {
    name: 'VabAvatar',
    components: { DownOutlined, BellOutlined },
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

      const goToMessageList = () => {
        router.push('/general-info/message-list')
      }

      return {
        avatar: computed(() => store.getters['user/avatar']),
        username: computed(() => store.getters['user/username']),
        logout,
        buy,
        goToMessageList,
      }
    },
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
