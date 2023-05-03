var $window = $(window),
	year = new Date ().getFullYear (),
	plugins = function ($window, jQuery) {
		// Affix
		 (function ($) {
			$.fn.affix = function (options) {
				var $window, $nav, $offset, $height, $scrollTop, $pos, $extra, $windowH, $top,
					defaults = {
						offset: {
							end: null,
							top: null,
						},
						pos: {
							top: 0,
							left: 0
						},
						scrollTop: $ ("body").scrollTop (),
						target: window,
					};
				this.options = $.extend ({}, defaults, options);

				$nav = $ (this);
				$window = $ (this.options.target);
				$scrollTop = this.options.scrollTop;
				$height = $nav.height ();

				$offset = {
					top: this.options.offset.top,
					end: this.options.offset.end
				};

				$pos = {
					top: this.options.pos.top,
					left: this.options.pos.left
				};

				$top = $nav.offset ().top - $height * 2;

				$nav.each (function () {
					$ (".affix-after").css ({
						"margin-bottom": $height * 2
					});

					$window.scroll (function (e) {
						$windowH = Math.floor ($ (document).height () / 1000) * 1000;
						console.log ( ($offset.top || $top), $nav.offset ().top, $ (window).scrollTop ());
						if  ($ (window).scrollTop () >=  ($offset.top || $top)) {
							$nav.addClass ("affix");
						} else if  ($ (window).scrollTop () >=  ($offset.end || $windowH)) {
							$nav.removeClass ("affix");
						} else {
							$nav.removeClass ("affix");
						}
					});
				});
			}
		} (jQuery));

		// Carousel
		 (function () {
			var _this, _index, _dot, _btn, _curr, _slide, _group, MoveSlide, _dots, _move, _time;
			$ (".slider").each (function () {
				var animateLeft, slideLeft;
				_this = $ (this);
				_group = _this.find (".slide-group");
				_slide = _this.find ('.slide');
				_dots = ".slide-dots";
				_index = {
					Prev: _slide.length - 1,
					Curr: 0,
					arr: []
				};

				_dot = '<a class="slide-btn"></a>';
				_curr = "slidedot-active";
				_btn = $ (".slide-btn");

				_move = function (index) {
					var slideLeft, animateLeft;
					if  (index > _index.Curr) {
						slideLeft = '100%';
						animateLeft = '-100%';
					} else {
						slideLeft = '-100%';
						animateLeft = '100%';
					}

					_slide.eq (index).css ({
						display: 'block',
						left: slideLeft
					});

					_group.animate ({
						left: animateLeft
					}, function () {
						_slide.eq (_index.Curr).css ("display", 'none');
						_slide.eq (index).css ("left", 0);
						_group.css ("left", 0);
						_index.Prev = _index.Curr;
						_index.Curr = index;
					});

					$ (".slide-btn").eq (_index.Curr).removeClass ("slidedot-active");
					$ (".slide-btn").eq (index).addClass ("slidedot-active");
				};

				MoveSlide = function (index, type) {
					index = _index.Curr;
					if  (type === "+") {
						if  (_index.Curr <  (_index.arr.length - 1)) {
							index = _index.Curr + 1;
						} else {
							index = 0;
						}
					} else if  (type === "-") {
						if  (_index.Curr !== 0) {
							index = _index.Curr - 1;
						} else {
							index = _index.arr.length - 1;
						}
					}

					clearInterval (_time);
					_move (index);
				};

				_time = setInterval (function () {
					if  (_index.Curr <  (_slide.length - 1)) {
						_move (_index.Curr + 1);
					} else {
						_move (0);
					}
				}, 5000);

				$ ('.next-btn').on ('click', function (e) {
					MoveSlide (_index.Curr, "+");
				});

				$ ('.prev-btn').on ('click', function (e) {
					MoveSlide (_index.Curr, "-");
				});

				$.each (_slide, function (index) {
					$ (".slide-btn").eq (_index.Curr).addClass ("slidedot-active");

					$ (_dot).click (function () {
						_move (index);
					}).appendTo (_dots);
					_index.arr.push (_btn);
				});
			});
		} ());

		// Navs
		(function () {
			$ (".nav").find (".navbar-toggle").click (function (e) {
				$ (this).parents (".nav")
					.find ('ul.navbar')
					.toggleClass ('open');
			});
		} ());

		// Side Navs
		(function () {
			var toggle = function () {
				$ (".overlay").toggleClass ('active');
				$ (".sidenav").toggleClass ('side-collapse');
				$ ("body").toggleClass ('overflow-h');
			};
			
			$ (".sidenav-close").click (toggle);
			$ (".sidenav-open").click (toggle);
			$ (".overlay").click (toggle);
		} ());

		// Transition
		(function ($) {
			$.fn.trans = function (opt) {
				opt = opt || {};
				
				var speed = opt.speed || 2000;
				var contain = $ (this);
				
				contain.each (function () {
					var elements = $ (this).children ();
					elements.each (function () {
						var elementOffset = $ (this).offset ();
						var offset = elementOffset.left * 0.8 + elementOffset.top;
						var delay = parseFloat (offset / speed).toFixed (2);

						$ (this)
							.removeClass ("display-animation")
							.css ("-webkit-animation-delay", delay + 's')
							.css ("-o-animation-delay", delay + 's')
							.css ("animation-delay", delay + 's')
							.addClass ('animated')
							.removeClass ("test");
					});
				});
			};
		}) (jQuery);

		// Ripple Effect
		 (function ($) {
			$.fn.ripple = function (options) {
				$ (this).on ('click', function (e) {
					var _ripl, _ink, _thisInk, _diam, x, y;

					_ripl = $ (this);

					if  (!_ripl.hasClass ("no-ripple")) {
						// create .ink element
						_ripl.append ("<span class='ink'></span>");

						_ink = _ripl.find (".ink");

						_ink.each (function () {
							_thisInk = $ (this);
							// prevent quick double clicks
							if  (_thisInk.width >= _ripl.outerWidth () ||
								_thisInk.height >= _ripl.outerHeight ()) {
								_thisInk.removeClass ("ink-animate");
							}

							// set .ink diameter
							if  (!_thisInk.height () && !_thisInk.width ()) {
								_diam = Math.max (_ripl.outerWidth (), _ripl.outerHeight ());
								_thisInk.css ({
									height: _diam,
									width: _diam
								});
							}

							// get click coordinates
							x = e.pageX - _ripl.offset ().left - _thisInk.width () / 2;
							y = e.pageY - _ripl.offset ().top - _thisInk.height () / 2;

							// set .ink position and add class .animate
							_thisInk.css ({
									top: y + 'px',
									left: x + 'px'
								})
								.addClass ("ink-animate");
						});
					}
				});
			};
		} (jQuery));

		// Section Jump
		 (function () {
			$ (".layout-wrap").each (function (index, obj) {
				$ (".layout-wrap").eq (index).attr ("id", "layout-" + index);
			});
		} ());
	},
	main = function () {
		setTimeout(function() {
			$ ("body").removeClass ("loaded");
			$ (".loadbar").hide ();
			
			$ ('a[href^="http://"]').attr ('target', '_blank');
			$ ('a[href^="https://"]').attr ('target', '_blank');

			plugins ($window, jQuery);

			$ (".ripple, .btn-ripple").ripple ();
			// $ (".display-animation").trans ();
			$ (".copyrights").text (year + " whitelightG © All Rights Reserved.");
		}, 1);
	};

$ (document).ready (main);