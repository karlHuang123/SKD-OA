// 时间戳转换方法
/**
 * @params timestamp, 传入需要 转换的时间戳，
 * @params format, 默认为 "ymd", 代表 年月日， 'ymdhms' 代表 年月日时分秒, 'ymdhm' 代表 年月日时分, 'hm' 代表 时分  String
 * @content 如果只传递 timestamp 默认返回 年月日，
 * @return dateime
 * @author Ken
 * */
function padZero(num) {
  if (num < 10) {
    return `0${num}`
  } else {
    return num
  }
}

// 日期以及时间格式常量定义

const CONSTVARIABLE = {
  YMDHMS: 'yyyy-mm-dd hh:mm:ss', // 年月日时分秒
  YMDHM: 'yyyy-mm-dd hh:mm', // 年月日时分
  YMD: 'yyyy-mm-dd', // 年月日
  HMS: 'hh:mm:ss', // 时分秒
  HM: 'hh:mm', // 时分
  H: 'hh' // 时
}

const dateModeTransform = {
  dateModeTransform(timestamp, format = CONSTVARIABLE.YMD) {
    let datetime = new Date(timestamp)
    let year = datetime.getFullYear()
    let month = padZero(datetime.getMonth() + 1)
    let date = padZero(datetime.getDate())
    let hours = padZero(datetime.getHours())
    let minutes = padZero(datetime.getMinutes())
    let seconds = padZero(datetime.getSeconds())
    switch (format) {
      case CONSTVARIABLE.YMDHMS:
        // 年月日时分秒
        return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`

      case CONSTVARIABLE.YMDHM:
        // 年月日时分
        return `${year}-${month}-${date} ${hours}:${minutes}`

      case CONSTVARIABLE.YMD:
        // 年月日
        return `${year}-${month}-${date}`

      case CONSTVARIABLE.HMS:
        // 时分秒
        return `${hours}:${minutes}:${seconds}`

      case CONSTVARIABLE.HM:
        // 时分
        return `${hours}:${minutes}`

      case CONSTVARIABLE.H:
        // 时
        return `${hours}`

      default:
        // 默认返回 年月日
        return `${year}-${month}-${date}`
    }
  },

  //根据毫秒数获取日期
  msToDate(msec) {
    let datetime = new Date(msec)
    let year = datetime.getFullYear()
    let month = datetime.getMonth()
    let date = datetime.getDate()
    let hour = datetime.getHours()
    let minute = datetime.getMinutes()
    let second = datetime.getSeconds()

    let result1 =
      year +
      '-' +
      (month + 1 >= 10 ? month + 1 : '0' + (month + 1)) +
      '-' +
      (date + 1 < 10 ? '0' + date : date) +
      ' ' +
      (hour + 1 < 10 ? '0' + hour : hour) +
      ':' +
      (minute + 1 < 10 ? '0' + minute : minute) +
      ':' +
      (second + 1 < 10 ? '0' + second : second)

    let result2 =
      year +
      '-' +
      (month + 1 >= 10 ? month + 1 : '0' + (month + 1)) +
      '-' +
      (date + 1 < 11 ? '0' + date : date)

    let result = {
      hasTime: result1,
      withoutTime: result2
    }

    return result
  },

  /* 获取时间段内属于星期一(*)的日期们
   * begin: 开始时间
   * end：结束时间
   * weekNum：星期几 {number}
   */
  getWeek(begin, end, weeks) {
    var dateArr = new Array()
    var stimeArr = begin.split('-') //=>["2018", "01", "01"]
    var etimeArr = end.split('-') //=>["2018", "01", "30"]

    var stoday = new Date()
    stoday.setUTCFullYear(stimeArr[0], stimeArr[1] - 1, stimeArr[2])
    var etoday = new Date()
    etoday.setUTCFullYear(etimeArr[0], etimeArr[1] - 1, etimeArr[2])

    var unixDb = stoday.getTime() //开始时间的毫秒数
    var unixDe = etoday.getTime() //结束时间的毫秒数

    for (var k = unixDb; k <= unixDe; ) {
      let needJudgeDate = this.msToDate(parseInt(k)).withoutTime
      //不加这个if判断直接push的话就是已知时间段内的所有日期
      for (var i = 0; i < weeks.length; i++) {
        if (new Date(needJudgeDate).getDay() === weeks[i]) {
          dateArr.push(needJudgeDate)
        }
      }
      k = k + 24 * 60 * 60 * 1000
    }
    return dateArr
  }
}

export default dateModeTransform
