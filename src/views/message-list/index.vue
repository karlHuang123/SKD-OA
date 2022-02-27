<template>
  <div class="test-container">
    <a-table
      :columns="listColumns"
      :pagination="pagination"
      @change="handleStudentListChange"
      :scroll="{ x: 900 }"
      :row-key="
        (r) => {
          return r.id
        }
      "
      :data-source="messageListJson"
    >
      <template #status="{ record }">
        <div class="status-container">
          <div v-if="record.status === 0" class="unread status">未读</div>
          <div v-if="record.status === 1" class="read status">已读</div>
        </div>
      </template>
      <template #operation="{ record }">
        <div class="editable-row-operations">
          <span class="edit">
            <a-button
              type="primary"
              @click="() => goToStudentList(record.messageContent, record.id)"
            >
              处理消息
            </a-button>
          </span>
          <!-- <span>
            <a-popconfirm
              title="确定删除该学生信息吗？"
              @confirm="() => deleteStudentFuc(record.studentId)"
            >
              <a-button type="danger">删除</a-button>
            </a-popconfirm>
          </span> -->
        </div>
      </template>
    </a-table>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import { messageData } from './static/messageData.js'
  export default {
    name: 'MessageList',
    data() {
      return {
        listPara: {
          pageNum: 1,
          pageSize: 10,
        },
        listColumns: messageData.listColumns,
        messageListJson: null,
        pagination: {
          total: 0,
          current: 1,
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          pageSizeOptions: ['10', '20', '50', '100'],
          showTotal: (total) => `共${total}条`,
        },
      }
    },
    methods: {
      ...mapActions({
        getMessageList: 'contract/getMessageList',
        updateMessageStatus: 'contract/updateMessageStatus',
      }),
      getMessageListFun(pageNum = 1, pageSize = 10) {
        this.listPara.pageNum = pageNum
        this.listPara.pageSize = pageSize
        this.getMessageList({
          listPara: this.listPara,
          callback: (res) => {
            this.messageListJson = res.rows
            this.pagination.total = res.total
          },
        })
      },
      goToStudentList(text, id) {
        const studentName = text.split('学生')[1].split('【')[1].split('】')[0]
        this.updateMessageStatus({
          id: id,
          callback: () => {
            this.$store.commit('contract/setStudentName', studentName)
            this.$router.push({
              name: 'StudentList',
            })
          },
        })
      },
    },
    mounted() {
      this.getMessageListFun()
    },
  }
</script>
<style lang="less" scoped>
  .status {
    padding: 2px;
    color: white;
    border-radius: 10px;
    text-align: center;
    width: 50px;
  }
  .unread {
    background-color: red;
  }
  .read {
    background-color: green;
  }
</style>
