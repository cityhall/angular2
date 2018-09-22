
 setTimeout(function(){ 
    $(document).ready(function () {
        $('[data-toggle="tooltip"]').tooltip()
    });
   
 }, 5000);


//home
$('body').on('click', '.nuttab li', function () {
    $('.nuttab li').removeClass('ex2-active');
    $(this).addClass('ex2-active');
    var x = $(this).index();
    x++;
    $('.ctab ul li').removeClass('show-ex2');
    $('.ctab ul li:nth-child('+x+')').addClass('show-ex2');
});


var i = 1;
$('.example3 .slideanh').append("<img src='' class='ttt'>");
$('body').on('click', '.example3 .dieuhuong .nphai', function () {
    var c = $(this).parent().parent().children('.slideanh').children('img').length;
    var str = $(this).parent().parent().children('.slideanh').children('.ttt');
    if (i == c-1) {
        i = 0
    }
    i++;
    str.attr({ src: $(this).parent().parent().children('.slideanh').children('img:nth-child(' + i + ')').attr('src') });
    
});

$('body').on('click', '.example3 .dieuhuong .ntrai', function () {
    var c = $(this).parent().parent().children('.slideanh').children('img').length;
    var str = $(this).parent().parent().children('.slideanh').children('.ttt');
    if (i == 1) {
        i = c - 2;
    } else {
        i--;
    }
    str.attr({ src: $(this).parent().parent().children('.slideanh').children('img:nth-child(' + i + ')').attr('src') });

});


$('body').on('click', '.quickview', function () {
    var str = $(this).parent().parent().children('.slideanh').children('.ttt').attr('src');
    if (str.length !== 0) {
        $('.popimg').attr({ src: str });
    } else {
        $('.popimg').attr({ src: $(this).parent().parent().children('.slideanh').children('img:nth-last-child(2)').attr('src') });
    }
    $('.popup').addClass('show');
    $('.den').addClass('show');
});

$('body').on('click', '.nclose', function () {
    $('.popup').removeClass('show');
    $('.den').removeClass('show');
});
$('body').on('click', '.den', function () {
    $('.popup').removeClass('show');
    $('.den').removeClass('show');
});
$(document).keyup(function(e){
    if (e.keyCode==27) {
        $('.popup').removeClass('show');
        $('.den').removeClass('show');
    }
})

