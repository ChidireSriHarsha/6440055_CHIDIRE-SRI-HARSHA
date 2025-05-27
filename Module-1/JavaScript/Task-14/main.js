// Using jQuery to handle button click
$(document).ready(function() {
  $('#registerBtn').click(function() {
    // Toggle visibility of event cards with fade effect
    $('.event-card').each(function() {
      if ($(this).is(':visible')) {
        $(this).fadeOut();
      } else {
        $(this).fadeIn();
      }
    });
  });
});
