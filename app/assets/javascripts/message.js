$(function(){
  function buildHTML(message){
    if (message.image) {
      var html =`
        <div class="main__contents__text">
          <div class="main__contents__text__subjects">
            <div class="main__contents__text__subjects__title">
              ${message.user_name}
            </div>
            <div class="main__contents__text__subjects__date">
              ${message.created_at}
            </div>
          </div>
          <div class="main__contents__text__sentence">
            <p class="lower-message__content">
              ${message.content}
            </p>
          </div>
          <img src=${message.image} class="lower-message__image">
        </div>`
    } else {
      var html =`
      <div class="main__contents__text">
          <div class="main__contents__text__subjects">
            <div class="main__contents__text__subjects__title">
              ${message.user_name}
            </div>
            <div class="main__contents__text__subjects__date">
              ${message.created_at}
            </div>
          </div>
          <div class="main__contents__text__sentence">
            <p class="lower-message__content">
              ${message.content}
            </p>
          </div>
      </div>`
    };
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url, 
      type: "POST",
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.main__contents').append(html);
      $('form')[0].reset();
      $('.main__contents').animate({ scrollTop: $('.main__contents')[0].scrollHeight});
      $('.main__submit__send').prop('disabled', false);

    })
    .fail(function(){
      alert('メッセージを送信できません');
    });
  })
});
