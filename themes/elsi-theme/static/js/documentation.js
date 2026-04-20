// Toggle activeness for sidebar button and doc content
function setActive(btn, content, allButtons, allContents) {
  allButtons.forEach(function (b) {
    b.classList.remove('active-sidebar-btn');
    b.classList.add('inactive-sidebar-btn');
  });
  allContents.forEach(function (div) {
    div.classList.remove('active-sidebar-btn');
    div.classList.add('inactive-sidebar-btn');
    div.style.display = 'none';
  });
  if (btn) {
    btn.classList.add('active-sidebar-btn');
    btn.classList.remove('inactive-sidebar-btn');
  }
  if (content) {
    content.classList.add('active-sidebar-btn');
    content.classList.remove('inactive-sidebar-btn');
    content.style.display = 'block';
  }
}

document.addEventListener('DOMContentLoaded', function () {
  var buttons = document.querySelectorAll('.documentation .docs-btn');
  var contents = document.querySelectorAll('.documentation .docs-page-container');
  let lastSelected = null;
  let currentSelected = null;

  // Show the first doc-content by default and set active class
  if (contents.length > 0 && buttons.length > 0) {
    setActive(buttons[0], contents[0], buttons, contents);
    currentSelected = contents[0];
  }

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var pageName = btn.dataset.page;
      lastSelected = currentSelected;
      currentSelected = document.querySelector('.doc-page-' + pageName);
      setActive(btn, currentSelected, buttons, contents);
    });
  });
});
