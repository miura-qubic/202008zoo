
'use strict';

const w = $(window).width();
const spwidth = 767;
const tabletwidth = 1025;
const pagename = document.getElementById("pagename").value;
{
	if(pagename ===  'top' || pagename === 'lower02'){
		const openMenu = document.getElementById('menu_open');
		const Nav = document.querySelector('header nav');
	
		openMenu.addEventListener('click', function () {
			openMenu.classList.toggle('active');
			Nav.classList.toggle('active');
		});
	}
}


$(function () {

	let slide_item = $('#slider .item').length;


	let active_number = 0;
	let prev_number = 3;
	let next_number = 1;
	let slider = function () {

		$('#slider .item').removeClass('active');
		$('#slider .item').removeClass('prev');
		$('#slider .item').removeClass('next');
		
		$('#slider .item').css({
			'z-index': '-1',
			'transform': 'translateX(0%)',
		});

		$('#slider .item').eq(prev_number).addClass('prev').css({
			'transform': 'translateX(100%)',
			'transition': '1s transform',
			'z-index': '1100',
		});
		$('#slider .item.prev span').css({
			'transform': 'translateX(-100%)',
			'transition': '1s transform',
			'z-index': '1000',
		});
		$('#slider .item').eq(active_number).addClass('active').css({
			'z-index': '1000',
		});
		$('#slider .item').eq(next_number).addClass('next').css({
			'transform': 'translateX(0%)',
			'z-index': '100',
		});
		$('#slider .item.next span').css({
			'transform': 'translateX(0%)',
		});
		
		active_number++;
		prev_number++;
		next_number++;

		if (active_number === slide_item) {
			active_number = 0;
			$('.top01 #slider .item:last-of-type').addClass('none_bg');
		}
		if (prev_number === slide_item) {
			prev_number = 0;
		}
		if (next_number === slide_item) {
			next_number = 0;
		}

		
	};	
	slider();
	setInterval(slider, 5500);

	// JQueryの範囲
	if(pagename === 'top' || pagename === 'lower02'){
		if (w > spwidth) {
			// グローバルナビをスクロール時に固定する
			let nav = $('.gnav');
			let offset = nav.offset();
			$(window).scroll(function () {
				if ($(window).scrollTop() > offset.top) {
					nav.addClass('fixed');
					$('.top02').addClass('fixed');
					$('.lower .gnav').addClass('active');
				} else {
					nav.removeClass('fixed');
					$('.top02').removeClass('fixed');
					$('.lower .gnav').removeClass('active');
				}
			});
		}
	}

	// トップページへ戻るボタン
	// $(window).scroll(function () {
	// 	if ($(window).scrollTop() > 500) {
	// 		$('.lower #top_back').fadeIn();
	// 	} else {
	// 		$('.lower #top_back').fadeOut();
	// 	}
	// 	var scrollHeight = $(document).height();
	// 	var scrollPosition = $(window).height() + $(window).scrollTop();
	// 	var footHeight = $('footer').innerHeight();
	// 	if ( scrollHeight - scrollPosition <= footHeight ) {
	// 		if(w > spwidth){
	// 			$('.lower #top_back').css({
	// 					'position': 'absolute',
	// 					'bottom': footHeight - 65
	// 			});
	// 		}else{
	// 			$('.lower #top_back').css({
	// 					'position': 'absolute',
	// 					'bottom': footHeight - 45
	// 			});
	// 		}
	// 	} else {
	// 		if(w > spwidth){
	// 			$('.lower #top_back').css({
	// 					'position': 'fixed',
	// 					'bottom': '4rem'
	// 			});
	// 		}else{
	// 				$('.lower #top_back').css({
	// 						'position': 'fixed',
	// 						'bottom': '2rem'
	// 				});
	// 		}
	// 	}
	// });

	// ハンバーガーメニュークリック時
	$('.menu_open').click(function () {
		$('.gnav_sp').slideToggle();
	});
	$('.gnav_sp li a').click(function () {
		$('.menu_open').removeClass('active');
		$('.gnav_sp').slideUp();
	});

	// スムーススクロール 
	var headerHeight = $('header').outerHeight();
	var urlHash = location.hash;
	if (urlHash) {
		$('body,html').stop().scrollTop(0);
		setTimeout(function () {
			var target = $(urlHash);
			var position = target.offset().top - headerHeight;
			$('body,html').stop().animate({ scrollTop: position }, 500);
		}, 100);
	}
	$('a[href^="#"]').click(function () {
		var href = $(this).attr("href");
		var target = $(href);
		var position = target.offset().top - headerHeight;
		$('body,html').stop().animate({ scrollTop: position }, 500);
	});

	let navLink = $('nav.gnav li a');
	let contentsArr = new Array();
	for (var i = 0; i < navLink.length; i++) {
		// コンテンツのIDを取得
		var targetContents = navLink.eq(i).attr('href');
		// ページ内リンクでないナビゲーションが含まれている場合は除外する
		if (targetContents.charAt(0) == '#') {
			// ページ上部からコンテンツの開始位置までの距離を取得
			var targetContentsTop = $(targetContents).offset().top;
			// ページ上部からコンテンツの終了位置までの距離を取得
			var targetContentsBottom = targetContentsTop + $(targetContents).outerHeight(true) - 1;
			// 配列に格納
			contentsArr[i] = [targetContentsTop, targetContentsBottom]
		}
	};
	// 現在地をチェックする
	function currentCheck() {
		// 現在のスクロール位置を取得
		var windowScrolltop = $(window).scrollTop();
		for (var i = 0; i < contentsArr.length; i++) {
			// 現在のスクロール位置が、配列に格納した開始位置と終了位置の間にあるものを調べる
			if (contentsArr[i][0] <= windowScrolltop + 100 && contentsArr[i][1] >= windowScrolltop) {
				// 開始位置と終了位置の間にある場合、ナビゲーションにclass="current"をつける
				navLink.removeClass('current');
				navLink.eq(i).addClass('current');
				i == contentsArr.length;
				// スクロール位置がAbout Usより上になった場合、ナビゲーションからclass="current"を外す
			} else if (contentsArr[0][0] > windowScrolltop) {
				navLink.removeClass('current');
			}
		};
	}
	$(window).on('load scroll', function () {
		currentCheck();

		// fadein
		$('.fadein01, .fadein02, .fadein03, .fadein04, .fadein05, .fadein06, .fadein07, .fadein_left, .fadein_right, .fade1').each(function () {
			var position = $(this).offset().top;
			var scroll = $(window).scrollTop();
			var windowHeight = $(window).height();
			if (scroll > position - windowHeight + 100) {
				$(this).addClass('active');
			}
		});
	});

	$('.JS_ScrollItem').each(function () {
		let $item = $(this);
		$(window).on('scroll', function () {
			let top = $item.offset().top; // ターゲットの位置取得
			let position = top - $(window).height();  // イベントを発火させたい位置
			if ($(window).scrollTop() > position) {
				$item.addClass('isShow');
			}
		});
	});

	// Q&A 開閉
	$('#qa_list dt').on('click', function () {
		$(this).next('dd').slideToggle();
		$(this).toggleClass('open');

		if ($(this).hasClass('open')) {
			$(this).find('img').attr('src', './images/top/icon_qaclose.png');
		} else {
			$(this).find('img').attr('src', './images/top/icon_qaopen.png');
		}
	});


	if(pagename === 'lower'){
		// チェックボックス
		$("input.ichk").iCheck({
			checkboxClass: "icheckbox_square-red", // using theme
			radioClass: "iradio_square-red"
		});
		$("input.iradio").iCheck({
			checkboxClass: "icheckbox_square-red", // using theme
			radioClass: "iradio_square-red"
		});
	}

});

// Voice Q&Aのボックスの高さ揃える
$(window).on('load resize', function () {
	if (w > tabletwidth) {
		var top07_dtArr = new Array();
		var top07_img = new Array();
		var top07_ddArr = new Array();
		$('.top07 .item dt').each(function (i, element) {
			top07_dtArr[i] = $(this).innerHeight();
		});
		$('.top07 .item .img').each(function (i, element) {
			top07_img[i] = $(this).innerHeight();
		});
		$('.top07 .item dd').each(function (i, element) {
			top07_ddArr[i] = $(element).height(top07_img[i] - top07_dtArr[i]);
		});
	}

		var arrH = [];
		$('.top06 .item .txt').each(function(i, elem){
			arrH[i] = $(this).innerHeight();
		});
		var maxH = Math.max.apply(null, arrH);
		$('.top06 .item .txt').innerHeight(maxH);
});