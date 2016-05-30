(function(module){

  var projectView = {};

  projectView.populateFilters=function(){
    $.ajax({
      dataType: 'json',
      url:'js/portfolioitems.json',
      success:function(data){
        data.forEach(function(item){
          var skills = item.skills;
          skills.forEach(function(item){
            var option = '<option val="' + item + '">' + item + '</option>';
            if($('#skills-select option[val="'+ item +'"]').length===0){
              $('#skills-select').append(option);
            }
          });
        });
      }
    });
  };

  projectView.showSection = function(){
    $('#about').hide();
    $('#project-li').on('click', function(e){
      e.preventDefault();
      $('#about').hide();
      $('#project').fadeIn();
    });
    $('#about-li').on('click', function(e){
      e.preventDefault();
      $('#project').hide();
      $('#about').fadeIn();
    });
  };

  projectView.filterSelected = function(){
    $('#skills-select').on('change', function(e){
      var $selectVal = $(this).val();
      if($selectVal === 'See Project By Skills Used'){
        return;
      }
      $projectCategories = $('a[data-category="'+ $selectVal +'"]');
      $('article').hide();
      $projectCategories.parents('article').fadeIn();
      if($selectVal === 'See All Categories'){
        $('article').show();
      }
    });
  };

  projectView.showMore = function(){
    $('.text').find('p:gt(0)').hide();
    $('article').on('click', '.show-more', function(e){
      e.preventDefault();
      $(this).prev().children('p').fadeIn();
      $(this).hide();
    });
  };

  projectView.modalShow = function(){
    $('.modal-show').on('click', function(e){
      e.preventDefault();
      $('.modal').css('display', 'block');
      var title = $(this).parents('article').find('.title').text();
      var img = $(this).parents('article').find('.image').attr('src');
      $('.modal-content').append('<h1 class="header">'+ title +'</h1><img src="' + img + '"/>');
    });
    //logic for hiding modal on page click
    //TODO fix logic so modal hides when clicking off of modal
    $('.modal-content').on('click', function(e) {
      $('.modal').css('display', 'none');
      $('.modal-content').empty();
    });
  };

  projectView.showSkillImgs = function(){
    $('.skills').on('click', 'a', function(e){
      var that = this;
      var term = $(this).attr('data-category');
      e.preventDefault();
      var existingImages = $(this).parents('.skills-github').find('img');
      if(existingImages.attr('data-category') === term){
        return;
      };

      $(that).parents('.skills-github').find('.skills-images').hide().empty();
      $.ajax({
        type: 'get',
        url: 'js/images.json',
        success: function(data){
          data.images.filter(function(item){
            var regex = new RegExp(term , 'gi');
            return item.match(regex) != undefined;
          })
          .reduce(function(accum, index){
            if (accum.indexOf(index) < 0){
              accum.push(index);
            }
            return accum;
          }, [])
          .forEach(function(src){
            var image = $('<img src=' + src + ' data-category="'+ term +'">');
            $(that).parents('.skills-github').find('.skills-images').append(image);
          });
          $(that).parents('.skills-github').find('.skills-images').fadeIn('slow');
        }
      });
    });
  };

  projectView.controllerInit = function(){
    projectView.populateFilters();
    projectView.showSection();
    projectView.filterSelected();
    projectView.showMore();
    projectView.modalShow();
    projectView.showSkillImgs();
  };

  module.projectView = projectView;

})(window);
