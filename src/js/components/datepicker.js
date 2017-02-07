export default function () {
	
	var fr = {
		closeText: "Закрыть",
		prevText: "Предыдущий",
		nextText: "Следующий",
		currentText: "Текущий",
		monthNames: [ "январь", "февраль", "март", "апрель", "май", "июнь",
			"июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь" ],
		monthNamesShort: [ "янв", "фев", "мар", "апр", "май", "июн",
			"июл", "авг", "сен", "окт", "ноя", "дек." ],
		dayNames: [ "понедельник", "вторник", "среда", "четверг", "пятница", "суббота", "воскресенье" ],
		dayNamesShort: [ "пн", "вт", "ср", "чт", "пт", "сб", "вс" ],
		dayNamesMin: [ "пн","вт","ср","чт","пт","сб","вс" ],
		weekHeader: "Sem.",
		dateFormat: "dd/mm/yy",
		firstDay: 0,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: "" 
	};

	$( "#date" ).datepicker({
		firstDay: 0,
		onClose: function(){
			setTimeout(function(){
				$('.js_datepicker').removeClass('active');
			}, 10);
		},
		showAnim: false
	});
	$( "#date" ).datepicker( "option", fr );
	$( "#date" ).change(function(){
		$(this).parents('form').submit();
	});
	
	if( $( "#date" ).val() != '' ){
		$( "#date" ).datepicker( "setDate", $( "#date" ).val());
	}
	
	$('.js_datepicker').click(function(){
		
		if( $(this).hasClass('active') ){
			return false;
		}
		
		$(this).addClass('active');
		$( "#date" ).datepicker( "show" );
	});
    
}