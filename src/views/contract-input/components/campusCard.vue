<template>
  <div class="open-container" v-if="openListComponent.length > 0">
    <div
      class="campus-ele"
      v-for="(item, index) in openListComponent"
      v-bind:key="index"
    >
      <span>{{ item.deptName }}</span>
      <a-switch
        v-model:checked="item.saveLimit"
        @change="saveOpenLimit"
        checked-children="开"
        un-checked-children="关"
      />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'OpenContainer',
    components: {},
    props: ['openList'],
    data() {
      return {
        openListComponent: [],
        selectIndex: null
      }
    },
    watch: {
      openList: {
        handler(newVal) {
          if (newVal) {
            this.openListComponent = JSON.parse(JSON.stringify(newVal))
          }
        },
        deep: true,
        immediate: true
      }
    },
    methods: {
      saveOpenLimit() {
        this.$emit('changeSaveLimit', this.openListComponent)
      }
    },
    mounted() {
      this.openListComponent = JSON.parse(JSON.stringify(this.openList))
    }
  }
</script>

<style lang="less" scoped>
  .open-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    .campus-ele {
      margin-bottom: 12px;
      span {
        margin-right: 5px;
      }
    }
  }
</style>
