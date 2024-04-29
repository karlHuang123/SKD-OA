const listParameters = {
  listColumns: [
    {
      title: '姓名',
      dataIndex: 'studentName',
      key: 'studentName',
      fixed: 'left',
      width: 150
    },
    {
      title: '学生ID',
      dataIndex: 'studentId',
      key: 'studentId',
      fixed: 'left',
      width: 100
    },
    // {
    //   title: '电话',
    //   dataIndex: 'contact',
    //   key: 'contact',
    //   fixed: 'left',
    //   width: 132
    // },
    // {
    //   title: '紧急联系人',
    //   dataIndex: 'urgentContact',
    //   key: 'urgentContact',
    //   width: 135
    // },
    {
      title: '微信号',
      dataIndex: 'wchart',
      key: 'wchart',
      width: 150
    },
    // {
    //   title: '报名时间',
    //   dataIndex: 'createTime',
    //   key: 'createTime',
    //   width: 200,
    //   filters: []
    // },
    {
      title: '主申国家',
      dataIndex: 'applyMainCountry',
      key: 'applyMainCountry',
      filters: []
    },
    // {
    //   title: '辅申国家',
    //   dataIndex: 'applyBakCountry',
    //   key: 'applyBakCountry',
    //   filters: []
    // },
    {
      title: '产品类型',
      dataIndex: 'applyEducation',
      key: 'applyEducation',
      slots: { customRender: 'applyEducation' }
    },
    {
      title: '入学年份',
      dataIndex: 'admissionYear',
      key: 'admissionYear',
      filters: []
    },
    {
      title: '产品级别',
      dataIndex: 'productLevel',
      key: 'productLevel',
      width: 100,
      slots: { customRender: 'productLevel' }
    },
    {
      title: '教务',
      dataIndex: 'createBy',
      key: 'createBy',
      width: 95,
      fixed: 'right'
    },
    {
      title: '合同签约时间',
      dataIndex: 'contractSignDate',
      key: 'contractSignDate'
    },
    {
      title: '合同截止时间',
      dataIndex: 'contractEndDate',
      key: 'contractEndDate'
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
      width: 260,
      fixed: 'right',
      slots: { customRender: 'operation' }
    }
  ],
  allList: [
    {
      title: '电话',
      dataIndex: 'contact',
      key: 'contact',
      width: 132
    },
    {
      title: '紧急联系人',
      dataIndex: 'urgentContact',
      key: 'urgentContact',
      width: 135
    },
    {
      title: '微信号',
      dataIndex: 'wchart',
      key: 'wchart',
      width: 150
    },
    {
      title: '报名时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 200,
      filters: []
    },
    {
      title: '学生状态',
      dataIndex: 'status',
      key: 'status',
      width: 200,
      filters: []
    },
    {
      title: '申请专业',
      dataIndex: 'applyMajor',
      key: 'applyMajor',
      filters: []
    },
    {
      title: '在读学校',
      dataIndex: 'studySchool',
      key: 'studySchool',
      filters: []
    },
    {
      title: '主申国家',
      dataIndex: 'applyMainCountry',
      key: 'applyMainCountry',
      filters: []
    },
    {
      title: '辅申国家',
      dataIndex: 'applyBakCountry',
      key: 'applyBakCountry',
      filters: []
    },
    {
      title: '产品类型',
      dataIndex: 'applyEducation',
      key: 'applyEducation'
    },
    {
      title: '入学年份',
      dataIndex: 'admissionYear',
      key: 'admissionYear',
      filters: []
    },
    {
      title: '产品级别',
      dataIndex: 'productLevel',
      key: 'productLevel'
    },
    {
      title: '负责教务',
      dataIndex: 'createBy',
      key: 'createBy',
      fixed: 'right'
    },
    {
      title: '合同签约时间',
      dataIndex: 'contractSignDate',
      key: 'contractSignDate',
      fixed: 'right'
    },
    {
      title: '合同截止时间',
      dataIndex: 'contractEndDate',
      key: 'contractEndDate',
      fixed: 'right'
    },
    {
      title: '负责顾问',
      dataIndex: 'consultantName',
      key: 'consultantName',
      fixed: 'right'
    }
  ],
  feedbackList: [
    {
      title: '回访时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 300,
      slots: { customRender: 'createTime' }
    },
    {
      title: '回访信息',
      dataIndex: 'feedback',
      key: 'feedback'
    }
  ],
  applyDegreeMap: {
    EnglandBachelorRegular: '英本常规',
    AmericaBachelorRegular: '美本常规',
    EnglandMasterRegular: '英研常规',
    AmericaMasterRegular: '美研常规',
    EnglandBachelorSpace: '英本空间',
    AmericaBachelorSpace: '美本空间',
    EnglandMasterSpace: '英研空间',
    AmericaMasterSpace: '美研空间',
    FashionAndArts: '时尚/艺术产业(英美)',
    EnglandMovie: '英国电影',
    EnglandMovieFilm: '英国电影(含拍摄)',
    AmericaMovie: '美国电影',
    AmericaMovieFilm: '美国电影(含拍摄)',
    NotVip: '非VIP单作品集(多个项目)',
    NotVipFlexible: '非VIP单作品集(灵活组合)'
  },
  productLevelMap: {
    TOPOne: 'TOP1',
    TOPTwo: 'TOP2',
    TOPThree: 'TOP3',
    TOP3AndUAL: 'TOP3/UAL',
    TOPFour: 'TOP4',
    TOPFive: 'TOP5',
    TOPSix: 'TOP6',
    TOPSeven: 'TOP7',
    TOPEight: 'TOP8',
    TOPNine: 'TOP9',
    TOPTen: 'TOP10',
    TOPFifteen: 'TOP15',
    TOPTwenty: 'TOP20',
    TOPThirty: 'TOP30',
    BETC: 'BETC',
    ALEVEL: 'ALEVEL',
    Young: 'Young',
    IB: 'IB',
    AP: 'AP',
    NotVipCombo: '非VIP',
    NotVipFlexibleCombo: '非VIP灵活组合'
  },
  courseMap: {
    additionalService: '教学教研增值服务',
    applyService: '后期申请增值服务',
    backgroundUpgrade: '学术背景提升服务',
    basicCourse: '基础课',
    overseaMentor: '海外名师授课',
    professionalCourse: '专业课',
    subjectCamp: '跨学科营地',
    OneOnOne: '一对一服务'
  }
}

export { listParameters }
