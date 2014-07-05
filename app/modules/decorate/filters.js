/* global decorateModule:true */

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
});

// 将装修状态转换为可读文字
decorateModule.filter('decorateStatus', function () {
  var dict = {
    'S10': '待装修公司握手',
    'S20': '待提交图纸',
    'S30': '图纸审核中',
    'S40': '待办装修许可',
    'S50': '许可通过待验收',
    'S60': '已申请验收待响应',
    'S70': '验收已响应待通过',
    'S80': '已验收待退款',
    'S90': '已退款',
    'SCANCEL': '申请取消'
  };

  return function (status) {
    return dict[status.toUpperCase()] || '不明状况';
  };
});

// // 将装修状态转换为可读文字
// decorateModule.filter('decorateAction', function () {
//   var dict = {
    
//   };

//   return function (status) {
//     return dict[status.toUpperCase()] || '不明状况';
//   };
// });