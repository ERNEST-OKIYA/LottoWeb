$(function() {
  $('a.mobile_menu_icon').on('click', function() {
      $(this).closest('nav').toggleClass('active');
      $('body').toggleClass('menu_showing');
  });
  $('#play-form').on('submit', function(event) {
    event.preventDefault();
    play();
        
   });
   $('#tickets-select').on('change', function() {
       const playEl = document.getElementById('play-amount');
       var tickets = Number($("#tickets-select option:selected").text());
       var amount = `KES ${tickets * 50}`
       const totalAmountEl = document.getElementById('total_amount');
       total_amount =tickets *50
       totalAmountEl.value = total_amount
       playEl.innerHTML = `${amount}`
        
   });
  if ($('.main-gallery').length) $('.main-gallery ul').slick({
      fade: true,
      speed: 1000,
      autoplay: true,
      autoplaySpeed: 3500,
      pauseOnFocus: false,
      pauseOnHover: false,
      arrows: false
  });
  if ($('ul.winner_gallery').length) $('ul.winner_gallery').slick({
      autoplaySpeed: 3000,
      arrows: false,
      autoplay: true,
      pauseOnFocus: false,
      pauseOnHover: false
  });
  if ($('.countdown_ticker').length) $('.countdown_ticker').each(function(i, el) {
      var title = $(this).data('title');
      $(this).countdown($(this).data('end-date'), function(event) {
          var $this = $(this).html('<h3>' + title + '</h3>' + event.strftime("<label><span>%D</span>Days</label><label><span>%H</span>Hours</label><label><span>%M</span>Minutes</label><label><span>%S</span>Seconds</label>"));
      });
  });
}
);
// AJAX for posting
function play() {
    console.log("create post is working!") // sanity check
    const form = document.getElementById('play-form');
    const data = Object.fromEntries(new FormData(form).entries());
    const submitData = { 'amount':data.total_amount,'msisdn':data.msisdn }
    console.log(JSON.stringify(submitData));
    $.ajax({
        url : "https://app.jisortleo.co.ke:3030/ipn/stk-push/", // the endpoint
        type : "POST",
        contentType: 'application/json',
        data : JSON.stringify(submitData),

        // handle a successful response
        success : function(json) {
            $('#results').html("<div class='alert-box alert radius' style='color:#ffff;font-size:20px;font-weight:bold;border:1px red;' data-alert>"+json.message+
                "</div>");
        },

        // handle a non-successful response
        error : function(xhr,errmsg,err) {
            $('#results').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: "+errmsg+
                " <a href='#' class='close'>&times;</a></div>"); // add the error to the dom
            console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
        }
    });
};
