const btn = document.querySelector('.mobile-menu-btn');
const links = document.querySelector('.header-links');

if (btn && links) {
  btn.addEventListener('click', () => {
    btn.classList.toggle('open');
    links.classList.toggle('open');
  });
}
