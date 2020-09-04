
'use strict';

const w = $(window).width();
const spwidth = 767;
const tabletwidth = 1025;
// const pagename = document.getElementById("pagename").value;
{
	const openMenu = document.getElementById('menu_open');
	const Nav = document.querySelector('header nav');

	openMenu.addEventListener('click', function () {
		openMenu.classList.toggle('active');
		Nav.classList.toggle('active');
	});
}


$(function () {

	$('.slick01').slick({
		autoplay: true,
		arrows: false,
		autoplaySpeed: 5000,
		speed: 500,
		draggable:false,
		swipe: false,
		fade: true,
		pauseOnFocus: false,
		pauseOnHover: false,
		pauseOnDotsHover: false,
	});

	// $('.slick01').on('beforeChange',function(event, slick, currentSlide, nextSlide){
	// 	console.log(nextSlide);
	// 	if(nextSlide > 0){
	// 		$('.slick01').slick('slickSetOption', 'autoplaySpeed', 4400, true)
	// 	}
	// });

	// $('.slick01').on('beforeChange', function(){
	// 	$('.slick01 .slick-slide').removeClass('is-prev');
	// 	$('.slick01 .slick-slide.slick-active').next('.slick-slide').addClass('is-prev');
	// });

// JQueryの範囲
	// if(pagename !== 'contact'){
		if(w > spwidth){
			// グローバルナビをスクロール時に固定する
			let nav = $('.gnav');
			let offset = nav.offset();
			$(window).scroll(function(){
				if($(window).scrollTop() > offset.top){
					nav.addClass('fixed');
					$('.top02').addClass('fixed');
					$('.lower .gnav').addClass('active');
				}else{
					nav.removeClass('fixed');
					$('.top02').removeClass('fixed');
					$('.lower .gnav').removeClass('active');
				}
			});
		}
	// }

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
	if(urlHash) {
		$('body,html').stop().scrollTop(0);
		setTimeout(function(){
				var target = $(urlHash);
				var position = target.offset().top - headerHeight;
				$('body,html').stop().animate({scrollTop:position}, 500);
		}, 100);
	}
	$('a[href^="#"]').click(function() {
		var href= $(this).attr("href");
		var target = $(href);
		var position = target.offset().top - headerHeight;
		$('body,html').stop().animate({scrollTop:position}, 500);   
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
			}else if(contentsArr[0][0] > windowScrolltop){
				navLink.removeClass('current');
			}
		};
	}
	$(window).on('load scroll', function () {
		currentCheck();

		// fadein
		$('.fadein, .fadein_left, .fadein_right, .fade1').each(function () {
			var position = $(this).offset().top;
			var scroll = $(window).scrollTop();
			var windowHeight = $(window).height();
			if (scroll > position - windowHeight + 200) {
				$(this).addClass('active');
			}
		});
	});

	$('.JS_ScrollItem').each(function(){
    let $item = $(this);
    $(window).on('scroll', function(){
      let top = $item.offset().top; // ターゲットの位置取得
      let position = top - $(window).height();  // イベントを発火させたい位置
      if($(window).scrollTop() > position){
        $item.addClass('isShow');
      }
    });
  });

	// Q&A 開閉
	$('#qa_list dt').on('click',function(){
		$(this).next('dd').slideToggle();
		$(this).toggleClass('open');

		if($(this).hasClass('open')){
			$(this).find('img').attr('src', '../images/top/icon_qaclose.png');
		}else{
			$(this).find('img').attr('src', '../images/top/icon_qaopen.png');
		}
	});


	// if(pagename === 'contact'){
		// チェックボックス
		$("input.ichk").iCheck({
			checkboxClass: "icheckbox_square-red"//, using theme
		// radioClass: "iradio_square-red"
		});
		$("input.iradio").iCheck({
			// checkboxClass: "icheckbox_square-red"//, using theme
			radioClass: "iradio_square-red"
		});
		//Easy Select Box
		jQuery(function () {
			jQuery('select.eazy').easySelectBox({speed:200});
		});
	// }

});

// Voice Q&Aのボックスの高さ揃える
$(window).on('load resize',function(){
	if(w > tabletwidth){
		var top07_dtArr = new Array();
		var top07_img = new Array();
		var top07_ddArr = new Array();
		$('.top07 .item dt').each(function(i, element){
			top07_dtArr[i] = $(this).innerHeight();
		});
		$('.top07 .item .img').each(function(i, element){
			top07_img[i] = $(this).innerHeight();
		});
		$('.top07 .item dd').each(function(i, element){
			top07_ddArr[i] = $(element).height(top07_img[i] - top07_dtArr[i]);
		});
	}

	if(w > spwidth){
		var sliderImg = $('.top06 .item .txt').eq(0).innerHeight();
		$('.top06 .item .txt').innerHeight(sliderImg);
	}
});