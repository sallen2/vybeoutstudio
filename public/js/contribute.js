$(document).ready(() => {
  $('a').on('click', function (e) {
    localStorage.setItem('Producer', $(this).attr('producer'));
    localStorage.setItem('Beat', $(this).attr('beat'));
  });
});
