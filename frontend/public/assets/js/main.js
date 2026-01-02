
(function($) {

	var	$window = $(window),
		$body = $('body');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ null,      '480px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Touch mode.
		if (browser.mobile)
			$body.addClass('is-touch');

	// Scrolly links.
		$('.scrolly').scrolly({
			speed: 2000
		});

	// Dropdowns.
		$('#nav > ul').dropotron({
			alignment: 'right',
			hideDelay: 350
		});

	// Nav.

		// Title Bar.
			$(
				'<div id="titleBar">' +
					'<a href="#navPanel" class="toggle"></a>' +
					'<span class="title">' + $('#logo').html() + '</span>' +
				'</div>'
			)
				.appendTo($body);

		// Panel.
			$(
				'<div id="navPanel">' +
					'<nav>' +
						$('#nav').navList() +
					'</nav>' +
				'</div>'
			)
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'left',
					target: $body,
					visibleClass: 'navPanel-visible'
				});

	// Parallax.
	// Disabled on IE (choppy scrolling) and mobile platforms (poor performance).
		if (browser.name == 'ie'
		||	browser.mobile) {

			$.fn._parallax = function() {

				return $(this);

			};

		}
		else {

			$.fn._parallax = function() {

				$(this).each(function() {

					var $this = $(this),
						on, off;

					on = function() {

						$this
							.css('background-position', 'center 0px');

						$window
							.on('scroll._parallax', function() {

								var pos = parseInt($window.scrollTop()) - parseInt($this.position().top);

								$this.css('background-position', 'center ' + (pos * -0.15) + 'px');

							});

					};

					off = function() {

						$this
							.css('background-position', '');

						$window
							.off('scroll._parallax');

					};

					breakpoints.on('<=medium', off);
					breakpoints.on('>medium', on);

				});

				return $(this);

			};

			$window
				.on('load resize', function() {
					$window.trigger('scroll');
				});

		}

	// Spotlights.
		var $spotlights = $('.spotlight');

		$spotlights
			._parallax()
			.each(function() {

				var $this = $(this),
					on, off;

				on = function() {

					var top, bottom, mode;

					// Use main <img>'s src as this spotlight's background.
						$this.css('background-image', 'url("' + $this.find('.image.main > img').attr('src') + '")');

					// Side-specific scrollex tweaks.
						if ($this.hasClass('top')) {

							mode = 'top';
							top = '-20%';
							bottom = 0;

						}
						else if ($this.hasClass('bottom')) {

							mode = 'bottom-only';
							top = 0;
							bottom = '20%';

						}
						else {

							mode = 'middle';
							top = 0;
							bottom = 0;

						}

					// Add scrollex.
						$this.scrollex({
							mode:		mode,
							top:		top,
							bottom:		bottom,
							initialize:	function(t) { $this.addClass('inactive'); },
							terminate:	function(t) { $this.removeClass('inactive'); },
							enter:		function(t) { $this.removeClass('inactive'); },

							// Uncomment the line below to "rewind" when this spotlight scrolls out of view.

							//leave:	function(t) { $this.addClass('inactive'); },

						});

				};

				off = function() {

					// Clear spotlight's background.
						$this.css('background-image', '');

					// Remove scrollex.
						$this.unscrollex();

				};

				breakpoints.on('<=medium', off);
				breakpoints.on('>medium', on);

			});

	// Wrappers.
		var $wrappers = $('.wrapper');

		$wrappers
			.each(function() {

				var $this = $(this),
					on, off;

				on = function() {

					$this.scrollex({
						top:		250,
						bottom:		0,
						initialize:	function(t) { $this.addClass('inactive'); },
						terminate:	function(t) { $this.removeClass('inactive'); },
						enter:		function(t) { $this.removeClass('inactive'); },

						// Uncomment the line below to "rewind" when this wrapper scrolls out of view.

						//leave:	function(t) { $this.addClass('inactive'); },

					});

				};

				off = function() {
					$this.unscrollex();
				};

				breakpoints.on('<=medium', off);
				breakpoints.on('>medium', on);

			});

	// Banner.
		var $banner = $('#banner');

		$banner
			._parallax();

})(jQuery);

// === Wiki Search Box Modern UI ===
document.addEventListener('DOMContentLoaded', function() {
  const trigger = document.getElementById('wiki-search-trigger');
  const box = document.getElementById('wiki-search-box');
  const closeBtn = document.getElementById('wiki-search-close');
  const form = document.getElementById('wiki-search-form');
  const input = document.getElementById('wiki-query');
  const resultDiv = document.getElementById('wiki-result');

  // Hiện box khi nhấn nút search
  if (trigger && box) {
    trigger.addEventListener('click', function(e) {
      e.stopPropagation();
      box.style.display = 'block';
      input.value = '';
      resultDiv.innerHTML = '';
      setTimeout(() => input.focus(), 100);
    });
  }
  // Ẩn box khi nhấn nút đóng
  if (closeBtn && box) {
    closeBtn.addEventListener('click', function() {
      box.style.display = 'none';
    });
  }
  // Ẩn box khi click ra ngoài
  document.addEventListener('mousedown', function(e) {
    if (box && box.style.display === 'block' && !box.contains(e.target) && e.target !== trigger) {
      box.style.display = 'none';
    }
  });
  // ESC để đóng
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && box && box.style.display === 'block') {
      box.style.display = 'none';
    }
  });
  // Submit tìm kiếm
  if (form && input && resultDiv) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const query = input.value.trim();
      resultDiv.innerHTML = '🔍 Đang tìm kiếm...';
      if (!query) {
        resultDiv.innerHTML = '❗ Vui lòng nhập từ khóa.';
        return;
      }
      const apiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`;
      fetch(apiUrl)
        .then(res => {
          if (!res.ok) throw new Error('Không tìm thấy bài viết.');
          return res.json();
        })
        .then(data => {
          let html = '';
          if (data.title) html += `<h3>${data.title}</h3>`;
          if (data.extract) html += `<p>${data.extract}</p>`;
          if (data.content_urls && data.content_urls.desktop && data.content_urls.desktop.page) {
            html += `<a href="${data.content_urls.desktop.page}" target="_blank">🔗 Xem chi tiết</a>`;
          }
          if (data.thumbnail && data.thumbnail.source) {
            html = `<img src="${data.thumbnail.source}" alt="${data.title}" style="width:70px;height:70px;object-fit:cover;border-radius:8px;float:left;margin-right:1em;box-shadow:0 2px 8px rgba(0,0,0,0.15);background:#fff;">` + html;
          }
          resultDiv.innerHTML = html || '❌ Không tìm thấy thông tin phù hợp.';
        })
        .catch(() => {
          resultDiv.innerHTML = '❌ Không tìm thấy thông tin phù hợp.';
        });
    });
  }
});


