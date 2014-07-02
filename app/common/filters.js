// 为了分割数组以便二次使用ng-repeat
// 通常需要的场景是你需要每隔N个元素插入分组节点
// 如果你修改items内部元素的属性 angular会自动watch更新
// 但如果你动态增删items的元素，你需要手动删除items.$rows，以便重新计算
app.filter('group', function () {
  return function (items, cols) {
    if (items && !items.$rows) {
      var rows = [];
      for (var i = 0; i < items.length; i++) {
        if (i % cols === 0) {
          rows.push([]);
        }
        rows[rows.length - 1].push(items[i]);
      }
      items.$rows = rows;
    }
    return items && items.$rows;
  }
});