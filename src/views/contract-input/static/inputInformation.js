const inputInformation = {
  productLevelListVIP: [
    {
      label: 'VIP1点校',
      value: 'VIP1点校'
    },
    {
      label: 'TOP3',
      value: 'TOP3'
    },
    {
      label: 'TOP5',
      value: 'TOP5'
    },
    {
      label: 'TOP8',
      value: 'TOP8'
    }
  ],
  productLevelListNoVIP: [
    {
      label: '单作品集',
      value: '单作品集'
    },
    {
      label: '单作品集加文书申请',
      value: '单作品集加文书申请'
    },
    {
      label: '单项目',
      value: '单项目'
    }
  ],
  applyMajorList: [
    {
      label: '平面',
      value: '平面'
    },
    {
      label: '交互',
      value: '交互'
    },
    {
      label: '服务',
      value: '服务'
    },
    {
      label: '视觉传达',
      value: '视觉传达'
    },
    {
      label: '工业',
      value: '工业'
    },
    {
      label: '产品',
      value: '产品'
    }
  ],
  applyDegreeList: [
    {
      label: '本科',
      value: '本科'
    },
    {
      label: '本科预科',
      value: '本科预科'
    },
    {
      label: '研究生预科',
      value: '研究生预科'
    },
    {
      label: '研究生',
      value: '研究生'
    },
    {
      label: '高中',
      value: '高中'
    },
    {
      label: '初中',
      value: '初中'
    }
  ],
  mainCountryList: [
    {
      label: '美国',
      value: '美国'
    },
    {
      label: '英国',
      value: '英国'
    },
    {
      label: '日本',
      value: '日本'
    },
    {
      label: '意大利',
      value: '意大利'
    },
    {
      label: '法国',
      value: '法国'
    },
    {
      label: '中国',
      value: '中国'
    }
  ],
  subCountryList: [
    {
      label: '无',
      value: '无'
    },
    {
      label: '美国',
      value: '美国'
    },
    {
      label: '英国',
      value: '英国'
    },
    {
      label: '日本',
      value: '日本'
    },
    {
      label: '意大利',
      value: '意大利'
    },
    {
      label: '法国',
      value: '法国'
    },
    {
      label: '中国',
      value: '中国'
    }
  ],
  schoolAreaList: [
    {
      label: '北京校区',
      value: 101
    },
    {
      label: '上海校区',
      value: 203
    },
    {
      label: '成都校区',
      value: 219
    },
    {
      label: '大连校区',
      value: 205
    },
    {
      label: '青岛校区',
      value: 206
    },
    {
      label: '武汉校区',
      value: 202
    },
    {
      label: '广州校区',
      value: 204
    }
  ],
  parameterMap: [
    {
      key: 'name',
      label: '学生姓名'
    },
    {
      key: 'gender',
      label: '学生性别'
    },
    {
      key: 'contactPhone',
      label: '联系方式(电话)'
    },
    {
      key: 'wechatNum',
      label: '微信号'
    },
    {
      key: 'emrgencyContact',
      label: '紧急联系人'
    },
    {
      key: 'pdoructType',
      label: '产品类别'
    },
    {
      key: 'productLevel',
      label: '产品级别'
    },
    {
      key: 'applyMajor',
      label: '申请专业'
    },
    {
      key: 'applyDegree',
      label: '申请学历'
    },
    {
      key: 'mainCountry',
      label: '主申国家'
    },
    {
      key: 'subCountry',
      label: '辅申国家'
    },
    {
      key: 'enterYear',
      label: '入学年份'
    },
    {
      key: 'contractSignTime',
      label: '合同签约日期'
    },
    {
      key: 'contractEndTime',
      label: '合同截至日期'
    },
    {
      key: 'schoolArea',
      label: '学习校区'
    }
  ],
  serviceList: [
    {
      label: '作品集专业课',
      value: 'productMajor'
    },
    {
      label: '教研服务',
      value: 'research'
    },
    {
      label: '申请服务',
      value: 'apply'
    },
    {
      label: '学员升级服务',
      value: 'upgrade'
    }
  ],
  projectCombo: {
    singleModule: {
      productMajor: [
        {
          projectKey: 'SKDModuleOne',
          projectName: 'SKD作品集专业Module 1（必修）',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'productMajor'
        },
        {
          projectKey: 'SKDModuleTwo',
          projectName: 'SKD作品集专业Module 2（必修）',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'productMajor'
        },
        {
          projectKey: 'SKDModuleThree',
          projectName: 'SKD作品集专业Module 3（必修）',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'productMajor'
        },
        {
          projectKey: 'SKDModuleFour',
          projectName: 'SKD作品集专业Module 4（必修）',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'productMajor'
        }
      ],
      research: [
        {
          projectKey: 'recordAndFeedback',
          projectName: '教务日常跟踪及课后反馈',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'research'
        },
        {
          projectKey: 'critiqueAndSupervise',
          projectName: '教研日常Critique及阶段性监控',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'research'
        },
        {
          projectKey: 'projectQABySchoolArea',
          projectName: '单项目校区QA1评估审核监控',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'research'
        },
        {
          projectKey: 'schoolChooseGuide',
          projectName: '针对选校排版指导(一版)',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'research'
        }
      ],
      apply: [],
      upgrade: []
    },
    vipOne: {
      productMajor: [
        {
          projectKey: 'SKDSoftwareBasic',
          projectName: 'SKD软件基础课 小班课',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'productMajor'
        },
        {
          projectKey: 'SKDMajorTheoryImprove',
          projectName: 'SKD专业理论提升 Open Lecture',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'productMajor'
        },
        {
          projectKey: 'SKDMajorTheoryOneOnOne',
          projectName: 'SKD专业理论基础课 1v1（10）',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'productMajor'
        },
        {
          projectKey: 'SKDMajorSkillOneOnOne',
          projectName: 'SKD专业技能基础课 1v1（10）',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'productMajor'
        },
        {
          projectKey: 'SKDModuleOne',
          projectName: 'SKD作品集专业Module 1（必修）',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'productMajor'
        },
        {
          projectKey: 'SKDModuleTwo',
          projectName: 'SKD作品集专业Module 2（必修）',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'productMajor'
        },
        {
          projectKey: 'SKDModuleThree',
          projectName: 'SKD作品集专业Module 3（必修）',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'productMajor'
        },
        {
          projectKey: 'SKDModuleFour',
          projectName: 'SKD作品集专业Module 4（必修）',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'productMajor'
        },
        {
          projectKey: 'SKDModuleFive',
          projectName: 'SKD作品集专业Module 5（选修/独立命题）',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'productMajor'
        },
        {
          projectKey: 'SKDInterview',
          projectName: 'SKD1v1专业面试辅导',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'productMajor'
        },
        {
          projectKey: 'SKDTreble X',
          projectName: 'SKD Treble X（vip学生项目可置换）',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'productMajor'
        },
        {
          projectKey: 'SKDWorkshop',
          projectName: 'SKD Workshop',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'productMajor'
        },
        {
          projectKey: 'SKDVIPSpecialService',
          projectName: 'SKD VIP点校定制化服务',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'productMajor'
        },
        {
          projectKey: 'SKDPortfolioLayout',
          projectName: 'SKD作品集排版 Open Lecture',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'productMajor'
        },
        {
          projectKey: 'SKDGlobalCollegeAnalyze',
          projectName: 'SKD全球院校解析Open Lecture',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'productMajor'
        },
        {
          projectKey: 'SKDPaperImprove',
          projectName: 'SKD专业论文写作提升课Open Lecture',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'productMajor'
        },
        {
          projectKey: 'SKDPAndCImprove',
          projectName: 'SKD人文提升课 Open Lecture',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'productMajor'
        },
        {
          projectKey: 'SKDMasterShare',
          projectName: 'SKD大师行业分享会 Open Lecture',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'productMajor'
        }
      ],
      research: [
        {
          projectKey: 'oneOnOneSpecialPlan',
          projectName: '1v1个性化定制教学规划 (3节课后)',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'research'
        },
        {
          projectKey: 'recordAndFeedback',
          projectName: '教务日常跟踪及课后反馈',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'research'
        },
        {
          projectKey: 'critiqueAndSupervise',
          projectName: '教研日常Critique及阶段性监控',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'research'
        },
        {
          projectKey: 'projectQABySchoolArea',
          projectName: '单项目校区QA1评估审核监控',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'research'
        },
        {
          projectKey: 'projectQAByCountry',
          projectName: '单项目全国QA1评估审核监控',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'research'
        },
        {
          projectKey: 'admissionQA',
          projectName: '选校录取评估QA2评估审核监控',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'research'
        },
        {
          projectKey: 'paperTextTransfer',
          projectName: '全套作品集文字描述翻译（2000字符内）',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'research'
        },
        {
          projectKey: 'schoolChooseGuide',
          projectName: '针对选校排版指导(一版)',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'research'
        },
        {
          projectKey: 'schoolChooseGuideAll',
          projectName: '针对选校排版指导(全版)',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'research'
        },
        {
          projectKey: 'essayGuide',
          projectName: '针对选校小论文指导（essay）',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'research'
        },
        {
          projectKey: 'teachingTrackAndFeedback',
          projectName: '教学及教务主管跟踪及课后反馈',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'research'
        },
        {
          projectKey: 'overSeaQAProfessorOneProject',
          projectName: '海外教授QA3评估审核监控-单项目（书面报告）',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'research'
        },
        {
          projectKey: 'overSeaQAProfessorAll',
          projectName: '海外教授QA3评估审核监控（书面报告）',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'research'
        },
        {
          projectKey: 'mockInterview',
          projectName: '海外教授模拟面试',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'research'
        }
      ],
      apply: [
        {
          projectKey: 'collegeSelectAndValued',
          projectName: '选校分析与评估',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'apply'
        },
        {
          projectKey: 'essayWritten',
          projectName: '文书材料撰写（PS/CV/RL )',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'apply'
        },
        {
          projectKey: 'applyAndSubmit',
          projectName: '送分、邮寄、网申和提交',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'apply'
        },
        {
          projectKey: 'transcriptAndCertificationTransfer',
          projectName: '成绩单、毕业证翻译',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'apply'
        },
        {
          projectKey: 'transcriptCertificated',
          projectName: '成绩单认证',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'apply'
        },
        {
          projectKey: 'collegeELIApply',
          projectName: '指定院校语言班申请',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'apply'
        },
        {
          projectKey: 'collegeAdvisor',
          projectName: 'Offer选校建议',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'apply'
        },
        {
          projectKey: 'visaApplyAndGuide',
          projectName: '留学签证办理和面签指导',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'apply'
        },
        {
          projectKey: 'specialOneOnOnePlanService',
          projectName: '1v1专属规划师全程服务（背景提升、时间规划）',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'apply'
        },
        {
          projectKey: 'overseaProfessorEssayService',
          projectName: '海外博士团队文书服务',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'apply'
        },
        {
          projectKey: 'professorReference',
          projectName: '海外名校教授推荐信',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'apply'
        },
        {
          projectKey: 'pickUpService',
          projectName: '境外接机服务',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'apply'
        },
        {
          projectKey: 'houseApply',
          projectName: '境外住宿申请',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'apply'
        },
        {
          projectKey: 'relativesVisaApply',
          projectName: '家长旅行签证办理',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'apply'
        },
        {
          projectKey: 'vipParentsMeeting',
          projectName: 'VIP专属家长会',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'apply'
        },
        {
          projectKey: 'freshManService',
          projectName: '一周新生服务（海外学长学姐接待导览）',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'apply'
        }
      ],
      upgrade: [
        {
          projectKey: 'GalleryWalk',
          projectName: 'Gallery Walk',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'upgrade'
        },
        {
          projectKey: 'relatedInternRecommend',
          projectName: '相关实习推荐',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'upgrade'
        },
        {
          projectKey: 'bigCompaniesInternRecommend',
          projectName: '大厂实习推荐',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'upgrade'
        },
        {
          projectKey: 'shortTermLesson',
          projectName: '海外/业内名师驻地短期课程',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'upgrade'
        },
        {
          projectKey: 'graduationShowPlan',
          projectName: '毕业展策划',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'upgrade'
        },
        {
          projectKey: 'topSummerSchoolApply',
          projectName: '顶尖夏校申请',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'upgrade'
        },
        {
          projectKey: 'lessonAndGraduationGuide',
          projectName: '在读学校课程辅导、毕设辅导',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'upgrade'
        },
        {
          projectKey: 'raceProjectGuide',
          projectName: '竞赛项目辅导',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'upgrade'
        },
        {
          projectKey: 'personalWebDesign',
          projectName: '个人网站定制设计',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'upgrade'
        }
      ]
    },
    vipTopThree: {
      productMajor: [
        {
          projectKey: 'SKDSoftwareBasic',
          projectName: 'SKD软件基础课 小班课',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'productMajor'
        },
        {
          projectKey: 'SKDMajorTheoryImprove',
          projectName: 'SKD专业理论提升 Open Lecture',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'productMajor'
        },
        {
          projectKey: 'SKDMajorTheoryOneOnOne',
          projectName: 'SKD专业理论基础课 1v1（10）',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'productMajor'
        },
        {
          projectKey: 'SKDModuleOne',
          projectName: 'SKD作品集专业Module 1（必修）',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'productMajor'
        },
        {
          projectKey: 'SKDModuleTwo',
          projectName: 'SKD作品集专业Module 2（必修）',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'productMajor'
        },
        {
          projectKey: 'SKDModuleThree',
          projectName: 'SKD作品集专业Module 3（必修）',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'productMajor'
        },
        {
          projectKey: 'SKDModuleFour',
          projectName: 'SKD作品集专业Module 4（必修）',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'productMajor'
        },
        {
          projectKey: 'SKDModuleFive',
          projectName: 'SKD作品集专业Module 5（选修/独立命题）',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'productMajor'
        },
        {
          projectKey: 'SKDInterview',
          projectName: 'SKD1v1专业面试辅导',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'productMajor'
        },
        {
          projectKey: 'SKDTreble X',
          projectName: 'SKD Treble X（vip学生项目可置换）',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'productMajor'
        },
        {
          projectKey: 'SKDWorkshop',
          projectName: 'SKD Workshop',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'productMajor'
        },
        {
          projectKey: 'SKDPortfolioLayout',
          projectName: 'SKD作品集排版 Open Lecture',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'productMajor'
        },
        {
          projectKey: 'SKDGlobalCollegeAnalyze',
          projectName: 'SKD全球院校解析Open Lecture',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'productMajor'
        },
        {
          projectKey: 'SKDPaperImprove',
          projectName: 'SKD专业论文写作提升课Open Lecture',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'productMajor'
        },
        {
          projectKey: 'SKDPAndCImprove',
          projectName: 'SKD人文提升课 Open Lecture',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'productMajor'
        },
        {
          projectKey: 'SKDMasterShare',
          projectName: 'SKD大师行业分享会 Open Lecture',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'productMajor'
        }
      ],
      research: [
        {
          projectKey: 'oneOnOneSpecialPlan',
          projectName: '1v1个性化定制教学规划 (3节课后)',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'research'
        },
        {
          projectKey: 'recordAndFeedback',
          projectName: '教务日常跟踪及课后反馈',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'research'
        },
        {
          projectKey: 'critiqueAndSupervise',
          projectName: '教研日常Critique及阶段性监控',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'research'
        },
        {
          projectKey: 'projectQABySchoolArea',
          projectName: '单项目校区QA1评估审核监控',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'research'
        },
        {
          projectKey: 'projectQAByCountry',
          projectName: '单项目全国QA1评估审核监控',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'research'
        },
        {
          projectKey: 'admissionQA',
          projectName: '选校录取评估QA2评估审核监控',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'research'
        },
        {
          projectKey: 'paperTextTransfer',
          projectName: '全套作品集文字描述翻译（2000字符内）',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'research'
        },
        {
          projectKey: 'schoolChooseGuide',
          projectName: '针对选校排版指导(一版)',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'research'
        },
        {
          projectKey: 'schoolChooseGuideAll',
          projectName: '针对选校排版指导(全版)',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'research'
        },
        {
          projectKey: 'essayGuide',
          projectName: '针对选校小论文指导（essay）',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'research'
        },
        {
          projectKey: 'teachingTrackAndFeedback',
          projectName: '教学及教务主管跟踪及课后反馈',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'research'
        },
        {
          projectKey: 'overSeaQAProfessorOneProject',
          projectName: '海外教授QA3评估审核监控-单项目（书面报告）',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'research'
        }
      ],
      apply: [
        {
          projectKey: 'collegeSelectAndValued',
          projectName: '选校分析与评估',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'apply'
        },
        {
          projectKey: 'essayWritten',
          projectName: '文书材料撰写（PS/CV/RL )',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'apply'
        },
        {
          projectKey: 'applyAndSubmit',
          projectName: '送分、邮寄、网申和提交',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'apply'
        },
        {
          projectKey: 'transcriptAndCertificationTransfer',
          projectName: '成绩单、毕业证翻译',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'apply'
        },
        {
          projectKey: 'transcriptCertificated',
          projectName: '成绩单认证',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'apply'
        },
        {
          projectKey: 'collegeELIApply',
          projectName: '指定院校语言班申请',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'apply'
        },
        {
          projectKey: 'collegeAdvisor',
          projectName: 'Offer选校建议',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'apply'
        },
        {
          projectKey: 'visaApplyAndGuide',
          projectName: '留学签证办理和面签指导',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'apply'
        },
        {
          projectKey: 'specialOneOnOnePlanService',
          projectName: '1v1专属规划师全程服务（背景提升、时间规划）',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'apply'
        },
        {
          projectKey: 'overseaProfessorEssayService',
          projectName: '海外博士团队文书服务',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'apply'
        },
        {
          projectKey: 'professorReference',
          projectName: '海外名校教授推荐信',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'apply'
        },
        {
          projectKey: 'pickUpService',
          projectName: '境外接机服务',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'apply'
        },
        {
          projectKey: 'houseApply',
          projectName: '境外住宿申请',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'apply'
        },
        {
          projectKey: 'relativesVisaApply',
          projectName: '家长旅行签证办理',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'apply'
        },
        {
          projectKey: 'vipParentsMeeting',
          projectName: 'VIP专属家长会',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'apply'
        },
        {
          projectKey: 'freshManService',
          projectName: '一周新生服务（海外学长学姐接待导览）',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'apply'
        }
      ],
      upgrade: [
        {
          projectKey: 'GalleryWalk',
          projectName: 'Gallery Walk',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'upgrade'
        },
        {
          projectKey: 'relatedInternRecommend',
          projectName: '相关实习推荐',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'upgrade'
        },
        {
          projectKey: 'bigCompaniesInternRecommend',
          projectName: '大厂实习推荐',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'upgrade'
        },
        {
          projectKey: 'shortTermLesson',
          projectName: '海外/业内名师驻地短期课程',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'upgrade'
        },
        {
          projectKey: 'graduationShowPlan',
          projectName: '毕业展策划',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'upgrade'
        },
        {
          projectKey: 'topSummerSchoolApply',
          projectName: '顶尖夏校申请',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'upgrade'
        },
        {
          projectKey: 'lessonAndGraduationGuide',
          projectName: '在读学校课程辅导、毕设辅导',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'upgrade'
        }
      ]
    },
    vipTopFive: {
      productMajor: [
        {
          projectKey: 'SKDSoftwareBasic',
          projectName: 'SKD软件基础课 小班课',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'productMajor'
        },
        {
          projectKey: 'SKDMajorTheoryImprove',
          projectName: 'SKD专业理论提升 Open Lecture',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'productMajor'
        },
        {
          projectKey: 'SKDMajorSkillOneOnOne',
          projectName: 'SKD专业技能基础课 1v1（10）',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'productMajor'
        },
        {
          projectKey: 'SKDModuleOne',
          projectName: 'SKD作品集专业Module 1（必修）',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'productMajor'
        },
        {
          projectKey: 'SKDModuleTwo',
          projectName: 'SKD作品集专业Module 2（必修）',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'productMajor'
        },
        {
          projectKey: 'SKDModuleThree',
          projectName: 'SKD作品集专业Module 3（必修）',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'productMajor'
        },
        {
          projectKey: 'SKDModuleFour',
          projectName: 'SKD作品集专业Module 4（必修）',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'productMajor'
        },
        {
          projectKey: 'SKDModuleFive',
          projectName: 'SKD作品集专业Module 5（选修/独立命题）',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'productMajor'
        },
        {
          projectKey: 'SKDInterview',
          projectName: 'SKD1v1专业面试辅导',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'productMajor'
        },
        {
          projectKey: 'SKDTreble X',
          projectName: 'SKD Treble X（vip学生项目可置换）',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'productMajor'
        },
        {
          projectKey: 'SKDWorkshop',
          projectName: 'SKD Workshop',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'productMajor'
        },
        {
          projectKey: 'SKDVIPSpecialService',
          projectName: 'SKD VIP点校定制化服务',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'productMajor'
        },
        {
          projectKey: 'SKDPortfolioLayout',
          projectName: 'SKD作品集排版 Open Lecture',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'productMajor'
        },
        {
          projectKey: 'SKDGlobalCollegeAnalyze',
          projectName: 'SKD全球院校解析Open Lecture',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'productMajor'
        },
        {
          projectKey: 'SKDPaperImprove',
          projectName: 'SKD专业论文写作提升课Open Lecture',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'productMajor'
        },
        {
          projectKey: 'SKDPAndCImprove',
          projectName: 'SKD人文提升课 Open Lecture',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'productMajor'
        },
        {
          projectKey: 'SKDMasterShare',
          projectName: 'SKD大师行业分享会 Open Lecture',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'productMajor'
        }
      ],
      research: [
        {
          projectKey: 'oneOnOneSpecialPlan',
          projectName: '1v1个性化定制教学规划 (3节课后)',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'research'
        },
        {
          projectKey: 'recordAndFeedback',
          projectName: '教务日常跟踪及课后反馈',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'research'
        },
        {
          projectKey: 'critiqueAndSupervise',
          projectName: '教研日常Critique及阶段性监控',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'research'
        },
        {
          projectKey: 'projectQABySchoolArea',
          projectName: '单项目校区QA1评估审核监控',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'research'
        },
        {
          projectKey: 'projectQAByCountry',
          projectName: '单项目全国QA1评估审核监控',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'research'
        },
        {
          projectKey: 'admissionQA',
          projectName: '选校录取评估QA2评估审核监控',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'research'
        },
        {
          projectKey: 'paperTextTransfer',
          projectName: '全套作品集文字描述翻译（2000字符内）',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'research'
        },
        {
          projectKey: 'schoolChooseGuide',
          projectName: '针对选校排版指导(一版)',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'research'
        },
        {
          projectKey: 'schoolChooseGuideAll',
          projectName: '针对选校排版指导(全版)',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'research'
        },
        {
          projectKey: 'essayGuide',
          projectName: '针对选校小论文指导（essay）',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'research'
        },
        {
          projectKey: 'teachingTrackAndFeedback',
          projectName: '教学及教务主管跟踪及课后反馈',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'research'
        }
      ],
      apply: [
        {
          projectKey: 'collegeSelectAndValued',
          projectName: '选校分析与评估',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'apply'
        },
        {
          projectKey: 'essayWritten',
          projectName: '文书材料撰写（PS/CV/RL )',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'apply'
        },
        {
          projectKey: 'applyAndSubmit',
          projectName: '送分、邮寄、网申和提交',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'apply'
        },
        {
          projectKey: 'transcriptAndCertificationTransfer',
          projectName: '成绩单、毕业证翻译',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'apply'
        },
        {
          projectKey: 'transcriptCertificated',
          projectName: '成绩单认证',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'apply'
        },
        {
          projectKey: 'collegeELIApply',
          projectName: '指定院校语言班申请',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'apply'
        },
        {
          projectKey: 'collegeAdvisor',
          projectName: 'Offer选校建议',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'apply'
        },
        {
          projectKey: 'visaApplyAndGuide',
          projectName: '留学签证办理和面签指导',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'apply'
        },
        {
          projectKey: 'specialOneOnOnePlanService',
          projectName: '1v1专属规划师全程服务（背景提升、时间规划）',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'apply'
        },
        {
          projectKey: 'relativesVisaApply',
          projectName: '家长旅行签证办理',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'apply'
        },
        {
          projectKey: 'vipParentsMeeting',
          projectName: 'VIP专属家长会',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'apply'
        }
      ],
      upgrade: [
        {
          projectKey: 'GalleryWalk',
          projectName: 'Gallery Walk',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'upgrade'
        },
        {
          projectKey: 'relatedInternRecommend',
          projectName: '相关实习推荐',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'upgrade'
        },
        {
          projectKey: 'graduationShowPlan',
          projectName: '毕业展策划',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'upgrade'
        }
      ]
    },
    vipTopEight: {
      productMajor: [
        {
          projectKey: 'SKDSoftwareBasic',
          projectName: 'SKD软件基础课 小班课',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'productMajor'
        },
        {
          projectKey: 'SKDMajorTheoryImprove',
          projectName: 'SKD专业理论提升 Open Lecture',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'productMajor'
        },
        {
          projectKey: 'SKDModuleOne',
          projectName: 'SKD作品集专业Module 1（必修）',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'productMajor'
        },
        {
          projectKey: 'SKDModuleTwo',
          projectName: 'SKD作品集专业Module 2（必修）',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'productMajor'
        },
        {
          projectKey: 'SKDModuleThree',
          projectName: 'SKD作品集专业Module 3（必修）',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'productMajor'
        },
        {
          projectKey: 'SKDModuleFour',
          projectName: 'SKD作品集专业Module 4（必修）',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'productMajor'
        },
        {
          projectKey: 'SKDInterview',
          projectName: 'SKD1v1专业面试辅导',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'productMajor'
        },
        {
          projectKey: 'SKDTreble X',
          projectName: 'SKD Treble X（vip学生项目可置换）',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'productMajor'
        },
        {
          projectKey: 'SKDWorkshop',
          projectName: 'SKD Workshop',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'productMajor'
        },
        {
          projectKey: 'SKDPortfolioLayout',
          projectName: 'SKD作品集排版 Open Lecture',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'productMajor'
        },
        {
          projectKey: 'SKDGlobalCollegeAnalyze',
          projectName: 'SKD全球院校解析Open Lecture',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'productMajor'
        },
        {
          projectKey: 'SKDPaperImprove',
          projectName: 'SKD专业论文写作提升课Open Lecture',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'productMajor'
        },
        {
          projectKey: 'SKDPAndCImprove',
          projectName: 'SKD人文提升课 Open Lecture',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'productMajor'
        },
        {
          projectKey: 'SKDMasterShare',
          projectName: 'SKD大师行业分享会 Open Lecture',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'productMajor'
        }
      ],
      research: [
        {
          projectKey: 'oneOnOneSpecialPlan',
          projectName: '1v1个性化定制教学规划 (3节课后)',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'research'
        },
        {
          projectKey: 'recordAndFeedback',
          projectName: '教务日常跟踪及课后反馈',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'research'
        },
        {
          projectKey: 'critiqueAndSupervise',
          projectName: '教研日常Critique及阶段性监控',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'research'
        },
        {
          projectKey: 'projectQABySchoolArea',
          projectName: '单项目校区QA1评估审核监控',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'research'
        },
        {
          projectKey: 'admissionQA',
          projectName: '选校录取评估QA2评估审核监控',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'research'
        },
        {
          projectKey: 'paperTextTransfer',
          projectName: '全套作品集文字描述翻译（2000字符内）',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'research'
        },
        {
          projectKey: 'schoolChooseGuide',
          projectName: '针对选校排版指导(一版)',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'research'
        },
        {
          projectKey: 'essayGuide',
          projectName: '针对选校小论文指导（essay）',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'research'
        }
      ],
      apply: [
        {
          projectKey: 'collegeSelectAndValued',
          projectName: '选校分析与评估',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'apply'
        },
        {
          projectKey: 'essayWritten',
          projectName: '文书材料撰写（PS/CV/RL )',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'apply'
        },
        {
          projectKey: 'applyAndSubmit',
          projectName: '送分、邮寄、网申和提交',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'apply'
        },
        {
          projectKey: 'transcriptAndCertificationTransfer',
          projectName: '成绩单、毕业证翻译',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'apply'
        },
        {
          projectKey: 'transcriptCertificated',
          projectName: '成绩单认证',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'apply'
        },
        {
          projectKey: 'collegeELIApply',
          projectName: '指定院校语言班申请',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'apply'
        },
        {
          projectKey: 'collegeAdvisor',
          projectName: 'Offer选校建议',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'apply'
        },
        {
          projectKey: 'visaApplyAndGuide',
          projectName: '留学签证办理和面签指导',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'apply'
        },
        {
          projectKey: 'vipParentsMeeting',
          projectName: 'VIP专属家长会',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'apply'
        }
      ],
      upgrade: [
        {
          projectKey: 'GalleryWalk',
          projectName: 'Gallery Walk',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'upgrade'
        },
        {
          projectKey: 'graduationShowPlan',
          projectName: '毕业展策划',
          projectTeacherId: null,
          projectTeacherChinesename: null,
          projectPredictCost: '',
          projectPeriod: null,
          status: 0,
          type: 'upgrade'
        }
      ]
    }
  }
}

export { inputInformation }
