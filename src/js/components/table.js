export default function () {
	$('.js_table-desk-open, .js_table-desk-close').click(function(){
		$(this).parents('.table__outer').find('.table__desk').toggleClass('visible');
	});
}