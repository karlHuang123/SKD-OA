<template>
  <component
    :is="menuComponent"
    v-if="!item.hidden && checkPermission(item.meta)"
    :item="item"
    :route-children="routeChildren"
  >
    <template v-if="item.children && item.children.length">
      <vab-menu
        v-for="route in item.children"
        :key="route.path"
        :item="route"
        :rolePermission="rolePermission"
      ></vab-menu>
    </template>
  </component>
</template>

<script>
  import MenuItem from './components/MenuItem'
  import Submenu from './components/Submenu'
  export default {
    name: 'VabMenu',
    components: { MenuItem, Submenu },
    props: {
      item: {
        type: Object,
        required: true
      },
      rolePermission: {
        type: Object
      }
    },
    data() {
      return {
        routeChildren: {},
        menuComponent: ''
      }
    },
    created() {
      const showChildren = this.handleChildren(this.item.children)
      if (showChildren.length === 0) {
        this.menuComponent = 'MenuItem'
        this.routeChildren = this.item
      } else if (showChildren.length === 1 && this.item.alwaysShow !== true) {
        this.menuComponent = 'MenuItem'
        this.routeChildren = showChildren[0]
      } else {
        this.menuComponent = 'Submenu'
      }
    },
    methods: {
      handleChildren(children = []) {
        if (children === null) return []
        return children.filter((item) => item.hidden !== true)
      },
      // 检测用户是否拥有资格看到该路由
      checkPermission(meta) {
        let hasPermission = true
        if (meta && meta.permission && this.rolePermission) {
          const hasIndex = meta.permission.indexOf(this.rolePermission[0])
          if (hasIndex === -1 && this.rolePermission[0] !== 'ALL') {
            hasPermission = false
          }
        }
        return hasPermission
      }
    }
  }
</script>
<style lang="less">
  .anticon {
    margin-right: 3px !important;
  }
</style>
