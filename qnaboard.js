// sidebar menu toggle
$('.sidebarbtn').on('click', function(){
    //sidebarbtn color update
    $('.sidebarbtn').removeClass('on');
    $(this).addClass('on');
  
    var idx = $('.sidebarbtn').index(this);
    $('.detail').hide(); //style="display:none"
    $('.detail').eq(idx).show();
    if (idx == 0){ //편지 읽기 상태에서 메뉴 바꿨을 때 메일함이 디폴트로 올 수 있게
      $('.modal').hide();
      $('.faqlist').show();
    }
});

$('#faqclose').on('click',function(){
    $('#myModal').hide();
});

function showfaqcontent(){
    $('#myModal').show();
}

function submitqna(){
    content= document.getElementById("txt").value;

  var t = new Date(+new Date()+(1000*60*60*9));

  if (content != "") {
    document.getElementById("txt").value = ""; //clear
    alert("Thank you for submit qna. We will answer as soon as possible.");
  }
  else {
    alert ("You can not submit empty QNA writing.");
  }
};