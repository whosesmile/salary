homeModule.filter('salary', function () {

  return function (input) {
    if (/^\d+$/.test(input)) {
      return (parseFloat(input) / 10000).toFixed(0) + '万';
    }
    return input;
  };

});