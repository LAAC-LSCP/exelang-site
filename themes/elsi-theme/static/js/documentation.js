// Toggle activeness for sidebar button and doc content
function setActive(btn, allButtons) {
  allButtons.forEach(function (b) {
    b.classList.remove('active-sidebar-btn');
    b.classList.add('inactive-sidebar-btn');
  });
  if (btn) {
    btn.classList.add('active-sidebar-btn');
    btn.classList.remove('inactive-sidebar-btn');
  }
}

document.addEventListener('DOMContentLoaded', function () {
  var buttons = document.querySelectorAll('.documentation .docs-btn');

  const hash = window.location.hash.substring(1);
  if (hash) {
    buttons.forEach(btn => {
      if (btn.getAttribute('data-page') === hash) {
        btn.classList.remove('inactive-sidebar-btn');
        btn.classList.add('active-sidebar-btn');
      }
    });
  }

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      setActive(btn, buttons);
    });
  });

  window.addEventListener('hashchange', function () {
    const subhash = window.location.hash.substring(1);
    buttons.forEach(btn => {
      if (btn.getAttribute('data-page') === subhash) {
        setActive(btn, buttons)
      }
    });
  });

});
