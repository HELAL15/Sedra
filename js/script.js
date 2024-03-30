

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



    var animation = bodymovin.loadAnimation({
      container: document.getElementById('anim'),
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '../js/animation/illustration.json'
  })

    $(".visacard-details").hide()

 $(".online-pay").change(function() {
        if ($(this).is(":checked")) {
            $(".visacard-details").show(200);
        } else {
            $(".visacard-details").hide(200);
        }
    });

    $(".on-hand").change(function() {
      if ($(this).is(":checked")) {
          $(".visacard-details").hide(200);
      } else {
          $(".visacard-details").show(200);
      }
  });

  if($("#rateYo") !== null){
    $(function () {
 
      $("#rateYo").rateYo({
        normalFill: "#A7A7A7",
      ratedFill: "#FFD500",
        rating: 0,
        onChange: function (rating, rateYoInstance) {
          $(this).next().text(rating);
        }
      });
     
    });
  }
    
    
    // loader
    $('#loading').fadeOut(500);

    new WOW().init();



let finalPrice = 0
let parent
let $input
let val = 1

$('.quantity').each(function (key) {
  subTotal = Number($('.Subtotal')[0].innerHTML)
    $(this).click(function(k){
        let target = $(k.currentTarget)
        finalPrice = 0
        if(target.hasClass('qtyplus')){
            parent = target.parents().find('.cart-product-item .book-value')[key/2]
            const price = Number(($(parent)).attr('data-target'))
            $input =  $(this).next('input.qty');
            val = parseInt($input.val())+ 1;
            parent.innerHTML = val * price
            $input.val(val)
        }
        else{
            parent = target.parents().find('.cart-product-item .book-value')[(key-1)/2]
            const price = Number(($(parent)).attr('data-target'))
            $input =  $(this).prev('input.qty');
            if ($input.val() > 1) {
                val = parseInt($input.val())- 1;
                parent.innerHTML = val * price;
                $input.val(val)
            } 
        }
        calcTotal()
    })
})
function calcTotal() {
    $('.book-value').each(function(i){
        finalPrice += Number($('.book-value')[i].innerHTML)
        $('.Subtotal')[0].innerHTML = finalPrice
    });
}
calcTotal()




let plus = $(".plus-book");
let minus = $(".minus-book");

let numbers = 1

if(plus.length > 0){
  plus.click(function(){
    numbers++;
    $(this).siblings(".result-book").val(numbers);
  })
  minus.click(function(){
    if(numbers > 0){
      numbers--;
      $(this).siblings(".result-book").val(numbers);
    }
  })
}





//      play and pause video       //


let play = document.getElementById("play");
let pause = document.getElementById("pause");
let video = document.getElementById("video");
let overlay = document.getElementById("overlay");


if (play !== null) {
    
    pause.style.display = "none";

    
    play.addEventListener("click", function() {
        
        play.style.display = "none";
        pause.style.display = "flex";
        overlay.classList.add("active");
        video.play();
    });

    pause.addEventListener("click", function() {
        
        pause.style.display = "none";
        play.style.display = "flex";
        overlay.classList.remove("active");
        video.pause();
    });
}





    $(".show-pass").click(function () {
      $(this).find('i').toggleClass("bi-eye-slash bi-eye");
      var input = $($(this).attr("toggle"));
      if (input.attr("type") == "password") {
          input.attr("type", "text");
      } else {
          input.attr("type", "password");
      }
      $(this).toggleClass('active');
    });


    const inputElements = [...document.querySelectorAll('input.code')]
    
    inputElements.forEach((ele,index)=>{
      ele.addEventListener('keydown',(e)=>{
        // if the keycode is backspace & the current field is empty
        // focus the input before the current. Then the event happens
        // which will clear the "before" input box.
        if(e.keyCode === 8 && e.target.value==='') inputElements[Math.max(0,index-1)].focus()
      })
      ele.addEventListener('input',(e)=>{
          inputElements[index].focus()
        const [first,...rest] = e.target.value
        e.target.value = first ?? '' // first will be undefined when backspace was entered, so set the input to ""
        const lastInputBox = index===inputElements.length-1
        const didInsertContent = first!==undefined
        if(didInsertContent && !lastInputBox) {
          // continue to input the rest of the string
          inputElements[index+1].focus()
          inputElements[index+1].value = rest.join('')
          inputElements[index+1].dispatchEvent(new Event('input'))
        }
      })
    })
    
    
    // mini example on how to pull the data on submit of the form
    function onSubmit(e){
      e.preventDefault()
      const code = inputElements.map(({value})=>value).join('')
      console.log(code)
    }

    
    /* -------------- upload profile pic ---------------- */
    if($('.profile-pic').length > 0){
        const imgDiv = document.querySelector('.profile-pic');
        const img = document.querySelector('#photo');
        const file = document.querySelector('#file');
        const uploadBtn = document.querySelector('#uploadBtn');
        const confirm_btn = document.querySelector('#confirm-btn');
        
        //when we choose a pic to upload
        
        file.addEventListener('change', function(){
          confirm_btn.style.display = 'flex';
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
    $('.single-book .owl-carousel').owlCarousel({
        rtl: dirAr,
        loop:false,
        margin:15,
        dots: true,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:1
            },
            1000:{
                items:1
            }
        }
      })

    $('.categories .owl-carousel').owlCarousel({
      rtl: dirAr,
      loop:false,
      margin:15,
      navText:["<i class='fa-solid fa-arrow-right mx-2 rotation'></i>", "<i class='fa-solid fa-arrow-left mx-2 rotation'></i>"],
      nav:true,
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




    const headerSwiper = new Swiper('header .swiper', {
      slidesPerView: 1,
      grid: {
        rows: 1,
      },
      mousewheel: {
        forceToAxis: true,
      },
      // Optional parameters
      direction: 'horizontal',
      loop: true,


      // Autoplay settings
      autoplay: {
        delay: 3000, // Autoplay delay in milliseconds
        disableOnInteraction: false, // Disable autoplay when user interacts with the slider
      },


      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

    });
    const swiper = new Swiper('.offers .swiper', {
      slidesPerView: 3.3,
      breakpoints: {
        320: {
          slidesPerView: 1.5,
        },
        640: {
          slidesPerView: 2.2,
        },
        1024: {
          slidesPerView: 3.3,
        },
      },
      grid: {
        rows: 1,
      },
      mousewheel: {
        forceToAxis: true,
      },
      // Optional parameters
      direction: 'horizontal',
      loop: true,

      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
      },

      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      // And if we need scrollbar
      scrollbar: {
        el: '.swiper-scrollbar',
      },
    });





    const categoriesSwiper = new Swiper('.categories .swiper', {
      slidesPerView: 5,
      breakpoints: {
        320: {
          slidesPerView: 1,
        },
        640: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 5,
        },
      },
      grid: {
        rows: 1,
      },
      mousewheel: {
        forceToAxis: true,
      },
      // Optional parameters
      direction: 'horizontal',
      loop: true,

      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
      },

      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      // And if we need scrollbar
      scrollbar: {
        el: '.swiper-scrollbar',
      },
    });  
  




    $('.offers .owl-carousel').owlCarousel({
      rtl: dirAr,
      loop:false,
      margin:10,
      autoplay:false,
      navText:["<i class='fa-solid fa-arrow-right mx-2 rotation'></i>", "<i class='fa-solid fa-arrow-left mx-2 rotation'></i>"],
      nav:false,
      dots: false,
      responsive:{
          0:{
              items:1.5
          },
          600:{
              items:1.5
          },
          1000:{
              items:3.5
          }
      }
    })

    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))




const dots = document.querySelectorAll(".header-home .owl-carousel .owl-dots .owl-dot span");
const angle = 90 / (dots.length - 1);
for (let i = 0; i < dots.length; i++) {
  const margin = (Math.sin(angle * i) * 15) - 15;
  dots[i].style.marginBottom = `${margin}px`;
  if (i === 0 || i === dots.length - 1) {
    dots[i].style.margin = '0 6px 10px';
  }
}


  // make category-img circle 
  // var categoryWidth = $('.categories .img').width();
  // $('.categories .img').height(categoryWidth)
  // -- responsive --
  // $(window).resize(function(){
  //   var categoryWidth = $('.categories .img').width();
  // $('.categories .img').height(categoryWidth)
  // })




// add fav -----

$(".fav-btn").click(function() {
  $(this).toggleClass("active");
});


let container_width = $('.container').width();
let offers_body = $('.offers-body').width();
let calc = (offers_body - container_width) - 29;
$('.offers-body').css('margin-inline-start', calc);




var inputLeft = document.getElementById("input-left");
var inputRight = document.getElementById("input-right");
var thumbLeft = document.querySelector(".slider > .thumb.left");
var thumbRight = document.querySelector(".slider > .thumb.right");
var range = document.querySelector(".slider > .range");
var priceFrom = document.querySelector(".price-from");
var priceTo = document.querySelector(".price-to");

if (inputLeft !== null) {
    function setLeftValue() {
        var _this = inputLeft,
            min = parseInt(_this.min),
            max = parseInt(_this.max);

        _this.value = Math.min(parseInt(_this.value), parseInt(inputRight.value) - 1);

        var percent = ((_this.value - min) / (max - min)) * 100;

        thumbLeft.style.left = percent + "%";
        range.style.left = percent + "%";

        // Calculate price based on range value
        var price = parseInt(inputLeft.value) * 3; // Adjust this formula based on your requirements
        priceFrom.textContent = price + " ريال سعودي";
    }
    setLeftValue();

    function setRightValue() {
        var _this = inputRight,
            min = parseInt(_this.min),
            max = parseInt(_this.max);

        _this.value = Math.max(parseInt(_this.value), parseInt(inputLeft.value) + 1);

        var percent = ((_this.value - min) / (max - min)) * 100;

        thumbRight.style.right = (100 - percent) + "%";
        range.style.right = (100 - percent) + "%";

        // Calculate price based on range value
        var price = parseInt(inputRight.value) * 3; // Adjust this formula based on your requirements
        priceTo.textContent = price + " ريال سعودي";
    }
    setRightValue();

    inputLeft.addEventListener("input", setLeftValue);
    inputRight.addEventListener("input", setRightValue);

    // Add event listeners for thumb hover and active states
    // These listeners are not directly related to updating the price
    inputLeft.addEventListener("mouseover", function() {
        thumbLeft.classList.add("hover");
    });
    inputLeft.addEventListener("mouseout", function() {
        thumbLeft.classList.remove("hover");
    });
    inputLeft.addEventListener("mousedown", function() {
        thumbLeft.classList.add("active");
    });
    inputLeft.addEventListener("mouseup", function() {
        thumbLeft.classList.remove("active");
    });

    inputRight.addEventListener("mouseover", function() {
        thumbRight.classList.add("hover");
    });
    inputRight.addEventListener("mouseout", function() {
        thumbRight.classList.remove("hover");
    });
    inputRight.addEventListener("mousedown", function() {
        thumbRight.classList.add("active");
    });
    inputRight.addEventListener("mouseup", function() {
        thumbRight.classList.remove("active");
    });
}























    //end
    
});

