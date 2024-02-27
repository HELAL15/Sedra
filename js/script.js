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

    
    
    // loader
    $('#loading').fadeOut(500);

    new WOW().init();


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
      loop:false,
      margin:15,
      navText:["<i class='fa-solid fa-arrow-right mx-2'></i>", "<i class='fa-solid fa-arrow-left mx-2'></i>"],
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

    $('.offers .owl-carousel').owlCarousel({
      rtl: dirAr,
      loop:false,
      margin:10,
      autoplay:false,
      navText:["<i class='fa-solid fa-arrow-right mx-2'></i>", "<i class='fa-solid fa-arrow-left mx-2'></i>"],
      nav:false,
      dots: false,
      responsive:{
          0:{
              items:1.5
          },
          600:{
              items:2.5
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
  var categoryWidth = $('.categories .img').width();
  $('.categories .img').height(categoryWidth)
  // -- responsive --
  $(window).resize(function(){
    var categoryWidth = $('.categories .img').width();
  $('.categories .img').height(categoryWidth)
  })




// add fav -----

$(".fav-btn").click(function() {
  $(this).toggleClass("active");
});


let container_width = $('.container').width();

let offers_body = $('.offers-body').width();

let calc = (offers_body - container_width) - 29 ;

$('.offers-body').css('margin-inline-start', calc);

console.log(calc);

console.log(  `container ${container_width} offers ${offers_body}`);



var inputLeft = document.getElementById("input-left");
var inputRight = document.getElementById("input-right");

var thumbLeft = document.querySelector(".slider > .thumb.left");
var thumbRight = document.querySelector(".slider > .thumb.right");
var range = document.querySelector(".slider > .range");

if(inputLeft !== null){
  function setLeftValue() {
    var _this = inputLeft,
      min = parseInt(_this.min),
      max = parseInt(_this.max);
  
    _this.value = Math.min(parseInt(_this.value), parseInt(inputRight.value) - 1);
  
    var percent = ((_this.value - min) / (max - min)) * 100;
  
    thumbLeft.style.left = percent + "%";
    range.style.left = percent + "%";
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
  }
  setRightValue();
  
  inputLeft.addEventListener("input", setLeftValue);
  inputRight.addEventListener("input", setRightValue);
  
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




// increment & decrement
// let plus = document.querySelectorAll(".plus");
// if(plus !== null){
//   document.querySelectorAll(".controls").forEach(control => {
//     let plus = control.querySelector(".plus");
//     let minus = control.querySelector(".minus");
//     let result = control.querySelector(".result");
  
//     let count = 0;
  
//     plus.addEventListener("click", () => {
//       count++;
//       updateResult();
//     });
  
//     minus.addEventListener("click", () => {
//       if (count > 0) {
//         count--;
//         updateResult();
//       }
//     });
  
//     const updateResult = () => {
//       result.value = count
//     };
//   });
// }

















    //end
    
});

