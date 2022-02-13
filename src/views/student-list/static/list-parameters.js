const listParameters = {
  listColumns: [
    {
      title: '报名时间',
      dataIndex: 'applyTime',
      key: 'applyTime',
      filters: [],
    },
    {
      title: '姓名',
      dataIndex: 'studentName',
      key: 'studentName',
    },
    {
      title: '主申国家',
      dataIndex: 'mainCountry',
      key: 'mainCountry',
      filters: [],
    },
    {
      title: '辅申国家',
      dataIndex: 'subCountry',
      key: 'subCountry',
      filters: [],
    },
    {
      title: '申请专业',
      dataIndex: 'applyMajor',
      key: 'applyMajor',
    },
    {
      title: '入学年份',
      dataIndex: 'enterTime',
      key: 'enterTime',
      filters: [],
    },
    {
      title: 'VIP等级',
      dataIndex: 'vipLevel',
      key: 'vipLevel',
    },
    {
      title: '教务',
      dataIndex: 'educational',
      key: 'educational',
    },
    {
      title: '已用课时',
      dataIndex: 'usedLesson',
      key: 'usedLesson',
    },
    {
      title: '回访记录',
      dataIndex: 'feedbackRecord',
      key: 'feedbackRecord',
    },
    {
      title: '课表',
      dataIndex: 'lessonChart',
      key: 'lessonChart',
    },
    {
      title: '更多操作',
      dataIndex: 'operation',
      key: 'operation',
      slots: { customRender: 'operation' },
    },
  ],
}

export { listParameters }
