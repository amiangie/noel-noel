/* Create HTML5 elements for ancient browsers */
document.createElement('header')
document.createElement('footer')
document.createElement('nav')
document.createElement('article')
document.createElement('section')
/* end Create HTML5 elements for ancient browsers */

$(function() {
	
	// Hide Header on on scroll down
	var didScroll;
	var lastScrollTop = 0;
	var delta = 5;
	var navbarHeight = $('header').outerHeight();

	$(window).scroll(function(event){
		didScroll = true;
	});

	setInterval(function() {
		if (didScroll) {
			hasScrolled();
			didScroll = false;
		}
	}, 150);

	function hasScrolled() {
		var st = $(this).scrollTop();
		
		// Make sure they scroll more than delta
		if(Math.abs(lastScrollTop - st) <= delta)
			return;
		
		// If they scrolled down and are past the navbar, add class .nav-up.
		// This is necessary so you never see what is "behind" the navbar.
		if (st > lastScrollTop && st > navbarHeight){
			// Scroll Down
			$('header').addClass('fixed');
			$('header').removeClass('nav-down').addClass('nav-up');
		} else {
			// Scroll Up
			if(st + $(window).height() < $(document).height()) {
				$('header').removeClass('nav-up').addClass('nav-down');
			}
			if(st < 100) {
				$('header').removeClass('fixed');
			}
		}

		lastScrollTop = st;
	}
	
	
	
	
	
	$('[data-openproject]').on('click', function(){
		$('[data-openproject]').removeClass('active');
		$(this).addClass('active');
		
		$('[data-project]').removeClass('active');
		$('[data-project="' + $(this).data('openproject') + '"]').addClass('active');
	});
	
	
	
	function smoothScroll(event){
        $('html, body').animate({
            scrollTop: ($($(this).attr('href')).offset().top) - $('header').outerHeight()
        }, 1000);
        event.preventDefault();
    }
    $('.js-menu-link').bind('click', smoothScroll);
	
	
	
    $('[data-type="background"]').each(function(){
        var $bgobj = $(this); // assigning the object
    	var $window = $(window);
		
        $(window).scroll(function() {
            var yPos = -($window.scrollTop() / $bgobj.data('speed')); 
            
            // Put together our final background position
            var coords = '50% '+ yPos + 'px';

            // Move the background
            $bgobj.css({ backgroundPosition: coords });
        }); 
    });    
})
