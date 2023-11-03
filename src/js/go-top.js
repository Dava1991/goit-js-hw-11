const goTopBtn = document.querySelector(".go-top");

window.addEventListener("scroll", trackScroll);

goTopBtn.addEventListener("click", goTop);

function trackScroll() {

  const scrolled = window.pageYOffset;

  const coords = document.documentElement.clientHeight;

  if (scrolled > coords) {

    goTopBtn.classList.add("show-go-top");
  } else {

    goTopBtn.classList.remove("show-go-top");
  }
}

function goTop() {

  if (window.pageYOffset > 0) {
  
    window.scrollBy(0, -25);
    setTimeout(goTop, 0); 
  }
}