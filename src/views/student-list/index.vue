<template>
  <div class="test-container">
    <a-table
      :columns="listColumns"
      :pagination="pagination"
      @change="handleStaffListChange"
      :row-key="
        (r) => {
          return r.userId
        }
      "
      :data-source="studentListJson"
    >
      <template #operation="{ record }">
        <div class="editable-row-operations">
          <span class="edit">
            <a-button type="primary" @click="() => editStaff(record.userId)">
              更多信息
            </a-button>
          </span>
          <span>
            <a-popconfirm
              title="确定删除该员工吗？"
              @confirm="() => deleteStaffFuc(record.userId)"
            >
              <a-button type="danger">删除</a-button>
            </a-popconfirm>
          </span>
        </div>
      </template>
    </a-table>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import { listParameters } from './static/list-parameters.js'
  export default {
    name: 'StudentList',
    data() {
      return {
        listColumns: listParameters.listColumns,
        pagination: {
          total: 0,
          current: 1,
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          pageSizeOptions: ['10', '20', '50', '100'],
          showTotal: (total) => `共${total}条`,
        },
        studentListJson: null,
      }
    },
    methods: {
      ...mapActions({
        getDeptTree: 'position/getDeptTree',
      }),
    },
    mounted() {},
  }
</script>
<style lang="less" scoped>
  .top-container {
    height: 150px;
  }
</style>
