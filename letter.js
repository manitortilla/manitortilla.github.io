// sidebar menu toggle
$('.sidebarbtn').on('click', function(){
  //sidebarbtn color update
  $('.sidebarbtn').removeClass('on');
  $(this).addClass('on');

  //show the related content
  var idx = $('.sidebarbtn').index(this);
  $('.detail').hide(); //style="display:none"
  $('.detail').eq(idx).show();
  if (idx == 0){ //편지 읽기 상태에서 메뉴 바꿨을 때 메일함이 디폴트로 올 수 있게
    $('.lettercontent').hide();
    $('.mailbox').show();
  }
});


//load letter
var letters = document.getElementsByClassName("letter ");
for (i=0; i< letters.length; i++){
  letters[i].onclick = function() {
    document.getElementsByClassName("pad")[0].style.display = "none";
    document.getElementsByClassName("mailbox")[0].style.display = "none";
    document.getElementsByClassName("lettercontent")[0].style.display = "block";
  //  document.getElementById("letterdisplay").innerHTML = "편지내용";
    if ($(this).hasClass('new')){ //if it is a new letter, update as read
      $(this).removeClass(' new');
      $(this).addClass(' old');
      $(this).html('<i class="fas fa-envelope-open"></i>');
    }
  }
};

//load mailbox
document.getElementById("letterclose").onclick = function() {
  document.getElementsByClassName("lettercontent")[0].style.display = "none";
  document.getElementsByClassName("mailbox")[0].style.display = "grid";
  document.getElementsByClassName("pad")[0].style.display = "block";
};
