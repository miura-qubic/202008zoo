
'use strict';

const w = $(window).width();
const spwidth = 767;
const tabletwidth = 1025;

{
	const openMenu = document.getElementById('menu_open');
	const Nav = document.querySelector('header nav');

	openMenu.addEventListener('click', function () {
		openMenu.classList.toggle('active');
		Nav.classList.toggle('active');
	});
}


$(function () {

// JQueryの範囲

	if(w > spwidth){
		// グローバルナビをスクロール時に固定する
		let nav = $('.gnav');
		let offset = nav.offset();
		$(window).scroll(function(){
			if($(window).scrollTop() > offset.top){
				nav.addClass('fixed');
				$('.top02').addClass('fixed');
			}else{
				nav.removeClass('fixed');
				$('.top02').removeClass('fixed');
			}
		});
	}

	$('a[href^="#"]').click(function() {
		let href= $(this).attr("href");
		let target = $(href);
		let position = target.offset().top;
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
	});

});