// 将房屋状态转换为可读文字
decorateModule.filter('houseStatus', function () {
  var dict = {
    0: '申请装修',
    1: '正在装修',
    2: '已经装修'
  };
  return function (status) {
    return dict[status] || '不明状况';
  };
})