$(function(){
  function buildHTML(message){
    if (message.image) {
      var html = `<div class="chatdate__name">
                    ${message.user_name}
                  </div>
                  <div class="chatdate__time">
                    ${message.created_at}
                  </div>
                  <p class="message__content">
                    ${message.content}
                  </p>
                  <img class="message__image" src="${message.image}">`
    } else {
      var html = `<div class="chatdate__name">
                    ${message.user_name}
                  </div>
                  <div class="chatdate__time">
                    ${message.created_at}
                  </div>
                  <p class="message__content">
                    ${message.content}
                  </p>`
    }
    return html;
  }




  $('#new_message').on ('submit', function(e) {
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
})