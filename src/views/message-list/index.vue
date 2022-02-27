<template>
  <div class="test-container">
    <a-alert message="消息列表"></a-alert>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  export default {
    name: 'MessageList',
    data() {
      return {
        listPara: {
          pageNum: 1,
          pageSize: 10,
        },
      }
    },
    methods: {
      ...mapActions({
        getMessageList: 'contract/getMessageList',
      }),
      getMessageListFun(pageNum = 1, pageSize = 10) {
        this.listPara.pageNum = pageNum
        this.listPara.pageSize = pageSize
        this.getMessageList({
          listPara: this.listPara,
          callback: (res) => {
            console.log(res)
          },
        })
      },
    },
    mounted() {
      this.getMessageListFun()
    },
  }
</script>
