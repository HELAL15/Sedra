$(document).ready(function(){
    // dir
    var bodyDir = $('body').css('direction')
    var dirAr
    if(bodyDir == "rtl"){
      dirAr= true
    }
    else{
      dirAr = false
    }
    
    // loader
    $('#loading').fadeOut(500);

    new WOW().init();

    
    /* -------------- upload profile pic ---------------- */
    if($('.profile-pic').length > 0){
        const imgDiv = document.querySelector('.profile-pic');
        const img = document.querySelector('#photo');
        const file = document.querySelector('#file');
        const uploadBtn = document.querySelector('#uploadBtn');
        
        //when we choose a pic to upload
        
        file.addEventListener('change', function(){
          const choosedFile = this.files[0];
          if (choosedFile) {
            const reader = new FileReader(); 
            reader.addEventListener('load', function(){
                img.setAttribute('src', reader.result);
            });
            reader.readAsDataURL(choosedFile);
          }
        });
    
    }



    const navToggler = document.getElementById("nav-toggler");
    const collapse = document.querySelector(".navbar-collapse");
    const close = document.getElementById("close");

    close.addEventListener("click" , ()=>{
      collapse.classList.remove("active")
    })

    navToggler.addEventListener("click" , ()=>{
      collapse.classList.toggle("active")
    })




    // owl carousel
    $("header .owl-carousel").owlCarousel({
        nav: false,
        autoplay: false,
        autoplayHoverPause: true,
        responsiveClass: true,
        items: 1,
        rtl: dirAr,
        dots: true,
        margin: 20
    });


    $('.categories .owl-carousel').owlCarousel({
      rtl: dirAr,
      loop:true,
      margin:15,
      nav:false,
      dots: false,
      responsive:{
          0:{
              items:1
          },
          600:{
              items:4
          },
          1000:{
              items:6
          }
      }
    })




const dots = document.querySelectorAll(".header-home .owl-carousel .owl-dots .owl-dot span");
const angle = 90 / (dots.length - 1);
for (let i = 0; i < dots.length; i++) {
  const margin = (Math.sin(angle * i) * 15) - 15;
  dots[i].style.marginBottom = `${margin}px`;
  if (i === 0 || i === dots.length - 1) {
    dots[i].style.margin = '0 16px 16px 16px';
  }
}


// increment & decrement

document.querySelectorAll(".controls").forEach(control => {
  let plus = control.querySelector(".plus");
  let minus = control.querySelector(".minus");
  let result = control.querySelector(".result");

  let count = 0;

  plus.addEventListener("click", () => {
    count++;
    updateResult();
  });

  minus.addEventListener("click", () => {
    if (count > 0) {
      count--;
      updateResult();
    }
  });

  const updateResult = () => {
    result.value = count
  };
});





    function fixedNav() {
      let scroll = window.scrollY;
      let isNavTop = scroll < 50;
      let nav = document.getElementById('nav');
      if ( isNavTop) {
        nav.classList.remove('active');
      } else {
        nav.classList.add('active');
      }
    }
    let nav = document.getElementById('nav');
    if(nav != null){
      window.addEventListener('scroll', fixedNav);
    }
















    //end
    
});

