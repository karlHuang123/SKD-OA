const formData = {
  listColumns: [
    {
      title: '上课日期',
      dataIndex: 'recordDate',
      key: 'recordDate'
    },
    {
      title: '上课时间',
      dataIndex: 'checkInTime',
      key: 'checkInTime'
    },
    {
      title: '下课时间',
      dataIndex: 'checkOutTime',
      key: 'checkOutTime'
    },
    {
      title: '课程名称',
      dataIndex: 'applyMajor',
      key: 'applyMajor'
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      width: 150,
      fixed: 'right',
      slots: { customRender: 'operation' }
    }
  ]
}

export { formData }
