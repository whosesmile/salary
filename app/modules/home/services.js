homeModule.factory('homeService', function ($http) {

  return {
    listSkill: function () {
      return $http({
        url: '/service/skill',
        method: 'get',
        cache: true
      });
    },

    getQuestions: function (skill) {
      return $http({
        url: '/service/questions',
        method: 'get',
        cache: true
      });
    }
  };

});