export default function () {
	
	$('.filter select').change(function(){
		$(this).parents('form').submit();
	});
	
}