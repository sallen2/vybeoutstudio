$(document).ready(() => {
  let slideUp = {
    distance: '450%',
    origin: 'bottom',
    opacity: null,
  };

  ScrollReveal().reveal('.cardMiddle', slideUp);

  $('.contribute').on('click', function (e) {
    localStorage.setItem('Producer', $(this).attr('producer'));
    localStorage.setItem('Beat', $(this).attr('beat'));
    localStorage.setItem('Tempo', $(this).attr('tempo'));
  });
});
