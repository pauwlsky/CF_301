(function(module){


  var Project = function(title, date, img, text, skills, url) {
    this.title = title;
    this.date = date;
    this.img = img;
    this.text = text;
    this.skills = skills;
    this.url = url;
  };

  Project.all = [];

  Handlebars.registerHelper('join', function(options) {
    var newSkills = '';
    var skills = options.fn(this).split(',');
    skills.forEach(function(item){
      newSkills += '<a data-category="' + item + '" href="#">  ' + item + '  </a>';
    });
    return newSkills;
  });

  Project.prototype.toHtml = function(callback){
    console.log('inside of toHtml');
    this.daysAgo = 'Created about ' + parseInt((new Date() - new Date(this.date))/60/60/24/1000) + ' days ago';
    //adding getTeplate(name for ajax call, data to pass in: this, and then the callback? Render()?)?
    // var articleTemplate = $('#project').html();
    // var compiledTemplate = Handlebars.compile(articleTemplate);
    // var html = compiledTemplate(this);
    // return html;
    getTemplate('project', this , function(html){
      $('#project-container').append(html);
    }).then(callback());
  };

  Project.prototype.alternate = function(){
    console.log('inside of alternate');
    var lastArticle = $('article:last');
    if (lastArticle.prev('article').find('.title-date').hasClass('text-left')){
      lastArticle.find('.title-date').removeClass('text-left').addClass('text-right');
      lastArticle.find('.text').removeClass('text-right').addClass('text-left');
      lastArticle.find('img').removeClass('image-left').addClass('image-right');
      lastArticle.find('.skills-github').removeClass('text-right').addClass('text-left');
    };
  };


  Project.render = function(item){
    var project = new Project(item.title, item.date, item.img, item.text, item.skills, item.url);
    Project.all.push(project);
    localStorage.setItem('projects' , JSON.stringify(Project.all));
    //will just be projecttoHtml();, the callback in tohtml will append and alternate?
    // $('#project-container').append(project.toHtml());
    project.toHtml(project.alternate);
  };

  Project.fetchAll = function(callback){
    //check for local storage of objects
    if (localStorage.projects){
      var projects = localStorage.getItem('projects');
      JSON.parse(projects).map(function(item){
        Project.render(item);
      });
      Project.all.length = 0;
      $.ajax({
        type: 'HEAD',
        url:'js/portfolioitems.json',
        async: false,
        success:function(data, message, xhr){
          newEtag = xhr.getResponseHeader('eTag');
          return newEtag;
        }
      });
      var etag = localStorage.getItem('etag');
      if (etag != newEtag){
        console.log('not the same!');
        localStorage.setItem('etag' , newEtag);
        $('#project').empty();
        $.ajax({
          dataType: 'json',
          url:'js/portfolioitems.json',
          async: false,
          success:function(data){
            data.sort(function(a,b){
              return (new Date(b.date)) - (new Date(a.date));
            });
            data.map(function(item){
              Project.render(item);
            });
            Project.all.length = 0;
          }
        });
      }
      callback();
    }
    else {
      //ajax call to portfolioitems.json data and Project construction and project template removal
      $.ajax({
        dataType: 'json',
        url:'js/portfolioitems.json',
        async: false,
        success:function(data, message, xhr){
          etag = xhr.getResponseHeader('eTag');
          localStorage.setItem('etag' , etag);
          data.sort(function(a,b){
            return (new Date(b.date)) - (new Date(a.date));
          });
          data.map(function(item){
            Project.render(item);
          });
          Project.all.length = 0;
          callback();
        }
      });
    }
  };

  module.Project = Project;

})(window);
