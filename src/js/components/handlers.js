export default function () {

	$('body').on('click','.js_submit',function(){
		$(this).parents('.js_form').submit();
	});

}