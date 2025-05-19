$(function () {
    if(!$('header').is('.header-fixed')){
        $(window).on('scroll', function() {
            $(this).scrollTop() > 100 ? $('header').addClass('header-fixed') : $('header').removeClass('header-fixed');
        }); 
        $(window).scrollTop() > 100 ? $('header').addClass('header-fixed') : $('header').removeClass('header-fixed');
    }

    // Header Js
    $('.hasDropdown').on('mouseenter', function() {
        let $dropdown = $(this);
        $dropdown.addClass('active')

        $('.hasDropdown').each(function () {
            if ($(this).hasClass('active')) {
                $(this).find('.hasHover').css('color', '#fff');
            } else {
                $(this).find('.hasHover').css('color', 'rgba(255,255,255,0.43)'); 
            }
        });

        // Remove active from all subcat-li & col-sub-menu inside this dropdown only
        $dropdown.find('.subcat-li').removeClass('active');
        $dropdown.find('.col-sub-menu').removeClass('active');

        // Set active on the first subcat-li & its col-sub-menu
        let $firstSubcat = $dropdown.find('.subcat-li:first');
        $firstSubcat.addClass('active');
        $firstSubcat.find('.col-sub-menu').addClass('active');
    });
    $('.hasDropdown').on('mouseleave', function(){
        $(this).removeClass('active')
        $('.hasDropdown').find('.hasHover').css('color', '#fff');
    })

    $('.subcat-li').on('mouseenter', function() {
        let $dropdown = $(this).closest('.hasDropdown');
        // Remove active from all subcat-li & col-sub-menu inside this dropdown only
        $dropdown.find('.subcat-li').removeClass('active');
        $dropdown.find('.col-sub-menu').removeClass('active');
        // Add active to hovered li and its col-sub-menu
        $(this).addClass('active');
        $(this).find('.col-sub-menu').addClass('active');
    });

    $('.subcat-li').hover(function() {
        let imgSrc = $(this).attr('data-img'); 
        let url = $(this).attr('data-url'); 
        $('.hoverimg').attr('src', imgSrc); 
        $('.hrf_cal').attr('href', url); 
    });

    $('.subcat-ul').on('mouseleave', function() {
        let $dropdown = $(this).closest('.hasDropdown');

        // Remove all active classes and restore the first one inside this dropdown
        $dropdown.find('.subcat-li').removeClass('active');
        $dropdown.find('.col-sub-menu').removeClass('active');

        let $firstSubcat = $dropdown.find('.subcat-li:first');
        $firstSubcat.addClass('active');
        $firstSubcat.find('.col-sub-menu').addClass('active');
    });


    
    //

    function mobileHam(){
        if (window.matchMedia("(max-width: 991px)").matches){
            $('.header-category-strip,.list-filter-wrap .colB').addClass('model');
            if (!$('.header-category-strip .close').length) {
                $('.header-category-strip').append('<button class="close" type="button"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="none" stroke="#000" stroke-width="2" d="M22 12H2m9-9l-9 9l9 9" /></svg></button>');
            }
            if (!$('.list-filter-wrap .colB > .close').length) {
                $('.list-filter-wrap .colB').append('<button class="close" type="button"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="none" stroke="#000" stroke-width="2" d="M22 12H2m9-9l-9 9l9 9" /></svg></button>');
            }
            $('.header-category-strip .cat-li:has(.drop-downmenu)').each(function () {
                if (!$(this).find('.cat-btn').length) {
                    $(this).find('.cat-li-anchr').after('<button class="cat-btn" type="button">+</button>');
                }
            });    

            $('.header-category-strip .subcat-li:has(.col-md-menu)').each(function () {
                if (!$(this).find('.subcat-btn').length) {
                    $(this).find('.subcat-li-anchr').after('<button class="subcat-btn" type="button"><svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 1024 1024"><path fill="#000" d="M104.704 338.752a64 64 0 0 1 90.496 0l316.8 316.8l316.8-316.8a64 64 0 0 1 90.496 90.496L557.248 791.296a64 64 0 0 1-90.496 0L104.704 429.248a64 64 0 0 1 0-90.496" /></svg></button>');
                }
            });            
        }
        else{
            $('.header-category-strip, .list-filter-wrap .colB').removeClass('model');
            $('.header-category-strip, .list-filter-wrap .colB').find('.close').remove();
            $('.header-category-strip').find('.cat-btn').remove();
            $('.header-category-strip').find('.subcat-btn').remove();
        }
    }

    $(document).ready(function(){
        mobileHam();
    });

    $(window).resize(function(){
        mobileHam();
    });


    const formControls = $(".form-control");
    formControls.on('focus input change blur', throttle(handleForm));
    formControls.each(function () {
        handleForm.call(this);
    });

    //

    niceSelect($);
    $('select').niceSelect();

    //

    adjustWhatsAppUrls();
    $(window).resize(function () {
        adjustWhatsAppUrls();
    });

    //

    $('[data-slide]').click(function(){
        $(".plus-ico").toggleClass('active');
        var slide = $(this).data('slide');
        $(slide).stop().slideToggle();
        // window.scrollBy({ top: 100, behavior: 'smooth' });
    })
    
    //Code for Multiple Menus
    // $('.plu-ico').click(function () {
    //     var parentLi = $(this).closest('.hasDropdown');
    //     var slideMenu = parentLi.find('.dropdown-menu-ham');
        
    //     $('.dropdown-menu-ham').not(slideMenu).slideUp();
    //     $('.plu-ico').not(this).removeClass('active');
    
    //     $(this).toggleClass('active');
    //     slideMenu.stop().slideToggle();
    // });

    $('.title').click(function () {
        var parentLi = $(this).closest('.hasDropdown');
        var slideMenu = parentLi.find('.dropdown-menu-ham');
        
        $('.dropdown-menu-ham').not(slideMenu).slideUp();
        $('.title').not(this).removeClass('active');
    
        $(this).toggleClass('active');
        slideMenu.stop().slideToggle();
    });

    startCountAnimation();
    $(window).scroll(function () {
        startCountAnimation();
    })

    //
    window.addEventListener('load', handleAnimations);
    window.addEventListener('resize', handleAnimations);
    window.addEventListener('orientationchange', handleAnimations);
    handleAnimations();

    //

    document.querySelectorAll('img.svg').forEach(img => {
        fetch(img.src)
            .then(response => response.text())
            .then(data => {
                const svg = new DOMParser().parseFromString(data, 'image/svg+xml').querySelector('svg');
                if (svg) {
                    svg.classList.add('svg');
                    img.replaceWith(svg);
                }
            });
    });    

    //

    $(document).on('click', '.tab-nav [data-tab]:not(.disabled-btn)', function () {
        var tab = $(this).addClass('active').siblings().removeClass('active').end().data('tab');
        $('.tab-nav-content >*[data-tab= ' + tab + ']').addClass('active').siblings().removeClass('active');
    });
    
    //

    $(document).on('click', '[data-scrollTo]',function () {
        headerheight = parseInt($(':root').css('--headerfixed')) + parseInt($(':root').css('--headerstripfixed'));
        var section = $(this).attr('data-scrollTo');
        if (section) {
            $('html, body').stop().animate({
                scrollTop: $(section).offset().top - headerheight
            }, 1000);
        }
    });

    //

    $(document).on('click', '[data-model]',function () {
        var model = $(this).attr('data-model');
        openModel(model);
    });

    $(document).on('click','.overlay,.close', function () {
        closeModel();
    });

    //

    $('[data-discount]').each(function() {
        var mrp = parseFloat($(this).find('[data-mrp]').attr('data-mrp'));
        var sp = parseFloat($(this).find('[data-sp]').attr('data-sp'));
    
        if (!isNaN(mrp) && !isNaN(sp)) {  
            if (mrp > sp) { // Ensure discount calculation is valid
                var discount = ((mrp - sp) / mrp) * 100;
                $(this).find('[data-discount]').text(discount.toFixed(2));
                console.log(discount);
            } else {  
                $(this).find('[data-discountli]').remove(); // Remove if no discount
            }
        }
    });    

    //

    $('.tdur-search').click(function(){
        $('.search-product-amjkr').focus();
    })

    $('input.search-product-amjkr').on('keyup change', function () {
        if ($(this).val().length > 1) {
            $('.secsrch-cjrvs-sec').hide();
            $('.search-result-prdct-wrap').fadeIn();
            productNotFound('.search-result-prdct',true);
        }
        else {
            $('.secsrch-cjrvs-sec').fadeIn();
            $('.search-result-prdct-wrap').hide();
            productNotFound('.search-result-prdct',false);
        }
    });

    $('.close-search-whktk').click(function(){
        $('input.search-product-amjkr').val('').change();
    })

    //

    $('input[type="file"].form-control').on('change', function () {
        var fileName = $(this).val().replace(/C:\\fakepath\\/i, '');
        if (fileName) {
            $(this).siblings('.file-name').css('--filenameinitial', `"${fileName}"`);
        } else {
            $(this).siblings('.file-name').css('--filenameinitial', 'var(--filename)');
        }
    });

    //

    const inputs = document.querySelectorAll(".otpInput input");

    inputs.forEach(function(input, index) {
        input.setAttribute("data-index", index);
        input.addEventListener("keyup", handleOtp);
        input.addEventListener("paste", handleOnPasteOtp);
    });
    function handleOtp(e) {
        var input = e.target;
        var value = input.value;
        var isValidInput = value.match(/[0-9a-z]/gi);
        input.value = "";
        input.value = isValidInput ? value[0] : "";
        var fieldIndex = parseInt(input.getAttribute("data-index"));
        if (fieldIndex < inputs.length - 1 && isValidInput) {
            inputs[fieldIndex + 1].focus();
        }
        if (e.key === "Backspace" && fieldIndex > 0) {
            inputs[fieldIndex - 1].focus();
        }
        if (fieldIndex == inputs.length - 1 && isValidInput) {
            submit();
        }
    }
    function handleOnPasteOtp(e) {
        e.preventDefault();
        var pastedText = (e.clipboardData || window.clipboardData).getData("text");
        for (var i = 0; i < pastedText.length; i++) {
            if (pastedText[i].match(/[0-9a-z]/gi)) {
                inputs[i].value = pastedText[i];
                inputs[i].dispatchEvent(new Event("keyup"));
            }
        }
    }
 
    function submit() {
        console.log('Submit Form');
    }
 
 
    $('.back-to-login').click(function(){
        $('.otp-verify').hide();
        $('#loginForm').show();
    });

    $('.otp-pop-btn').click(function(){
        $('.otp-verify').show();
        $('#loginForm').hide();
    });

    //

    $(document).on('click', '[data-video]',function () {
        var src = $(this).attr('data-video');
        if (src.includes('youtube.com/embed/')) {
            var videoId = src.split('embed/')[1].split('?')[0];
            src += '&autoplay=1&mute=1&loop=1&playlist=' + videoId;
            $('#iframe1').attr('src', src);
        }
        else{
            $('#iframe1').attr('src', src);
        }
        $('.video-pop').addClass('is-open');
    });
    $('.close-video').on('click', function () {
        $('#iframe1').attr('src', '');
        $('.video-pop').removeClass('is-open');
    });

    //

    // $('.summery-detail-content .col:has(article) .title').click(function(){
    //     var $parentCol = $(this).parent('.col');
    //     $('.summery-detail-content .col').not($parentCol).find('article').stop().slideUp();
    //     $('.summery-detail-content .col').not($parentCol).removeClass('active');
    //     $parentCol.toggleClass('active');
    //     $(this).siblings('article').stop().slideToggle();
    // }); 

    $('.filter_options .col:has(article) .title').click(function(){
        var $parentCol = $(this).parent('.col');
        $('.filter_options .col').not($parentCol).find('article').stop().slideUp();
        $('.filter_options .col').not($parentCol).removeClass('active');
        $parentCol.toggleClass('active');
        $(this).siblings('article').stop().slideToggle();
    }); 

    //convert tab nav to dropdown in mobile

    if ($(window).width() < 991) {
        $('.tab-filter').each(function () {
            var $this = $(this);
            setTimeout(function () {
                var activeText = $this.find('li.active').text();
                $this.find('ul').before(`<span class="tab-filter-span">${activeText}</span>`);
            }, 0);        

            $(document).on('click','.tab-filter-span',function(){
                $(this).siblings('ul').stop().slideToggle();
            })
        });

        $(document).on('click', function (e) {
            if (!$(e.target).closest('.tab-filter-span').length) {
                $('.tab-filter ul').stop().slideUp();
            }
        });
    }
    
    $('.kmr-select-wrap').each(function() {
        const $wrap = $(this);
        const $label = $wrap.find('.label');
        const initialLabelText = $label.text();
        const $menu = $wrap.find('.kmr-select-menu');
        const $input = $wrap.find('input');

        $label.on('click', function(e) {
            e.stopPropagation();
            $('.kmr-select-menu').not($menu).slideUp();
            $menu.stop().slideToggle();
        });
        $('body').click(function(){
            $menu.slideUp();
        })

        if ($input.is(':checked')) {
            $wrap.addClass('active');
            if ($wrap.hasClass('chng-label')) {
                const selectedText = $input.filter(':checked').map(function() {
                    return $(this).val();
                }).get().join(', '); 
                $label.text(selectedText || initialLabelText);
            }
        }
    
        $input.on('change', function() {
            const checkedCount = $input.filter(':checked').length;
            $wrap.toggleClass('active', checkedCount > 0);
    
            if ($wrap.hasClass('chng-label')) {
                const selectedText = $input.filter(':checked').map(function() {
                    return $(this).val();
                }).get().join(', '); 
                $menu.slideUp();
                $label.text(selectedText || initialLabelText);
            }
        });

        $menu.on('click', function(e) {
            e.stopPropagation();
        });
    }); 


    //Sliders

    function commonSlider1(containerSelector, prevButtonSelector, nextButtonSelector) {
        return new Swiper(containerSelector, {
            loop: false,
            speed: 500,
            navigation: {
                prevEl: prevButtonSelector,
                nextEl: nextButtonSelector,
            },
            breakpoints: {
                0: {
                    slidesPerView: 1.2,
                    spaceBetween: 10,
                    speed: 500,
                },
                675: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                    speed: 2000,
                },
                992: {
                    slidesPerView: 3,
                    spaceBetween: 15,
                    speed: 1000,
                }
            }
        });
    }

    commonSlider1('.tech-category-slider', '.tech-prev', '.tech-next')
    commonSlider1('.home-category-slider', '.slider-prev3', '.slider-next3')
    commonSlider1('.more-products-slider', '.morepro-prev', '.morepro-next')
    commonSlider1('.common-slider1', '.slider-prev1', '.slider-next1')

    new Swiper('.home_banner_slider', {
        loop: false,
        pagination: {
            el: '.banner_dots',
            clickable: true
        },
        navigation: {
            prevEl: '.banner-prev',
            nextEl: '.banner-next',
        },
        slidesPerView: 1,
        spaceBetween: 0,
        speed: 1000,
    });
    new Swiper('.category_slider', {
        loop: true,
        pagination: {
            enabled : true,
            el: '.home-category-fraction',
            type: "fraction"
        }, 
        navigation: {
            prevEl: '.home-category-prev',
            nextEl: '.home-category-next',
        },
        slidesPerView: 6,
        spaceBetween: 50,
        speed: 500,
        breakpoints: {
            0: {
                slidesPerView: 4,
                spaceBetween: 10,
                speed: 500,
            },
            675: {
                slidesPerView: 5,
                spaceBetween: 10,
                speed: 500,
            },
            992: {
                slidesPerView: 6,
                spaceBetween: 50,
                speed: 500,
            }
        },
        if(fractionSelector) {
            config.pagination = {
                el : fractionSelector,
                type: "fraction"
            }
        }
    });

    // new Swiper('.proSlider', {
    //     loop: false,
    //     navigation: false,
    //     breakpoints: {
    //         0: {
    //             slidesPerView: 1,
    //             spaceBetween: 12,
    //             speed: 1000,
    //         },
    //         674: {
    //             slidesPerView: 1,
    //             spaceBetween: 12,
    //             speed: 1000,
    //         },
    //     }
    // });

    new Swiper('.product_slider', {
        loop: true,
        navigation: {
            prevEl: '.product-prev',
            nextEl: '.product-next',
        },
        breakpoints: {
            0: {
                slidesPerView: 1.2,
                spaceBetween: 10,
                speed: 500,
            },
            540: {
                slidesPerView: 2,
                spaceBetween: 20,
                speed: 700,
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 20,
                speed: 700,
            },
            991: {
                slidesPerView: 4,
                spaceBetween: 20,
                speed: 700,
            }
        }
    });
    new Swiper('.bestseller_slider', {
        loop: true,
        navigation: {
            prevEl: '.best-prev',
            nextEl: '.best-next',
        },
        breakpoints: {
            0: {
                slidesPerView: 1.2,
                spaceBetween: 10,
                speed: 500,
            },
            540: {
                slidesPerView: 2,
                spaceBetween: 20,
                speed: 700,
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 20,
                speed: 700,
            },
            991: {
                slidesPerView: 4,
                spaceBetween: 20,
                speed: 700,
            }
        }
    });

    });


//

