(function(module){

  var GitHub = function(props){
    this.id = props.id,
    this.login = props.login,
    this.avatar = props.avatar,
    this.html = props.html
  };

  GitHub.all = [];



  GitHub.getFollowers = function() {
        $.ajax({
          url: '/following',
        }).then(function(data){
          JSON.parse(data).forEach(function(item){
            github = new GitHub(item);
            GitHub.all.push(github);
          });
          console.log(GitHub.all);
        })
    };

  GitHub.initAndFetchAll = function(callback){
    return getCompiledTemplate('githubfollowing')
    .then(function(f){
      GitHub.compiledTemplate = f;
      Project.fetchAll(callback)
    });
  }

    GitHub.getFollowers();

    module.GitHub = GitHub;

})(window);
