$(function(){ 
  function buildHTML(message){
    if (message.content && message.image) {
      var html = `<div class="contents" data-message-id="${message.id}" >
                    <div class="chatdate__name">
                      ${message.user_name}
                    </div>
                    <div class="chatdate__time">
                      ${message.created_at}
                    </div>
                    <p class="message__content">
                      ${message.content}
                    </p>
                    <img class="message__image" src="${message.image}">
                 </div>`
    } else if (message.content) {
      var html = `<div class="contents" data-message-id="${message.id}" >
                    <div class="chatdate__name">
                      ${message.user_name}
                    </div>
                    <div class="chatdate__time">
                      ${message.created_at}
                    </div>
                    <p class="message__content">
                      ${message.content}
                    </p>
                  </div>`
    } else if (message.image) {
      var html = `<div class="contents" data-message-id="${message.id}" >
                    <div class="chatdate__name">
                      ${message.user_name}
                    </div>
                    <div class="chatdate__time">
                      ${message.created_at}
                    </div>
                    <img class="message__image" src="${message.image}">
                  </div>`
    };
    return html;
  };

  $('#new_message').on('submit', function(e) {
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action')
      $.ajax({
          url: url,
          type: 'POST',
          data: formData,  
          dataType: 'json',
          processData: false,
          contentType: false
      })
      .done(function(message){
        var html = buildHTML(message);
        $('.chat').append(html)
        $('.chat').animate({ scrollTop: $('.chat')[0].scrollHeight});
        $('#new_message')[0].reset();
        $('.form__submit').prop("disabled", false);
      })
      .fail(function(){
        alert("メッセージ送信に失敗しました");
      });
  })
  
  $(window).on('load', function() {
    var url = location.href
    if (url.match("messages")) {
      var reloadMessages = function() {
        last_message_id = $('.contents:last').data('message-id');
        $.ajax({
          url: 'api/messages',
          type: 'get',
          dataType: 'json',
          data: {id: last_message_id}
        })
        .done(function(messages) {
          var insertHTML = '';
          $.each(messages, function(i, message) {
            insertHTML += buildHTML (message)
            $('.chat').append(insertHTML);
            $('.chat').animate({ scrollTop: $('.chat')[0].scrollHeight});
          })
        })
        .fail(function(messages) {
          alert("更新に失敗しました");
        });
      };
      setInterval(reloadMessages, 7000);
    }
  })
});