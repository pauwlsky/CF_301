(function(module){
  function getTemplate(name, data, callback){
    console.log('inside of getTemplate');
    return $.ajax({
      type: 'GET',
      url: './templates-hbs/' + name + '.hbs',
      success: function(text){
        var template = Handlebars.compile(text);
        var html = template(data);
        callback(html);
      },
      error: function(xhr, status, error){
        console.log('inside template ajax error');
        console.log('ajax error', {xhr: xhr, status: status, error: error});
      }
    });
  }
  module.getTemplate = getTemplate;
})(window);
