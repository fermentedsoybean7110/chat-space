$(function(){
  var reloadMessages = function() {
    var last_message_id = $('.main__contents__text:last').data("message-id");
    $.ajax({
      
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.main__contents').append(insertHTML);
        $('.main__contents').animate({ scrollTop: $('.main__contents')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  function buildHTML(message){
    if (message.image) {
      var html =`
        <div class="main__contents__text" data-message-id=${message.id}>
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
      <div class="main__contents__text" data-message-id=${message.id}>
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
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});
