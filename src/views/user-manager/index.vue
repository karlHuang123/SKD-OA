<template>
  <div class="test-container">
    <a-alert message="岗位列表信息"></a-alert>
    <a-card class="version-information">
      <div class="">
        {{ positionListJson }}
      </div>
    </a-card>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  export default {
    name: 'UserManager',
    data() {
      return {
        positionListJson: null,
      }
    },
    methods: {
      ...mapActions({
        getPositionList: 'position/getPositionList',
      }),
      searchPosition(positionId) {
        // TO DO
        console.log(positionId)
      },
    },
    mounted() {
      this.getPositionList((res) => {
        if (res.code === 200 && res.data) {
          this.positionListJson = JSON.stringify(res.data)
        } else {
          this.$message.error('请求错误，请稍后重试或联系维护认员。')
        }
      })
    },
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
