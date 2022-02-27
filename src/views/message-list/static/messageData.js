const messageData = {
  listColumns: [
    {
      title: '消息',
      dataIndex: 'messageContent',
      key: 'messageContent',
      width: 500,
    },
    {
      title: '发送者',
      dataIndex: 'createBy',
      key: 'createBy',
      width: 132,
    },
    {
      title: '发送时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 200,
    },
    {
      title: '消息状态',
      dataIndex: 'status',
      key: 'status',
      slots: { customRender: 'status' },
      width: 100,
    },
    {
      title: '更多操作',
      dataIndex: 'operation',
      key: 'operation',
      width: 150,
      fixed: 'right',
      slots: { customRender: 'operation' },
    },
  ],
}

export { messageData }
