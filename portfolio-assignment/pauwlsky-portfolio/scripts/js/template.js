(function(module){
  function getCompiledTemplate(name){
    console.log('inside of getCompiledTemplate');
    return $.ajax({
      type: 'GET',
      url: '/templates-hbs/' + name + '.hbs'
    })
    .then(function(text){
      return Handlebars.compile(text);
    });


}
  module.getCompiledTemplate = getCompiledTemplate;
})(window);
