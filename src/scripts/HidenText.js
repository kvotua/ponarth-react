document.addEventListener("DOMContentLoaded", function() {
    const bigTextElements = document.querySelectorAll(".line_text, .texter, .texter_seven, .text, .texter_six, .big_text_four_page, .big_text_four_page2, .big_text_four_right");
  
    function handleScroll() {
      bigTextElements.forEach(element => {
        if (!element.classList.contains("visible_text") && isElementInViewport(element)) {
          element.classList.add("visible_text");
        }
      });
    }
  
    function isElementInViewport(el) {
      var rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    }
  
    window.addEventListener('scroll', handleScroll);
  });
  