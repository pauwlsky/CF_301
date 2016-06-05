(function(module){
  var repos = {};
  repos.all = [];

  // console.log(githubToken);
  repos.requestRepos = function(callback){
    $.ajax({
      url: 'https://api.github.com/user/repos',
      type: 'GET',
      headers: {
        'Authorization' : 'token ' + githubToken
      },
      success: function(data, message, xhr){
        console.log('Success');
        repos.all = data;
        console.log(repos.all);
      },
      error: function(error){
        console.log('error');
      }
    }).then(callback);
  };


  module.repos = repos;

})(window);
