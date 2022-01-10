const allInformation = {
  campus: [
    {
      key: 'Beijing',
      value: '北京',
    },
    {
      key: 'Shanghai',
      value: '上海',
    },
    {
      key: 'Dalian',
      value: '大连',
    },
    {
      key: 'Chengdu',
      value: '成都',
    },
    {
      key: 'Guangzhou',
      value: '广州',
    },
    {
      key: 'Qingdao',
      value: '青岛',
    },
  ],
  columns: [
    {
      title: '用户名',
      dataIndex: 'userName',
      key: 'userName',
      filters: [],
    },
    {
      title: '部门',
      dataIndex: 'deptName',
      key: 'deptName',
    },
    {
      title: '职位',
      dataIndex: 'postName',
      key: 'postName',
      filters: [],
    },
    {
      title: '员工类型',
      dataIndex: 'userType',
      key: 'userType',
    },
    {
      title: '所属分公司',
      dataIndex: 'parentDeptName',
      key: 'parentDeptName',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      slots: { customRender: 'operation' },
    },
  ],
}

export { allInformation }
