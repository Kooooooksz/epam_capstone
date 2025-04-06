import { checkUserSignedIn } from "../common.js";

const header = document.querySelector("header");
checkUserSignedIn(header);

const sliderEl = document.querySelector(".slider");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const dotContainer = document.querySelector(".dots");

for (let i = 1; i < 6; i++) {
  const imgEl = `<img src="../../assets/slider_images/slider${i}.png" alt="Image ${i}" />`;
  sliderEl.insertAdjacentHTML("beforeend", imgEl);
}

let curSlide = 0;
const maxSlide = sliderEl.children.length;
console.log(sliderEl.children);

const createDots = function () {
  [...sliderEl.children].forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};

const activateDot = function (slide) {
  document
    .querySelectorAll(".dots__dot")
    .forEach((dot) => dot.classList.remove("dots__dot--active"));

  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add("dots__dot--active");
};

const goToSlide = function (slide) {
  const slideWidth = sliderEl.offsetWidth;
  [...sliderEl.children].forEach((s, i) => {
    s.style.transform = `translateX(${slideWidth * (i - slide)}px)`;
  });
  sliderEl.style.transform = `translateX(-${slide * 100}%)`;
};

const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }

  goToSlide(curSlide);
  activateDot(curSlide);
};

const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
  goToSlide(curSlide);
  activateDot(curSlide);
};

const init = function () {
  goToSlide(0);
  createDots();

  activateDot(0);
};
init();

prevBtn.addEventListener("click", prevSlide);
nextBtn.addEventListener("click", nextSlide);

document.addEventListener("keydown", function (e) {
  e.key === "ArrowLeft" && prevSlide();
  e.key === "ArrowRight" && nextSlide();
});

dotContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("dots__dot")) {
    curSlide = Number(e.target.dataset.slide);
    goToSlide(curSlide);
    activateDot(curSlide);
  }
});
