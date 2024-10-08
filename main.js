// page loader

const pageLoader = document.querySelector('.page-loader');

document.addEventListener('DOMContentLoaded', function (e) {
  setTimeout(() => {
    pageLoader.style.opacity = '0';
  }, 1500);

  setTimeout(() => {
    pageLoader.style.display = 'none';
  }, 2000);
});

// work grid hover play & pop-up player

const workItems = document.querySelectorAll('.work-item');
const modalWrapper = document.querySelector('.modal-wrapper');

workItems.forEach((item) => {
  // hover play
  const targetVideo = item.querySelector('video');

  item.addEventListener('mouseover', function () {
    targetVideo.play();
  });

  item.addEventListener('mouseout', function () {
    targetVideo.pause();
  });

  item.addEventListener('touchstart', function () {
    targetVideo.play();
  });

  item.addEventListener('touchend', function () {
    targetVideo.pause();
  });

  // click to open pop-up player
  item.addEventListener('click', function () {
    item.setAttribute('aria-expanded', 'true');
    const targetVideoSrc = item.querySelector('source').src;

    modalWrapper.classList.add('flex-center');
    modalWrapper.querySelector('video').src = targetVideoSrc;

    modalWrapper.addEventListener('click', (e) => {
      if (e.target.className === 'modal-bg') {
        item.setAttribute('aria-expanded', 'false');
        modalWrapper.classList.remove('flex-center');
      }
    });
  });
});

// 'Esc' key to close modal
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    modalWrapper.classList.remove('flex-center');

    workItems.forEach((item) => {
      item.setAttribute('aria-expanded', 'false');
    });
  }
});

// marquee scrollTrigger

const marqueeRows = document.querySelectorAll('.marquee-row');
const marqueeCont = document.querySelector('.marquee-wrapper');

marqueeRows.forEach((row, index) => {
  let direction = index % 2 === 0 ? 1 : -1;

  const tween = gsap.from(row, { xPercent: direction * 50, duration: 0.4 });

  ScrollTrigger.create({
    animation: tween,
    trigger: marqueeCont,
    start: 'top 90%',
    end: 'bottom top',
    toggleActions: 'play reverse restart reverse',
  });
});

// testimonial box switching

const tabIcons = document.querySelectorAll('.tab-icon');
const quoteEl = document.querySelector('#testimonial-quote');
const nameEl = document.querySelector('#testimonial-name');
const companyEl = document.querySelector('#testimonial-company');

const testimonialsArr = [
  {
    quote: 'Mythology exceeds our expectation with their VFX team.',
    name: 'Brandon K.',
    company: 'Vanguard Networks',
  },
  {
    quote: 'It was an absolute please to collaborate with the Mythology team.',
    name: 'Julia Margrete M.',
    company: 'Faze Blockchain',
  },
  {
    quote: 'Recommended to those who look for highest standard.',
    name: 'Louis R.',
    company: 'Dicee',
  },
];

let currIndex = 0;

const testimonialTl = gsap
  .timeline({ repeat: -1, repeatDelay: 2.5 })
  .to('.testimonial-box', { opacity: 0, duration: 0.3 })
  .call(changeContent)
  .to('.testimonial-box', { opacity: 1, duration: 0.3 });

function changeContent() {
  currIndex++;

  if (currIndex >= testimonialsArr.length) {
    currIndex = 0;
  }

  quoteEl.textContent = testimonialsArr[currIndex].quote;
  nameEl.textContent = testimonialsArr[currIndex].name;
  companyEl.textContent = testimonialsArr[currIndex].company;

  tabIcons.forEach((icon) => icon.classList.remove('active'));
  tabIcons[currIndex].classList.add('active');
}

// big video 3d rotation

const bigVideoContainerEl = document.querySelector('#big-video-container');
const bigVideoWrapperEl = document.querySelector('#big-video-wrapper');
const bigVideoEl = document.querySelector('#big-video');

bigVideoContainerEl.addEventListener('mousemove', (e) => {
  let mouseX = e.clientX;
  let mouseY = e.clientY;
  let dx = mouseX - bigVideoContainerEl.offsetWidth / 2;
  let dy = mouseY - bigVideoContainerEl.offsetHeight / 2;
  let xAxisDeg = (dy / 100) * 6;
  let yAxisDeg = (dx / 100) * 2;

  bigVideoWrapperEl.style.transform = `rotateX(${-xAxisDeg}deg) rotateY(${yAxisDeg}deg) translateZ(-80px)`;
});

// text content fade in

const contentBlocks = document.querySelectorAll('.content-fade');

contentBlocks.forEach((block) => {
  const parentContainer = block.parentNode;

  const tween = gsap.from(block, { opacity: 0, yPercent: 50, duration: 0.3 });

  ScrollTrigger.create({
    animation: tween,
    trigger: parentContainer,
    start: 'top 50%',
    end: 'bottom top',
  });
});

// Lenis Scroll

const lenis = new Lenis();

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// fix for GSAP trigger position shifting because of lenis

ScrollTrigger.normalizeScroll(true);
