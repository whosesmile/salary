

// TEST
app.run(function ($http) {
  $http({
    method: 'post',
    data: {
      name: 'test'
    },
    params: {
      age: 31
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    url: 'mock/welcome.json'
  }).success(function (res) {
    window.console.log(res);
  });
});