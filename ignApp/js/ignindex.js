      //articles
      $.ajax({
      url: 'http://ign-apis.herokuapp.com/articles?startIndex=0\\u0026count=10',
      dataType: 'jsonp', //allows to change domain
      type: 'GET',
      
      success: function(data){
        console.log(data);
        var count = 1;
        var num;
        //set up number index
        for( x in data.data ){
          if(x == 9){
            num = 10;
          }
          else{
            num = '0'+count;
          } 
          //not printing sub headline if null
        var sub =  data.data[x].metadata.subHeadline;
        if(!sub){
          sub = '';
        }
        $('#articles').append('<a href="#" class="toggle">'+num+'&nbsp;&nbsp;&nbsp;'+data.data[x].metadata.headline+'<p>'+sub+'</p></a><div title="'+data.data[x].metadata.headline+'" class="drop"><a href="http://www.ign.com/articles/'+data.data[x].metadata.slug+'"><img src="'+data.data[x].thumbnails[2].url+'"></a></div>'); 
        count++;
        }
      },
    error: function(data){
    console.log(data);
    }
  });

      //videos
    
    $.ajax({

      url: 'http://ign-apis.herokuapp.com/videos?startIndex=0\\u0026count=10',
      dataType: 'jsonp', //allows to change domain
      type: 'GET',
      
      success: function(data){
        console.log(data);
        var count = 1;
        var num;
        for( x in data.data ){
          if(x == 9){
            num = 10;
          }
          else{
            num = '0'+count;
          }
          $('#videos').append('<a href="#" class="toggle">'+num+'&nbsp;&nbsp;&nbsp;'+data.data[x].metadata.name+'<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+data.data[x].metadata.longTitle+'</p></a><div title="'+data.data[x].metadata.description+'" class="drop"><a href="'+data.data[x].metadata.url+'"><img src="'+data.data[x].thumbnails[2].url+'"></a></div>'); 
          count++;
        }
      },
    error: function(data){
    console.log(data);
    }
  });
//Handles two main views
(function($) {
  var tabs =  $(".tabs li a");
  tabs.click(function() {
    var content = this.hash.replace('/','');
    tabs.removeClass("active");
    $(this).addClass("active");
    $("#content").find('div').hide();
    $(content).fadeIn(200);
  });
})(jQuery);


$('#videos').on('click', '.toggle', function(e) {
    // do something
    $(this).toggleClass('active').next().slideToggle("fast");
    e.preventDefault();
});

$('#articles').on('click', '.toggle', function(e) {
    // do something
    $(this).toggleClass('active').next().slideToggle("fast");
    e.preventDefault();
});
