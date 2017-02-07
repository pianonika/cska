export default function () {
	
	$('.js_submit').click(function(){
		$(this).parents('form').submit();
	});
	
}