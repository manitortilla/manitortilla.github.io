
$('.carousel').carousel({ interval: 10000
})

function fnMove(seq){
var offset = $("#div" + seq).offset();
$('html,body').animate({scrollTop : offset.top}, 400);
}

function TopMove() {
var offset = $('body').offset();
$('html,body').animate({scrollTop : offset.top}, 400);
}
