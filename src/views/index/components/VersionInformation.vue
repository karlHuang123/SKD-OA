<template>
  <a-alert
    :message="
      '欢迎体验基于 vue ' +
      dependencies['vue'] +
      ' + ant-design-vue ' +
      dependencies['ant-design-vue'] +
      ' 开发的SKD-OA系统'
    "
    type="success"
    show-icon
  />

  <a-card class="version-information">
    <div class="">
      {{ userListJson }}
    </div>
  </a-card>
</template>
<script>
  import { dependencies, devDependencies } from '*/package.json'
  import { mapActions } from 'vuex'

  export default {
    data() {
      return {
        updateTime: process.env.VUE_APP_UPDATE_TIME,
        dependencies: dependencies,
        devDependencies: devDependencies,
        userListJson: null
      }
    },
    methods: {
      ...mapActions({
        getUserList: 'user/getUserList'
      })
    },
    mounted() {
      this.getUserList({
        pageNum: 1,
        pageSize: 10,
        callback: (res) => {
          this.userListJson = JSON.stringify(res)
        }
      })
    }
  }
</script>
<style lang="less" scoped>
  .version-information {
    margin-top: @vab-margin;
    &-table {
      width: 100%;
      overflow: scroll;
      table {
        width: 100%;
        color: #666;
        border-collapse: collapse;
        background-color: #fff;

        td {
          position: relative;
          padding: 9px 15px;
          font-size: 14px;
          line-height: 20px;
          border: 1px solid #e6e6e6;

          &:nth-child(odd) {
            width: 20%;
            text-align: right;
            background-color: #f7f7f7;
          }
        }
      }
    }
  }
</style>
