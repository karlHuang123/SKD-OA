const listParameters = {
  listColumns: [
    {
      title: '姓名',
      dataIndex: 'studentName',
      key: 'studentName',
      fixed: 'left',
    },
    {
      title: '电话',
      dataIndex: 'contact',
      key: 'contact',
      fixed: 'left',
      width: 132,
    },
    {
      title: '紧急联系人',
      dataIndex: 'urgentContact',
      key: 'urgentContact',
      width: 135,
    },
    {
      title: '微信号',
      dataIndex: 'wchart',
      key: 'wchart',
      width: 150,
    },
    {
      title: '报名时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 200,
      filters: [],
    },
    {
      title: '主申国家',
      dataIndex: 'applyMainCountry',
      key: 'applyMainCountry',
      filters: [],
    },
    {
      title: '辅申国家',
      dataIndex: 'applyBakCountry',
      key: 'applyBakCountry',
      filters: [],
    },
    {
      title: '申请专业',
      dataIndex: 'applyMajor',
      key: 'applyMajor',
    },
    {
      title: '入学年份',
      dataIndex: 'admissionYear',
      key: 'admissionYear',
      filters: [],
    },
    {
      title: 'VIP等级',
      dataIndex: 'productLevel',
      key: 'productLevel',
    },
    {
      title: '教务',
      dataIndex: 'createBy',
      key: 'createBy',
      fixed: 'right',
    },
    // {
    //   title: '已用课时',
    //   dataIndex: 'usedLesson',
    //   key: 'usedLesson',
    // },
    // {
    //   title: '回访记录',
    //   dataIndex: 'feedbackRecord',
    //   key: 'feedbackRecord',
    // },
    // {
    //   title: '课表',
    //   dataIndex: 'lessonChart',
    //   key: 'lessonChart',
    // },
    {
      title: '更多操作',
      dataIndex: 'operation',
      key: 'operation',
      width: 250,
      fixed: 'right',
      slots: { customRender: 'operation' },
    },
  ],
}

export { listParameters }
