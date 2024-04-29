import { createApp } from 'vue'
import { RadioButton } from 'ant-design-vue/es/radio'
import vueEsign from 'vue-esign'
import {
  Input,
  InputNumber,
  Button,
  Modal,
  Select,
  Popconfirm,
  Pagination,
  Checkbox,
  Radio,
  Tooltip,
  Table,
  Tabs,
  Dropdown,
  Menu,
  Row,
  Col,
  Upload,
  Form,
  Alert,
  Card,
  Layout,
  Calendar,
  message,
  DatePicker,
  Spin,
  Collapse,
  CollapsePanel,
  Switch,
  List
} from 'ant-design-vue'

import App from './App'
import router from './router'
import store from './store'
// import 'ant-design-vue/dist/antd.css'
import 'ant-design-vue/lib/button/style/css'
import 'ant-design-vue/lib/input/style/css'
import 'ant-design-vue/lib/input-number/style/css'
import 'ant-design-vue/lib/modal/style/css'
import 'ant-design-vue/lib/select/style/css'
import 'ant-design-vue/lib/popconfirm/style/css'
import 'ant-design-vue/lib/pagination/style/css'
import 'ant-design-vue/lib/checkbox/style/css'
import 'ant-design-vue/lib/radio/style/css'
import 'ant-design-vue/lib/tooltip/style/css'
import 'ant-design-vue/lib/table/style/css'
import 'ant-design-vue/lib/tabs/style/css'
import 'ant-design-vue/lib/dropdown/style/css'
import 'ant-design-vue/lib/menu/style/css'
import 'ant-design-vue/lib/row/style/css'
import 'ant-design-vue/lib/col/style/css'
import 'ant-design-vue/lib/upload/style/css'
import 'ant-design-vue/lib/form/style/css'
import 'ant-design-vue/lib/alert/style/css'
import 'ant-design-vue/lib/card/style/css'
import 'ant-design-vue/lib/layout/style/css'
import 'ant-design-vue/lib/calendar/style/css'
import 'ant-design-vue/lib/message/style/css'
import 'ant-design-vue/lib/date-picker/style/css'
import 'ant-design-vue/lib/spin/style/css'
import 'ant-design-vue/lib/collapse/style/css'
import 'ant-design-vue/lib/switch/style/css'
import 'ant-design-vue/lib/list/style/css'
import '@/vab'
/**
 * @author chuzhixin 1204505056@qq.com
 * @description 正式环境默认使用mock，正式项目记得注释后再打包
 */
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('@/utils/static')
//   mockXHR()
// }
const app = createApp(App)

/* antd的组件按需注册 */
app.component('AInput', Input)
app.component('ATextarea', Input.TextArea)
app.component('AInputNumber', InputNumber)
app.component('AInputSearch', Input.Search)
app.component('AButton', Button)
app.component('AModal', Modal)
app.component('ASelect', Select)
app.component('ASelectOption', Select.Option)
app.component('APopconfirm', Popconfirm)
app.component('ACheckbox', Checkbox)
app.component('ACheckboxGroup', Checkbox.Group)
app.component('ARadio', Radio)
app.component('ARadioGroup', Radio.Group)
app.component('ATooltip', Tooltip)
app.component('ATable', Table)
app.component('ADropdown', Dropdown)
app.component('AMenu', Menu)
app.component('ASubMenu', Menu.SubMenu)
app.component('AMenuItemGroup', Menu.ItemGroup)
app.component('AMenuItem', Menu.Item)
app.component('ARow', Row)
app.component('ACol', Col)
app.component('APagination', Pagination)
app.component('AUpload', Upload)
app.component('AUploadDragger', Upload.Dragger)
app.component('AFormItem', Form.Item)
app.component('AForm', Form)
app.component('ARadioButton', RadioButton)
app.component('ATabs', Tabs)
app.component('ATabPane', Tabs.TabPane)
app.component('AAlert', Alert)
app.component('ACard', Card)
app.component('ALayout', Layout)
app.component('ALayoutHeader', Layout.Header)
app.component('ALayoutSider', Layout.Sider)
app.component('ALayoutContent', Layout.Content)
app.component('ACalendar', Calendar)
app.component('ADatePicker', DatePicker)
app.component('ASpin', Spin)
app.component('ACollapse', Collapse)
app.component('ACollapsePanel', CollapsePanel)
app.component('ASwitch', Switch)
app.component('AList', List)

app.use(store).use(router).use(message).use(vueEsign).mount('#app')

// createApp(App).use(store).use(router).use(Antd).mount('#app')
