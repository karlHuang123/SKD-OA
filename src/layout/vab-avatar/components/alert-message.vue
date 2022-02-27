<template>
  <div class="component-container">
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
          <a-menu-item
            v-for="item in messageList"
            v-bind:key="item.id"
            @click="updateMessageStatusFun(item.id)"
          >
            <div class="message-container">学生卡尔被分配了新的教师</div>
          </a-menu-item>
          <a-menu-divider />
          <a-menu-item key="3">
            <div class="check-read" @click="goToMessageList">查看全部消息</div>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>
<script>
  import { BellOutlined } from '@ant-design/icons-vue'
  import { mapActions } from 'vuex'
  export default {
    components: { BellOutlined },
    props: ['userName'],
    data() {
      return {
        listPara: {
          pageNum: 1,
          pageSize: 10,
        },
        messageList: null,
      }
    },
    methods: {
      ...mapActions({
        getMessageList: 'contract/getMessageList',
        updateMessageStatus: 'contract/updateMessageStatus',
      }),
      getMessageListFun(pageNum = 1, pageSize = 500) {
        this.listPara.pageNum = pageNum
        this.listPara.pageSize = pageSize
        this.getMessageList({
          listPara: this.listPara,
          callback: (res) => {
            console.log(res)
          },
        })
      },
      updateMessageStatusFun(id) {
        this.updateMessageStatus({
          id: id,
          callback: (res) => {
            console.log(res)
          },
        })
      },
      goToMessageList() {
        this.$router.push('/general-info/message-list')
      },
    },
    mounted() {
      const intervalTime = 5000 //轮询时间
      setInterval(() => {
        const userName = this.$store.getters['user/username']
        if (userName) this.getMessageListFun()
      }, intervalTime)
    },
  }
</script>
<style lang="less" scoped>
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
</style>
