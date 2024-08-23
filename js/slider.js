  document.addEventListener('DOMContentLoaded', function () {
    var swiper = new Swiper('.swipers', {
        // Optional parameters
        direction: 'horizontal',
        loop: true, // Enable infinite looping

        // Enable autoplay
        autoplay: {
            delay: 2500, // Delay between transitions (in ms)
            disableOnInteraction: false, // Continue autoplay after user interactions
        },
        
        // Show 2 slides at a time
        slidesPerView: 2, 

        // Space between slides
        spaceBetween: 20, // Adjust space between slides as needed

        // navigation: {
            // nextEl: '.swiper-button-next',
            // prevEl: '.swiper-button-prev',
        // },
        
        // If you want scrollbar
        // scrollbar: {
            // el: '.swiper-scrollbar',
        // },
    });
});
