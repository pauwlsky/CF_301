(function(module) {
  var aboutController = {};

  aboutController.index = function() {
    $('.tab-content').hide();
    $('#about').show();
    $('.aboutRepos').show();
    $('.aboutSection').hide();

    repos.requestRepos(repoView.index);
  };

  module.aboutController = aboutController;
})(window);
