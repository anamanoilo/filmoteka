const scrollBtnTop = document.querySelector('[data-scroll-top]');
const scrollBtnBottom = document.querySelector('[data-scroll-bottom]');
const footer = document.querySelector('.footer');

window.onscroll = () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    scrollBtnBottom.classList.add('scroll__hide');
  } else {
    scrollBtnBottom.classList.remove('scroll__hide');
  }

  if (window.scrollY > 700) {
    scrollBtnTop.classList.remove('scroll__hide');
  } else if (window.scrollY < 700) {
    scrollBtnTop.classList.add('scroll__hide');
    scrollBtnBottom.classList.remove('scroll__hide');
  }
};

scrollBtnTop.onclick = () => {
  window.scrollTo(0, 0);
};

scrollBtnBottom.onclick = () => {
  footer.scrollIntoView({ block: 'start', behavior: 'smooth' });
};
