const allInformation = {
  positions: {
    教学部: [
      {
        key: '2DManager',
        value: '2D科系老师',
      },
      {
        key: '3DManager',
        value: '3D科系主管',
      },
      {
        key: 'interactionManager',
        value: '交互工业科系主管',
      },
      {
        key: 'fashionManager',
        value: '时尚科系主管',
      },
      {
        key: 'threeStarTeacher',
        value: '三星导师',
      },
      {
        key: 'fourStarTeacher',
        value: '四星导师',
      },
      {
        key: 'fiveStarTeacher',
        value: '五星导师',
      },
      {
        key: 'softwareTeacher',
        value: '软件导师',
      },
      {
        key: 'supportTeacher',
        value: '助教导师',
      },
      {
        key: 'partTimeTeacher',
        value: '兼职导师',
      },
    ],
    教务部: [
      {
        key: 'educationalManager',
        value: '教务主管',
      },
      {
        key: 'educationalTeacher',
        value: '教务老师',
      },
    ],
    申请部: [
      {
        key: 'applyManager',
        value: '申请主管',
      },
      {
        key: 'documentTeacher',
        value: '文书导师',
      },
    ],
  },
  abilities: {
    教务: [
      {
        key: 'stdDocManaging',
        value: '学生档案管理',
      },
      {
        key: 'stdLessonArranging',
        value: '学生排课',
      },
      {
        key: 'stdCostListPre',
        value: '学生费用结算清单-预估',
      },
      {
        key: 'stdCostList',
        value: '学生费用结算清单',
      },
    ],
  },
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
