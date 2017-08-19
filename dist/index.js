var myIndex = 0;
// $('.nav').hide();
carousel();
var element_position = $('#header_nav2').offset().top;

function carousel() {
    var i;
    var x = document.getElementsByClassName("mySlides");
    for (i = 0; i < x.length; i++) {
       x[i].style.display = "none";  
    }
    myIndex++;
    if (myIndex > x.length) {myIndex = 1}    
    x[myIndex-1].style.display = "block";  
    setTimeout(carousel, 300); // Change image every 4 seconds
}

$(function(){
    $('#header_nav').data('size','big');
});

$(window).scroll(function(){
    if($(document).scrollTop() > element_position)
    {
        if($('#header_nav').data('size') == 'big')
        {

        	$('.nav').show();
            $('#header_nav').data('size','small');
            $('#header_nav').addClass('header_nav');
            $('#header_nav').addClass('animated fadeIn');
            $('#header_nav').removeClass('fadeOutUp');

        }
    }
    else
    {
        if($('#header_nav').data('size') == 'small')
        {
        	$('#header_nav').addClass('fadeOutUp');
        	$('#header_nav').removeClass('fadeIn');
            $('#header_nav').data('size','big');
        }  
    }
});