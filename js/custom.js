$(function() {
"use strict";

/*--
    Mobile Menu
------------------------*/
 function ressearch(){
if ($(window).width() < 768){
$('#head-search').click(function(){
  setTimeout(function() { $('#search-input').focus() }, 3000);
  $('#search').show(function(){
    document.body.addEventListener('click', boxCloser, false);
  });

  $('#search').addClass('active');
});

$('#cart').appendTo('.cart_icon');
}
else{
  $('#cart').appendTo('.shopcart');
}
}
function boxCloser(e){
  if(e.target.id != 'search-input'){
     document.body.removeEventListener('click', boxCloser, false);
     $('#search').hide();
     $('#search').removeClass('active');
  }
  else{
        $('#search').show();
        $('#search').addClass('active');
    }
}
 /*  =====  On responsive swatch left to right colunm  =====  */
function left_colunm_swetch () {
    if ($( window ).width() <= 767) {
        localStorage.setItem('display', 'wrapper');
        $('#column-right:parent').each(function () {
        $(this).insertBefore($(this).prev('#column-left'));
        });     
    }
    if ($(window).width() > 767) {
        localStorage.setItem('display', 'wrapper');
        $('#column-left:parent').each(function () {
        $(this).insertBefore($(this).prev('#column-right'));
        });
    }
}
function langcurrres(){
if ($(window).width() <= 767){
    $('.currency').appendTo('.header-middle-outer');
    $('.language').appendTo('.header-middle-outer');
    $('.header-link').appendTo('.header-middle-outer');
}
else{
    $('.currency').appendTo('.header-top-left');
    $('.language').appendTo('.header-top-left');
    $('.header-link').appendTo('.header-link-search');
}
}
$(window).ready(function(){langcurrres();});
$(window).resize(function(){langcurrres();});
/* JS is for responsive menu dropdown */
function responsive_menu (){
 $(".responsive-bar").click(function(){
        if($('.header-middle-outer').hasClass('closetoggle')) {
        $($('.header-middle-outer')).removeClass('closetoggle').addClass('opentoggle');
        $($('.responsive-bar')).addClass('active');
        $($('body')).addClass('nav-open');

    }
    else{
        $($('.header-middle-outer')).removeClass('opentoggle').addClass('closetoggle');
        $($('.responsive-bar')).removeClass('active');
        $($('body')).removeClass('nav-open');
    }
    });
    $("#responsive-menu ul > li.dropdown > span").click(function(){
        if($('#responsive-menu ul > li.dropdown').hasClass('active')) {
        $($('#responsive-menu ul > li.dropdown')).removeClass('active').addClass('');
        $($('#responsive-menu ul > li.dropdown > ul')).addClass('menuopen');

    }
    else{
        $($('#responsive-menu ul > li.dropdown')).addClass('active');
        $($('#responsive-menu ul > li.dropdown > ul')).removeClass('menuopen');
    }
    });

}

 /*  =====  magnificPopup  =====  */
 function m_popup_select () {
    $('#product-thumbnail').magnificPopup({
    delegate: 'a',
    type: 'image',
    closeOnContentClick: false,
    closeBtnInside: false,
    mainClass: 'mfp-with-zoom mfp-img-mobile',
    image: {
      verticalFit: true,
    },
    gallery: {
      enabled: true
    },
    zoom: {
      enabled: true,
      duration: 300, // don't foget to change the duration also in CSS
      opener: function(element) {
        return element.find('img');
      }
    }
    
  })
}
/* ===== Search  =====   */
function search(){
   var i = $("#search-overlay-btn");
   var a = $(".search-overlay, .search-overlay .search-overlay-close");
    i.on('click', function(event) {
        $(".search-overlay").addClass("open"),
        $('.search-overlay > form > input[type="search"]').focus();
    });
    a.on('click', function(event) {
        event.target != this && "search-overlay-close" != event.target.className && 32 != event.keyCode || $(this).removeClass("open");
    });
}
/* ===== Grid list active  =====   */
function gl_active(){
    $('.btn-list-grid button').on('click', function() {
        if($(this).hasClass('grid-view')) {
          $('.btn-list-grid button').addClass('active');
          $('.btn-list-grid button.list-view').removeClass('active');
        }
        else if($(this).hasClass('list-view')) {
        	$('.btn-list-grid button').addClass('active');
        	$('.btn-list-grid button.grid-view').removeClass('active');
        }
    });
}
/* ===== Grid list View  =====   */
function gl_view() {
    // Product List
    $('#list-view').on('click',function() {
        $('.product-layout > .clearfix').remove();
        $('.product-layout').attr('class', 'product-layout product-list col-12');
        $('#column-left .product-layout').attr('class', 'product-layout mb_20');
        $('#column-right .product-layout').attr('class', 'product-layout mb_20');

    });
    // Product Grid
    $('#grid-view').on('click',function() {
        $('.product-layout').attr('class', 'product-layout product-grid col-lg-3 col-6');
    });
}
/* ===== Timer  =====   */
function makeTimer() {
    var endTime = new Date("August 10, 2018 12:00:00 PDT");         
    var endTime = (Date.parse(endTime)) / 1000;
    var now = new Date();
    var now = (Date.parse(now) / 1000);
    var timeLeft = endTime - now;
    var days = Math.floor(timeLeft / 86400); 
    var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
    var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600 )) / 60);
    var seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));

    if (hours < "10") { hours = "0" + hours; }
    if (minutes < "10") { minutes = "0" + minutes; }
    if (seconds < "10") { seconds = "0" + seconds; }

    $(".days").html(days + "<span>Days</span>");
    $(".hours").html(hours + "<span>Hours</span>");
    $(".minutes").html(minutes + "<span>Min</span>");
    $(".seconds").html(seconds + "<span>Sec</span>");       
}
setInterval(function() { makeTimer(); }, 1000);
/* ===== Login Register Tab  =====   */
function log_reg_tab() {
    $('#login-form-link').on('click',function(e) {
        $("#login-form").delay(100).fadeIn(100);
        $("#register-form").fadeOut(100);
        $('#register-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
    });
    $('#register-form-link').on('click',function(e) {
        $("#register-form").delay(100).fadeIn(100);
        $("#login-form").fadeOut(100);
        $('#login-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
    });
}
/*  footer toggle */
function footerToggle(){
    if ($(window).width() < 991)
    {
        $(".footer .toggle_div").remove();
        $(".footer-title").append( "<a class='toggle_div'>&nbsp;</a>" );
        $(".footer-title").addClass('toggle');
        $(".footer-title").addClass('active');
        $(".footer .toggle_div").on('click',function(){
            $(this).parent().toggleClass('active').parent().find('ul').slideToggle('slow');
        });
    }else{
        $(".footer-title").parent().find('ul').removeAttr('style');
        $(".footer-title").removeClass('active');
        $(".footer-title").removeClass('toggle');
        $(".footer .toggle_div").remove();
    }   
}

function owl_carousel () {
    $('.main-banner').owlCarousel({
        autoplay:false,
        responsiveClass:true,
        dots:false,
        items : 1, //10 items above 1000px browser width
        responsive:{
            0:{
                items:1,
                nav:false
            },
            600:{
                items:1,
                nav:false
            },
            1000:{
                items:1,
                nav:true,
            }
        }
    });
        $('.banner-carousel').owlCarousel({
        autoplay:false,
        responsiveClass:true,
        dots:true,
        items : 2, //10 items above 1000px browser width
        responsive:{
            0:{
                items:1,
                nav:false,
            },
            600:{
                items:2,
                nav:false,
            },
            1000:{
                items:2,
                nav:false,
            }
        }
    });

    $('.nArrivals , .Bestsellers , .Featured').owlCarousel({
        autoplay:false,
        responsiveClass:true,
        items : 4, //10 items above 1000px browser width
        responsive:{
            0:{
                items:1,
                nav:true
            },
            400:{
                items:2,
                nav:true
            },
            600:{
                items:3,
                nav:true
            },
            1000:{
                items:4,
                nav:true
            }
        }
    });

    $('#featu-pro , #bests-pro , #new-pro').owlCarousel({
        autoplay:false,
        responsiveClass:true,
        items : 1, //10 items above 1000px browser width
        responsive:{
            0:{
                items:1,
                nav:true
            },
            480:{
                items:2,
                nav:true
            },
            767:{
                items:2,
                nav:true
            },
            1000:{
                items:1,
                nav:true,
            }
        }
    });
    /* ===== Specials and client carousel =====   */
    $('.client').owlCarousel({
        autoplay:false,
        responsiveClass:true,
        items : 1, //10 items above 1000px browser width
        responsive:{
            0:{
                items:1,
                nav:false
            },
            600:{
                items:1,
                nav:false
            },
            1000:{
                items:1,
                nav:false,
            }
        }
    });
    /* ===== left-special carousel =====   */
    $('#left-special').owlCarousel({
        autoplay:false,
        responsiveClass:true,
        items : 1, //10 items above 1000px browser width
        responsive:{
            0:{
                items:1,
                nav:true
            },
            480:{
                items:2,
                nav:true
            },
            575:{
                items:1,
                nav:true
            },
            1000:{
                items:1,
                nav:true,
            }
        }
    });

    /* ===== Offers carousel =====   */
    $('.offers').owlCarousel({
        loop:true,
        autoplay:true,
        responsiveClass:true,
        items : 3, //10 items above 1000px browser width
        responsive:{
            0:{
                items:1,
                nav:false
            },
            600:{
                items:1,
                nav:false
            },
            1200:{
                items:2,
                nav:false
            },
            1360:{
                items:3,
                nav:false,
            }
        }
    });
    $('.related-pro').owlCarousel({
        autoplay:false,
        responsiveClass:true,
        items : 5, //10 items above 1000px browser width
        responsive:{
            0:{
                items:2,
                nav:true
            },
            600:{
                items:3,
                nav:true
            },
            1000:{
                items:4,
                nav:true,
            },
             1200:{
                items:5,
                nav:true,
            }
        }
    });

    /* ===== Product Thumbnail =====   */
    $('#product-thumbnail').owlCarousel({
        loop:false,
        thumbs: true,
        autoplay:false,
        items : 4, //10 items above 1000px browser width
        nav:true,
    })

    /* ===== Brand carousel =====   */
    $('.brand').owlCarousel({
        loop:true,
        autoplay:true,
        dots:false,
        responsiveClass:true,
        items : 6, //10 items above 1000px browser width
        responsive:{
            0:{
                items:2,
                nav:false
            },
            400:{
                items:3,
                nav:false
            },
            600:{
                items:4,
                nav:false
            },
            1000:{
                items:6,
                nav:false,
                loop:true
            }
        }
    })
    /* ===== Blog carousel =====   */
    $('.blog').owlCarousel({
        autoplay:false,
        responsiveClass:true,
        items : 2, //10 items above 1000px browser width
        responsive:{
            0:{
                items:1,
                nav:true
            },
            600:{
                items:2,
                nav:true
            },
            1000:{
                items:2,
                nav:true,
            }
        }
    })

    /* ===== Team carousel =====   */
    $('.team3col').owlCarousel({
        autoplay:false,
        responsiveClass:true,
        items : 3, //10 items above 1000px browser width
        responsive:{
            0:{
                items:1,
                nav:false
            },
            600:{
                items:2,
                nav:true
            },
            1000:{
                items:3,
                nav:true,
            }
        }
    });
}
/* ---- Page Scrollup JS Start ---- */
   //When distance from top = 250px fade button in/out


     $(window).scroll(function(){
        if ($(this).scrollTop() > 250) {
            $('#scrollup').fadeIn(300);
        } 
        else {
            $('#scrollup').fadeOut(300);
        }
    }); 
        $('#scrollup').on('click',function(){
            $("html, body").animate({ scrollTop: 0 }, "slow");
            return false;
        }); 

/* ===== Event for windows and document =====   */

    $(document).ready(function(){ 
        responsive_menu ();    
        gl_active();
        gl_view();
        search();
        footerToggle(); 
        m_popup_select ();
        log_reg_tab();

    });
   
    $( window ).ready(function() {
        $('[data-toggle="tooltip"]').tooltip();
        owl_carousel ();
        left_colunm_swetch ();
        ressearch(); 
    });
   
    $( window ).resize(function() {
        left_colunm_swetch ();
        ressearch();
        gl_active();
        gl_view();
        search();
        footerToggle();
    });
});

jQuery( window ).on("load",function() {
     $(".loder").fadeOut("slow");    
});

