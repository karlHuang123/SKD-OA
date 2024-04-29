const allInformation = {
  restDateOptions: [
    {
      label: '周一',
      value: 1
    },
    {
      label: '周二',
      value: 2
    },
    {
      label: '周三',
      value: 3
    },
    {
      label: '周四',
      value: 4
    },
    {
      label: '周五',
      value: 5
    },
    {
      label: '周六',
      value: 6
    },
    {
      label: '周日',
      value: 0
    }
  ],
  positions: {
    教学部: [
      {
        key: '2DManager',
        value: '2D科系老师'
      },
      {
        key: '3DManager',
        value: '3D科系主管'
      },
      {
        key: 'interactionManager',
        value: '交互工业科系主管'
      },
      {
        key: 'fashionManager',
        value: '时尚科系主管'
      },
      {
        key: 'threeStarTeacher',
        value: '三星导师'
      },
      {
        key: 'fourStarTeacher',
        value: '四星导师'
      },
      {
        key: 'fiveStarTeacher',
        value: '五星导师'
      },
      {
        key: 'softwareTeacher',
        value: '软件导师'
      },
      {
        key: 'supportTeacher',
        value: '助教导师'
      },
      {
        key: 'partTimeTeacher',
        value: '兼职导师'
      }
    ],
    教务部: [
      {
        key: 'educationalManager',
        value: '教务主管'
      },
      {
        key: 'educationalTeacher',
        value: '教务老师'
      }
    ],
    申请部: [
      {
        key: 'applyManager',
        value: '申请主管'
      },
      {
        key: 'documentTeacher',
        value: '文书导师'
      }
    ]
  },
  abilities: {
    教务老师: [
      {
        value: 'stdDocManaging',
        label: '学生档案管理'
      },
      {
        value: 'stdLessonArranging',
        label: '学生排课'
      },
      {
        value: 'stdCostListPre',
        label: '学生费用结算清单-预估'
      },
      {
        value: 'stdCostList',
        label: '学生费用结算清单'
      }
    ],
    教务主管: [
      {
        value: 'allStdDocManaging',
        label: '所有学生档案管理'
      },
      {
        value: 'allStdLessonArranging',
        label: '所有学生排课'
      },
      {
        value: 'allStdCostListPre',
        label: '所有学生费用结算清单-预估'
      },
      {
        value: 'allStdCostList',
        label: '所有学生费用结算清单'
      },
      {
        value: 'allStdDocAssign',
        label: '所有学生档案分配'
      }
    ]
  },
  columns: [
    {
      title: '用户名',
      dataIndex: 'userName',
      key: 'userName',
      filters: []
    },
    {
      title: '老师名',
      dataIndex: 'nickName',
      key: 'nickName',
      filters: []
    },
    {
      title: '部门',
      dataIndex: 'deptName',
      key: 'deptName'
    },
    {
      title: '职位',
      dataIndex: 'postName',
      key: 'postName',
      filters: []
    },
    {
      title: '服务学生数',
      dataIndex: 'studentCnt',
      key: 'studentCnt',
      filters: []
    },
    {
      title: '员工类型',
      dataIndex: 'userType',
      key: 'userType'
    },
    {
      title: '所属分公司',
      dataIndex: 'parentDeptName',
      key: 'parentDeptName'
    },
    {
      title: '毕业院校',
      dataIndex: 'graduatedCollege',
      key: 'graduatedCollege'
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      slots: { customRender: 'operation' }
    }
  ]
}

export { allInformation }
