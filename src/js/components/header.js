export default function () {
	
	$('.js_open-search').click(function(){
		$('.page-header__search-form').addClass('visible');
	});
	$('.js_close-search').click(function(){
		$('.page-header__search-form').removeClass('visible');
	})
}