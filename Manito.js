
// sidebar menu toggle
$('.sidebarbtn').on('click', function(){
    //sidebarbtn color update
    $('.sidebarbtn').removeClass('on');
    $(this).addClass('on');
  
    //show the related content
    var idx = $('.sidebarbtn').index(this);
    $('.detail').hide(); //style="display:none"
    $('.detail').eq(idx).show();
    if (idx == 0){ 
      $('.manitomain').show();
      $('.guesswindow').hide();
    }
  }); 

$('#guessingbutton').on('click', function(){
    if($(this).hasClass('guessbtn posi')){
        document.getElementsByClassName("manitomain")[0].style.display = "none";
        document.getElementsByClassName("guesswindow")[0].style.display = "block";
    }
    
});

$('#guesswindowclose').on('click', function(){
    document.getElementsByClassName("guesswindow")[0].style.display = "none";
    document.getElementsByClassName("manitomain")[0].style.display = "block";
});


$('#guessuserbutton1').on('click',function(){
    const result = confirm('Would you choose this one as Manito?');
    if(result){
        var photo_html = $('#guessprofile1').html();
        $('#manitoprofile').removeClass(' empty');
        $('#manitoprofile').html(photo_html);
        $('#guessingbutton').removeClass(' posi');
        $('#guessingbutton').addClass(' nega');
        document.getElementsByClassName("guesswindow")[0].style.display = "none";
        document.getElementsByClassName("manitomain")[0].style.display = "block";
    }
    else{

    }
    
});

$('#guessuserbutton2').on('click',function(){
    const result = confirm('Would you choose this one as Manito?');
    if(result){
        var photo_html = $('#guessprofile2').html();
        $('#manitoprofile').removeClass(' empty');
        $('#manitoprofile').html(photo_html);
        $('#guessingbutton').removeClass(' posi');
        $('#guessingbutton').addClass(' nega');
        document.getElementsByClassName("guesswindow")[0].style.display = "none";
        document.getElementsByClassName("manitomain")[0].style.display = "block";
    }
    else{

    }
    
});
$('#guessuserbutton3').on('click',function(){
    const result = confirm('Would you choose this one as Manito?');
    if(result){
        var photo_html = $('#guessprofile3').html();
        $('#manitoprofile').removeClass(' empty');
        $('#manitoprofile').html(photo_html);
        $('#guessingbutton').removeClass(' posi');
        $('#guessingbutton').addClass(' nega');
        document.getElementsByClassName("guesswindow")[0].style.display = "none";
        document.getElementsByClassName("manitomain")[0].style.display = "block";
    }
    else{

    }
    
});