module.exports = {
  userstatus: function(e) {
    const data = {
      "0": "禁用",
      "1": "启用"
    };
    return data[e]
  },
  menustatus: function(e) {
    const data = {
      "0": "启用",
      "1": "禁用"
    };
    return data[e]
  },
  payStatus: function(e) {
    const data = {
      "1": "已发货",
      "2": "已签收",
      "3": "已退回",
      "4": "异常",
      "5": "其他",
      "6": "已激活"
    };
    return data[e]
  },
  timeStampToYMR: function(timestamp) {
    var d = new Date(timestamp * 1000); //根据时间戳生成的时间对象
    var date = (d.getFullYear()) + "年" +
      (d.getMonth() + 1) + "月" +
      (d.getDate()) + "日";
    return date;
  },
  timeStampToYMRDot: function(timestamp) {
    var d = new Date(timestamp * 1000); //根据时间戳生成的时间对象
    var date = (d.getFullYear()) + "." +
      (d.getMonth() + 1) + "." +
      (d.getDate());
    return date;
  },
  timeStampToYMRHMS: function(timestamp) {
    var d = new Date(timestamp); //根据时间戳生成的时间对象

    var date = (d.getFullYear()) + "-" +
      (d.getMonth() < 9 ? `0${d.getMonth() + 1}` : d.getMonth() + 1 ) + "-" +
      (d.getDate() < 10 ? `0${d.getDate()}` : d.getDate()) + " " +
      (d.getHours() < 10 ? `0${d.getHours()}` : d.getHours()) + ":" +
      (d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes()) + ":" +
      (d.getSeconds() < 10 ? `0${d.getSeconds()}` : d.getSeconds());
    return date;
  }
}
