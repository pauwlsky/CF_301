
var gitHubControllerModule = (function(){

  gitHubController = {};

  gitHubController.showFollowing = function(){
    $('#github').hide();
    $('#following-li').on('click', function(e){
      console.log('click!')
      e.preventDefault();
      $('#project-container').hide();
      $('#about').hide();
      $('#github').fadeIn();
  });
};

  gitHubController.controllerInit = function(){
    gitHubController.showFollowing();
  }


return {
  controllerInit: gitHubController.controllerInit
}
})();
